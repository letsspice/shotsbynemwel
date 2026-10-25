import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Mountain } from "lucide-react";
import PageHero from "@/app/components/layout/PageHero";
import Footer from "@/app/components/sections/Footer";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ArrowLink from "@/app/components/ui/ArrowLink";
import SelectedFrames from "@/app/components/expeditions/SelectedFrames";
import { getPublished, getPublishedBySlug } from "@/lib/content/queries";
import { assetUrl } from "@/lib/assets";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const expeditions = await getPublished("expeditions");
  return expeditions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const expedition = await getPublishedBySlug("expeditions", (await params).slug);
  if (!expedition) return {};
  const description = expedition.summary || expedition.description;
  return {
    title: expedition.name,
    description,
    alternates: { canonical: `/expeditions/${expedition.slug}` },
    openGraph: {
      type: "article",
      title: expedition.name,
      description,
      images: [{ url: assetUrl(expedition.heroImage), alt: expedition.heroCaption || expedition.name }],
    },
  };
}

export default async function ExpeditionPage({ params }: Props) {
  const expedition = await getPublishedBySlug("expeditions", (await params).slug);
  if (!expedition) notFound();

  const stats = [
    {
      icon: Mountain,
      label: "Highest point",
      value: expedition.highestPoint ? `Highest Point – ${expedition.highestPoint}` : expedition.altitude,
    },
    { icon: MapPin, label: "Route", value: expedition.route },
    { icon: CalendarDays, label: "When", value: [expedition.duration, expedition.dateLabel].filter(Boolean).join(", ") },
  ].filter((s) => s.value);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: expedition.name,
            description: expedition.summary || expedition.description,
            image: absoluteUrl(assetUrl(expedition.heroImage)),
            url: absoluteUrl(`/expeditions/${expedition.slug}`),
            dateModified: expedition.updatedAt,
            author: { "@type": "Person", name: "Nemwel Boniface" },
          }),
        }}
      />
      <PageHero
        image={assetUrl(expedition.heroImage)}
        imageAlt={expedition.heroCaption || expedition.name}
        title={expedition.name}
        size="short"
        titleFont="sans"
      />

      <main id="main" className="section-pad">
        <div className="site-container">
          {stats.length > 0 && (
            <dl className="mb-12 grid grid-cols-1 gap-6 border-b border-border pb-10 sm:grid-cols-3 md:mb-16">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon size={20} className="text-primary/70" aria-hidden />
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-manrope text-[16px] leading-[24px] text-body md:text-[18px] md:leading-[28px]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {expedition.intro.length > 0 && (
            <div className="prose-trail mb-14 max-w-[1040px] font-manrope text-[16px] leading-[26px] text-body/80 md:mb-20 md:text-[18px] md:leading-[29px]">
              {expedition.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {expedition.itinerary.length > 0 && (
            <section aria-labelledby="itinerary-heading" className="mb-16 md:mb-24">
              <SectionHeading id="itinerary-heading" bold="The" italic="Itinerary" tone="sage" className="mb-8 md:mb-10" />
              <ol className="space-y-8 md:space-y-10">
                {expedition.itinerary.map((day, i) => (
                  <li key={i} className="grid grid-cols-1 gap-2 md:grid-cols-[200px_1fr] md:gap-10">
                    <div>
                      <p className="font-manrope text-[16px] font-medium leading-[24px] text-primary/80 md:text-[18px]">{day.day}:</p>
                      {day.elevation && <p className="font-serif text-[16px] leading-[24px] text-primary/70">{day.elevation}</p>}
                    </div>
                    <div>
                      <h3 className="mb-2 font-serif text-[22px] font-medium leading-[28px] text-dark md:text-[24px] md:leading-[32px]">{day.title}</h3>
                      {day.body && <p className="font-inter text-[15px] leading-[25px] text-body/75 md:text-[16px] md:leading-[26px]">{day.body}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <SelectedFrames images={expedition.frames} title={expedition.name} />

          <div className="mx-auto mt-14 max-w-[640px] text-center md:mt-20">
            {expedition.fieldNote && (
              <p className="mb-10 font-serif text-[18px] italic leading-[28px] text-body/75 md:text-[20px] md:leading-[30px]">{expedition.fieldNote}</p>
            )}
            <div className="mx-auto mb-6 h-px w-[160px] bg-body/40" aria-hidden />
            <p className="font-manrope text-[16px] font-semibold leading-[24px] text-body md:text-[18px]">
              {expedition.name}, {expedition.country}
            </p>
            {(expedition.dateRange || expedition.dateLabel) && (
              <p className="font-manrope text-[16px] leading-[28px] text-body/80 md:text-[18px]">{expedition.dateRange || expedition.dateLabel}</p>
            )}
            <div className="mt-10">
              <ArrowLink href="/expeditions" size="sm" tone="primary">
                All expeditions
              </ArrowLink>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
