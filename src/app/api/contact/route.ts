// /api/contact — multi-step form receiver. v5 had this wired to Resend
// (token `re_hRuZ57z2_…`) → theo.ellary@gmail.com. v6 reuses the same
// pattern but we keep the route a stub here until RESEND_API_KEY is
// added to the v6 Vercel project env. For now we log + return ok so the
// form roundtrip works in preview deploys.

import { NextResponse } from "next/server";

// Simple in-memory rate limit — Vercel edge has a per-request cold start
// pattern that makes this leaky but it's deliberate (form spam still costs
// the spammer a slot vs cron-grade resilience).
const RATE_LIMIT_MS = 4_000;
const recent = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const now = Date.now();
    const last = recent.get(ip);
    if (last && now - last < RATE_LIMIT_MS) {
      return NextResponse.json(
        { ok: false, error: "Slow down — wait a moment and try again." },
        { status: 429 },
      );
    }
    recent.set(ip, now);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Bad payload." }, { status: 400 });
    }

    // Honeypot — silent drop if filled
    if (typeof (body as Record<string, unknown>).website === "string" && (body as Record<string, string>).website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const { name, email, revenue, tried, channel, message } = body as Record<string, string>;
    if (!name || !email || !revenue || !tried || !channel || !message) {
      return NextResponse.json({ ok: false, error: "Missing field." }, { status: 400 });
    }

    // Resend wire-up — only fires if env present, so preview deploys without
    // RESEND_API_KEY still return ok (lets us test the roundtrip).
    if (process.env.RESEND_API_KEY) {
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM ?? "Rise Advantage <hello@riseadvantage.co.uk>",
            to: process.env.RESEND_TO ?? "theo.ellary@gmail.com",
            reply_to: email,
            subject: `New enquiry — ${name} (${revenue})`,
            text: [
              `Name:    ${name}`,
              `Email:   ${email}`,
              `Revenue: ${revenue}`,
              `Channel: ${channel}`,
              ``,
              `Tried:`,
              tried,
              ``,
              `Wants:`,
              message,
            ].join("\n"),
          }),
        });
        if (!r.ok) {
          // Don't fail the form for the user if Resend hiccups — just log.
          console.warn("[contact] resend HTTP", r.status, await r.text().catch(() => ""));
        }
      } catch (e) {
        console.warn("[contact] resend error:", (e as Error).message);
      }
    } else {
      console.log("[contact] received (RESEND_API_KEY not set, no email sent):", { name, email, revenue });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 500 },
    );
  }
}
