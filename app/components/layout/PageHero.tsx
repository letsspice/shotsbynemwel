import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";

interface PageHeroProps {
  image: StaticImageData | string;
  imageAlt: string;
  title: ReactNode;
}

/** Short photo banner with the header on top and a centred serif title (Expeditions and expedition pages). */
export default function PageHero({ image, imageAlt, title }: PageHeroProps) {
  return (
    <header className="relative flex min-h-[240px] w-full flex-col overflow-hidden bg-dark md:min-h-[303px]">
      <Image src={image} alt={imageAlt} fill priority className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-black/40" aria-hidden />
      <div className="relative z-10">
        <SiteHeader />
      </div>
      <div className="site-gutter relative z-10 flex flex-1 items-center justify-center pb-8 md:pb-6">
        <h1 className="text-center font-serif text-[40px] font-semibold leading-[1.1] text-offwhite md:text-[56px] xl:text-[72px]">{title}</h1>
      </div>
    </header>
  );
}
