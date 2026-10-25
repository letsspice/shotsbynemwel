import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";

interface PageHeroProps {
  image: StaticImageData | string;
  imageAlt: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** "tall" for listing pages, "short" for detail pages. */
  size?: "tall" | "short";
  /** Serif title for listing pages, sans for detail pages (as in the designs). */
  titleFont?: "serif" | "sans";
}

export default function PageHero({ image, imageAlt, title, subtitle, size = "tall", titleFont = "serif" }: PageHeroProps) {
  const height = size === "tall" ? "min-h-[440px] md:min-h-[500px]" : "min-h-[340px] md:min-h-[360px]";
  const titleClass =
    titleFont === "serif"
      ? "font-serif font-medium text-[40px] leading-[44px] md:text-[56px] md:leading-[60px] xl:text-[64px] xl:leading-[68px]"
      : "font-manrope font-medium text-[36px] leading-[44px] md:text-[52px] md:leading-[60px] xl:text-[64px] xl:leading-[72px] tracking-[-0.0128em]";

  return (
    <header className={`relative w-full overflow-hidden bg-dark ${height}`}>
      <Image src={image} alt={imageAlt} fill priority className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-black/40" aria-hidden />
      <div className={`relative z-10 flex flex-col ${height}`}>
        <SiteHeader />
        <div className="site-gutter flex flex-1 items-end pb-12 md:pb-14">
          <div className="site-container">
            <h1 className={`max-w-[760px] text-offwhite ${titleClass}`}>{title}</h1>
            {subtitle && (
              <p className="mt-4 max-w-[620px] font-manrope text-[16px] leading-[26px] text-offwhite/90 md:text-[18px] md:leading-[28px]">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
