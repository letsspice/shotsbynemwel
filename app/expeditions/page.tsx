import type { Metadata } from "next";
import Image from "next/image";
import heroImage from "@/app/assets/hero/shotbynemwel-hero.png";
import PageHero from "@/app/components/layout/PageHero";
import Footer from "@/app/components/sections/Footer";
import ArrowLink from "@/app/components/ui/ArrowLink";
import ExpeditionCard from "@/app/components/expeditions/ExpeditionCard";
import { getPublished } from "@/lib/content/queries";
import { assetUrl } from "@/lib/assets";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Expeditions",
  description: "A personal archive of long walks and the East African landscapes that stay with me.",
  alternates: { canonical: "/expeditions" },
};

export default async function ExpeditionsPage() {
  const [featured, ...others] = await getPublished("expeditions");

  return (
    <>
      <PageHero image={heroImage} imageAlt="Green valley between East African mountains at sunrise" title="Every mountain, a different story" />

      <main id="main" className="site-gutter pb-16 pt-12 md:pb-24 md:pt-[70px]">
        <div className="site-container">
          {!featured ? (
            <p className="body-standard">New expeditions are on their way. Check back soon.</p>
          ) : (
            <>
              <section aria-labelledby="featured-expedition" className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,694fr)_minmax(0,498fr)] lg:gap-12">
                <figure className="relative aspect-[694/474] w-full overflow-hidden rounded-[16px]">
                  <Image
                    src={assetUrl(featured.heroImage)}
                    alt={featured.heroCaption || featured.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 694px"
                  />
                  {featured.heroCaption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 pb-4 pt-10">
                      <span className="block font-manrope text-[18px] leading-[28px] text-offwhite md:text-[22px] md:leading-[32px]">{featured.heroCaption}</span>
                      <span className="block font-manrope text-[14px] leading-[22px] text-offwhite/75">
                        {featured.name}, {featured.country}
                      </span>
                    </figcaption>
                  )}
                </figure>

                <div>
                  <h2
                    id="featured-expedition"
                    className="mb-4 font-manrope text-[40px] font-medium leading-[48px] tracking-[-0.0128em] text-dark md:mb-5 md:text-[56px] md:leading-[64px]"
                  >
                    {featured.name}
                  </h2>
                  {(featured.route || featured.highestPoint) && (
                    <p className="mb-5 font-manrope text-[16px] leading-[24px] text-primary">
                      {[featured.route, featured.highestPoint].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="mb-8 font-manrope text-[18px] leading-[28px] text-body/75 md:text-[20px] md:leading-[32px]">{featured.summary || featured.description}</p>
                  <ArrowLink href={`/expeditions/${featured.slug}`} size="lg" tone="primary">
                    Explore the Expedition
                  </ArrowLink>
                </div>
              </section>

              {others.length > 0 && (
                <section aria-labelledby="more-expeditions" className="mt-14 md:mt-[70px]">
                  <h2 id="more-expeditions" className="sr-only">
                    More expeditions
                  </h2>
                  <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                    {others.map((expedition) => (
                      <ExpeditionCard key={expedition.id} expedition={expedition} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
