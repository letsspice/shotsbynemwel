import Link from "next/link";
import { Instagram } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/site";

/** Instagram and TikTok icon links (20×20), inheriting the surrounding text colour. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <Link
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
        aria-label="Instagram (opens in a new tab)"
      >
        <Instagram size={20} aria-hidden />
      </Link>
      <Link
        href={SOCIAL_LINKS.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
        aria-label="TikTok (opens in a new tab)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
        </svg>
      </Link>
    </div>
  );
}
