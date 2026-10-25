"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BookOpen, ExternalLink, FileText, Images, LayoutDashboard, Mountain } from "lucide-react";
import { useAdmin } from "./AdminProvider";

const NAV = [
  { path: "", label: "Dashboard", icon: LayoutDashboard },
  { path: "/expeditions", label: "Expeditions", icon: Mountain },
  { path: "/gallery", label: "Gallery", icon: Images },
  { path: "/trailStories", label: "Trail Notes", icon: BookOpen },
  { path: "/report", label: "Report & export", icon: FileText },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const { href, storeKind, writable } = useAdmin();
  const pathname = usePathname();
  // usePathname returns the public (pre-rewrite) path, so compare against href().
  const isActive = (path: string) => (path === "" ? pathname === href() : pathname.startsWith(href(path)));

  return (
    <div className="min-h-screen bg-background font-manrope text-body lg:grid lg:grid-cols-[248px_1fr] print:block">
      <aside className="no-print border-b border-border bg-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-5 py-4 lg:block lg:px-6 lg:py-7">
          <Link href={href()} className="block">
            <span className="font-serif text-[22px] italic leading-none text-dark">Shots by Nemwel</span>
            <span className="mt-1 block font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">Studio</span>
          </Link>
          <Link href="/" target="_blank" className="flex items-center gap-1.5 font-inter text-[13px] text-body/70 hover:text-primary lg:hidden">
            View site <ExternalLink size={14} aria-hidden />
          </Link>
        </div>

        <nav aria-label="Studio" className="overflow-x-auto px-3 pb-3 lg:px-3">
          <ul className="flex gap-1 lg:flex-col">
            {NAV.map(({ path, label, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href(path)}
                  aria-current={isActive(path) ? "page" : undefined}
                  className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 font-inter text-[14px] text-body/80 transition-colors hover:bg-background aria-[current=page]:bg-primary/10 aria-[current=page]:font-semibold aria-[current=page]:text-primary"
                >
                  <Icon size={18} aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden px-6 lg:absolute lg:bottom-6 lg:block lg:w-[248px]">
          <div className="rounded-lg border border-border bg-background p-3 font-inter text-[12px] leading-[18px] text-body/70">
            <p className="font-semibold text-body">
              Storage: {storeKind === "upstash" ? "Upstash Redis" : "Local JSON files"}
            </p>
            <p>{writable ? "Changes publish immediately." : "Read-only. Connect Upstash to edit."}</p>
          </div>
          <Link href="/" target="_blank" className="mt-3 flex items-center gap-1.5 font-inter text-[13px] text-body/70 hover:text-primary">
            View live site <ExternalLink size={14} aria-hidden />
          </Link>
        </div>
      </aside>

      <main id="main" className="min-w-0 px-5 py-8 md:px-8 lg:px-10 lg:py-10">
        {!writable && (
          <div role="status" className="no-print mb-6 rounded-lg border border-accent-red/40 bg-accent-red/10 px-4 py-3 font-inter text-[14px] text-body">
            Content is read-only in this environment. Set <code>UPSTASH_REDIS_REST_URL</code> and{" "}
            <code>UPSTASH_REDIS_REST_TOKEN</code> to enable editing.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
