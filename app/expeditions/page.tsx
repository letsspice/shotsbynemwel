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
      <PageHero
        image={heroImage}
        imageAlt="Green valley between East African mountains at sunrise"
        title="Every mountain, a different story."
        subtitle="A personal archive of long walks, and the landscapes that stay with me. These are my journeys through East Africa."
      />

      <main id="main">
        {!featured ? (
          <section className="section-pad">
            <p className="site-container body-standard">New expeditions are on their way. Check back soon.</p>
          </section>
        ) : (
          <>
            <section aria-labelledby="featured-expedition" className="section-pad bg-white">
              <div className="site-container grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                <figure className="relative aspect-[694/474] w-full overflow-hidden rounded-[16px]">
                  <Image
                    src={assetUrl(featured.heroImage)}
                    alt={featured.heroCaption || featured.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 680px"
                  />
                  {featured.heroCaption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 md:p-6">
                      <span className="block font-inter text-[18px] leading-[26px] text-offwhite md:text-[20px] md:leading-[28px]">{featured.heroCaption}</span>
                      <span className="block font-inter text-[12px] leading-[18px] text-offwhite/70">
                        {featured.name}, {featured.country}
                      </span>
                    </figcaption>
                  )}
                </figure>

                <div>
                  <p className="eyebrow mb-3 text-primary/80">
                    From the archive{featured.dateLabel && <> / {featured.dateLabel}</>}
                  </p>
                  <h2 id="featured-expedition" className="mb-4 font-serif text-[40px] font-medium leading-[44px] text-dark md:text-[48px] md:leading-[52px]">
                    {featured.name}
                  </h2>
                  <ul className="mb-5 space-y-1 font-inter text-[14px] leading-[20px] text-primary">
                    {(featured.route || featured.duration) && <li>{[featured.route, featured.duration].filter(Boolean).join(" · ")}</li>}
                    {featured.highestPoint && <li>{featured.highestPoint}</li>}
                  </ul>
                  <p className="mb-4 font-manrope text-[16px] leading-[26px] text-body/75 md:text-[18px] md:leading-[28px]">{featured.description}</p>
                  {featured.summary && <p className="mb-6 font-manrope text-[15px] leading-[24px] text-body/60 md:text-[16px]">{featured.summary}</p>}
                  <ArrowLink href={`/expeditions/${featured.slug}`} size="sm" tone="primary">
                    Explore the expedition
                  </ArrowLink>
                </div>
              </div>
            </section>

            {others.length > 0 && (
              <section aria-labelledby="more-expeditions" className="section-pad">
                <h2 id="more-expeditions" className="sr-only">
                  More expeditions
                </h2>
                <div className="site-container grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                  {others.map((expedition) => (
                    <ExpeditionCard key={expedition.id} expedition={expedition} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
