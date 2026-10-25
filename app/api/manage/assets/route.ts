import { NextResponse } from "next/server";
import { guardAdminApi } from "@/lib/admin";
import { listAssets } from "@/lib/assets.server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = guardAdminApi(request);
  if (denied) return denied;
  return NextResponse.json(await listAssets());
}
