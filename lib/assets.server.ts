/** Lists images under public/assets: live from disk when available, else from the build-time manifest. */
import { promises as fs } from "fs";
import path from "path";
import manifest from "@/content/asset-manifest.json";
import { isImageFile } from "./assets";

const ROOT = path.join(process.cwd(), "public", "assets");

async function walk(dir: string, prefix = ""): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((e) => !e.name.startsWith("."))
      .map(async (entry) => {
        const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) return walk(path.join(dir, entry.name), rel);
        return isImageFile(entry.name) ? [rel] : [];
      }),
  );
  return nested.flat();
}

export async function listAssets(): Promise<{ files: string[]; source: "disk" | "manifest" }> {
  try {
    const files = (await walk(ROOT)).sort();
    return { files, source: "disk" };
  } catch {
    return { files: manifest.files, source: "manifest" };
  }
}
