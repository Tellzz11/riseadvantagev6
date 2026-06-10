"use client";

// ContactForm — multi-step per CARRY-OVER §2.
// Step 1: name + email + revenue band.
// Step 2: tried + primary channel + message.
// Honeypot, rate-limit (server-side at /api/contact), progress indicator.
// "Talk to us →" CTA in nav anchors to this. NO Calendly.

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "./_Container";

const revenueBands = [
  "< £100k / yr",
  "£100k - £500k / yr",
  "£500k - £2m / yr",
  "£2m - £10m / yr",
  "> £10m / yr",
] as const;

const channels = ["Meta / Facebook", "Google Ads", "TikTok", "Organic / SEO", "Outbound", "None yet"] as const;

const schema = z.object({
  name: z.string().min(2, "Your name, please."),
  email: z.string().email("That doesn't look right — try again?"),
  revenue: z.enum(revenueBands, { error: "Pick a band — roughly is fine." }),
  tried: z.string().min(8, "Even one sentence helps."),
  channel: z.enum(channels, { error: "Pick the closest one." }),
  message: z.string().min(12, "Give us a bit more to go on."),
  website: z.string().max(0).optional(), // honeypot — must be empty
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      tried: "",
      message: "",
      website: "",
    },
  });

  async function onNext() {
    const valid = await trigger(["name", "email", "revenue"]);
    if (valid) setStep(2);
  }

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    setServerMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setStatus("error");
        setServerMsg(json.error ?? "Something broke our end. Try again in a minute?");
        return;
      }
      setStatus("ok");
      setServerMsg("Got it. We'll reply within one working day.");
    } catch (e) {
      setStatus("error");
      setServerMsg((e as Error).message ?? "Network error.");
    }
  }

  return (
    <section
      id="contact"
      style={{ background: "var(--canvas-sage)", paddingBlock: "var(--gap-11xl)" }}
    >
      <Container className="max-w-2xl mx-auto">
        <p className="eyebrow mb-6" style={{ color: "var(--text-on-light-muted)" }}>
          Talk to us
        </p>
        <h2
          className="font-sans text-balance"
          style={{
            fontSize: "clamp(32px, 4.5vw, 56px)",
            lineHeight: 1.1,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: "var(--text-on-light)",
          }}
        >
          Tell us what you&rsquo;re working with. <em>We&rsquo;ll reply within one working day.</em>
        </h2>

        {/* Progress — dark on-light family: this section sits on sage, so the
            off-white text tokens are illegible here (audit 2026-06-10). */}
        <div className="mt-10 mb-8 flex items-center gap-4 text-sm text-text-on-light-muted">
          <span className={step === 1 ? "text-text-on-light font-medium" : ""}>01 — You</span>
          <span className="flex-1 h-px bg-text-on-light/20" />
          <span className={step === 2 ? "text-text-on-light font-medium" : ""}>02 — The work</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Honeypot — hidden from real users via inline styles + aria */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            {...register("website")}
            className="absolute -left-[9999px] h-px w-px opacity-0"
          />

          {step === 1 && (
            <>
              <Field label="Your name" error={errors.name?.message}>
                <input
                  type="text"
                  autoComplete="name"
                  {...register("name")}
                  className="form-input"
                  placeholder="Alex Morgan"
                />
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  className="form-input"
                  placeholder="alex@company.com"
                />
              </Field>

              <Field label="Revenue band" error={errors.revenue?.message}>
                <select {...register("revenue")} className="form-input" defaultValue="">
                  <option value="" disabled>Pick one</option>
                  {revenueBands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </Field>

              <div className="flex justify-end pt-2">
                <button type="button" onClick={onNext} className="pill-cta-lime">
                  Next <span aria-hidden>→</span>
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Field label="What have you tried so far?" error={errors.tried?.message}>
                <textarea
                  {...register("tried")}
                  className="form-input min-h-[90px]"
                  placeholder="A sentence or two — what's worked, what's flat."
                />
              </Field>

              <Field label="Primary channel today" error={errors.channel?.message}>
                <select {...register("channel")} className="form-input" defaultValue="">
                  <option value="" disabled>Pick one</option>
                  {channels.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field label="What do you want help with?" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  className="form-input min-h-[120px]"
                  placeholder="As much detail as you can — the more we get, the sharper our first reply."
                />
              </Field>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-text-on-light-muted hover:text-text-on-light transition-colors text-sm"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="pill-cta-lime disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send it"}
                </button>
              </div>
            </>
          )}

          {status === "ok" && serverMsg && (
            <p className="mt-6 rounded-2xl border border-text-on-light/20 bg-canvas-light p-4 text-text-on-light">
              {serverMsg}
            </p>
          )}
          {status === "error" && serverMsg && (
            <p className="mt-6 rounded-2xl border border-text-on-light/30 bg-canvas-light p-4 text-text-on-light font-medium">
              {serverMsg}
            </p>
          )}
        </form>
      </Container>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm text-text-on-light-muted mb-2 uppercase tracking-[0.12em]">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs font-medium text-text-on-light">{error}</span>}
    </label>
  );
}
