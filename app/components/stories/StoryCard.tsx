import Image from "next/image";
import Link from "next/link";
import type { TrailStory } from "@/lib/content/types";
import { assetUrl } from "@/lib/assets";

/** Designer: radius 24, gradient #000 0% → 90%, title Manrope medium 28, subtitle Manrope light 18/32. */
export default function StoryCard({
  story,
  headingLevel = "h3",
  height = "h-[400px] md:h-[480px]",
}: {
  story: TrailStory;
  headingLevel?: "h2" | "h3";
  height?: string;
}) {
  const Heading = headingLevel;
  return (
    <Link href={`/trail-notes/${story.slug}`} className={`group relative block w-full overflow-hidden rounded-card ${height}`}>
      <Image
        src={assetUrl(story.featuredImage)}
        alt=""
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.9) 100%)" }}
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        {story.category && <p className="eyebrow mb-3 text-offwhite/80">{story.category}</p>}
        <Heading className="mb-2 font-manrope text-[24px] font-medium leading-[32px] tracking-[-0.0128em] text-offwhite md:text-[28px] md:leading-[36px]">
          {story.title}
        </Heading>
        <p className="line-clamp-2 max-w-[95%] font-manrope text-[16px] font-light leading-[26px] text-offwhite md:text-[18px] md:leading-[32px]">
          {story.excerpt}
        </p>
      </div>
    </Link>
  );
}
