"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const year = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
  };

  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-background">
      {/* 1. Background & Multi-Layered Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/footer/mountain-footer-bg.png"
          alt="Mountain landscape"
          fill
          className="object-cover object-bottom" // Focused on the base of the mountains
          priority
        />
        
        {/* TOP GRADIENT: The "Mist" that clears at the middle - Adjusted for mobile blend */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(180deg, #F8F9FB 0%, #F8F9FB 15%, rgba(248, 249, 251, 0.8) 30%, rgba(248, 249, 251, 0) 50%)"
          }}
        />
        {/* BOTTOM GRADIENT: Subtle Olive Wrap for text legibility */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            background: "linear-gradient(0deg, rgba(15, 17, 21, 0.95) 0%, rgba(15, 17, 21, 0.6) 25%, rgba(15, 17, 21, 0) 60%)"
          }}
        />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-30 px-6 md:px-[100px] pt-[80px] md:pt-[140px] pb-[40px]">
        <div className="max-w-[1238px] mx-auto">
          
          {/* Newsletter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-[80px] md:mb-[160px] items-start">
            <div>
              <h2 className="tracking-[-0.0128em]">
                <span className="font-manrope font-bold text-[36px] md:text-[48px] leading-[44px] md:leading-[60px] text-dark block md:inline">
                  Trail notes{" "}
                </span>
                <span className="font-serif italic font-normal text-[40px] md:text-[52px] leading-[48px] md:leading-[64px] text-dark tracking-[0.002em]">
                  Delivered
                </span>
              </h2>
            </div>
            <div className="flex flex-col">
              <p className="font-manrope font-normal text-[16px] md:text-[20px] leading-[26px] md:leading-[32px] text-body opacity-80 mb-8 max-w-[500px]">
                Subscribe and get every new trail note as soon as I&apos;m back from the mountain. 
                Insights, stories and lessons from every hike.
              </p>
              
              {/* Newsletter Form: Styled as a pill to match mobile UI */}
              <form onSubmit={handleSubmit} className="relative w-full max-w-[480px]">
                <div className="relative flex items-center p-1 border border-dark/20 rounded-full bg-white/10 backdrop-blur-[4px] transition-all focus-within:border-accent-green">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-transparent px-5 md:px-6 py-3 font-inter font-normal text-[16px] md:text-[18px] text-dark placeholder:text-dark/40 outline-none w-full"
                    aria-label="Email subscription"
                  />
                  
                  <div className="group/btn relative">
                    <button
                      type="submit"
                      disabled
                      className="px-6 md:px-8 py-2.5 md:py-3 bg-primary rounded-full font-inter font-medium text-[16px] md:text-[18px] leading-[24px] text-offwhite transition-all cursor-not-allowed whitespace-nowrap"
                    >
                      Subscribe
                    </button>
                    <div className="absolute bottom-full right-0 mb-4 w-64 p-3 bg-dark text-offwhite text-[14px] leading-snug rounded-xl opacity-0 pointer-events-none group-hover/btn:opacity-100 transition-all duration-300 shadow-2xl z-50">
                      Disabled for now but will be re enabled when emailing service is in place.
                      <div className="absolute top-full right-8 w-3 h-3 bg-dark rotate-45 -translate-y-1.5"></div>
                    </div>
                  </div>
                </div>
                {error && <p className="absolute left-6 top-full mt-2 text-accent-red text-sm font-manrope">{error}</p>}
              </form>
            </div>
          </div>

          {/* Footer Navigation & Branding: Centered on mobile as per design */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-8">
            <nav className="flex flex-wrap justify-center gap-x-[32px] md:gap-x-[48px] gap-y-4">
              {['Expeditions', 'Gallery', 'Trail Notes', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="font-inter font-normal text-[16px] md:text-[18px] leading-[32.4px] text-offwhite/90 hover:text-accent-green transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-8">
              <Link href="https://www.instagram.com/shotbynemwel/" className="text-offwhite/90 hover:text-accent-green transition-colors" aria-label="Instagram" target="_blank">
                <Instagram size={24} />
              </Link>
              <Link href="https://www.tiktok.com/@shotsbynemwel" className="text-offwhite/90 hover:text-accent-green transition-colors" aria-label="TikTok" target="_blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-offwhite/20 mb-8" />

          {/* Attributions: Centered on mobile */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="font-inter font-normal text-[14px] md:text-[18px] leading-[24px] md:leading-[32px] text-offwhite/70">
              © {year} Shot by Nemwel, All Rights Reserved
            </p>
            <p className="font-inter font-normal text-[14px] md:text-[18px] leading-[24px] md:leading-[32px] text-offwhite/70">
              Designed by <Link href="https://www.linkedin.com/in/rachaelngotho/" className="underline decoration-1 underline-offset-4" target="_blank">Rachael</Link>, Developed by <Link href="https://www.linkedin.com/in/nemwel-nyandoro/" className="underline decoration-1 underline-offset-4" target="_blank">Nemwel</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}