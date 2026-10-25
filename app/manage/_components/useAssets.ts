"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_ASSET_FOLDERS } from "@/lib/assets";
import { useAdmin } from "./AdminProvider";

interface AssetState {
  files: string[];
  folders: string[];
  loading: boolean;
  error: string;
  refresh: () => void;
  has: (path: string) => boolean;
}

// Shared across every image field on the page so the list is fetched once.
let cache: string[] | null = null;
let inflight: Promise<string[]> | null = null;

export function useAssets(): AssetState {
  const { api } = useAdmin();
  const [files, setFiles] = useState<string[]>(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState("");

  const load = useCallback(
    async (force = false) => {
      if (cache && !force) return setFiles(cache);
      setLoading(true);
      inflight =
        !force && inflight
          ? inflight
          : api<{ files: string[] }>("/assets").then((res) => {
              if (!res.ok) throw new Error(res.error);
              return res.data.files;
            });
      try {
        cache = await inflight;
        setFiles(cache);
        setError("");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load images");
      } finally {
        inflight = null;
        setLoading(false);
      }
    },
    [api],
  );

  useEffect(() => {
    void load();
  }, [load]);

  const folders = Array.from(new Set([...DEFAULT_ASSET_FOLDERS, ...files.map((f) => f.split("/")[0])])).sort();

  return {
    files,
    folders,
    loading,
    error,
    refresh: () => void load(true),
    has: (path: string) => files.includes(path),
  };
}
