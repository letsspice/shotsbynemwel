import Image from "next/image";
import { assetUrl } from "@/lib/assets";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ArrowLink from "@/app/components/ui/ArrowLink";
import { SOCIAL_LINKS } from "@/lib/site";

/**
 * "Selected Frames": up to three portrait cards fanned out, the middle one upright and in front.
 * With one or two images the fan collapses gracefully.
 */
export default function SelectedFrames({ images, title }: { images: string[]; title: string }) {
  const frames = images.slice(0, 3);
  if (!frames.length) return null;

  // Put the first frame in the centre position when there are three.
  const positions =
    frames.length === 3
      ? [
          { src: frames[1], cls: "-rotate-[8deg] translate-x-[18%] translate-y-4 z-0 w-[34%] sm:w-[38%] max-w-[260px]" },
          { src: frames[0], cls: "z-10 w-[46%] max-w-[340px]" },
          { src: frames[2], cls: "rotate-[8deg] -translate-x-[18%] translate-y-4 z-0 w-[34%] sm:w-[38%] max-w-[260px]" },
        ]
      : frames.map((src, i) => ({
          src,
          cls: `w-[46%] max-w-[320px] ${frames.length === 2 ? (i === 0 ? "-rotate-[4deg]" : "rotate-[4deg] -translate-x-[8%]") : ""}`,
        }));

  return (
    <section id="frames" aria-labelledby="frames-heading" className="scroll-mt-8">
      <SectionHeading id="frames-heading" bold="Selected" italic="Frames" align="right" tone="sage" className="mb-10 md:mb-14" />
      {/* Clip only horizontally so rotated corners never cause sideways scroll, while shadows stay visible. */}
      <div className="flex items-center justify-center overflow-x-clip py-6">
        {positions.map(({ src, cls }, i) => (
          <div key={`${src}-${i}`} className={`relative aspect-[340/520] shrink-0 overflow-hidden rounded-[16px] shadow-[0_18px_40px_rgba(15,17,21,0.18)] ${cls}`}>
            <Image src={assetUrl(src)} alt={`${title}, frame ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 46vw, 340px" />
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center md:mt-12">
        <ArrowLink href={SOCIAL_LINKS.instagram} external size="sm" tone="primary" className="font-manrope font-medium">
          See More on Instagram
        </ArrowLink>
      </div>
    </section>
  );
}
