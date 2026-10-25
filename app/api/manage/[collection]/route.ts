import { NextResponse } from "next/server";
import { guardAdminApi } from "@/lib/admin";
import { createRecord } from "@/lib/content/mutations";
import { readCollection } from "@/lib/content/store";
import { errorResponse, readJson, resolveCollection } from "../_lib";

type Context = { params: Promise<{ collection: string }> };

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: Context) {
  const denied = guardAdminApi(request);
  if (denied) return denied;
  const key = resolveCollection((await params).collection);
  if (key instanceof NextResponse) return key;
  try {
    return NextResponse.json({ records: await readCollection(key) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request, { params }: Context) {
  const denied = guardAdminApi(request);
  if (denied) return denied;
  const key = resolveCollection((await params).collection);
  if (key instanceof NextResponse) return key;
  try {
    const record = await createRecord(key, await readJson(request));
    return NextResponse.json({ record }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
