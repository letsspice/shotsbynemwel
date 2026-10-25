"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE_NAME } from "@/lib/site";

/** Transparent header that sits on top of every page hero. */
export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!isMenuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const isCurrent = (href: string) => href !== "/#about" && !href.startsWith("#") && pathname.startsWith(href);

  return (
    <nav aria-label="Main" className="site-gutter relative z-30 flex items-center justify-between py-6 md:py-8">
      <Link href="/" className="logo relative z-50">
        {SITE_NAME}
      </Link>

      <ul className="hidden items-center gap-8 lg:flex lg:gap-12">
        {NAV_LINKS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              className="nav-item underline-offset-8 transition-opacity hover:opacity-80 aria-[current=page]:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        ref={toggleRef}
        type="button"
        className="relative z-50 flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 lg:hidden"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className={`h-0.5 w-6 bg-offwhite transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-offwhite transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-offwhite transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      <div
        id="mobile-menu"
        inert={!isMenuOpen}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark/95 transition-transform duration-500 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="font-serif text-3xl italic text-offwhite"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
