"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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
    <footer className="relative w-full overflow-hidden bg-background">
      {/* 1. Background & Multi-Layered Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/footer/mountain-footer-bg.png"
          alt="Mountain landscape"
          fill
          className="object-cover object-bottom" // Focused on the base of the mountains
          priority
        />
        
        {/* TOP GRADIENT: The "Mist" that clears at the middle */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(180deg, #F8F9FB 0%, #F8F9FB 35%, rgba(248, 249, 251, 0.9) 50%, rgba(248, 249, 251, 0) 65%)"
          }}
        />

        {/* BOTTOM GRADIENT: Subtle Olive Wrap for text legibility */}
        <div 
          className="absolute inset-0 z-20"
          style={{
            background: "linear-gradient(0deg, #595640 0%, #6D643E 15%, rgba(109, 100, 62, 0) 40%)"
          }}
        />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-30 px-6 md:px-[100px] pt-[140px] pb-[40px]">
        <div className="max-w-[1238px] mx-auto">
          
          {/* Newsletter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-[160px] items-start">
            <div>
              <h2 className="tracking-[-0.0128em] whitespace-nowrap">
                <span className="font-manrope font-bold text-[48px] leading-[60px] text-dark">
                  Trail notes{" "}
                </span>
                <span className="font-serif italic font-normal text-[52px] leading-[64px] text-dark tracking-[0.002em]">
                  Delivered
                </span>
              </h2>
            </div>

            <div className="flex flex-col">
              <p className="font-manrope font-normal text-[20px] leading-[32px] text-body opacity-75 mb-8 max-w-[500px]">
                Subscribe and get every new trail note as soon as I&apos;m back from the mountain. 
                Insights, stories and lessons from every hike.
              </p>

              {/* Newsletter Form */}
              <form onSubmit={handleSubmit} className="relative w-full max-w-[480px]">
                <div className="relative flex items-center p-1 border border-body rounded-full bg-white/5 backdrop-blur-[2px] transition-all focus-within:border-accent-green">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow bg-transparent px-6 py-3 font-inter font-normal text-[18px] text-body placeholder:text-body/40 outline-none"
                    aria-label="Email subscription"
                  />
                  
                  <div className="group/btn relative">
                    <button
                      type="submit"
                      disabled
                      className="px-8 py-3 bg-accent-green rounded-full font-inter font-medium text-[18px] leading-[24px] text-offwhite transition-all cursor-not-allowed"
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

          {/* Footer Navigation & Branding */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-8">
            <nav className="flex flex-wrap gap-x-[48px] gap-y-4">
              {['Expeditions', 'Gallery', 'Trail Notes', 'Contact'].map((item) => (
                <Link 
                  key={item} 
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="font-inter font-normal text-[18px] leading-[32.4px] text-offwhite hover:text-accent-green transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <Link href="#" className="text-offwhite hover:text-accent-green transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-offwhite hover:text-accent-green transition-colors" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-border opacity-90 mb-8" />

          {/* Attributions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-inter font-normal text-[18px] leading-[32px] text-offwhite">
              © 2026 Shot by Nemwel, All Rights Reserved
            </p>
            <p className="font-inter font-normal text-[18px] leading-[32px] text-offwhite">
              Designed by <span className="underline decoration-1 underline-offset-4">Rachael</span>, Developed by <span className="underline decoration-1 underline-offset-4">Nemwel</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}