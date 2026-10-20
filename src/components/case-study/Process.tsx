import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { useTilt } from "@/hooks/useTilt";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

function ProcessCard({ step, index, gradient }: { step: string; index: number; gradient: string }) {
  const { ref, handleMove, handleLeave } = useTilt<HTMLDivElement>(8);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor="open"
      data-cursor-text="OPEN"
      className="group relative w-[min(78vw,320px)] shrink-0 snap-center overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft transition-shadow duration-500 hover:shadow-[0_24px_60px_hsl(var(--primary)/0.12)] sm:w-[360px] sm:p-10"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40",
          gradient
        )}
      />
      <span className="font-display text-[clamp(3.5rem,10vw,6rem)] font-medium leading-none text-primary/20 transition-colors duration-500 group-hover:text-primary/35">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="mt-6 text-fluid-base leading-relaxed text-text sm:text-fluid-lg">{step}</p>
    </div>
  );
}

export default function Process({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const steps = caseStudy.process.length
    ? caseStudy.process.slice(0, 4)
    : ["Research", "Planning", "Execution", "Testing"];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getScroll = () => track.scrollWidth - window.innerWidth + 48;

      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  return (
    <section id="creative" ref={sectionRef} className="scroll-mt-28 py-20 sm:py-28">
      <Container className="mb-10">
        <SplitHeading
          as="h2"
          splitBy="words"
          className="max-w-3xl text-fluid-2xl font-medium text-text sm:text-fluid-3xl"
        >
          Creative process
        </SplitHeading>
        <p className="mt-4 max-w-xl text-fluid-sm text-muted">
          Four decisive phases — each with depth, lift, and parallax-driven momentum.
        </p>
      </Container>

      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-5 px-6 will-change-transform sm:gap-6 sm:px-10 lg:px-16"
        >
          {steps.map((step, i) => (
            <ProcessCard key={`${step}-${i}`} step={step} index={i} gradient={caseStudy.gradient} />
          ))}
        </div>
      </div>
    </section>
  );
}
