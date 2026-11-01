import Image from "next/image";
import type { GalleryItem } from "@/lib/content/types";
import { assetUrl } from "@/lib/assets";

/**
 * Editorial layout from the gallery page design. Photos flow through two alternating bands:
 *  - a pair: a tall portrait beside a smaller landscape set lower (the first pair carries the pull quote),
 *  - a trio: landscape, portrait dropped slightly, wider landscape.
 * On mobile the pair stacks and the trio shows two side by side with the third full width.
 */
export default function GalleryCollage({ items, quote }: { items: GalleryItem[]; quote?: string }) {
  const bands: GalleryItem[][] = [];
  for (let i = 0, size = 2; i < items.length; i += size, size = size === 2 ? 3 : 2) {
    bands.push(items.slice(i, i + size));
  }

  return (
    <div className="flex flex-col gap-12 md:gap-20">
      {bands.map((band, index) =>
        index % 2 === 0 ? (
          <PairBand key={band[0].id} items={band} quote={index === 0 ? quote : undefined} />
        ) : (
          <TrioBand key={band[0].id} items={band} />
        ),
      )}
    </div>
  );
}

function PairBand({ items, quote }: { items: GalleryItem[]; quote?: string }) {
  const [tall, wide] = items;
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
      <Photo item={tall} aspect="aspect-[4/5]" className="md:col-span-5 md:col-start-1" sizes="(max-width: 768px) 100vw, 500px" />
      <div className="flex flex-col gap-8 md:col-span-5 md:col-start-8 md:pt-16">
        {wide && <Photo item={wide} aspect="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 500px" />}
        {quote && (
          <blockquote className="font-serif text-[24px] italic leading-[32px] text-primary/80 md:text-[28px] md:leading-[36px]">
            “{quote}”
          </blockquote>
        )}
      </div>
    </div>
  );
}

// A short last band (one or two photos) widens its columns instead of leaving a gap.
const trioColumns = ["md:grid-cols-1", "md:grid-cols-[7fr_5fr]", "md:grid-cols-[4fr_3fr_5fr]"];

function TrioBand({ items }: { items: GalleryItem[] }) {
  const [first, second, third] = items;
  return (
    <div className={`grid grid-cols-2 items-start gap-x-4 gap-y-8 md:gap-6 ${trioColumns[items.length - 1]}`}>
      <Photo item={first} aspect="aspect-[4/3]" className={items.length === 1 ? "col-span-2 md:col-span-1" : ""} sizes="(max-width: 768px) 50vw, 600px" />
      {second && <Photo item={second} aspect="aspect-[3/4]" className="md:mt-10" sizes="(max-width: 768px) 50vw, 260px" />}
      {third && <Photo item={third} aspect="aspect-[16/10]" className="col-span-2 md:col-span-1" sizes="(max-width: 768px) 100vw, 420px" />}
    </div>
  );
}

function Photo({ item, aspect, className = "", sizes }: { item: GalleryItem; aspect: string; className?: string; sizes: string }) {
  const caption = item.description || [item.location, item.altitude].filter(Boolean).join(" • ");
  return (
    <figure id={item.slug} className={`scroll-mt-8 ${className}`}>
      <div className={`group relative w-full overflow-hidden rounded-[16px] ${aspect}`}>
        <Image
          src={assetUrl(item.image)}
          alt={`${item.title}, ${item.location}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={sizes}
        />
      </div>
      <figcaption className="mt-3">
        <span className="block font-manrope text-[15px] font-semibold leading-[22px] text-dark md:text-[16px]">{item.title}</span>
        {caption && <span className="mt-1 block font-manrope text-[14px] leading-[21px] text-body/70">{caption}</span>}
      </figcaption>
    </figure>
  );
}
