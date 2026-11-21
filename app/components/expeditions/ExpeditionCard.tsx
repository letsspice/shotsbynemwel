import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Expedition } from "@/lib/content/types";
import { assetUrl } from "@/lib/assets";

/** Listing card: image with a rounded cut-out holding the arrow button, then name / region / meta / summary. */
export default function ExpeditionCard({ expedition }: { expedition: Expedition }) {
  const meta = [expedition.altitude, expedition.dateLabel].filter(Boolean);
  return (
    <article className="group relative flex flex-col">
      <div className="relative mb-5">
        <div className="relative aspect-[387/402] overflow-hidden rounded-card bg-border">
          <Image
            src={assetUrl(expedition.thumbnail || expedition.heroImage)}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        </div>
        <span className="card-notch" aria-hidden>
          <span className="absolute bottom-5 right-2.5 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-primary/65 text-offwhite transition-colors duration-300 group-hover:bg-primary">
            <ArrowUpRight size={24} />
          </span>
        </span>
      </div>

      <h3 className="mb-2 font-manrope text-[26px] font-medium leading-[34px] tracking-[-0.0128em] text-primary md:text-[30px] md:leading-[38px]">
        {/* The whole card is clickable via this link's ::after overlay. */}
        <Link href={`/expeditions/${expedition.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {expedition.name}
        </Link>
      </h3>
      {expedition.region && <p className="mb-3 font-manrope text-[16px] font-semibold leading-[24px] text-primary md:text-[18px] md:leading-[26px]">{expedition.region}</p>}
      {meta.length > 0 && <p className="mb-3 font-manrope text-[14px] leading-[20px] text-body/70">{meta.join(" · ")}</p>}
      {(expedition.summary || expedition.description) && (
        <p className="line-clamp-3 font-manrope text-[16px] leading-[26px] text-body/70 md:text-[18px] md:leading-[27px]">{expedition.summary || expedition.description}</p>
      )}
    </article>
  );
}
