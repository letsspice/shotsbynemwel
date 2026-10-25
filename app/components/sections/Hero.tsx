import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import heroImage from "@/app/assets/hero/shotbynemwel-hero.png";
import SiteHeader from "@/app/components/layout/SiteHeader";

export default function Hero() {
  return (
    <header className="relative min-h-[600px] h-[85svh] max-h-[900px] w-full overflow-hidden md:min-h-[680px]">
      <Image
        src={heroImage}
        alt="Green valley between East African mountains at sunrise"
        fill
        priority
        placeholder="blur"
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Designer: #000000 fill at 40% */}
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      <div className="relative z-10 flex h-full flex-col">
        <SiteHeader />

        <div className="site-gutter flex flex-1 items-center pb-16">
          <div className="max-w-5xl">
            <h1 className="mb-6">
              <span className="hero-heading-1 block">Exploring East Africa’s</span>
              <span className="hero-heading-2 block">Peaks</span>
            </h1>

            <p className="hero-paragraph mb-8 max-w-[560px]">
              Photographic stories from East Africa’s mountains, focused on the spirit of exploration.
            </p>

            <Link
              href="/expeditions"
              className="btn-primary inline-flex items-center gap-[18px] rounded-md px-6 py-3 transition-transform hover:scale-[1.02] focus-visible:outline-offwhite"
            >
              View Expeditions
              <ArrowRight size={20} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
