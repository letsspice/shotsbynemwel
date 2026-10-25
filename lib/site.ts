export const SITE_NAME = "Shots by Nemwel";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shotsbynemwel.netlify.app").replace(/\/$/, "");

export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Expeditions", href: "/expeditions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Trail Notes", href: "/trail-notes" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/shotbynemwel/",
  tiktok: "https://www.tiktok.com/@shotsbynemwel",
} as const;

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
