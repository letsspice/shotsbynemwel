/** Read-side helpers for public pages: only active records, in admin-defined order. */
import { readCollection } from "./store";
import type { CollectionKey, CollectionMap } from "./types";

export async function getPublished<K extends CollectionKey>(collection: K): Promise<CollectionMap[K][]> {
  const records = await readCollection(collection);
  return records.filter((r) => r.active);
}

export async function getFeatured<K extends CollectionKey>(collection: K, limit: number): Promise<CollectionMap[K][]> {
  const published = await getPublished(collection);
  const featured = published.filter((r) => r.featured);
  // Fall back to the first published records so a section never renders empty.
  return (featured.length ? featured : published).slice(0, limit);
}

export async function getPublishedBySlug<K extends CollectionKey>(
  collection: K,
  slug: string,
): Promise<CollectionMap[K] | undefined> {
  const published = await getPublished(collection);
  return published.find((r) => r.slug === slug);
}
