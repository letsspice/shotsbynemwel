import { SOCIAL_LINKS } from "@/lib/site";
import type { GalleryItem } from "@/lib/content/types";
import ArrowLink from "@/app/components/ui/ArrowLink";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GalleryGrid from "@/app/components/gallery/GalleryGrid";

export default function GallerySection({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null;

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="site-gutter scroll-mt-4 bg-background pb-[var(--spacing-section-y)]">
      <div className="site-container">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-start md:gap-6">
          <SectionHeading id="gallery-heading" bold="Trail" italic="Gallery" />
          <p className="body-standard max-w-[480px]">
            Moments captured along the trails that tell the story of East Africa’s majestic landscapes and the journey to
            conquer them.
          </p>
        </div>

        <GalleryGrid items={items} layout="feature" />

        <div className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-4 md:mt-12">
          <ArrowLink href="/gallery">View the full gallery</ArrowLink>
          <ArrowLink href={SOCIAL_LINKS.instagram} external>
            Explore More on IG
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
