import type { ElementType } from "react";

interface SectionHeadingProps {
  bold: string;
  italic: string;
  id?: string;
  as?: ElementType;
  align?: "left" | "right";
  /** "dark" on the homepage, "sage" on the expedition pages (muted primary green). */
  tone?: "dark" | "sage";
  className?: string;
}

/** The recurring "Manrope bold + Cormorant italic" heading pair from the designs. */
export default function SectionHeading({
  bold,
  italic,
  id,
  as: Tag = "h2",
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const color = tone === "dark" ? "text-dark" : "text-primary/80";
  return (
    <Tag id={id} className={`${align === "right" ? "md:text-right" : ""} ${className}`}>
      <span className={`subheading-bold ${color}`}>{bold} </span>
      <span className={`subheading-italic ${color}`}>{italic}</span>
    </Tag>
  );
}
