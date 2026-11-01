import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TrailStory } from "@/lib/content/types";
import { assetUrl } from "@/lib/assets";

/**
 * Text-led trail note link with a small thumbnail, used in the Trail Notes list ("row", thumbnail
 * alternating sides on desktop) and under a note ("card", portrait thumbnail on the left).
 */
export default function TrailNoteTeaser({
  story,
  variant = "row",
  imageSide = "right",
  headingLevel = "h2",
}: {
  story: TrailStory;
  variant?: "row" | "card";
  imageSide?: "left" | "right";
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const href = `/trail-notes/${story.slug}`;
  const thumbSize =
    variant === "card" ? "h-[120px] w-[96px] md:h-[124px] md:w-[100px]" : "h-[88px] w-[88px] md:h-[96px] md:w-[96px]";

  return (
    <div className={`flex items-start gap-4 md:gap-6 ${variant === "row" && imageSide === "right" ? "md:flex-row-reverse" : ""}`}>
      {story.featuredImage && (
        <Link href={href} tabIndex={-1} aria-hidden className={`relative shrink-0 overflow-hidden rounded-[12px] ${thumbSize}`}>
          <Image src={assetUrl(story.featuredImage)} alt="" fill className="object-cover" sizes="100px" />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <Heading className="mb-1.5 font-manrope text-[18px] font-semibold leading-[26px] text-dark md:text-[20px] md:leading-[28px]">
          <Link href={href} className="transition-colors hover:text-primary">
            {story.title}
          </Link>
        </Heading>
        {story.excerpt && (
          <p className="mb-3 line-clamp-3 font-manrope text-[15px] leading-[24px] text-body/75 md:text-[16px] md:leading-[26px]">{story.excerpt}</p>
        )}
        <Link href={href} className="group inline-flex items-center gap-3 font-inter text-[14px] font-semibold leading-[20px] text-primary">
          Read the note<span className="sr-only">: {story.title}</span>
          <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
