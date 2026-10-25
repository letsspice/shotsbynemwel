"use client";

import { useId } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { emptyRepeaterItem, type FieldDef } from "@/lib/content/collections";
import type { FieldErrors } from "@/lib/content/validate";
import ImagePicker from "./ImagePicker";
import { buttonClass } from "../ui";

const inputClass =
  "w-full rounded-md border bg-white px-3 py-2 font-manrope text-[14px] leading-[22px] text-dark outline-none transition-colors focus:border-primary";

interface Props {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
  errors: FieldErrors;
  /** Dotted path used to look up nested errors, e.g. "itinerary.0.title". */
  path: string;
  active: boolean;
}

function moveItem<T>(list: T[], index: number, delta: number): T[] {
  const target = index + delta;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function ListControls({ index, length, onMove, onRemove, label }: { index: number; length: number; onMove: (d: number) => void; onRemove: () => void; label: string }) {
  return (
    <div className="flex shrink-0 items-start">
      <button type="button" className={buttonClass.icon} disabled={index === 0} onClick={() => onMove(-1)} aria-label={`Move ${label} up`}>
        <ArrowUp size={15} aria-hidden />
      </button>
      <button type="button" className={buttonClass.icon} disabled={index === length - 1} onClick={() => onMove(1)} aria-label={`Move ${label} down`}>
        <ArrowDown size={15} aria-hidden />
      </button>
      <button type="button" className={buttonClass.icon} onClick={onRemove} aria-label={`Remove ${label}`}>
        <Trash2 size={15} aria-hidden />
      </button>
    </div>
  );
}

export default function FieldRenderer({ field, value, onChange, errors, path, active }: Props) {
  const id = useId();
  const error = errors[path];
  const required = field.required || (field.requiredWhenActive && active);
  const describedBy = [error && `${id}-error`, field.help && `${id}-help`].filter(Boolean).join(" ") || undefined;
  const border = error ? "border-accent-red" : "border-border";

  const labelEl = (
    <label htmlFor={id} className="mb-1.5 block font-inter text-[13px] font-medium text-body">
      {field.label}
      {required && (
        <span className="text-accent-red" aria-hidden>
          {" "}
          *
        </span>
      )}
    </label>
  );
  const helpEl = field.help && (
    <p id={`${id}-help`} className="mt-1 font-inter text-[12px] text-body/60">
      {field.help}
    </p>
  );
  const errorEl = error && (
    <p id={`${id}-error`} className="mt-1 font-inter text-[12px] font-medium text-accent-red">
      {error}
    </p>
  );
  const common = { id, "aria-invalid": !!error, "aria-describedby": describedBy, "aria-required": required };

  switch (field.type) {
    case "text":
    case "url":
    case "date":
      return (
        <div>
          {labelEl}
          <input
            {...common}
            type={field.type === "text" ? "text" : field.type}
            value={String(value ?? "")}
            placeholder={field.placeholder}
            maxLength={"maxLength" in field ? field.maxLength : undefined}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClass} ${border}`}
          />
          {helpEl}
          {errorEl}
        </div>
      );

    case "textarea": {
      const text = String(value ?? "");
      return (
        <div>
          {labelEl}
          <textarea
            {...common}
            value={text}
            rows={field.rows ?? 3}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClass} ${border} resize-y`}
          />
          <div className="flex justify-between gap-2">
            <div>
              {helpEl}
              {errorEl}
            </div>
            {field.maxLength && (
              <p className={`mt-1 shrink-0 font-inter text-[12px] tabular-nums ${text.length > field.maxLength ? "text-accent-red" : "text-body/50"}`}>
                {text.length}/{field.maxLength}
              </p>
            )}
          </div>
        </div>
      );
    }

    case "number":
      return (
        <div>
          {labelEl}
          <input
            {...common}
            type="number"
            min={field.min}
            max={field.max}
            value={value === "" || value === undefined ? "" : Number(value)}
            onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
            className={`${inputClass} ${border}`}
          />
          {helpEl}
          {errorEl}
        </div>
      );

    case "select":
      return (
        <div>
          {labelEl}
          <select {...common} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={`${inputClass} ${border}`}>
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {helpEl}
          {errorEl}
        </div>
      );

    case "image":
      return (
        <div>
          <p className="mb-1.5 font-inter text-[13px] font-medium text-body">
            {field.label}
            {required && <span className="text-accent-red"> *</span>}
          </p>
          <ImagePicker
            value={String(value ?? "")}
            onChange={onChange}
            defaultFolder={field.defaultFolder}
            label={field.label}
            error={error}
            help={field.help}
            required={required}
          />
        </div>
      );

    case "imageList": {
      const list = Array.isArray(value) ? (value as string[]) : [];
      const max = field.max ?? 12;
      return (
        <fieldset className="min-w-0">
          <legend className="mb-1.5 font-inter text-[13px] font-medium text-body">
            {field.label} <span className="font-normal text-body/60">({list.length}/{max})</span>
          </legend>
          {field.help && <p className="mb-2 font-inter text-[12px] text-body/60">{field.help}</p>}
          <ol className="space-y-2">
            {list.map((item, i) => (
              // Index keys are fine: the picker re-reads `value` on every render.
              <li key={`${i}-${list.length}`} className="flex gap-2">
                <div className="min-w-0 flex-1">
                  <ImagePicker
                    value={item}
                    onChange={(v) => onChange(list.map((x, j) => (j === i ? v : x)))}
                    defaultFolder={field.defaultFolder}
                    label={`${field.label} ${i + 1}`}
                    compact
                  />
                </div>
                <ListControls
                  index={i}
                  length={list.length}
                  label={`image ${i + 1}`}
                  onMove={(d) => onChange(moveItem(list, i, d))}
                  onRemove={() => onChange(list.filter((_, j) => j !== i))}
                />
              </li>
            ))}
          </ol>
          {list.length < max && (
            <button type="button" className={`${buttonClass.secondary} mt-2`} onClick={() => onChange([...list, ""])}>
              <Plus size={15} aria-hidden /> Add image
            </button>
          )}
          {errorEl}
        </fieldset>
      );
    }

    case "paragraphs": {
      const list = Array.isArray(value) ? (value as string[]) : [];
      return (
        <fieldset className="min-w-0">
          <legend className="mb-1.5 font-inter text-[13px] font-medium text-body">{field.label}</legend>
          {field.help && <p className="mb-2 font-inter text-[12px] text-body/60">{field.help}</p>}
          <ol className="space-y-2">
            {list.map((item, i) => (
              <li key={i} className="flex gap-2">
                <textarea
                  aria-label={`${field.label}, paragraph ${i + 1}`}
                  value={item}
                  rows={3}
                  onChange={(e) => onChange(list.map((x, j) => (j === i ? e.target.value : x)))}
                  className={`${inputClass} border-border resize-y`}
                />
                <ListControls
                  index={i}
                  length={list.length}
                  label={`paragraph ${i + 1}`}
                  onMove={(d) => onChange(moveItem(list, i, d))}
                  onRemove={() => onChange(list.filter((_, j) => j !== i))}
                />
              </li>
            ))}
          </ol>
          <button type="button" className={`${buttonClass.secondary} mt-2`} onClick={() => onChange([...list, ""])}>
            <Plus size={15} aria-hidden /> Add paragraph
          </button>
          {errorEl}
        </fieldset>
      );
    }

    case "repeater": {
      const list = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
      return (
        <fieldset className="min-w-0">
          <legend className="mb-1.5 font-inter text-[13px] font-medium text-body">{field.label}</legend>
          {field.help && <p className="mb-2 font-inter text-[12px] text-body/60">{field.help}</p>}
          <ol className="space-y-3">
            {list.map((item, i) => (
              <li key={i} className="rounded-lg border border-border bg-background/50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-inter text-[13px] font-semibold text-dark">
                    {field.itemLabel} {i + 1}
                  </p>
                  <ListControls
                    index={i}
                    length={list.length}
                    label={`${field.itemLabel.toLowerCase()} ${i + 1}`}
                    onMove={(d) => onChange(moveItem(list, i, d))}
                    onRemove={() => onChange(list.filter((_, j) => j !== i))}
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {field.fields.map((sub) => (
                    <div key={sub.name} className={sub.wide ? "md:col-span-2" : ""}>
                      <FieldRenderer
                        field={sub}
                        value={item[sub.name]}
                        onChange={(v) => onChange(list.map((x, j) => (j === i ? { ...x, [sub.name]: v } : x)))}
                        errors={errors}
                        path={`${path}.${i}.${sub.name}`}
                        active
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <button type="button" className={`${buttonClass.secondary} mt-2`} onClick={() => onChange([...list, emptyRepeaterItem(field)])}>
            <Plus size={15} aria-hidden /> Add {field.itemLabel.toLowerCase()}
          </button>
        </fieldset>
      );
    }
  }
}
