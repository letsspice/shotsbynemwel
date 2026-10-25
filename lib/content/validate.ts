/**
 * Schema-driven validation and sanitisation. Shared by the admin form (instant feedback)
 * and the API (source of truth), so both always agree.
 */
import { normalizeAssetPath } from "@/lib/assets";
import { allFields, SLUG_PATTERN, slugify, type CollectionDef, type FieldDef } from "./collections";

export type FieldErrors = Record<string, string>;

export interface ValidationResult {
  data: Record<string, unknown>;
  errors: FieldErrors;
}

const URL_PATTERN = /^https?:\/\/[^\s]+$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function sanitizeValue(field: FieldDef, raw: unknown): unknown {
  switch (field.type) {
    case "number": {
      const n = typeof raw === "number" ? raw : Number(raw);
      return Number.isFinite(n) ? Math.round(n) : field.min;
    }
    case "select": {
      const value = String(raw ?? "");
      return field.options.some((o) => o.value === value) ? value : field.options[0]?.value ?? "";
    }
    case "image":
      return normalizeAssetPath(String(raw ?? ""));
    case "imageList":
      return (Array.isArray(raw) ? raw : [])
        .map((v) => normalizeAssetPath(String(v ?? "")))
        .filter(Boolean)
        .slice(0, field.max ?? 12);
    case "paragraphs":
      return (Array.isArray(raw) ? raw : []).map((v) => String(v ?? "").trim()).filter(Boolean);
    case "repeater":
      return (Array.isArray(raw) ? raw : []).map((item) => {
        const source = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
        return Object.fromEntries(field.fields.map((f) => [f.name, sanitizeValue(f, source[f.name])]));
      });
    default:
      return String(raw ?? "").trim();
  }
}

function isEmpty(value: unknown): boolean {
  if (Array.isArray(value)) return value.length === 0;
  return value === "" || value === null || value === undefined;
}

function validateField(field: FieldDef, value: unknown, active: boolean, path: string, errors: FieldErrors) {
  const required = field.required || (field.requiredWhenActive && active);
  if (required && isEmpty(value)) {
    errors[path] = field.requiredWhenActive && !field.required ? `${field.label} is required for active records` : `${field.label} is required`;
    return;
  }
  if (isEmpty(value)) return;

  switch (field.type) {
    case "text":
    case "textarea":
      if (field.maxLength && String(value).length > field.maxLength) {
        errors[path] = `${field.label} must be ${field.maxLength} characters or fewer`;
      }
      break;
    case "url":
      if (!URL_PATTERN.test(String(value))) errors[path] = `${field.label} must start with http:// or https://`;
      break;
    case "date":
      if (!DATE_PATTERN.test(String(value))) errors[path] = `${field.label} must be a date`;
      break;
    case "number": {
      const n = value as number;
      if (n < field.min || n > field.max) errors[path] = `${field.label} must be between ${field.min} and ${field.max}`;
      break;
    }
    case "repeater":
      (value as Record<string, unknown>[]).forEach((item, index) => {
        for (const sub of field.fields) validateField(sub, item[sub.name], true, `${path}.${index}.${sub.name}`, errors);
      });
      break;
  }
}

/**
 * Returns a clean record (unknown keys dropped, types coerced) plus any field errors.
 * `existingSlugs` should exclude the record being edited.
 */
export function validateRecord(
  def: CollectionDef,
  input: Record<string, unknown>,
  existingSlugs: string[] = [],
): ValidationResult {
  const errors: FieldErrors = {};
  const active = Boolean(input.active);
  const data: Record<string, unknown> = {
    active,
    featured: Boolean(input.featured),
  };

  for (const field of allFields(def)) {
    const value = sanitizeValue(field, input[field.name]);
    data[field.name] = value;
    validateField(field, value, active, field.name, errors);
  }

  const title = String(data[def.titleField] ?? "");
  const slug = slugify(String(input.slug ?? "")) || slugify(title);
  data.slug = slug;
  if (!slug) errors.slug = "Slug is required";
  else if (!SLUG_PATTERN.test(slug)) errors.slug = "Use lowercase letters, numbers and dashes";
  else if (existingSlugs.includes(slug)) errors.slug = "Another record already uses this slug";

  return { data, errors };
}
