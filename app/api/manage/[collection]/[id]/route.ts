import { NextResponse } from "next/server";
import { guardAdminApi } from "@/lib/admin";
import { deleteRecord, updateRecord } from "@/lib/content/mutations";
import { errorResponse, readJson, resolveCollection } from "../../_lib";

type Context = { params: Promise<{ collection: string; id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  const denied = guardAdminApi(request);
  if (denied) return denied;
  const { collection, id } = await params;
  const key = resolveCollection(collection);
  if (key instanceof NextResponse) return key;
  try {
    return NextResponse.json({ record: await updateRecord(key, id, await readJson(request)) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: Request, { params }: Context) {
  const denied = guardAdminApi(request);
  if (denied) return denied;
  const { collection, id } = await params;
  const key = resolveCollection(collection);
  if (key instanceof NextResponse) return key;
  try {
    await deleteRecord(key, id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
