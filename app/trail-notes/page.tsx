import type { Metadata } from "next";
import PageHero from "@/app/components/layout/PageHero";
import Footer from "@/app/components/sections/Footer";
import StoryCard from "@/app/components/stories/StoryCard";
import { getPublished } from "@/lib/content/queries";
import { assetUrl } from "@/lib/assets";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Trail Notes",
  description: "Stories from the trails: insights, lessons and the thoughts that take shape after every hike.",
  alternates: { canonical: "/trail-notes" },
};

export default async function TrailNotesPage() {
  const stories = await getPublished("trailStories");
  const heroImage = stories[0]?.featuredImage ?? "footer/mountain-footer-bg.png";

  return (
    <>
      <PageHero
        image={assetUrl(heroImage)}
        imageAlt=""
        title="Stories from the Trails."
        subtitle="Trail Notes is where everything settles for me. After I come down the mountain and my heartbeat slows, this is where my thoughts finally take shape."
      />
      <main id="main" className="section-pad">
        <div className="site-container">
          {stories.length === 0 ? (
            <p className="body-standard">The first trail notes are being written. Check back soon.</p>
          ) : (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, i) => (
                <li key={story.id} className={i === 0 && stories.length > 2 ? "md:col-span-2" : ""}>
                  <StoryCard story={story} headingLevel="h2" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
