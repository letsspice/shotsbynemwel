import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { ADMIN_BASE_HEADER, ADMIN_INTERNAL_BASE } from "@/lib/admin";
import { getStore } from "@/lib/content/store";
import { AdminProvider } from "./_components/AdminProvider";
import AdminShell from "./_components/AdminShell";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const dynamic = "force-dynamic";

export default async function ManageLayout({ children }: { children: ReactNode }) {
  const base = (await headers()).get(ADMIN_BASE_HEADER) ?? ADMIN_INTERNAL_BASE;
  const store = getStore();
  return (
    <AdminProvider base={base} storeKind={store.kind} writable={store.writable}>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
