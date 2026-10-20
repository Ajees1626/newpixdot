import { useEffect, useRef, type ElementType } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import { cn } from "@/utils/cn";

registerGsap();

interface SplitHeadingProps {
  children: string;
  as?: ElementType;
  className?: string;
  splitBy?: "words" | "lines" | "chars";
  delay?: number;
  start?: string;
}

/**
 * Splits a heading into words/lines/chars and staggers them in as the
 * element scrolls into view — the signature "expensive" text reveal used
 * for hero and section headlines throughout the site.
 */
export default function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  splitBy = "words",
  delay = 0,
  start = "top 85%",
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitType(el, { types: [splitBy] });
    const targets =
      splitBy === "words" ? split.words : splitBy === "lines" ? split.lines : split.chars;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          delay,
          stagger: 0.045,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => {
      ctx.revert();
      split.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, splitBy, delay, start]);

  const Component = Tag as any;
  return (
    <Component ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </Component>
  );
}
