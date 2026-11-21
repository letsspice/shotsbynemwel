import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import type { TrailStory } from "@/lib/content/types";
import { assetUrl } from "@/lib/assets";

/**
 * Text-led trail note link with a thumbnail, used in the Trail Notes list ("row", thumbnail
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
  const isCard = variant === "card";
  const thumbSize = isCard ? "h-[160px] w-[130px] md:h-[235px] md:w-[192px]" : "h-[110px] w-[110px] md:h-[173px] md:w-[178px]";

  return (
    <div className={`flex items-center gap-4 ${isCard ? "md:gap-7" : "md:gap-6"} ${!isCard && imageSide === "right" ? "md:flex-row-reverse" : ""}`}>
      {story.featuredImage && (
        <Link href={href} tabIndex={-1} aria-hidden className={`relative shrink-0 overflow-hidden rounded-[16px] md:rounded-[24px] ${thumbSize}`}>
          <Image src={assetUrl(story.featuredImage)} alt="" fill className="object-cover" sizes="200px" />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <Heading
          className={`mb-2 font-manrope text-[20px] leading-[28px] text-dark md:mb-4 md:text-[28px] md:leading-[34px] ${isCard ? "font-medium" : "font-semibold"}`}
        >
          <Link href={href} className="transition-colors hover:text-primary">
            {story.title}
          </Link>
        </Heading>
        {story.excerpt && (
          <p className="mb-3 line-clamp-3 font-manrope text-[16px] leading-[26px] text-body/75 md:mb-4 md:text-[20px] md:leading-[32px]">{story.excerpt}</p>
        )}
        <Link
          href={href}
          className={`group inline-flex items-center gap-[18px] font-manrope font-semibold text-primary ${isCard ? "text-[16px] leading-[24px]" : "text-[16px] leading-[24px] md:text-[18px] md:leading-[28px]"}`}
        >
          Read the note<span className="sr-only">: {story.title}</span>
          <MoveRight size={26} strokeWidth={1.5} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
