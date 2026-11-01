import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/app/components/layout/SiteHeader";
import Footer from "@/app/components/sections/Footer";
import GalleryCollage from "@/app/components/gallery/GalleryCollage";
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
  const [lead, ...rest] = await getPublished("gallery");

  return (
    <>
      <header>
        <SiteHeader tone="dark" />
      </header>

      <main id="main" className="pt-6 md:pt-10">
        <div className="site-gutter">
          <div className="site-container">
            <h1 className="mb-10 text-center font-serif text-[40px] font-bold leading-[1.1] text-dark md:mb-14 md:text-[64px]">
              Small Human, Big Outside
            </h1>
            <p className="mb-4 font-manrope text-[16px] font-medium leading-[24px] text-dark md:text-[18px]">
              The world, with the volume turned down
            </p>
          </div>
        </div>

        {lead ? (
          <>
            <figure id={lead.slug} className="relative aspect-[4/3] w-full overflow-hidden bg-dark md:aspect-[1440/560]">
              <Image src={assetUrl(lead.image)} alt={`${lead.title}, ${lead.location}`} fill priority className="object-cover" sizes="100vw" />
            </figure>

            <div className="site-gutter py-12 md:py-20">
              <div className="site-container">
                <GalleryCollage items={rest} quote="The best part of a photograph is usually what happened just outside it." />
                <div className="mt-12 flex justify-end md:mt-16">
                  <ArrowLink href={SOCIAL_LINKS.instagram} external size="sm">
                    Explore More on Instagram
                  </ArrowLink>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="site-gutter body-standard pb-16">New photos coming soon.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
