import Hero from "@/app/components/sections/Hero";
import About from "./components/sections/About";
import MountainExpeditions from "./components/sections/MountainExpeditions";
import GallerySection from "./components/sections/GallerySection";
import TrailStories from "./components/sections/TrailStories";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <MountainExpeditions />
      <GallerySection />
      <TrailStories />
      {/* Other sections will follow here */}
    </>
  );
}
