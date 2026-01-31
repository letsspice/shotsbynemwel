import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#34542C",
        },
        accent: {
          green: "#5C934E",
          red: "#E2725B",
        },
        background: "#F8F9FB",
        offwhite: "#F9F9F7",
        dark: "#0F1115",
        body: "#222222",
        border: "#E5E7EB",
        black: "#000000",
      },
      opacity: {
        40: "0.4",
        60: "0.6",
        90: "0.9",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        manrope: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      borderRadius: {
        tab: "24px",
        card: "24px",
        imageA: "16px",
        imageB: "24px",
      },
      spacing: {
        "section-y": "70px",
        "section-x": "100px",
      },
      fontSize: {
        hero: ["80px", { lineHeight: "80px" }],
        logo: ["24px", { lineHeight: "25px" }],
        nav: ["18px", { lineHeight: "32px" }],
        subBold: ["48px", { lineHeight: "60px", letterSpacing: "-0.0128em" }],
        subItalic: ["52px", { lineHeight: "64px", letterSpacing: "0.002em" }],
        body: ["20px", { lineHeight: "32px" }],
        tabTitle: ["32px", { lineHeight: "36px", letterSpacing: "-0.0128em" }],
        tabSubtitle: ["16px", { lineHeight: "20px" }],
        buttonSm: ["16px", { lineHeight: "20px" }],
        buttonMd: ["18px", { lineHeight: "24px" }],
      },
    },
  },
  plugins: [],
};

export default config;
