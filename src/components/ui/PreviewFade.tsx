import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type FadeFrom = "background" | "surface" | "card";

const FADE_FROM: Record<FadeFrom, string> = {
  background: "from-background",
  surface: "from-surface",
  card: "from-card",
};

interface PreviewFadeProps {
  children: ReactNode;
  className?: string;
  fadeFrom?: FadeFrom;
}

/** Soft bottom fade so home previews hint at more content — no carousel dots. */
export default function PreviewFade({
  children,
  className,
  fadeFrom = "background",
}: PreviewFadeProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent",
          FADE_FROM[fadeFrom]
        )}
        aria-hidden
      />
    </div>
  );
}
