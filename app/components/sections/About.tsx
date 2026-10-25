import Image from "next/image";
import aboutImage from "@/app/assets/about/shotofnemwelatmackinderscamp.png";
import SectionHeading from "@/app/components/ui/SectionHeading";

/** Designer: 70px top/bottom, 100px sides, 56px gap, image 610×350. Mobile shows the image first. */
export default function About() {
  return (
    <section id="about" className="section-pad scroll-mt-4 bg-background" aria-labelledby="about-heading">
      <div className="site-container flex flex-col gap-8 md:flex-row md:items-center md:gap-10 xl:gap-14">
        <div className="flex-1 md:order-1">
          <SectionHeading id="about-heading" bold="The Hiker’s" italic="Perspective" className="mb-4 md:mb-6" />
          <p className="body-standard max-w-xl">
            Every trail teaches something different. Mount Kenya taught me patience during a three day storm that turned
            my planned day hike into a lesson in humility. The Aberdare Ranges showed me that getting lost sometimes leads
            to the most honest photographs. Mount Elgon reminded me that the best stories happen when the camera stays in
            the bag.
          </p>
        </div>

        <div className="relative aspect-[610/350] w-full overflow-hidden order-first rounded-[16px] md:order-2 md:max-w-[610px] md:flex-1 md:rounded-image-b">
          <Image
            src={aboutImage}
            alt="Nemwel standing beside the Mackinders Camp sign on Mount Kenya"
            fill
            placeholder="blur"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 610px"
          />
        </div>
      </div>
    </section>
  );
}
