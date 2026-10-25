/** Aggregates for the admin dashboard and PDF report (server only). */
import { listAssets } from "@/lib/assets.server";
import { collectionKeys, collections, recordImages, recordTitle } from "./collections";
import { getStore, readCollection } from "./store";
import type { AnyRecord, CollectionKey } from "./types";

export interface CollectionStats {
  key: CollectionKey;
  label: string;
  total: number;
  active: number;
  inactive: number;
  featured: number;
  featuredLimit?: number;
}

export interface MissingImage {
  collection: CollectionKey;
  id: string;
  title: string;
  path: string;
  active: boolean;
}

export interface ContentMetrics {
  generatedAt: string;
  store: { kind: "file" | "upstash"; writable: boolean };
  collections: CollectionStats[];
  totals: { records: number; active: number; inactive: number; featured: number };
  assets: {
    onDisk: number;
    source: "disk" | "manifest";
    referenced: number;
    missing: MissingImage[];
    unused: string[];
    byFolder: { folder: string; count: number }[];
  };
  recent: { collection: CollectionKey; id: string; title: string; updatedAt: string; active: boolean }[];
  records: Record<CollectionKey, AnyRecord[]>;
}

export async function getContentMetrics(): Promise<ContentMetrics> {
  const store = getStore();
  const [assetList, ...lists] = await Promise.all([listAssets(), ...collectionKeys.map((k) => readCollection(k))]);
  const records = Object.fromEntries(collectionKeys.map((k, i) => [k, lists[i] as AnyRecord[]])) as Record<CollectionKey, AnyRecord[]>;
  const onDisk = new Set(assetList.files);

  const stats: CollectionStats[] = collectionKeys.map((key) => {
    const list = records[key];
    const active = list.filter((r) => r.active).length;
    return {
      key,
      label: collections[key].label,
      total: list.length,
      active,
      inactive: list.length - active,
      featured: list.filter((r) => r.active && r.featured).length,
      featuredLimit: collections[key].featuredLimit,
    };
  });

  const referenced = new Set<string>();
  const missing: MissingImage[] = [];
  for (const key of collectionKeys) {
    const def = collections[key];
    for (const record of records[key]) {
      for (const path of recordImages(def, record)) {
        referenced.add(path);
        if (!onDisk.has(path)) missing.push({ collection: key, id: record.id, title: recordTitle(def, record), path, active: record.active });
      }
    }
  }

  const folderCounts = new Map<string, number>();
  for (const file of assetList.files) {
    const folder = file.split("/")[0];
    folderCounts.set(folder, (folderCounts.get(folder) ?? 0) + 1);
  }

  const recent = collectionKeys
    .flatMap((key) =>
      records[key].map((r) => ({ collection: key, id: r.id, title: recordTitle(collections[key], r), updatedAt: r.updatedAt, active: r.active })),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 6);

  return {
    generatedAt: new Date().toISOString(),
    store: { kind: store.kind, writable: store.writable },
    collections: stats,
    totals: {
      records: stats.reduce((n, s) => n + s.total, 0),
      active: stats.reduce((n, s) => n + s.active, 0),
      inactive: stats.reduce((n, s) => n + s.inactive, 0),
      featured: stats.reduce((n, s) => n + s.featured, 0),
    },
    assets: {
      onDisk: assetList.files.length,
      source: assetList.source,
      referenced: referenced.size,
      missing,
      unused: assetList.files.filter((f) => !referenced.has(f) && !f.startsWith("footer/")),
      byFolder: [...folderCounts.entries()].map(([folder, count]) => ({ folder, count })).sort((a, b) => b.count - a.count),
    },
    recent,
    records,
  };
}
