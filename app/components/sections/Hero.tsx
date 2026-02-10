"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "@/app/assets/hero/shotbynemwel-hero.png";

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative min-h-[75vh] md:min-h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Mountain landscape in East Africa"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      {/* Content */}
      <div className="relative z-10 flex min-h-[75vh] md:min-h-[90vh] flex-col">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-6 md:px-section-x">
          <Link href="/" className="logo z-50 cursor-pointer">
            Shots by Nemwel
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden gap-8 md:flex">
            {["Expeditions", "Gallery", "Trail Notes", "Contact"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="nav-item transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-offwhite"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile Menu Icon (Visible only on small screens) */}
          <button 
            className="flex cursor-pointer flex-col gap-1.5 z-50 md:hidden" 
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`h-0.5 w-6 bg-offwhite transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}></span>
            <span className={`h-0.5 w-6 bg-offwhite transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`h-0.5 w-6 bg-offwhite transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
          </button>

          {/* Mobile Menu Overlay */}
          <div 
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark/95 transition-transform duration-500 ease-in-out md:hidden ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <ul className="flex flex-col items-center gap-10">
              {["Expeditions", "Gallery", "Trail Notes", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-3xl font-serif italic text-offwhite"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-1 items-center px-6 md:px-section-x">
          <div className="max-w-5xl">
            <h1 className="mb-6">
              <span className="hero-heading-1 block">
                Exploring East Africa’s
              </span>
              <span className="hero-heading-2 block italic">
                Peaks
              </span>
            </h1>

            <p className="hero-paragraph mb-8 max-w-xl">
              Photographic stories from East Africa’s mountains,
              focused on the spirit of exploration.
            </p>

            <Link
              href="#expeditions"
              className="btn-primary inline-flex items-center gap-3 rounded-md px-6 py-3 transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-offwhite"
            >
              View Expeditions 
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}