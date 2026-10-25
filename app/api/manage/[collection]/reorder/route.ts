import { NextResponse } from "next/server";
import { guardAdminApi } from "@/lib/admin";
import { reorderRecords } from "@/lib/content/mutations";
import { errorResponse, readJson, resolveCollection } from "../../_lib";

type Context = { params: Promise<{ collection: string }> };

export async function POST(request: Request, { params }: Context) {
  const denied = guardAdminApi(request);
  if (denied) return denied;
  const key = resolveCollection((await params).collection);
  if (key instanceof NextResponse) return key;
  const { ids } = await readJson(request);
  if (!Array.isArray(ids) || !ids.every((id) => typeof id === "string")) {
    return NextResponse.json({ error: "Expected { ids: string[] }" }, { status: 400 });
  }
  try {
    return NextResponse.json({ records: await reorderRecords(key, ids) });
  } catch (error) {
    return errorResponse(error);
  }
}
