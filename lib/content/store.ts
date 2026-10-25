/**
 * Storage layer (server only). Two adapters behind one interface:
 *
 *  - "upstash": used automatically when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set.
 *    Each collection is one JSON string under `${prefix}:<collection>`. An empty key falls back to the
 *    bundled seed in content/*.json, so connecting Upstash never shows an empty site.
 *  - "file": content/*.json in the repo. Writable in development; read-only in production builds
 *    (serverless filesystems are read-only), where edits require Upstash.
 */
import { promises as fs } from "fs";
import path from "path";
import type { AnyRecord, CollectionKey, CollectionMap } from "./types";
import expeditionsSeed from "@/content/expeditions.json";
import gallerySeed from "@/content/gallery.json";
import trailStoriesSeed from "@/content/trailStories.json";

const seeds: Record<CollectionKey, unknown[]> = {
  expeditions: expeditionsSeed,
  gallery: gallerySeed,
  trailStories: trailStoriesSeed,
};

export type StoreKind = "file" | "upstash";

export interface ContentStore {
  kind: StoreKind;
  writable: boolean;
  read<K extends CollectionKey>(collection: K): Promise<CollectionMap[K][]>;
  write<K extends CollectionKey>(collection: K, records: CollectionMap[K][]): Promise<void>;
}

export class StoreNotWritableError extends Error {
  constructor() {
    super(
      "Content is read-only here. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to edit content in production.",
    );
  }
}

const CONTENT_DIR = path.join(process.cwd(), "content");
const isDev = process.env.NODE_ENV === "development";

const fileStore: ContentStore = {
  kind: "file",
  writable: isDev,
  async read(collection) {
    if (!isDev) return structuredClone(seeds[collection]) as never;
    const raw = await fs.readFile(path.join(CONTENT_DIR, `${collection}.json`), "utf8");
    return JSON.parse(raw);
  },
  async write(collection, records) {
    if (!isDev) throw new StoreNotWritableError();
    const file = path.join(CONTENT_DIR, `${collection}.json`);
    const tmp = `${file}.tmp`;
    await fs.writeFile(tmp, `${JSON.stringify(records, null, 2)}\n`, "utf8");
    await fs.rename(tmp, file);
  },
};

function createUpstashStore(url: string, token: string, prefix: string): ContentStore {
  async function command<T>(args: (string | number)[]): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
      cache: "no-store",
    });
    const body = (await res.json()) as { result?: T; error?: string };
    if (!res.ok || body.error) throw new Error(`Upstash ${args[0]} failed: ${body.error ?? res.status}`);
    return body.result as T;
  }

  return {
    kind: "upstash",
    writable: true,
    async read(collection) {
      const value = await command<string | null>(["GET", `${prefix}:${collection}`]);
      if (!value) return structuredClone(seeds[collection]) as never;
      return JSON.parse(value);
    },
    async write(collection, records) {
      await command(["SET", `${prefix}:${collection}`, JSON.stringify(records)]);
    },
  };
}

let cached: ContentStore | null = null;

export function getStore(): ContentStore {
  if (cached) return cached;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  cached = url && token ? createUpstashStore(url, token, process.env.CONTENT_KEY_PREFIX || "sbn:content") : fileStore;
  return cached;
}

export async function readCollection<K extends CollectionKey>(collection: K): Promise<CollectionMap[K][]> {
  const records = await getStore().read(collection);
  return [...records].sort((a, b) => a.order - b.order);
}

export async function writeCollection<K extends CollectionKey>(collection: K, records: CollectionMap[K][]) {
  const normalized = [...records]
    .sort((a, b) => a.order - b.order)
    .map((record, index) => ({ ...record, order: index })) as AnyRecord[];
  await getStore().write(collection, normalized as CollectionMap[K][]);
}
