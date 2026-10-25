"use client";

import { useId, useMemo, useState } from "react";
import { CheckCircle2, FolderOpen, RefreshCw, TriangleAlert, X } from "lucide-react";
import { ASSET_ROOT, assetUrl, joinAssetPath, splitAssetPath } from "@/lib/assets";
import { useAssets } from "../useAssets";
import { buttonClass } from "../ui";

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
  defaultFolder: string;
  label: string;
  error?: string;
  help?: string;
  required?: boolean;
  compact?: boolean;
}

/**
 * Image path input: base folder dropdown + the rest of the path (typed or browsed).
 * Only the path relative to public/assets is stored, e.g. "mountainExpeditions/mtsatima/summit.png".
 */
export default function ImagePicker({ value, onChange, defaultFolder, label, error, help, required, compact }: ImagePickerProps) {
  const id = useId();
  const { files, folders, loading, refresh, has, error: loadError } = useAssets();
  const [state, setState] = useState(() => {
    const parsed = splitAssetPath(value);
    return { folder: parsed.folder || defaultFolder, rest: parsed.rest, emitted: value };
  });
  // Resync when the value changes from outside (e.g. list items reordered or removed).
  if (value !== state.emitted) {
    const parsed = splitAssetPath(value);
    setState({ folder: parsed.folder || state.folder, rest: parsed.rest, emitted: value });
  }
  const { folder, rest } = state;
  const [browsing, setBrowsing] = useState(false);
  const [filter, setFilter] = useState("");

  const inFolder = useMemo(() => files.filter((f) => f.startsWith(`${folder}/`)).map((f) => f.slice(folder.length + 1)), [files, folder]);
  const browseList = inFolder.filter((f) => !filter || f.toLowerCase().includes(filter.toLowerCase()));

  const full = rest ? joinAssetPath(folder, rest) : "";
  const exists = full ? has(full) : false;
  const invalid = rest.trim() !== "" && !full;

  function update(nextFolder: string, nextRest: string) {
    const emitted = nextRest.trim() ? joinAssetPath(nextFolder, nextRest) : "";
    setState({ folder: nextFolder, rest: nextRest, emitted });
    onChange(emitted);
  }

  const describedBy = [error && `${id}-error`, help && `${id}-help`, `${id}-status`].filter(Boolean).join(" ");

  return (
    <div className="rounded-lg border border-border bg-background/50 p-3">
      <div className={`flex gap-3 ${compact ? "items-center" : "flex-col sm:flex-row"}`}>
        <div className="relative h-[72px] w-[96px] shrink-0 overflow-hidden rounded-md border border-border bg-white">
          {full && exists ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={assetUrl(full)} alt={`Preview of ${label}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center px-2 text-center font-inter text-[11px] text-body/50">{full ? "Not found" : "No image"}</div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor={`${id}-folder`}>
              {label}: base folder
            </label>
            <select
              id={`${id}-folder`}
              value={folder}
              onChange={(e) => update(e.target.value, rest)}
              className="rounded-md border border-border bg-white px-2.5 py-2 font-mono text-[13px] outline-none focus:border-primary sm:w-[200px]"
            >
              {folders.map((f) => (
                <option key={f} value={f}>
                  {ASSET_ROOT}/{f}/
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor={id}>
              {label}: path inside the folder
            </label>
            <input
              id={id}
              list={`${id}-list`}
              value={rest}
              onChange={(e) => update(folder, e.target.value)}
              placeholder="sub-folder/image-name.png"
              aria-invalid={!!error}
              aria-required={required}
              aria-describedby={describedBy}
              className={`min-w-0 flex-1 rounded-md border bg-white px-2.5 py-2 font-mono text-[13px] outline-none focus:border-primary ${error ? "border-accent-red" : "border-border"}`}
            />
            <datalist id={`${id}-list`}>
              {inFolder.map((f) => (
                <option key={f} value={f} />
              ))}
            </datalist>
            <button type="button" className={buttonClass.secondary} onClick={() => setBrowsing((b) => !b)} aria-expanded={browsing} aria-controls={`${id}-browser`}>
              <FolderOpen size={16} aria-hidden /> Browse
            </button>
          </div>

          <p id={`${id}-status`} className="flex flex-wrap items-center gap-x-2 font-inter text-[12px]">
            {invalid ? (
              <span className="flex items-center gap-1 text-accent-red">
                <TriangleAlert size={13} aria-hidden /> Use letters, numbers, spaces, dashes, dots, underscores and “/” only.
              </span>
            ) : !full ? (
              <span className="text-body/60">Pick a folder, then type or browse the file name.</span>
            ) : loading ? (
              <span className="text-body/60">Checking…</span>
            ) : exists ? (
              <span className="flex items-center gap-1 text-primary">
                <CheckCircle2 size={13} aria-hidden /> Found
              </span>
            ) : (
              <span className="flex items-center gap-1 text-accent-red">
                <TriangleAlert size={13} aria-hidden /> Not in public/assets yet. Add the file, then refresh.
              </span>
            )}
            {full && <code className="truncate text-body/60">{assetUrl(full)}</code>}
          </p>
          {help && (
            <p id={`${id}-help`} className="font-inter text-[12px] text-body/60">
              {help}
            </p>
          )}
          {error && (
            <p id={`${id}-error`} className="font-inter text-[12px] font-medium text-accent-red">
              {error}
            </p>
          )}
        </div>
      </div>

      {browsing && (
        <div id={`${id}-browser`} className="mt-3 rounded-md border border-border bg-white p-3">
          <div className="mb-3 flex items-center gap-2">
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={`Filter ${folder}/`}
              aria-label="Filter images"
              className="min-w-0 flex-1 rounded-md border border-border px-2.5 py-1.5 font-inter text-[13px] outline-none focus:border-primary"
            />
            <button type="button" className={buttonClass.icon} onClick={refresh} aria-label="Refresh image list" title="Refresh after adding files">
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} aria-hidden />
            </button>
            <button type="button" className={buttonClass.icon} onClick={() => setBrowsing(false)} aria-label="Close image browser">
              <X size={16} aria-hidden />
            </button>
          </div>
          {loadError && <p className="mb-2 font-inter text-[12px] text-accent-red">{loadError}</p>}
          {browseList.length === 0 ? (
            <p className="py-4 text-center font-inter text-[13px] text-body/60">
              No images in {ASSET_ROOT}/{folder}/ yet. Add files there, then press refresh.
            </p>
          ) : (
            <ul className="grid max-h-[320px] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
              {browseList.map((f) => {
                const selected = f === rest;
                return (
                  <li key={f}>
                    <button
                      type="button"
                      onClick={() => {
                        update(folder, f);
                        setBrowsing(false);
                      }}
                      aria-pressed={selected}
                      className={`w-full overflow-hidden rounded-md border text-left transition-colors hover:border-primary ${selected ? "border-primary ring-2 ring-primary/30" : "border-border"}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={assetUrl(joinAssetPath(folder, f))} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
                      <span className="block truncate px-2 py-1 font-mono text-[11px] text-body/70" title={f}>
                        {f}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
