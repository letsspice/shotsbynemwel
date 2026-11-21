import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";
import type { ReactNode } from "react";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  external?: boolean;
  tone?: "accent" | "primary";
  className?: string;
}

/** Text link + long arrow with the designer's 18px gap (Inter semi-bold). */
export default function ArrowLink({ href, children, size = "md", external, tone = "accent", className = "" }: ArrowLinkProps) {
  const Icon = external ? ArrowUpRight : MoveRight;
  const text = {
    sm: "text-[16px] leading-[20px]",
    md: "text-[16px] leading-[24px] md:text-[18px]",
    lg: "text-[18px] leading-[28px] md:text-[20px]",
  }[size];
  const color = tone === "accent" ? "text-accent-green" : "text-primary";
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-[18px] font-inter font-semibold ${text} ${color} ${className}`}
    >
      <span>{children}</span>
      <Icon size={external ? 20 : 26} strokeWidth={external ? 2 : 1.5} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5" />
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </Link>
  );
}
