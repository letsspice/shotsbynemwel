"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/site";
import SectionHeading from "@/app/components/ui/SectionHeading";

/**
 * Designer: heading 48/60 + 52/64, paragraph Manrope 20/32 #222 at 75%, input 1px #222 border with
 * Inter 18/24 text at 75%, button #5C934E with Inter medium 18/24 #F8F9FB, links Inter 18/32.4,
 * social icons 20×20, divider 1px #E5E7EB at 90%, attributions Inter 18/32.
 */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const year = new Date().getFullYear();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return setError("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Please enter a valid email address");
    setError("");
  };

  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-background">
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image src="/assets/footer/mountain-footer-bg.png" alt="" fill className="object-cover object-bottom" sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #F8F9FB 0%, #F8F9FB 22%, rgba(248,249,251,0.85) 40%, rgba(248,249,251,0.35) 58%, rgba(248,249,251,0) 72%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(118,102,54,0.9) 0%, rgba(109,100,62,0.55) 22%, rgba(89,86,64,0) 50%)",
          }}
        />
      </div>

      <div className="site-gutter relative z-10 pb-10 pt-16 md:pt-[120px]">
        <div className="site-container">
          <div className="mb-[220px] grid grid-cols-1 items-start gap-6 md:mb-[260px] lg:grid-cols-2 lg:gap-12">
            <SectionHeading bold="Trail notes" italic="Delivered" />
            <div className="flex flex-col">
              <p className="body-standard mb-8 max-w-[500px]">
                Subscribe and get every new trail note as soon as I&apos;m back from the mountain. Insights, stories and
                lessons from every hike.
              </p>

              <form onSubmit={handleSubmit} noValidate className="relative w-full max-w-[480px]">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="relative flex items-center rounded-full border border-body bg-white/30 p-1 backdrop-blur-[4px] transition-colors focus-within:border-accent-green">
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby="newsletter-help"
                    className="w-full grow bg-transparent px-4 py-2.5 font-inter text-[16px] leading-[24px] text-dark outline-none placeholder:text-body/75 md:px-5 md:text-[18px]"
                  />
                  <button
                    type="submit"
                    disabled
                    aria-describedby="newsletter-help"
                    className="cursor-not-allowed whitespace-nowrap rounded-full bg-accent-green px-5 py-2.5 font-inter text-[16px] font-medium leading-[24px] text-background opacity-90 md:px-7 md:text-[18px]"
                  >
                    Subscribe
                  </button>
                </div>
                <p id="newsletter-help" role={error ? "alert" : undefined} className={`mt-3 pl-5 font-manrope text-sm ${error ? "text-accent-red" : "text-body/70"}`}>
                  {error || "Subscriptions open soon. The email service is being set up."}
                </p>
              </form>
            </div>
          </div>

          <div className="mb-6 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 md:gap-x-12">
                {NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="footer-link transition-opacity hover:opacity-80">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-6">
              <Link href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-offwhite transition-opacity hover:opacity-80" aria-label="Instagram (opens in a new tab)">
                <Instagram size={20} aria-hidden />
              </Link>
              <Link href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-offwhite transition-opacity hover:opacity-80" aria-label="TikTok (opens in a new tab)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mb-6 h-px w-full bg-border/90" />

          <div className="flex flex-col items-center justify-between gap-2 text-center font-inter text-[14px] leading-[24px] text-offwhite md:flex-row md:text-left md:text-[16px] lg:text-[18px] lg:leading-[32px]">
            <p>© {year} Shot by Nemwel, All Rights Reserved</p>
            <p>
              Designed by{" "}
              <Link href="https://www.linkedin.com/in/rachaelngotho/" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4">
                Rachael
              </Link>
              , Developed by{" "}
              <Link href="https://www.linkedin.com/in/nemwel-nyandoro/" target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4">
                Nemwel
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
