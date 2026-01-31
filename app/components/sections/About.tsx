import Image from "next/image";
import aboutImage from "@/app/assets/about/shotofnemwelatmackinderscamp.png";

export default function About() {
  return (
    <section
      className="section-pad bg-background"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-14 md:flex-row md:items-center">
        {/* Text Content */}
        <div className="flex-1">
          <h2 id="about-heading" className="mb-6">
            <span className="subheading-bold text-dark">
              The Hiker’s{" "}
            </span>
            <span className="subheading-italic text-dark">
              Perspective
            </span>
          </h2>

          <p className="body-standard max-w-xl">
            Every trail teaches something different. Mount Kenya taught
            me patience during a three day storm that turned my planned
            day hike into a lesson in humility. The Aberdare Ranges showed
            me that getting lost sometimes leads to the most honest
            photographs. Mount Elgon reminded me that the best stories
            happen when the camera stays in the bag.
          </p>
        </div>

        {/* Image */}
        <div className="flex-1">
          <div className="relative h-[350px] w-full max-w-[610px] overflow-hidden rounded-imageB">
            <Image
              src={aboutImage}
              alt="Nemwel standing at Mackinder’s Camp on Mount Kenya"
              fill
              className="object-cover rounded-image-b"
              sizes="(max-width: 768px) 100vw, 610px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
