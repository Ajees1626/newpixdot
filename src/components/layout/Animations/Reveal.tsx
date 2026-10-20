import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import { cn } from "@/utils/cn";

registerGsap();

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  start?: string;
}

/**
 * Fades + slides an element into view as it enters the viewport, driven by
 * GSAP ScrollTrigger. Used as the default reveal building block across
 * every section on the site.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 48,
  delay = 0,
  duration = 1,
  once = true,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, delay, duration, once, start]);

  const Component = Tag as any;
  return (
    <Component ref={ref} className={cn(className)}>
      {children}
    </Component>
  );
}
