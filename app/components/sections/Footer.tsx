"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";
import SectionHeading from "@/app/components/ui/SectionHeading";
import SocialLinks from "@/app/components/ui/SocialLinks";

const copyright = `© ${new Date().getFullYear()} Shots by Nemwel, All Rights Reserved`;
const smallText = "font-inter text-[14px] leading-[24px] text-offwhite md:text-[16px] lg:text-[18px] lg:leading-[32px]";

/**
 * Designer: heading 48/60 + 52/64, paragraph Manrope 20/32 #222 at 75%, input 1px #222 border with
 * Inter 18/24 text at 75%, button #5C934E with Inter medium 18/24 #F8F9FB, links Inter 18/32.4,
 * social icons 20×20, divider 1px #E5E7EB at 90%, attributions Inter 18/32.
 *
 * Variants: "full" (newsletter + links), "compact" (links only, Contact page) and
 * "minimal" (copyright only, Privacy page).
 */
export default function Footer({ variant = "full" }: { variant?: "full" | "compact" | "minimal" }) {
  return (
    <footer className="relative w-full overflow-hidden bg-background">
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

      <div className={`site-gutter relative z-10 pb-10 ${variant === "full" ? "pt-16 md:pt-[120px]" : "pt-[200px] md:pt-[260px]"}`}>
        <div className="site-container">
          {variant === "full" && <Newsletter />}
          {variant === "minimal" ? <p className={`text-center ${smallText}`}>{copyright}</p> : <FooterLinks />}
        </div>
      </div>
    </footer>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return setError("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Please enter a valid email address");
    setError("");
  };

  return (
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
  );
}

function FooterLinks() {
  return (
    <>
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
        <div className="flex items-center gap-8 text-offwhite">
          <Link href="/privacy" className="footer-link transition-opacity hover:opacity-80">
            Privacy Policy
          </Link>
          <SocialLinks />
        </div>
      </div>

      <div className="mb-6 h-px w-full bg-border/90" />

      <div className={`flex flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left ${smallText}`}>
        <p>{copyright}</p>
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
    </>
  );
}
