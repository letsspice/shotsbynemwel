import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/layout/SiteHeader";
import Footer from "@/app/components/sections/Footer";
import ArrowLink from "@/app/components/ui/ArrowLink";
import TrailNoteTeaser from "@/app/components/stories/TrailNoteTeaser";
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

/** A body paragraph starting with "## " is a subheading. */
function parseBody(paragraphs: string[]) {
  return paragraphs.map((text) =>
    text.startsWith("## ") ? { kind: "heading" as const, text: text.slice(3).trim() } : { kind: "paragraph" as const, text },
  );
}

export default async function TrailNotePage({ params }: Props) {
  const { slug } = await params;
  const [story, published] = await Promise.all([getPublishedBySlug("trailStories", slug), getPublished("trailStories")]);
  if (!story) notFound();

  const details = [
    { label: "Where", value: story.location },
    { label: "Terrain", value: story.terrain },
    { label: "When", value: formatDate(story.date) },
    { label: "Read", value: story.readTime },
  ].filter((d) => d.value);

  // Until a note has a body, its excerpt stands in as the opening paragraph.
  const blocks = parseBody(story.body.length ? story.body : [story.excerpt].filter(Boolean));
  const leadIndex = blocks.findIndex((b) => b.kind === "paragraph");

  // "While the boots dry": the next two notes after this one, wrapping around the list.
  const index = published.findIndex((s) => s.id === story.id);
  const related = [...published.slice(index + 1), ...published.slice(0, index)].slice(0, 2);

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
      <header>
        <SiteHeader tone="dark" />
      </header>

      <main id="main" className="site-gutter pb-16 pt-6 md:pb-24 md:pt-10">
        <article className="site-container">
          <h1 className="mx-auto mb-10 max-w-[900px] text-center font-serif text-[40px] font-bold leading-[1.1] text-dark md:mb-16 md:text-[60px]">
            {story.title}
          </h1>

          <div className={details.length ? "grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:gap-16 xl:gap-24" : "mx-auto max-w-[760px]"}>
            {details.length > 0 && (
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-border py-5 sm:grid-cols-4 lg:grid-cols-1 lg:self-start lg:border-y-0 lg:py-0">
                {details.map(({ label, value }) => (
                  <div key={label} className="lg:border-b lg:border-border lg:pb-4">
                    <dt className="font-manrope text-[14px] font-semibold leading-[22px] text-dark md:text-[15px]">{label}</dt>
                    <dd className="font-manrope text-[14px] leading-[22px] text-body/80 md:text-[15px]">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="max-w-[760px]">
              <div className="font-manrope text-[16px] leading-[28px] text-body/80 md:text-[17px] md:leading-[29px]">
                {blocks.map((block, i) =>
                  block.kind === "heading" ? (
                    <h2 key={i} className="mb-3 mt-8 font-manrope text-[20px] font-semibold leading-[28px] text-dark md:text-[22px] md:leading-[30px]">
                      {block.text}
                    </h2>
                  ) : i === leadIndex ? (
                    <p key={i} className="drop-cap mb-6 font-serif text-[22px] leading-[32px] text-dark md:text-[26px] md:leading-[36px]">
                      {block.text}
                    </p>
                  ) : (
                    <p key={i} className="mb-4">
                      {block.text}
                    </p>
                  ),
                )}
              </div>

              {story.signOff && (
                <p className="mt-10 text-right font-serif text-[20px] italic leading-[28px] text-primary/80 md:text-[22px]">{story.signOff}</p>
              )}
            </div>
          </div>
        </article>

        <section aria-labelledby="more-notes-heading" className="site-container mt-16 md:mt-24">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 id="more-notes-heading" className="font-manrope text-[24px] font-medium leading-[32px] text-dark md:text-[32px] md:leading-[40px]">
              While the boots dry,
            </h2>
            <ArrowLink href="/trail-notes" size="sm" tone="primary">
              Back to all trail notes
            </ArrowLink>
          </div>
          {related.length > 0 && (
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
              {related.map((note) => (
                <li key={note.id}>
                  <TrailNoteTeaser story={note} variant="card" imageSide="left" headingLevel="h3" />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
