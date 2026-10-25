import { notFound } from "next/navigation";
import { isCollectionKey } from "@/lib/content/collections";
import { readCollection } from "@/lib/content/store";
import RecordForm from "../../_components/RecordForm";

export const dynamic = "force-dynamic";

export default async function EditRecordPage({ params }: { params: Promise<{ collection: string; id: string }> }) {
  const { collection, id } = await params;
  if (!isCollectionKey(collection)) notFound();
  const records = await readCollection(collection);
  const record = records.find((r) => r.id === id);
  if (!record) notFound();
  return (
    <RecordForm
      key={record.id}
      collection={collection}
      recordId={record.id}
      initial={record as unknown as Record<string, unknown>}
      otherSlugs={records.filter((r) => r.id !== id).map((r) => r.slug)}
    />
  );
}
