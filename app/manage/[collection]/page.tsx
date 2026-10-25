import { notFound } from "next/navigation";
import { collections, isCollectionKey, recordImages, recordTitle } from "@/lib/content/collections";
import { readCollection } from "@/lib/content/store";
import { listAssets } from "@/lib/assets.server";
import type { AnyRecord } from "@/lib/content/types";
import CollectionList, { type ListRow } from "../_components/CollectionList";

export const dynamic = "force-dynamic";

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  if (!isCollectionKey(collection)) notFound();
  const def = collections[collection];
  const [records, assets] = await Promise.all([readCollection(collection), listAssets()]);
  const onDisk = new Set(assets.files);

  const rows: ListRow[] = (records as AnyRecord[]).map((r) => {
    const images = recordImages(def, r);
    const image = (r as unknown as Record<string, string>)[def.imageField] || images[0] || "";
    return {
      id: r.id,
      slug: r.slug,
      title: recordTitle(def, r),
      image,
      active: r.active,
      featured: r.featured,
      updatedAt: r.updatedAt,
      missingImages: images.filter((p) => !onDisk.has(p)).length,
      publicPath: def.publicPath(r),
    };
  });

  return <CollectionList collection={collection} rows={rows} />;
}
