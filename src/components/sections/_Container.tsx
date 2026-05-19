import { HTMLAttributes, ReactNode } from "react";

// Shared layout container — 1216px max centred in 1920px layout cap with
// 32px gutters. Audit ref: SUPERSIDE-AUDIT §1.3.
export default function Container({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["mx-auto", className].join(" ").trim()}
      style={{
        maxWidth: "var(--container-max)",
        paddingInline: "var(--container-margin)",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
