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
  title: "Shots by Nemwel - Hiking Stories & Outdoor Photography",
  description:
    "A curated home for Nemwel’s hiking journeys, landscapes, and short-form storytelling - trail stories, visuals, and experiments across web, TikTok, and Instagram.",
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
