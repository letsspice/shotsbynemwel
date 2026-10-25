import type { ReactNode } from "react";

export function PageTitle({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="font-manrope text-[28px] font-bold leading-[36px] tracking-[-0.0128em] text-dark md:text-[32px]">{title}</h1>
        {description && <p className="mt-1 max-w-[640px] font-manrope text-[15px] leading-[24px] text-body/70">{description}</p>}
      </div>
      {actions && <div className="no-print flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

/** Hero-number tile: label above, big value, optional context line. */
export function StatTile({ label, value, hint, tone = "default" }: { label: string; value: number | string; hint?: string; tone?: "default" | "warn" }) {
  return (
    <div className="rounded-xl border border-border bg-white p-5 break-inside-avoid">
      <p className="font-inter text-[13px] font-medium text-body/70">{label}</p>
      <p className={`mt-2 font-manrope text-[32px] font-bold leading-none tabular-nums ${tone === "warn" ? "text-accent-red" : "text-dark"}`}>{value}</p>
      {hint && <p className="mt-2 font-inter text-[12px] leading-[18px] text-body/60">{hint}</p>}
    </div>
  );
}

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-border bg-white p-5 md:p-6 break-inside-avoid ${className}`}>
      {title && <h2 className="mb-4 font-manrope text-[17px] font-bold text-dark">{title}</h2>}
      {children}
    </section>
  );
}

/** Single-series horizontal bars (one hue, values labelled, no legend needed). */
export function BarList({ rows, unit }: { rows: { label: string; value: number }[]; unit: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.label} className="grid grid-cols-[minmax(0,140px)_1fr_auto] items-center gap-3 font-inter text-[13px]">
          <span className="truncate text-body/80" title={row.label}>
            {row.label}
          </span>
          <span className="h-2 rounded-full bg-background" aria-hidden>
            <span className="block h-2 rounded-full bg-primary/80" style={{ width: `${(row.value / max) * 100}%` }} />
          </span>
          <span className="tabular-nums text-body">
            {row.value} <span className="sr-only">{unit}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-inter text-[12px] font-medium ${
        active ? "bg-primary/10 text-primary" : "bg-body/10 text-body/70"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-primary" : "bg-body/40"}`} aria-hidden />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export const buttonClass = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-inter text-[14px] font-medium text-offwhite transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 font-inter text-[14px] font-medium text-body transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-accent-red px-4 py-2.5 font-inter text-[14px] font-medium text-white transition-colors hover:bg-accent-red/90 disabled:opacity-50",
  icon: "inline-flex h-9 w-9 items-center justify-center rounded-lg text-body/70 transition-colors hover:bg-background hover:text-dark disabled:cursor-not-allowed disabled:opacity-40",
};
