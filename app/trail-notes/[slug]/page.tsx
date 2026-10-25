import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/app/components/layout/PageHero";
import Footer from "@/app/components/sections/Footer";
import ArrowLink from "@/app/components/ui/ArrowLink";
import SelectedFrames from "@/app/components/expeditions/SelectedFrames";
import { getPublished, getPublishedBySlug } from "@/lib/content/queries";
import { assetUrl } from "@/lib/assets";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string) {
  if (!iso) return "";
  const date = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export async function generateStaticParams() {
  const stories = await getPublished("trailStories");
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = await getPublishedBySlug("trailStories", (await params).slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/trail-notes/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.excerpt,
      images: [{ url: assetUrl(story.featuredImage), alt: story.title }],
    },
  };
}

export default async function TrailNotePage({ params }: Props) {
  const story = await getPublishedBySlug("trailStories", (await params).slug);
  if (!story) notFound();

  const date = formatDate(story.date);
  const meta = [story.category, date, story.readTime].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: story.title,
            description: story.excerpt,
            image: absoluteUrl(assetUrl(story.featuredImage)),
            url: absoluteUrl(`/trail-notes/${story.slug}`),
            ...(story.date ? { datePublished: story.date } : {}),
            dateModified: story.updatedAt,
            author: { "@type": "Person", name: "Nemwel Boniface" },
          }),
        }}
      />
      <PageHero image={assetUrl(story.featuredImage)} imageAlt="" title={story.title} size="short" titleFont="sans" />

      <main id="main" className="section-pad">
        <article className="site-container">
          {meta.length > 0 && (
            <p className="mb-10 border-b border-border pb-8 text-center font-manrope text-[16px] leading-[24px] text-body md:text-[18px]">
              {meta.join(" · ")}
            </p>
          )}

          <div className="prose-trail mx-auto mb-16 max-w-[760px] font-manrope text-[16px] leading-[28px] text-body/80 md:text-[18px] md:leading-[30px]">
            <p className="font-serif text-[22px] italic leading-[32px] text-body md:text-[26px] md:leading-[36px]">{story.excerpt}</p>
            {story.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <SelectedFrames images={story.images} title={story.title} />

          <div className="mt-14 text-center">
            <div className="mx-auto mb-8 h-px w-[160px] bg-body/40" aria-hidden />
            <ArrowLink href="/trail-notes" size="sm" tone="primary">
              More trail notes
            </ArrowLink>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
