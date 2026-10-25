/**
 * Hidden-URL access for the admin module.
 *
 * - Development with no ADMIN_SLUG: the admin is at /manage.
 * - With ADMIN_SLUG=<secret>: the admin is only reachable at /<secret>; /manage returns 404.
 *   The admin sends the slug back as `x-admin-key` so the write APIs can't be called blindly.
 * - Production with no ADMIN_SLUG: the admin and its APIs are disabled entirely.
 */
import { NextResponse } from "next/server";

export const ADMIN_INTERNAL_BASE = "/manage";
export const ADMIN_KEY_HEADER = "x-admin-key";
export const ADMIN_BASE_HEADER = "x-admin-base";

export function adminSlug(): string {
  return (process.env.ADMIN_SLUG ?? "").trim().replace(/^\/+|\/+$/g, "");
}

export function adminEnabled(): boolean {
  return process.env.NODE_ENV === "development" || adminSlug() !== "";
}

/** Returns a 404 response when the request isn't allowed, otherwise null. */
export function guardAdminApi(request: Request): NextResponse | null {
  if (!adminEnabled()) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const slug = adminSlug();
  if (slug && request.headers.get(ADMIN_KEY_HEADER) !== slug) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return null;
}
