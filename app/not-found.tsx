import heroImage from "@/app/assets/hero/shotbynemwel-hero.png";
import PageHero from "@/app/components/layout/PageHero";
import ArrowLink from "@/app/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <>
      <PageHero image={heroImage} imageAlt="" title="Off the trail." subtitle="This page doesn’t exist, or it has moved." size="short" />
      <main id="main" className="section-pad">
        <div className="site-container flex flex-wrap gap-x-12 gap-y-4">
          <ArrowLink href="/">Back home</ArrowLink>
          <ArrowLink href="/expeditions">Browse expeditions</ArrowLink>
        </div>
      </main>
    </>
  );
}
