"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trailStories } from "@/app/data/trailStories";

export default function TrailStories() {
  // Only taking the first two stories for the homepage view
  const featuredStories = trailStories.slice(0, 2);

  return (
    <section id="trail-notes" className="bg-background pb-[70px] px-6 md:px-[100px] w-full overflow-hidden">
      <div className="max-w-[1238px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-[48px]">
          <div className="max-w-[480px]">
            <p className="font-manrope text-[20px] leading-[32px] text-body opacity-75 mb-[24px]">
              Trail Notes is where everything settles for me. After I come down the mountain 
              and my heartbeat slows, this is where my thoughts finally take shape.
            </p>
            <Link 
              href="/blog" 
              className="group inline-flex items-center transition-all duration-300"
              style={{ gap: '18px' }}
            >
              <span className="font-inter font-semibold text-[18px] leading-[24px] text-accent-green">
                Read More
              </span>
              <ArrowRight size={20} className="text-accent-green transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          <h2 className="lg:text-right">
            <span className="subheading-bold text-dark block lg:inline text-[48px] leading-[60px] tracking-[-1.28%]">Stories from the </span>
            <span className="subheading-italic text-dark block lg:inline text-[52px] leading-[64px] tracking-[0.2%]">Trails</span>
          </h2>
        </div>

        {/* Stories Grid: 3-column base for 2/3 and 1/3 split */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          
          {/* Left Block: 2/3 Width */}
          <div className="md:col-span-2">
            <StoryCard story={featuredStories[0]} />
          </div>

          {/* Right Block: 1/3 Width */}
          <div className="md:col-span-1">
            <StoryCard story={featuredStories[1]} />
          </div>
          
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: any }) {
  return (
    <Link 
      href={`/blog/${story.slug}`}
      onClick={(e) => e.preventDefault()}
      aria-disabled="true"
      className="relative w-full h-[400px] md:h-[480px] overflow-hidden rounded-[24px] group block"
    >
      {/* Featured Image */}
      <Image
        src={story.featuredImage}
        alt={story.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
      />

      {/* Designer Gradient: 0% to 90% opacity black bottom fade */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)"
        }}
      />

      {/* Text Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-[32px] md:p-[40px]">
        <h3 
          className="font-manrope font-medium text-offwhite mb-[8px]"
          style={{ 
            fontSize: '28px', 
            lineHeight: '36px', 
            letterSpacing: '-1.28%' 
          }}
        >
          {story.title}
        </h3>
        <p className="font-manrope font-light text-[18px] leading-[32px] text-offwhite line-clamp-2 max-w-[95%]">
          {story.excerpt}
        </p>
      </div>
    </Link>
  );
}