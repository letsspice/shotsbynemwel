"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Mountain } from "lucide-react";
import type { Expedition } from "@/lib/content/types";
import { assetUrl } from "@/lib/assets";
import ArrowLink from "@/app/components/ui/ArrowLink";
import DifficultyBars from "@/app/components/ui/DifficultyBars";
import SectionHeading from "@/app/components/ui/SectionHeading";

type TabExpedition = Pick<
  Expedition,
  "id" | "slug" | "name" | "country" | "altitude" | "difficulty" | "description" | "heroImage" | "thumbnail"
>;

/**
 * Designer: tab 1238×520, radius 24, gradient 40% #000 → #848484; selector thumbs 69.14px with a
 * 2.77px #F8F9FB border on the active one and a 16px gap; 24px between heading and tab.
 */
export default function MountainExpeditions({ expeditions }: { expeditions: TabExpedition[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const expedition = expeditions[activeIndex];
  if (!expedition) return null;

  return (
    <section id="expeditions" aria-labelledby="expeditions-heading" className="site-gutter scroll-mt-4 bg-background pb-[var(--spacing-section-y)]">
      <div className="site-container">
        <SectionHeading id="expeditions-heading" bold="Mountain" italic="Expeditions" align="right" className="mb-6" />

        <div className="relative w-full overflow-hidden rounded-[16px] bg-dark md:rounded-tab">
          <div className="relative min-h-[600px] w-full md:min-h-[520px]">
            {expeditions.map((item, index) => (
              <Image
                key={item.id}
                src={assetUrl(item.heroImage)}
                alt=""
                fill
                priority={index === 0}
                className={`object-cover transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
                sizes="(max-width: 1340px) 100vw, 1240px"
              />
            ))}

            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 55%, rgba(132,132,132,0.25) 100%)" }}
              aria-hidden
            />

            <div
              className="relative z-10 flex min-h-[600px] flex-col justify-center px-5 pb-28 pt-10 md:min-h-[520px] md:px-[60px] md:pb-10"
              aria-live="polite"
            >
              <h3 className="tab-title mb-3 text-offwhite">{expedition.name}</h3>

              <div className="mb-[18px] flex flex-wrap items-center gap-x-[18px] gap-y-3">
                <span className="tab-subtitle flex items-center gap-2 text-offwhite">
                  <MapPin size={16.55} aria-hidden />
                  {expedition.country}
                </span>
                <span className="tab-subtitle flex items-center gap-2 text-offwhite">
                  <Mountain size={16.55} aria-hidden />
                  {expedition.altitude}
                </span>
                <DifficultyBars level={expedition.difficulty} />
              </div>

              <p className="mb-6 max-w-[560px] font-inter text-[16px] leading-[26px] text-border md:mb-10 md:text-[18px] md:leading-[30px]">
                {expedition.description}
              </p>

              <div>
                <ArrowLink href={`/expeditions/${expedition.slug}`} size="sm">
                  View Expedition<span className="sr-only">: {expedition.name}</span>
                </ArrowLink>
              </div>
            </div>

            {expeditions.length > 1 && (
              <div
                role="group"
                aria-label="Choose an expedition"
                className="absolute bottom-5 left-5 z-20 flex gap-3 md:bottom-10 md:left-auto md:right-10 md:gap-4"
              >
                {expeditions.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-[56px] w-[56px] overflow-hidden rounded-[12px] transition-all duration-300 hover:scale-105 md:h-[69.14px] md:w-[69.14px] ${
                      index === activeIndex ? "border-[2.77px] border-background opacity-100" : "opacity-60 hover:opacity-90"
                    }`}
                    aria-label={`Show ${item.name}`}
                    aria-pressed={index === activeIndex}
                  >
                    <Image src={assetUrl(item.thumbnail)} alt="" fill className="object-cover" sizes="70px" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
