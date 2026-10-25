import { notFound } from "next/navigation";
import { collections, emptyRecord, isCollectionKey } from "@/lib/content/collections";
import { readCollection } from "@/lib/content/store";
import RecordForm from "../../_components/RecordForm";

export const dynamic = "force-dynamic";

export default async function NewRecordPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!isCollectionKey(collection)) notFound();
  const records = await readCollection(collection);
  return (
    <RecordForm
      key="new"
      collection={collection}
      initial={emptyRecord(collections[collection])}
      otherSlugs={records.map((r) => r.slug)}
    />
  );
}
