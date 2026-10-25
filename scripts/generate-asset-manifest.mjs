// Writes content/asset-manifest.json: every image under public/assets, relative to that folder.
// Runs before `dev` and `build` so the admin can list images even where the filesystem is unavailable.
import { promises as fs } from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "public", "assets");
const OUT = path.join(process.cwd(), "content", "asset-manifest.json");
const IMAGE = /\.(png|jpe?g|webp|avif|gif|svg)$/i;

async function walk(dir, prefix = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const results = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) results.push(...(await walk(path.join(dir, entry.name), rel)));
    else if (IMAGE.test(entry.name)) results.push(rel);
  }
  return results;
}

const files = (await walk(ROOT)).sort();
await fs.writeFile(OUT, `${JSON.stringify({ files }, null, 2)}\n`);
console.log(`asset manifest: ${files.length} images`);
