"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryItems } from "@/app/data/gallery";

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-background pb-section-y px-6 md:px-section-x w-full overflow-hidden">
      <div className="max-w-[1238px] mx-auto">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-[48px]">
          <h2 className="flex items-baseline gap-3">
            <span className="subheading-bold text-dark">Trail</span>
            <span className="subheading-italic text-dark">Gallery</span>
          </h2>
          <p className="max-w-[480px] font-manrope text-[20px] leading-[32px] text-body opacity-75">
            Moments captured along the trails that tell the story of East Africa’s majestic landscapes and the journey to conquer them.
          </p>
        </div>

        {/* 2. Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] items-start">
          
          {/* Column 1: Small + Small */}
          <div className="flex flex-col gap-[24px]">
            <GalleryCard item={galleryItems[0]} />
            <GalleryCard item={galleryItems[1]} />
          </div>

          {/* Column 2: Tall (Kilimanjaro) */}
          <div className="h-full">
            <GalleryCard item={galleryItems[2]} isTall />
          </div>

          {/* Column 3: Small + Small */}
          <div className="flex flex-col gap-[24px]">
            <GalleryCard item={galleryItems[3]} />
            <GalleryCard item={galleryItems[4]} />
          </div>
        </div>

        {/* 3. Footer Button */}
        <div className="flex justify-center mt-[48px]">
          <Link 
            href="https://www.instagram.com/shotbynemwel/" 
            target="_blank"
            className="group flex items-center transition-all duration-300"
            style={{ gap: '18px' }}
          >
            <span className="font-inter font-semibold text-[18px] leading-[24px] text-accent-green">
              Explore More on IG
            </span>
            <ArrowRight size={22} className="text-accent-green transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, isTall = false }: { item: any, isTall?: boolean }) {
  return (
    <Link 
      href={`/gallery/${item.slug}`}
      onClick={(e) => e.preventDefault()}
      aria-disabled="true"
      className={`relative w-full overflow-hidden rounded-[16px] group block ${
        isTall ? "h-[450px] md:h-[624px]" : "h-[250px] md:h-[300px]"
      }`}
    >
      {/* Image with smooth hover scale */}
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 400px"
      />

      {/* Designer Gradient: 0% opacity black (top) to 60% opacity black (bottom) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)"
        }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-[24px]">
        <h3 className="font-inter text-[20px] leading-[28px] text-offwhite mb-[4px]">
          {item.title}
        </h3>
        <p className="font-inter text-[14px] leading-[20px] text-offwhite opacity-70">
          {item.location} • {item.altitude}
        </p>
      </div>
    </Link>
  );
}