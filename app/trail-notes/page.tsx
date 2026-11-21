import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/app/components/layout/SiteHeader";
import Footer from "@/app/components/sections/Footer";
import TrailNoteTeaser from "@/app/components/stories/TrailNoteTeaser";
import ArrowLink from "@/app/components/ui/ArrowLink";
import { getPublished } from "@/lib/content/queries";
import { assetUrl } from "@/lib/assets";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Trail Notes",
  description: "Dispatches from the gap between “I’ve got this” and “whose idea was this?”: mishaps, small victories and lessons from the trail.",
  alternates: { canonical: "/trail-notes" },
};

export default async function TrailNotesPage() {
  const [lead, ...rest] = await getPublished("trailStories");

  return (
    <>
      <header>
        <SiteHeader tone="dark" />
      </header>

      <main id="main" className="site-gutter pb-16 pt-6 md:pb-24 md:pt-10">
        <div className="site-container">
          <div className="mb-10 flex flex-col gap-4 md:mb-[90px] md:flex-row md:items-center md:justify-between md:gap-12">
            <h1 className="font-serif text-[44px] font-bold leading-[1.1] text-dark md:text-[60px] xl:text-[72px]">Things went sideways</h1>
            <p className="max-w-[330px] font-manrope text-[16px] leading-[26px] text-body/75 md:text-[20px] md:leading-[30px]">
              Dispatches from the gap between “I’ve got this” and “whose idea was this?” Mishaps, small victories and lessons
              with mud on them.
            </p>
          </div>

          {!lead ? (
            <p className="body-standard">The first trail notes are being written. Check back soon.</p>
          ) : (
            <>
              <article className="mb-14 grid grid-cols-1 items-center gap-6 md:mb-20 md:grid-cols-2 md:gap-10 lg:gap-12">
                <figure>
                  <div className="relative aspect-[594/432] w-full overflow-hidden rounded-[20px] bg-border">
                    <Image src={assetUrl(lead.featuredImage)} alt="" fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 600px" />
                  </div>
                  {lead.imageCaption && (
                    <figcaption className="mt-3 font-serif text-[18px] italic leading-[28px] text-primary/80 md:text-[22px] md:leading-[32px]">{lead.imageCaption}</figcaption>
                  )}
                </figure>
                <div>
                  <h2 className="mb-5 font-manrope text-[32px] font-medium leading-[40px] tracking-[-0.0128em] text-dark md:text-[40px] md:leading-[48px] xl:text-[48px] xl:leading-[52px]">
                    {lead.title}
                  </h2>
                  {lead.excerpt && <p className="body-standard mb-8">{lead.excerpt}</p>}
                  <ArrowLink href={`/trail-notes/${lead.slug}`} size="lg" tone="primary">
                    Read the whole note<span className="sr-only">: {lead.title}</span>
                  </ArrowLink>
                </div>
              </article>

              {rest.length > 0 && (
                <ul className="divide-y divide-border">
                  {rest.map((story, i) => (
                    <li key={story.id} className="py-6">
                      <TrailNoteTeaser story={story} imageSide={i % 2 === 0 ? "right" : "left"} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
