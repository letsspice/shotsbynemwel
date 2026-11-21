import type { GalleryItem } from "@/lib/content/types";
import SectionHeading from "@/app/components/ui/SectionHeading";
import GalleryGrid from "@/app/components/gallery/GalleryGrid";

export default function GallerySection({ items }: { items: GalleryItem[] }) {
  if (!items.length) return null;

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="site-gutter scroll-mt-4 bg-background pb-[var(--spacing-section-y)]">
      <div className="site-container">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-start md:gap-6">
          <SectionHeading id="gallery-heading" bold="Trail" italic="Gallery" />
          <p className="body-standard max-w-[528px]">
            Moments captured along the trails that tell the story of East Africa’s majestic landscapes and the journey to
            conquer them.
          </p>
        </div>

        <GalleryGrid items={items} layout="feature" />
      </div>
    </section>
  );
}
