"use client";

import { useId } from "react";

/** Accessible switch (button role="switch") with a visible label. */
export default function Toggle({
  label,
  checked,
  onChange,
  disabled,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  description?: string;
}) {
  const id = useId();
  return (
    <div className="flex items-center gap-2">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        aria-describedby={description ? `${id}-desc` : undefined}
        className={`relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
          checked ? "bg-primary" : "bg-body/25"
        }`}
      >
        <span className={`inline-block h-4.5 w-4.5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[19px]" : "translate-x-[3px]"}`} />
      </button>
      <label htmlFor={id} className="cursor-pointer select-none font-inter text-[13px] text-body/80">
        {label}
      </label>
      {description && (
        <span id={`${id}-desc`} className="sr-only">
          {description}
        </span>
      )}
    </div>
  );
}
