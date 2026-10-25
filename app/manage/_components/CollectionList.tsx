"use client";

import { useMemo, useState, type DragEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowDown, ArrowUp, ExternalLink, GripVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { collections } from "@/lib/content/collections";
import type { CollectionKey } from "@/lib/content/types";
import { assetUrl } from "@/lib/assets";
import { useAdmin } from "./AdminProvider";
import AdminLink from "./AdminLink";
import Toggle from "./Toggle";
import { buttonClass, PageTitle } from "./ui";

export interface ListRow {
  id: string;
  slug: string;
  title: string;
  image: string;
  active: boolean;
  featured: boolean;
  updatedAt: string;
  missingImages: number;
  publicPath: string | null;
}

type Filter = "all" | "active" | "inactive" | "featured";

export default function CollectionList({ collection, rows: initialRows }: { collection: CollectionKey; rows: ListRow[] }) {
  const def = collections[collection];
  const { api, href, writable } = useAdmin();
  const router = useRouter();
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Reordering is only meaningful on the full, unfiltered list.
  const canReorder = writable && filter === "all" && !query;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === "active" && !r.active) return false;
      if (filter === "inactive" && r.active) return false;
      if (filter === "featured" && !r.featured) return false;
      return !q || r.title.toLowerCase().includes(q) || r.slug.includes(q);
    });
  }, [rows, filter, query]);

  const featuredActive = rows.filter((r) => r.active && r.featured).length;

  async function patch(id: string, change: Partial<Pick<ListRow, "active" | "featured">>) {
    const previous = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...change } : r)));
    const res = await api(`/${collection}/${id}`, { method: "PATCH", body: JSON.stringify(change) });
    if (!res.ok) {
      setRows(previous);
      const fieldMessage = res.fields ? Object.values(res.fields)[0] : "";
      setStatus({ tone: "error", text: fieldMessage ? `${res.error}: ${fieldMessage}. Edit the record to fix it.` : res.error });
      return;
    }
    const title = rows.find((r) => r.id === id)?.title;
    const what = "active" in change ? (change.active ? "is now live" : "is now hidden") : change.featured ? "is featured" : "is no longer featured";
    setStatus({ tone: "ok", text: `${title} ${what}.` });
    router.refresh();
  }

  async function saveOrder(next: ListRow[]) {
    const previous = rows;
    setRows(next);
    const res = await api(`/${collection}/reorder`, { method: "POST", body: JSON.stringify({ ids: next.map((r) => r.id) }) });
    if (!res.ok) {
      setRows(previous);
      setStatus({ tone: "error", text: res.error });
    } else {
      setStatus({ tone: "ok", text: "Order saved." });
    }
  }

  function move(id: string, delta: number) {
    const index = rows.findIndex((r) => r.id === id);
    const target = index + delta;
    if (index < 0 || target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    void saveOrder(next);
  }

  function onDrop(e: DragEvent, targetId: string) {
    e.preventDefault();
    if (!dragId || dragId === targetId) return setDragId(null);
    const next = [...rows];
    const from = next.findIndex((r) => r.id === dragId);
    const [moved] = next.splice(from, 1);
    next.splice(next.findIndex((r) => r.id === targetId), 0, moved);
    setDragId(null);
    void saveOrder(next);
  }

  async function remove(id: string) {
    setBusy(true);
    const res = await api(`/${collection}/${id}`, { method: "DELETE" });
    setBusy(false);
    setConfirmDelete(null);
    if (!res.ok) return setStatus({ tone: "error", text: res.error });
    const title = rows.find((r) => r.id === id)?.title;
    setRows((rs) => rs.filter((r) => r.id !== id));
    setStatus({ tone: "ok", text: `${title} was deleted.` });
    router.refresh();
  }

  return (
    <>
      <PageTitle
        title={def.label}
        description={def.description}
        actions={
          writable && (
            <AdminLink path={`/${collection}/new`} className="primary">
              <Plus size={16} aria-hidden /> New {def.singular.toLowerCase()}
            </AdminLink>
          )
        }
      />

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter records" className="flex flex-wrap gap-1 rounded-lg border border-border bg-white p-1">
          {(["all", "active", "inactive", "featured"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className="rounded-md px-3 py-1.5 font-inter text-[13px] capitalize text-body/70 aria-pressed:bg-primary aria-pressed:text-offwhite"
            >
              {f}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Search {def.label.toLowerCase()}</span>
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-body/50" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or slug"
            className="w-full rounded-lg border border-border bg-white py-2 pl-9 pr-3 font-inter text-[14px] outline-none focus:border-primary"
          />
        </label>
      </div>

      <div aria-live="polite" className="min-h-[1px]">
        {status && (
          <p className={`mb-4 rounded-lg px-4 py-2.5 font-inter text-[14px] ${status.tone === "ok" ? "bg-primary/10 text-primary" : "bg-accent-red/10 text-accent-red"}`}>
            {status.text}
          </p>
        )}
      </div>

      {def.featuredLimit && (
        <p className="mb-3 font-inter text-[13px] text-body/60">
          {featuredActive} of {def.featuredLimit} homepage slots used by active featured records.
          {featuredActive > def.featuredLimit && " Only the first ones by order are shown."}
          {canReorder ? " Drag rows or use the arrows to change the order." : writable ? " Clear filters to reorder." : ""}
        </p>
      )}

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-white p-10 text-center font-inter text-[14px] text-body/70">No records match.</div>
      ) : (
        <ol className="overflow-hidden rounded-xl border border-border bg-white">
          {visible.map((row) => {
            const index = rows.findIndex((r) => r.id === row.id);
            return (
              <li
                key={row.id}
                draggable={canReorder}
                onDragStart={() => setDragId(row.id)}
                onDragOver={(e) => canReorder && e.preventDefault()}
                onDrop={(e) => onDrop(e, row.id)}
                onDragEnd={() => setDragId(null)}
                className={`flex flex-wrap items-center gap-3 border-b border-border px-3 py-3 last:border-b-0 md:flex-nowrap md:px-4 ${
                  dragId === row.id ? "opacity-40" : ""
                } ${row.active ? "" : "bg-background/60"}`}
              >
                {canReorder && (
                  <div className="flex items-center gap-0.5">
                    <GripVertical size={18} className="hidden cursor-grab text-body/40 md:block" aria-hidden />
                    <div className="flex flex-col">
                      <button type="button" className={`${buttonClass.icon} h-6 w-7`} disabled={index === 0} onClick={() => move(row.id, -1)} aria-label={`Move ${row.title} up`}>
                        <ArrowUp size={14} aria-hidden />
                      </button>
                      <button
                        type="button"
                        className={`${buttonClass.icon} h-6 w-7`}
                        disabled={index === rows.length - 1}
                        onClick={() => move(row.id, 1)}
                        aria-label={`Move ${row.title} down`}
                      >
                        <ArrowDown size={14} aria-hidden />
                      </button>
                    </div>
                  </div>
                )}

                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-border">
                  {row.image && (
                    // Plain <img> so missing files degrade to the grey box instead of erroring.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={assetUrl(row.image)} alt="" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.visibility = "hidden")} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <AdminLink path={`/${collection}/${row.id}`} className="link">
                    {row.title}
                  </AdminLink>
                  <p className="truncate font-mono text-[12px] text-body/60">/{row.slug}</p>
                  {row.missingImages > 0 && (
                    <p className="mt-0.5 flex items-center gap-1 font-inter text-[12px] text-accent-red">
                      <AlertTriangle size={12} aria-hidden /> {row.missingImages} missing image{row.missingImages > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
                  <Toggle label="Active" checked={row.active} disabled={!writable} onChange={(v) => patch(row.id, { active: v })} />
                  <Toggle label="Featured" checked={row.featured} disabled={!writable} onChange={(v) => patch(row.id, { featured: v })} />
                  <div className="flex items-center">
                    <Link href={href(`/${collection}/${row.id}`)} className={buttonClass.icon} aria-label={`Edit ${row.title}`}>
                      <Pencil size={16} aria-hidden />
                    </Link>
                    {row.publicPath && row.active && (
                      <a href={row.publicPath} target="_blank" rel="noreferrer" className={buttonClass.icon} aria-label={`View ${row.title} on the site (opens in a new tab)`}>
                        <ExternalLink size={16} aria-hidden />
                      </a>
                    )}
                    {writable && (
                      <button type="button" className={buttonClass.icon} onClick={() => setConfirmDelete(row.id)} aria-label={`Delete ${row.title}`}>
                        <Trash2 size={16} aria-hidden />
                      </button>
                    )}
                  </div>
                </div>

                {confirmDelete === row.id && (
                  <div role="alertdialog" aria-label={`Delete ${row.title}?`} className="flex w-full flex-wrap items-center gap-3 rounded-lg bg-accent-red/10 px-3 py-2.5">
                    <p className="flex-1 font-inter text-[13px] text-body">
                      Delete <strong>{row.title}</strong> permanently? To hide it instead, switch Active off.
                    </p>
                    <button type="button" className={buttonClass.secondary} onClick={() => setConfirmDelete(null)} autoFocus>
                      Cancel
                    </button>
                    <button type="button" className={buttonClass.danger} disabled={busy} onClick={() => remove(row.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}
