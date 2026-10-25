/**
 * Helpers for images that live in /public/assets.
 * Records store paths relative to that folder; the site turns them into URLs at render time,
 * so adding an image is: drop it into public/assets/<folder>/..., then reference it in the admin.
 */

export const ASSET_ROOT = "/assets";

/** Top-level folders always offered in the admin, even before they contain files. */
export const DEFAULT_ASSET_FOLDERS = [
  "footer",
  "gallery",
  "mountainExpeditions",
  "storiesFromTheTrails",
] as const;

export const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"];

const SAFE_PATH = /^[A-Za-z0-9._\- /]+$/;

/** Normalise user input into "folder/sub/file.ext" or "" when invalid. */
export function normalizeAssetPath(input: string): string {
  const cleaned = input
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/?assets\//, "")
    .replace(/^\/+/, "")
    .replace(/\/{2,}/g, "/");
  if (!cleaned || !SAFE_PATH.test(cleaned)) return "";
  if (cleaned.split("/").some((part) => part === ".." || part === ".")) return "";
  return cleaned;
}

export function assetUrl(path: string | undefined | null): string {
  const normalized = normalizeAssetPath(path ?? "");
  return normalized ? `${ASSET_ROOT}/${normalized}` : "";
}

export function splitAssetPath(path: string): { folder: string; rest: string } {
  const normalized = normalizeAssetPath(path);
  const [folder = "", ...rest] = normalized.split("/");
  return { folder, rest: rest.join("/") };
}

export function joinAssetPath(folder: string, rest: string): string {
  return normalizeAssetPath([folder, rest].filter(Boolean).join("/"));
}

export function isImageFile(name: string): boolean {
  const lower = name.toLowerCase();
  return IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext));
}
