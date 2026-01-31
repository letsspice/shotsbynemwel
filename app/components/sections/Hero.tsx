import Image from "next/image";
import Link from "next/link";
import heroImage from "@/app/assets/hero/shotbynemwel-hero.png";

export default function Hero() {
  return (
    <header className="relative min-h-[90vh] w-full overflow-hidden">
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
      <div className="relative z-10 flex min-h-[90vh] flex-col">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-6 md:px-section-x">
          <div className="logo">
            Shots by Nemwel
          </div>

          <ul className="hidden gap-8 md:flex">
            {["Expeditions", "Gallery", "Trail Notes", "Contact"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="nav-item transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-offwhite"
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
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
              href="#"
              className="btn-primary inline-flex items-center gap-3 rounded-md px-6 py-3 transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-offwhite"
            >
              View Expeditions →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}