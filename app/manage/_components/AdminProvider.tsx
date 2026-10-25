"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

interface AdminContextValue {
  /** Public base path of the admin: "/manage" in dev, "/<ADMIN_SLUG>" when a slug is configured. */
  base: string;
  storeKind: "file" | "upstash";
  writable: boolean;
  href: (path?: string) => string;
  api: <T = unknown>(path: string, init?: RequestInit) => Promise<ApiResult<T>>;
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string; fields?: Record<string, string> };

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({
  base,
  storeKind,
  writable,
  children,
}: {
  base: string;
  storeKind: "file" | "upstash";
  writable: boolean;
  children: ReactNode;
}) {
  // The hidden slug doubles as the API key, so only someone who has the URL can write.
  const apiKey = base === "/manage" ? "" : base.slice(1);

  const href = useCallback((path = "") => `${base}${path ? (path.startsWith("/") ? path : `/${path}`) : ""}`, [base]);

  const api = useCallback(
    async function <T>(path: string, init: RequestInit = {}): Promise<ApiResult<T>> {
      try {
        const res = await fetch(`/api/manage${path}`, {
          ...init,
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-admin-key": apiKey } : {}),
            ...init.headers,
          },
          cache: "no-store",
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) return { ok: false, status: res.status, error: body.error ?? `Request failed (${res.status})`, fields: body.fields };
        return { ok: true, data: body as T };
      } catch {
        return { ok: false, status: 0, error: "Network error. Is the dev server running?" };
      }
    },
    [apiKey],
  );

  const value = useMemo(() => ({ base, storeKind, writable, href, api }), [base, storeKind, writable, href, api]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside <AdminProvider>");
  return ctx;
}
