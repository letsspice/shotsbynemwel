import Hero from "@/app/components/sections/Hero";
import About from "./components/sections/About";
import MountainExpeditions from "./components/sections/MountainExpeditions";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <MountainExpeditions />
      {/* Other sections will follow here */}
    </>
  );
}
