import Image from "next/image";
import type { GalleryItem } from "@/lib/content/types";
import { assetUrl } from "@/lib/assets";

/**
 * Data-driven bento grid: "tall" tiles span two rows and dense flow back-fills gaps,
 * so any number of photos in any order lays out cleanly.
 * Designer: radius 16, gradient #000 0% → 60%, title Inter 20/28, subtitle Inter 14/20 at 70%.
 */
export default function GalleryGrid({
  items,
  layout = "grid",
  headingLevel = "h3",
}: {
  items: GalleryItem[];
  /** "feature": the homepage bento (fills column by column, so the 3rd photo sits tall in the middle). */
  layout?: "feature" | "grid";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const desktop =
    layout === "feature"
      ? "lg:grid-cols-none lg:grid-flow-col-dense lg:auto-cols-fr lg:grid-rows-[300px_300px]"
      : "lg:grid-cols-3 lg:auto-rows-[300px] lg:grid-flow-row-dense";
  return (
    <ul className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[260px] sm:grid-flow-row-dense md:gap-6 ${desktop}`}>
      {items.map((item) => (
        <li
          key={item.id}
          id={item.slug}
          className={`group relative overflow-hidden rounded-[16px] sm:h-auto ${
            item.size === "tall" ? "h-[420px] sm:row-span-2" : "h-[260px]"
          }`}
        >
          <Image
            src={assetUrl(item.image)}
            alt={`${item.title}, ${item.location}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)" }}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
            <Heading className="mb-1 font-inter text-[18px] leading-[26px] text-offwhite md:text-[20px] md:leading-[28px]">
              {item.title}
            </Heading>
            <p className="font-inter text-[14px] leading-[20px] text-offwhite/70">
              {item.location}
              {item.altitude && <> • {item.altitude}</>}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
