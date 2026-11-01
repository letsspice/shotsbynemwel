import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import heroImage from "@/app/assets/hero/shotbynemwel-hero.png";
import SiteHeader from "@/app/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "Oops! Wrong Summit",
  robots: { index: false },
};

/** Full-screen photo with the logo and socials only, as in the designer's 404 frame. */
export default function NotFound() {
  return (
    <div className="relative flex min-h-svh w-full flex-col overflow-hidden bg-dark">
      <Image src={heroImage} alt="" fill priority placeholder="blur" className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-black/45" aria-hidden />

      <header className="relative z-10">
        <SiteHeader variant="minimal" />
      </header>

      <main id="main" className="site-gutter relative z-10 flex flex-1 items-center justify-center pb-24 text-center">
        <div className="max-w-[960px]">
          <h1 className="mb-6 font-serif text-[44px] font-bold leading-[1.05] text-offwhite md:text-[72px] lg:text-[88px]">
            Oops! Wrong Summit
          </h1>
          <p className="mx-auto mb-10 max-w-[520px] font-manrope text-[16px] leading-[26px] text-offwhite/90 md:text-[18px] md:leading-[28px]">
            You’ve wandered off the trail. This path doesn’t exist on any map. The view’s still worth it though. Let’s get
            you back on track.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-[18px] rounded-md px-6 py-3 transition-transform hover:scale-[1.02] focus-visible:outline-offwhite"
          >
            Return To Basecamp
            <ArrowRight size={20} aria-hidden />
          </Link>
        </div>
      </main>
    </div>
  );
}
