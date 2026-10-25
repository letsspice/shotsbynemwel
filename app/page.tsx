import Hero from "@/app/components/sections/Hero";
import About from "./components/sections/About";
import MountainExpeditions from "./components/sections/MountainExpeditions";
import GallerySection from "./components/sections/GallerySection";
import TrailStories from "./components/sections/TrailStories";
import Footer from "./components/sections/Footer";
import { collections } from "@/lib/content/collections";
import { getFeatured } from "@/lib/content/queries";
import { absoluteUrl, SITE_NAME, SOCIAL_LINKS } from "@/lib/site";

// Statically generated, refreshed on admin saves (revalidatePath) and at most every 5 minutes otherwise.
export const revalidate = 300;

export default async function HomePage() {
  const [expeditions, gallery, stories] = await Promise.all([
    getFeatured("expeditions", collections.expeditions.featuredLimit ?? 5),
    getFeatured("gallery", collections.gallery.featuredLimit ?? 5),
    getFeatured("trailStories", collections.trailStories.featuredLimit ?? 2),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: absoluteUrl("/"),
              sameAs: [SOCIAL_LINKS.tiktok, SOCIAL_LINKS.instagram],
              logo: absoluteUrl("/assets/gallery/LenanaAtFirstLight/lenanaatfirstlight.png"),
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: absoluteUrl("/"),
              potentialAction: {
                "@type": "ReadAction",
                target: [absoluteUrl("/expeditions"), absoluteUrl("/gallery"), absoluteUrl("/trail-notes")],
              },
            },
          ]),
        }}
      />
      <Hero />
      <main id="main">
        <About />
        <MountainExpeditions
          expeditions={expeditions.map(({ id, slug, name, country, altitude, difficulty, description, heroImage, thumbnail }) => ({
            id,
            slug,
            name,
            country,
            altitude,
            difficulty,
            description,
            heroImage,
            thumbnail,
          }))}
        />
        <GallerySection items={gallery} />
        <TrailStories stories={stories} />
      </main>
      <Footer />
    </>
  );
}
