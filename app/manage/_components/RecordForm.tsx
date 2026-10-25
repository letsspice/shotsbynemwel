"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Save } from "lucide-react";
import { collections, slugify } from "@/lib/content/collections";
import type { CollectionKey } from "@/lib/content/types";
import { validateRecord, type FieldErrors } from "@/lib/content/validate";
import { useAdmin } from "./AdminProvider";
import AdminLink from "./AdminLink";
import FieldRenderer from "./fields/FieldRenderer";
import Toggle from "./Toggle";
import { buttonClass } from "./ui";

interface RecordFormProps {
  collection: CollectionKey;
  /** Undefined when creating. */
  recordId?: string;
  initial: Record<string, unknown>;
  otherSlugs: string[];
}

export default function RecordForm({ collection, recordId, initial, otherSlugs }: RecordFormProps) {
  const def = collections[collection];
  const { api, href, writable } = useAdmin();
  const router = useRouter();
  const justCreated = useSearchParams().get("created") === "1";
  const [values, setValues] = useState<Record<string, unknown>>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(
    justCreated ? { tone: "ok", text: `${def.singular} created.` } : null,
  );
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial.slug));
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const summaryRef = useRef<HTMLDivElement>(null);

  const dirty = useMemo(() => JSON.stringify(values) !== saved, [values, saved]);
  const active = Boolean(values.active);
  const title = String(values[def.titleField] ?? "");
  const publicPath = recordId && initial.active ? def.publicPath({ slug: String(initial.slug) }) : null;

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  function set(name: string, value: unknown) {
    setValues((v) => {
      const next = { ...v, [name]: value };
      // Keep the slug following the title until it's edited by hand.
      if (name === def.titleField && !slugTouched) next.slug = slugify(String(value));
      return next;
    });
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    const check = validateRecord(def, values, otherSlugs);
    if (Object.keys(check.errors).length) {
      setErrors(check.errors);
      setMessage({ tone: "error", text: `Please fix ${Object.keys(check.errors).length} field${Object.keys(check.errors).length > 1 ? "s" : ""} below.` });
      summaryRef.current?.focus();
      return;
    }

    setSaving(true);
    const res = recordId
      ? await api<{ record: Record<string, unknown> }>(`/${collection}/${recordId}`, { method: "PATCH", body: JSON.stringify(check.data) })
      : await api<{ record: Record<string, unknown> }>(`/${collection}`, { method: "POST", body: JSON.stringify(check.data) });
    setSaving(false);

    if (!res.ok) {
      setErrors(res.fields ?? {});
      setMessage({ tone: "error", text: res.error });
      summaryRef.current?.focus();
      return;
    }

    setSaved(JSON.stringify(values));
    if (!recordId) {
      // Swap to the edit URL so further saves update the new record.
      router.replace(href(`/${collection}/${String(res.data.record.id)}?created=1`));
      router.refresh();
      return;
    }
    setValues(res.data.record);
    setSaved(JSON.stringify(res.data.record));
    setErrors({});
    setMessage({ tone: "ok", text: `Saved. ${res.data.record.active ? "Changes are live on the site." : "This record is inactive, so it stays hidden."}` });
    router.refresh();
  }

  const errorList = Object.entries(errors);

  return (
    <form onSubmit={onSubmit} noValidate className="pb-24">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <AdminLink path={`/${collection}`} className="link">
            <span className="inline-flex items-center gap-1.5">
              <ArrowLeft size={14} aria-hidden /> {def.label}
            </span>
          </AdminLink>
          <h1 className="mt-2 font-manrope text-[26px] font-bold leading-[34px] tracking-[-0.0128em] text-dark md:text-[30px]">
            {recordId ? title || "Untitled" : `New ${def.singular.toLowerCase()}`}
          </h1>
        </div>
        {publicPath && (
          <a href={publicPath} target="_blank" rel="noreferrer" className={buttonClass.secondary}>
            View on site <ExternalLink size={15} aria-hidden />
          </a>
        )}
      </div>

      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="outline-none">
        {message && (
          <div className={`mb-6 rounded-lg px-4 py-3 font-inter text-[14px] ${message.tone === "ok" ? "bg-primary/10 text-primary" : "bg-accent-red/10 text-accent-red"}`}>
            <p className="font-medium">{message.text}</p>
            {message.tone === "error" && errorList.length > 0 && (
              <ul className="mt-1 list-disc pl-5 text-[13px]">
                {errorList.slice(0, 8).map(([path, text]) => (
                  <li key={path}>{text}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {def.groups.map((group) => (
            <section key={group.title} className="rounded-xl border border-border bg-white p-5 md:p-6">
              <h2 className="font-manrope text-[17px] font-bold text-dark">{group.title}</h2>
              {group.description && <p className="mt-1 font-inter text-[13px] text-body/60">{group.description}</p>}
              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {group.fields.map((field) => (
                  <div key={field.name} className={field.wide ? "md:col-span-2" : ""}>
                    <FieldRenderer field={field} value={values[field.name]} onChange={(v) => set(field.name, v)} errors={errors} path={field.name} active={active} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <section className="rounded-xl border border-border bg-white p-5">
            <h2 className="mb-4 font-manrope text-[17px] font-bold text-dark">Publishing</h2>
            <div className="space-y-4">
              <div>
                <Toggle label="Active (visible on site)" checked={active} onChange={(v) => set("active", v)} />
                <p className="mt-1 pl-12 font-inter text-[12px] text-body/60">Inactive records are saved but never shown.</p>
              </div>
              <div>
                <Toggle label="Featured on homepage" checked={Boolean(values.featured)} onChange={(v) => set("featured", v)} />
                {def.featuredLimit && <p className="mt-1 pl-12 font-inter text-[12px] text-body/60">Homepage shows up to {def.featuredLimit}.</p>}
              </div>
              <div>
                <label htmlFor="slug" className="mb-1.5 block font-inter text-[13px] font-medium text-body">
                  URL slug
                </label>
                <input
                  id="slug"
                  value={String(values.slug ?? "")}
                  onChange={(e) => {
                    setSlugTouched(true);
                    set("slug", e.target.value);
                  }}
                  onBlur={(e) => set("slug", slugify(e.target.value))}
                  aria-invalid={!!errors.slug}
                  aria-describedby="slug-help"
                  className={`w-full rounded-md border bg-white px-3 py-2 font-mono text-[13px] outline-none focus:border-primary ${errors.slug ? "border-accent-red" : "border-border"}`}
                />
                <p id="slug-help" className={`mt-1 font-inter text-[12px] ${errors.slug ? "font-medium text-accent-red" : "text-body/60"}`}>
                  {errors.slug ?? (def.publicPath({ slug: String(values.slug || "…") }) || "Used as an anchor on the gallery page.")}
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <div className="no-print fixed inset-x-0 bottom-0 z-20 border-t border-border bg-white/95 px-5 py-3 backdrop-blur lg:left-[248px]">
        <div className="flex items-center justify-end gap-3">
          <p className="mr-auto font-inter text-[13px] text-body/60" aria-live="polite">
            {dirty ? "Unsaved changes" : "All changes saved"}
          </p>
          <AdminLink path={`/${collection}`} className="secondary">
            Cancel
          </AdminLink>
          <button type="submit" className={buttonClass.primary} disabled={saving || !writable}>
            <Save size={16} aria-hidden /> {saving ? "Saving…" : recordId ? "Save changes" : `Create ${def.singular.toLowerCase()}`}
          </button>
        </div>
      </div>
    </form>
  );
}
