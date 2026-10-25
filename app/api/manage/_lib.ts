import { NextResponse } from "next/server";
import { isCollectionKey } from "@/lib/content/collections";
import { NotFoundError, ValidationError } from "@/lib/content/mutations";
import { StoreNotWritableError } from "@/lib/content/store";
import type { CollectionKey } from "@/lib/content/types";

export function resolveCollection(value: string): CollectionKey | NextResponse {
  return isCollectionKey(value) ? value : NextResponse.json({ error: "Unknown collection" }, { status: 404 });
}

export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === "object" ? body : {};
  } catch {
    return {};
  }
}

export function errorResponse(error: unknown) {
  if (error instanceof ValidationError) return NextResponse.json({ error: error.message, fields: error.errors }, { status: 422 });
  if (error instanceof NotFoundError) return NextResponse.json({ error: error.message }, { status: 404 });
  if (error instanceof StoreNotWritableError) return NextResponse.json({ error: error.message }, { status: 503 });
  console.error("[manage api]", error);
  return NextResponse.json({ error: "Something went wrong while saving" }, { status: 500 });
}
