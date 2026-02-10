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
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} ${manrope.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
