/** Five bars: E2725B at 100% for the level, E5E7EB at 90% for the rest. */
export default function DifficultyBars({ level, className = "" }: { level: number; className?: string }) {
  return (
    <div className={`flex items-center gap-[10px] ${className}`}>
      <span className="tab-subtitle text-offwhite" aria-hidden>
        Difficulty
      </span>
      <span className="sr-only">Difficulty {level} out of 5</span>
      <div className="flex gap-[6px]" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`h-[4px] w-[24px] rounded-full transition-colors duration-500 md:w-[32px] ${
              i < level ? "bg-accent-red" : "bg-border/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
