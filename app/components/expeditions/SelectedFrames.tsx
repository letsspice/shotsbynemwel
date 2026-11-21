import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import SectionHeading from "@/app/components/ui/SectionHeading";

const card = "relative shrink-0 overflow-hidden rounded-[24px] shadow-[0_18px_40px_rgba(15,17,21,0.18)] transition-transform duration-500 ease-out motion-reduce:transition-none";
const side = "aspect-[258/490] w-[30%] max-w-[258px]";
const centre = "z-10 aspect-[366/576] w-[40%] max-w-[366px]";

/**
 * "Selected Shots": three portrait cards fanned out behind a larger upright one. On hover the
 * side cards straighten and slide out into a row, as in the prototype. With one or two images
 * the cards simply sit side by side.
 */
export default function SelectedFrames({ images, title }: { images: string[]; title: string }) {
  const frames = images.slice(0, 3);
  if (!frames.length) return null;

  // Put the first frame in the centre position when there are three.
  const positions =
    frames.length === 3
      ? [
          { src: frames[1], cls: `${side} translate-x-[40%] -rotate-[8deg] group-hover:translate-x-0 group-hover:rotate-0` },
          { src: frames[0], cls: centre },
          { src: frames[2], cls: `${side} -translate-x-[40%] rotate-[8deg] group-hover:translate-x-0 group-hover:rotate-0` },
        ]
      : frames.map((src) => ({ src, cls: centre }));

  return (
    <section id="frames" aria-labelledby="frames-heading" className="scroll-mt-8">
      <SectionHeading id="frames-heading" bold="Selected" italic="Shots" align="right" className="mb-10 md:mb-12" />
      {/* Clip only horizontally so rotated corners never cause sideways scroll, while shadows stay visible. */}
      <div className="group flex items-center justify-center gap-4 overflow-x-clip py-6 md:gap-[57px]">
        {positions.map(({ src, cls }, i) => (
          <div key={`${src}-${i}`} className={`${card} ${cls}`}>
            <Image src={assetUrl(src)} alt={`${title}, shot ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 40vw, 366px" />
          </div>
        ))}
      </div>
    </section>
  );
}
