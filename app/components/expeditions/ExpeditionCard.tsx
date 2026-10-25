import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Expedition } from "@/lib/content/types";
import { assetUrl } from "@/lib/assets";

/** Listing card: notched image with a circular arrow button, then country / name / region / meta / summary. */
export default function ExpeditionCard({ expedition }: { expedition: Expedition }) {
  const meta = [expedition.altitude, expedition.dateLabel].filter(Boolean);
  return (
    <article className="group relative flex flex-col">
      <div className="relative mb-5">
        <div className="notched-image relative aspect-[580/604] overflow-hidden rounded-card bg-border">
          <Image
            src={assetUrl(expedition.thumbnail || expedition.heroImage)}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        </div>
        <span
          className="absolute bottom-0 right-0 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-primary/50 text-offwhite transition-colors duration-300 group-hover:bg-primary"
          aria-hidden
        >
          <ArrowUpRight size={26} />
        </span>
      </div>

      <p className="eyebrow mb-2 text-primary">{expedition.country}</p>
      <h3 className="mb-2 font-serif text-[28px] font-medium leading-[34px] text-primary/80 md:text-[32px] md:leading-[40px]">
        {/* The whole card is clickable via this link's ::after overlay. */}
        <Link href={`/expeditions/${expedition.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {expedition.name}
        </Link>
      </h3>
      {expedition.region && <p className="mb-2 font-manrope text-[16px] font-semibold leading-[24px] text-primary/80 md:text-[18px]">{expedition.region}</p>}
      {meta.length > 0 && <p className="mb-3 font-inter text-[14px] leading-[20px] text-body/60">{meta.join(" · ")}</p>}
      {(expedition.summary || expedition.description) && (
        <p className="line-clamp-3 font-manrope text-[16px] leading-[26px] text-body/70">{expedition.summary || expedition.description}</p>
      )}
    </article>
  );
}
