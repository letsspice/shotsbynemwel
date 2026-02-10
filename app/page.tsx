import Hero from "@/app/components/sections/Hero";
import About from "./components/sections/About";
import MountainExpeditions from "./components/sections/MountainExpeditions";
import GallerySection from "./components/sections/GallerySection";
import TrailStories from "./components/sections/TrailStories";
import Footer from "./components/sections/Footer";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Schema: Organization + WebSite */}
      <script
        type="application/ld+json"
        // Using `dangerouslySetInnerHTML` to inject JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Shots by Nemwel",
            url:
              process.env.NEXT_PUBLIC_SITE_URL ?? "https://shotsbynemwel.netlify.app/",
            sameAs: [
              "https://www.tiktok.com/@shotsbynemwel",
              "https://www.instagram.com/shotbynemwel/",
            ],
            logo: "/assets/gallery/LenanaAtFirstLight/lenanaatfirstlight.png",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Shots by Nemwel",
            url:
              process.env.NEXT_PUBLIC_SITE_URL ?? "https://shotsbynemwel.netlify.app/",
            potentialAction: {
              "@type": "ReadAction",
              target: [
                (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shotsbynemwel.netlify.app/") +
                  "#expeditions",
                (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shotsbynemwel.netlify.app/") +
                  "#gallery",
                (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shotsbynemwel.netlify.app/") +
                  "#trail-notes",
              ],
            },
          }),
        }}
      />
      <Hero />
      <About />
      <MountainExpeditions />
      <GallerySection />
      <TrailStories />
      <Footer />
    </>
  );
}
