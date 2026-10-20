import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { gsap, registerGsap } from "@/utils/gsapConfig";
import MouseGlow from "./MouseGlow";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

registerGsap();

interface CaseStudyHeroProps {
  businessCount: number;
  onExplore?: () => void;
}

export default function CaseStudyHero({ businessCount, onExplore }: CaseStudyHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const label = labelRef.current;
    const stat = statRef.current;
    const scroll = scrollRef.current;
    const gradient = gradientRef.current;
    if (!section || !l1 || !l2 || !label) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(label, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
      gsap.fromTo(l1, { x: -72, opacity: 0 }, { x: 0, opacity: 1, duration: 1.05, delay: 0.12, ease: "power4.out" });
      gsap.fromTo(l2, { x: 72, opacity: 0 }, { x: 0, opacity: 1, duration: 1.05, delay: 0.28, ease: "power4.out" });

      if (stat) {
        gsap.fromTo(stat, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, delay: 0.5, ease: "power3.out" });
      }
      if (scroll) {
        gsap.fromTo(scroll, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 0.72, ease: "power3.out" });
      }

      if (gradient && !reducedMotion) {
        gsap.to(gradient, {
          backgroundPosition: "100% 50%",
          duration: 18,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setCount(businessCount);
      return;
    }

    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: businessCount,
      duration: 2,
      delay: 0.65,
      ease: "power2.out",
      onUpdate: () => setCount(Math.round(counter.v)),
    });

    return () => {
      tween.kill();
    };
  }, [businessCount, reducedMotion]);

  const scrollToWork = () => {
    onExplore?.();
    document.getElementById("selected-work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70dvh] flex-col justify-start overflow-hidden px-6 pb-12 pt-28 md:min-h-[80dvh] md:pb-14 md:pt-32 lg:min-h-[85dvh] lg:pt-36"
    >
      <MouseGlow />

      <div
        ref={gradientRef}
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--surface)) 25%, hsl(var(--primary) / 0.06) 50%, hsl(var(--secondary) / 0.05) 75%, hsl(var(--background)) 100%)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.07),transparent_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p
          ref={labelRef}
          className="text-[10px] font-semibold uppercase tracking-[0.55em] text-primary opacity-0"
        >
          Case Studies
        </p>

        <h1 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-tightest text-text">
          <span
            ref={line1Ref}
            className="block opacity-0"
            data-cursor="hover"
            data-cursor-text="READ"
          >
            Not projects.
          </span>
          <span
            ref={line2Ref}
            className="mt-1 block opacity-0"
            data-cursor="hover"
            data-cursor-text="READ"
          >
            Business Transformations.
          </span>
        </h1>

        <div
          ref={statRef}
          data-cursor="data"
          data-cursor-text="DATA"
          className="mx-auto mt-8 max-w-xs border-y border-border/80 py-8 opacity-0"
        >
          <p className="font-display text-[clamp(3.5rem,9vw,6rem)] font-medium leading-none tracking-tightest text-text">
            {count}+
          </p>
          <p className="mt-2 text-fluid-sm font-medium text-text">Businesses</p>
          <p className="text-fluid-xs uppercase tracking-[0.28em] text-muted">Transformed</p>
        </div>

        <button
          ref={scrollRef}
          type="button"
          onClick={scrollToWork}
          data-cursor="scroll"
          data-cursor-text="EXPLORE"
          className={cn(
            "mt-6 inline-flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.45em] text-muted opacity-0 transition-colors hover:text-text"
          )}
        >
          <ChevronDown className="h-4 w-4 animate-bounce" />
          Scroll
        </button>
      </div>
    </section>
  );
}
