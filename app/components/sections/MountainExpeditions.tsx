"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Mountain, ArrowRight } from "lucide-react";
import { mountainExpeditions } from "@/app/data/mountainExpeditions";

export default function MountainExpeditions() {
  const [activeIndex, setActiveIndex] = useState(0);
  const expedition = mountainExpeditions[activeIndex];

  return (
    <section
      id="expeditions"
      className="bg-background pb-[70px] px-[20px] md:px-[100px] w-full overflow-hidden"
    >
      {/* Container to prevent overflow while maintaining design width */}
      <div className="max-w-[1238px] mx-auto w-full">
        {/* 1. Section Heading: Right-aligned as per UI mockups */}
        <div className="flex justify-start md:justify-end mb-[24px]">
          <h2 className="flex flex-wrap items-baseline justify-end gap-x-3">
            <span className="subheading-bold text-dark">Mountain</span>
            <span className="subheading-italic text-dark">Expeditions</span>
          </h2>
        </div>

        {/* 2. Main Tab: Fixed ratio container that scales down on smaller screens */}
        <div className="relative w-full rounded-[24px] overflow-hidden group shadow-lg">
          {/* NOTE: use responsive min-height so mobile can grow while desktop stays 520px */}
          <div className="h-[620px] md:h-[520px] w-full relative">
            {/* Background Image */}
            <Image
              src={expedition.heroImage}
              alt={expedition.name}
              fill
              className="object-cover z-0 transition-opacity duration-700"
              priority
              sizes="(max-width: 768px) 100vw, 1238px"
            />

            {/* Gradient Overlay: 40% black (top) -> #848484 (bottom) */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.7))",
              }}
              aria-hidden="true"
            />

            {/* 3. Foreground Content */}
            <div className="relative z-20 h-full flex flex-col justify-center px-[20px] md:px-[60px]">
              <div className="">
                {/* Title: Cormorant Garamond Bold 32px */}
                <h3 className="tab-title text-offwhite mb-[12px]">
                  {expedition.name}
                </h3>

                {/* Stats Row: Inter 16px, Icons 16.55px */}
                <div className="flex flex-wrap items-center gap-[18px] mb-[18px]">
                  <div className="flex items-center gap-[8px] tab-subtitle text-offwhite">
                    <MapPin size={16.55} className="text-offwhite opacity-90" />
                    <span>{expedition.country}</span>
                  </div>
                  <div className="flex items-center gap-[8px] tab-subtitle text-offwhite">
                    <Mountain size={16.55} className="text-offwhite opacity-90" />
                    <span>{expedition.altitude}</span>
                  </div>

                  {/* Difficulty Bars */}
                  <div className="flex items-center gap-[10px]">
                    <span className="tab-subtitle text-offwhite">Difficulty</span>
                    <div className="flex gap-[6px]">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="h-[4px] w-[32px] rounded-full transition-colors duration-500"
                          style={{
                            backgroundColor:
                              i < expedition.difficulty ? "#E2725B" : "#E5E7EB",
                            opacity: i < expedition.difficulty ? 1 : 0.9,
                          }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description: Inter Regular 18px/30px */}
                <p className="font-inter text-[18px] leading-[30px] text-border mb-[24px] md:mb-[40px] max-w-full md:max-w-xl">
                  {expedition.description}
                </p>

                {/* Button: Inter Semi-bold 16px, Gap 18px */}
                <div className="mb-2">
                  <Link
                    href={`/expeditions/${expedition.slug}`}
                    className="btn-secondary inline-flex items-center group"
                    style={{ gap: "18px", color: "#5C934E" }}
                    aria-label={`View expedition ${expedition.name}`}
                    onClick={(e) => e.preventDefault()}
                    aria-disabled="true"
                  >
                    <span className="font-semibold text-[16px] leading-[20px]">
                      View Expedition
                    </span>
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Selector Thumbnails: Positioned responsively
                - Mobile: bottom-left inside tab (matching mobile mock)
                - Desktop (md+): bottom-right, same as before
            */}
            <div
              className={
                "absolute z-30 flex gap-[12px] " +
                /* mobile: left-bottom; md+: right-bottom */
                "left-4 bottom-4 md:bottom-[40px] md:right-[40px] md:left-auto"
              }
            >
              {mountainExpeditions.map((item, index) => {
                // show up to 3 thumbnails; order preserved, but allow all if you want
                // on mobile we still show the same set — clicking switches the tab
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className="relative overflow-hidden transition-all duration-300 rounded-[12px] hover:scale-105"
                    style={{
                      width: "69.14px",
                      height: "69.14px",
                      border:
                        index === activeIndex ? "2.77px solid #F8F9FB" : "none",
                      opacity: index === activeIndex ? 1 : 0.6,
                    }}
                    aria-label={`Switch to ${item.name}`}
                    aria-pressed={index === activeIndex}
                  >
                    <Image
                      src={item.cardThumb}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="70px"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global Expedition Selector (desktop only) — hidden on small screens */}
        <div className="mt-6 hidden md:flex justify-center gap-4">
          {mountainExpeditions.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`h-[69.14px] w-[69.14px] overflow-hidden rounded-imageB transition-opacity ${index === activeIndex ? "border-[2.77px] border-background" : "opacity-60"}`}
              aria-label={`Select ${item.name}`}
            >
              <Image
                src={item.cardThumb}
                alt={item.name}
                width={69}
                height={69}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
