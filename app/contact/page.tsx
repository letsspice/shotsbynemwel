import type { Metadata } from "next";
import Image from "next/image";
import { Instagram, Mail } from "lucide-react";
import contactImage from "@/app/assets/about/shotofnemwelatmackinderscamp.png";
import SiteHeader from "@/app/components/layout/SiteHeader";
import Footer from "@/app/components/sections/Footer";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Nemwel about photography projects, collaborations and mountain conversations.",
  alternates: { canonical: "/contact" },
};

const contactLink = "inline-flex items-center gap-3 font-manrope text-[16px] leading-[24px] text-body transition-colors hover:text-primary md:text-[18px]";

export default function ContactPage() {
  return (
    <>
      <header>
        <SiteHeader tone="dark" />
      </header>

      <main id="main" className="site-gutter pb-0 pt-6 md:pt-10">
        <div className="site-container">
          <h1 className="mb-10 text-center font-serif text-[44px] font-bold leading-[1.1] text-dark md:mb-14 md:text-[64px]">
            Let’s connect
          </h1>

          <div className="mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-start md:justify-between md:gap-12">
            <p className="body-standard max-w-[640px]">
              I’m Nemwel, a photographer and hiker drawn to East Africa’s mountains. I’m always open to thoughtful projects
              and conversations with people who love adventure.
            </p>
            <ul className="flex shrink-0 flex-col gap-4">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`${contactLink} underline underline-offset-4`}>
                  <Mail size={18} aria-hidden />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className={contactLink}>
                  <Instagram size={18} aria-hidden />
                  {INSTAGRAM_HANDLE}
                  <span className="sr-only">on Instagram (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Polaroid-style frame that overlaps the footer's mountain backdrop. */}
          <figure className="relative z-10 -mb-[140px] bg-white p-3 pb-4 shadow-[0_18px_40px_rgba(15,17,21,0.12)] md:-mb-[200px] md:p-4 md:pb-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[1072/400]">
              <Image
                src={contactImage}
                alt="Nemwel leaning on the Mackinders Camp sign on Mount Kenya"
                fill
                placeholder="blur"
                className="object-cover object-[50%_42%]"
                sizes="(max-width: 1340px) 100vw, 1240px"
              />
            </div>
            <figcaption className="mt-3 font-serif text-[18px] italic leading-[24px] text-primary/80 md:text-[20px]">Usually outside</figcaption>
          </figure>
        </div>
      </main>

      <Footer variant="compact" />
    </>
  );
}
