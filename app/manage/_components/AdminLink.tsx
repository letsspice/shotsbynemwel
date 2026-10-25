"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useAdmin } from "./AdminProvider";
import { buttonClass } from "./ui";

const variants = {
  primary: buttonClass.primary,
  secondary: buttonClass.secondary,
  link: "font-inter text-[14px] font-semibold text-primary underline-offset-4 hover:underline",
};

/** Link that resolves against the admin's (possibly secret) base path. */
export default function AdminLink({ path, className = "link", children }: { path: string; className?: keyof typeof variants; children: ReactNode }) {
  const { href } = useAdmin();
  return (
    <Link href={href(path)} className={variants[className]}>
      {children}
    </Link>
  );
}
