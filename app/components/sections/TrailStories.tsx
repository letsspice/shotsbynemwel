import type { TrailStory } from "@/lib/content/types";
import ArrowLink from "@/app/components/ui/ArrowLink";
import SectionHeading from "@/app/components/ui/SectionHeading";
import StoryCard from "@/app/components/stories/StoryCard";

export default function TrailStories({ stories }: { stories: TrailStory[] }) {
  if (!stories.length) return null;
  const [first, ...rest] = stories;

  return (
    <section id="trail-notes" aria-labelledby="trail-notes-heading" className="site-gutter scroll-mt-4 bg-background pb-[var(--spacing-section-y)]">
      <div className="site-container">
        {/* Mobile: heading first, then intro. Desktop: intro left, heading right. */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 lg:flex-row lg:gap-10">
          <SectionHeading
            id="trail-notes-heading"
            bold="Stories from the"
            italic="Trails"
            className="lg:order-2 lg:max-w-[420px] lg:text-right"
          />
          <div className="max-w-[480px] lg:order-1">
            <p className="body-standard mb-6">
              Trail Notes is where everything settles for me. After I come down the mountain and my heartbeat slows, this
              is where my thoughts finally take shape.
            </p>
            <ArrowLink href="/trail-notes">Read More</ArrowLink>
          </div>
        </div>

        {/* Tablet: equal columns. Desktop: the designer's 2/3 + 1/3 split. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className={rest.length ? "lg:col-span-2" : "md:col-span-2 lg:col-span-3"}>
            <StoryCard story={first} />
          </div>
          {rest.map((story) => (
            <div key={story.id}>
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
