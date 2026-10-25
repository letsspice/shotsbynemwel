/** Write-side operations used by the admin API. All writes go through validateRecord. */
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { listAssets } from "@/lib/assets.server";
import { allFields, collections, type CollectionDef } from "./collections";
import { readCollection, writeCollection } from "./store";
import type { AnyRecord, CollectionKey } from "./types";
import { validateRecord, type FieldErrors } from "./validate";

export class ValidationError extends Error {
  constructor(public errors: FieldErrors) {
    super("Validation failed");
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Record not found");
  }
}

function refreshSite() {
  // Public pages are statically generated; this makes edits visible without a redeploy.
  revalidatePath("/", "layout");
}

/** Active records may only reference images that exist, so the live site never shows a broken image. */
async function missingImageErrors(def: CollectionDef, data: Record<string, unknown>): Promise<FieldErrors> {
  if (!data.active) return {};
  const { files } = await listAssets();
  const onDisk = new Set(files);
  const errors: FieldErrors = {};
  for (const field of allFields(def)) {
    const value = data[field.name];
    const paths = field.type === "image" ? [value] : field.type === "imageList" ? (value as unknown[]) : [];
    const missing = paths.filter((p): p is string => typeof p === "string" && p !== "" && !onDisk.has(p));
    if (missing.length) errors[field.name] = `${field.label}: ${missing.join(", ")} is not in public/assets`;
  }
  return errors;
}

async function check(def: CollectionDef, input: Record<string, unknown>, records: AnyRecord[], selfId?: string) {
  const slugs = records.filter((r) => r.id !== selfId).map((r) => r.slug);
  const { data, errors } = validateRecord(def, input, slugs);
  Object.assign(errors, await missingImageErrors(def, data));
  if (Object.keys(errors).length) throw new ValidationError(errors);
  return data;
}

export async function createRecord(key: CollectionKey, input: Record<string, unknown>) {
  const def = collections[key];
  const records = (await readCollection(key)) as AnyRecord[];
  const data = await check(def, input, records);
  const now = new Date().toISOString();
  const record = {
    ...data,
    id: randomUUID().slice(0, 8),
    order: records.length,
    createdAt: now,
    updatedAt: now,
  } as unknown as AnyRecord;
  await writeCollection(key, [...records, record] as never);
  refreshSite();
  return record;
}

/** Merges `patch` into the stored record, so toggles can send only the changed field. */
export async function updateRecord(key: CollectionKey, id: string, patch: Record<string, unknown>) {
  const def = collections[key];
  const records = (await readCollection(key)) as AnyRecord[];
  const index = records.findIndex((r) => r.id === id);
  if (index === -1) throw new NotFoundError();
  const existing = records[index];
  const data = await check(def, { ...existing, ...patch }, records, id);
  const updated = {
    ...existing,
    ...data,
    id: existing.id,
    order: existing.order,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  } as AnyRecord;
  const next = [...records];
  next[index] = updated;
  await writeCollection(key, next as never);
  refreshSite();
  return updated;
}

export async function deleteRecord(key: CollectionKey, id: string) {
  const records = (await readCollection(key)) as AnyRecord[];
  if (!records.some((r) => r.id === id)) throw new NotFoundError();
  await writeCollection(key, records.filter((r) => r.id !== id) as never);
  refreshSite();
}

export async function reorderRecords(key: CollectionKey, ids: string[]) {
  const records = (await readCollection(key)) as AnyRecord[];
  const position = new Map(ids.map((id, i) => [id, i]));
  // Records missing from `ids` keep their relative order at the end.
  const next = records
    .map((r, i) => ({ r, rank: position.get(r.id) ?? ids.length + i }))
    .sort((a, b) => a.rank - b.rank)
    .map(({ r }, order) => ({ ...r, order }));
  await writeCollection(key, next as never);
  refreshSite();
  return next;
}
