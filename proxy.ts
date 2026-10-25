import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_BASE_HEADER, ADMIN_INTERNAL_BASE, adminEnabled, adminSlug } from "@/lib/admin";

function isUnder(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`);
}

function notFound(request: NextRequest) {
  // Rewriting to a path with no route renders the regular not-found page with a 404 status.
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const slug = adminSlug();

  if (slug && isUnder(pathname, `/${slug}`)) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_INTERNAL_BASE + pathname.slice(slug.length + 1);
    const headers = new Headers(request.headers);
    headers.set(ADMIN_BASE_HEADER, `/${slug}`);
    return NextResponse.rewrite(url, { request: { headers } });
  }

  if (isUnder(pathname, ADMIN_INTERNAL_BASE) && (slug || !adminEnabled())) {
    return notFound(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|assets/|favicon.ico|robots.txt|sitemap).*)"],
};
