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
          <div className="max-w-[500px] lg:order-1">
            <p className="body-standard mb-8 md:mb-12">
              Trail Notes is where everything settles for me. After I come down the mountain and my heartbeat slows, this
              is where my thoughts finally take shape. It&apos;s where I write what the trail taught me.
            </p>
            <ArrowLink href="/trail-notes" tone="primary">
              Read More
            </ArrowLink>
          </div>
        </div>

        {/* Tablet: equal columns. Desktop: the designer's wide + narrow split (783 / 415). */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-[783fr_415fr] lg:gap-10">
          <div className={rest.length ? "" : "md:col-span-2"}>
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
