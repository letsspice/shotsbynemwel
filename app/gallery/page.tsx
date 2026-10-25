import type { Metadata } from "next";
import PageHero from "@/app/components/layout/PageHero";
import Footer from "@/app/components/sections/Footer";
import GalleryGrid from "@/app/components/gallery/GalleryGrid";
import ArrowLink from "@/app/components/ui/ArrowLink";
import { getPublished } from "@/lib/content/queries";
import { assetUrl } from "@/lib/assets";
import { SOCIAL_LINKS } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Trail Gallery",
  description: "Moments captured along the trails that tell the story of East Africa’s majestic landscapes.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  const items = await getPublished("gallery");
  const hero = items.find((i) => i.size === "tall") ?? items[0];

  return (
    <>
      <PageHero
        image={assetUrl(hero?.image ?? "footer/mountain-footer-bg.png")}
        imageAlt=""
        title="Trail Gallery"
        subtitle="Moments captured along the trails that tell the story of East Africa’s majestic landscapes and the journey to conquer them."
      />
      <main id="main" className="section-pad">
        <div className="site-container">
          {items.length ? <GalleryGrid items={items} headingLevel="h2" /> : <p className="body-standard">New photos coming soon.</p>}
          <div className="mt-12 flex justify-center">
            <ArrowLink href={SOCIAL_LINKS.instagram} external>
              Explore More on IG
            </ArrowLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
