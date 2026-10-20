import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { gsap, registerGsap } from "@/utils/gsapConfig";
import MouseGlow from "./MouseGlow";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

registerGsap();

interface ArchiveMastheadProps {
  businessCount: number;
  onEnterArchive: () => void;
}

export default function ArchiveMasthead({ businessCount, onEnterArchive }: ArchiveMastheadProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const stat = statRef.current;
    if (!l1 || !l2) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(l1, { x: -48, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power4.out" });
      gsap.fromTo(l2, { x: 48, opacity: 0 }, { x: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power4.out" });
      if (stat) {
        gsap.fromTo(stat, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power3.out" });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setCount(businessCount);
      return;
    }
    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: businessCount,
      duration: 1.8,
      delay: 0.4,
      ease: "power2.out",
      onUpdate: () => setCount(Math.round(counter.v)),
    });
    return () => {
      tween.kill();
    };
  }, [businessCount, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border/70 px-6 pb-10 pt-28 md:px-10 md:pt-32 lg:px-16"
    >
      <MouseGlow />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,hsl(var(--primary)/0.07),transparent_45%)]" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.55em] text-primary">Case Studies</p>
          <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[0.95] tracking-tightest text-text">
            <span ref={line1Ref} className="block opacity-0" data-cursor="hover" data-cursor-text="READ">
              Not projects.
            </span>
            <span ref={line2Ref} className="mt-1 block opacity-0" data-cursor="hover" data-cursor-text="READ">
              Business Transformations.
            </span>
          </h1>
          <button
            type="button"
            onClick={onEnterArchive}
            data-cursor="scroll"
            data-cursor-text="EXPLORE"
            className="mt-8 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.4em] text-muted transition-colors hover:text-text"
          >
            <ChevronDown className="h-4 w-4" />
            Enter archive
          </button>
        </div>

        <div
          ref={statRef}
          data-cursor="data"
          data-cursor-text="DATA"
          className="border-t border-border/80 pt-6 opacity-0 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"
        >
          <p className="font-display text-[clamp(3rem,8vw,5rem)] font-medium leading-none text-text">{count}+</p>
          <p className="mt-2 text-fluid-sm font-medium text-text">Businesses transformed</p>
          <p className="mt-1 text-fluid-xs text-muted">4.8★ satisfaction · 120+ campaigns</p>
        </div>
      </div>
    </section>
  );
}
