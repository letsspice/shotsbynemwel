import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Manrope,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter-family",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope-family",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  // Site-wide metadata leveraging Next.js Metadata API
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://shotsbynemwel.netlify.app"),
  title: {
    default: "Shots by Nemwel - Hiking Stories & Outdoor Photography",
    template: "%s | Shots by Nemwel",
  },
  description:
    "Photographic stories from East Africa’s mountains — trail notes, expeditions, and a curated gallery of outdoor visuals.",
  keywords: [
    "Shots by Nemwel",
    "Nemwel",
    "East Africa",
    "mountain photography",
    "hiking",
    "trail stories",
    "Mount Kenya",
    "Kilimanjaro",
    "Aberdares",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Shots by Nemwel - Hiking Stories & Outdoor Photography",
    description:
      "Photographic stories from East Africa’s mountains — trail notes, expeditions, and a curated gallery of outdoor visuals.",
    siteName: "Shots by Nemwel",
    images: [
      {
        url: "/assets/gallery/LenanaAtFirstLight/lenanaatfirstlight.png",
        alt: "Lenana peak at first light on Mount Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shots by Nemwel - Hiking Stories & Outdoor Photography",
    description:
      "Photographic stories from East Africa’s mountains — trail notes, expeditions, and a curated gallery of outdoor visuals.",
    images: [
      "/assets/gallery/LenanaAtFirstLight/lenanaatfirstlight.png",
    ],
    creator: "@shotsbynemwel",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F1115",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables live on <html> so the :root theme tokens in globals.css can resolve them.
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${inter.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
