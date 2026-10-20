import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface MarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  className?: string;
  /** Gap/padding between items on the scrolling track. */
  trackClassName?: string;
  pauseOnHover?: boolean;
}

const SPEED_DURATION: Record<NonNullable<MarqueeProps["speed"]>, string> = {
  slow: "75s",
  normal: "36s",
  fast: "20s",
};

/**
 * Seamless infinite marquee. Renders the children twice back-to-back and
 * translates by exactly -50% so the loop is invisible.
 */
export default function Marquee({
  children,
  reverse = false,
  speed = "normal",
  className,
  trackClassName,
  pauseOnHover = true,
}: MarqueeProps) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-4 px-6 sm:gap-6", className)}>
        {children}
      </div>
    );
  }

  const track = cn(
    "flex shrink-0 items-center gap-8 pr-8 will-change-transform sm:gap-12 sm:pr-12 lg:gap-16 lg:pr-16",
    reverse ? "animate-marquee-reverse" : "animate-marquee",
    pauseOnHover && "group-hover:[animation-play-state:paused]",
    trackClassName
  );

  return (
    <div className={cn("group relative flex overflow-hidden mask-fade-x", className)}>
      <div className={track} style={{ animationDuration: SPEED_DURATION[speed] }}>
        {children}
      </div>
      <div aria-hidden className={track} style={{ animationDuration: SPEED_DURATION[speed] }}>
        {children}
      </div>
    </div>
  );
}
