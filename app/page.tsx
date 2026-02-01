import Hero from "@/app/components/sections/Hero";
import About from "./components/sections/About";
import MountainExpeditions from "./components/sections/MountainExpeditions";
import GallerySection from "./components/sections/GallerySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <MountainExpeditions />
      <GallerySection />
      {/* Other sections will follow here */}
    </>
  );
}
