import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { getProcessSteps } from "./utils";
import { getCaseStudyTheme } from "./theme";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

const SUBWAY_LABELS = ["Research", "Strategy", "Design", "Ads", "Growth"];

export default function SubwayProcess({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const theme = getCaseStudyTheme(caseStudy);
  const steps = getProcessSteps(caseStudy);
  const nodes = SUBWAY_LABELS.slice(0, Math.max(steps.length, 4)).map((label, i) => ({
    label,
    description: steps[i]?.description || label,
  }));

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const line = lineRef.current;
    if (!section || !track || !line) return;

    const ctx = gsap.context(() => {
      const scrollW = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);

      gsap.to(line, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      gsap.to(track, {
        x: () => -scrollW() * 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      track.querySelectorAll("[data-subway-node]").forEach((node, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: `top ${75 - i * 8}%`,
          onEnter: () => node.classList.add("is-active"),
          onLeaveBack: () => node.classList.remove("is-active"),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug, nodes.length]);

  return (
    <section id="process" ref={sectionRef} className="scroll-mt-24 overflow-hidden py-16 sm:scroll-mt-28 sm:py-24 lg:py-32 xl:pl-52">
      <Container className="mb-12">
        <SplitHeading
          as="h2"
          splitBy="words"
          className="text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tightest text-text"
        >
          Process subway
        </SplitHeading>
        <p className="mt-4 max-w-xl text-fluid-sm text-muted">
          A horizontal line map — nodes glow as you scroll through the journey.
        </p>
      </Container>

      <div ref={trackRef} className="relative w-max min-w-full px-8 will-change-transform lg:px-16">
        <div className="relative flex min-w-[900px] items-start justify-between gap-4 py-8 lg:min-w-[1100px]">
          <div
            ref={lineRef}
            className="absolute left-8 right-8 top-[2.6rem] h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary/20 via-primary to-primary/20 lg:left-16 lg:right-16"
          />

          {nodes.map((node, i) => (
            <div
              key={node.label}
              data-subway-node
              className={cn(
                "group relative z-10 w-[min(28vw,200px)] shrink-0 text-center transition-all duration-500",
                "[&.is-active]:scale-105"
              )}
            >
              <div
                className={cn(
                  "mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-card transition-all duration-500",
                  "group-[.is-active]:border-primary group-[.is-active]:shadow-[0_0_28px_hsl(var(--primary)/0.45)]"
                )}
              >
                <span
                  className={cn(
                    "h-3 w-3 rounded-full bg-muted transition-colors duration-500",
                    "group-[.is-active]:bg-primary"
                  )}
                />
              </div>
              <p className={cn("mt-4 text-[10px] font-semibold uppercase tracking-[0.28em]", theme.accent)}>
                {node.label}
              </p>
              <p className="mt-2 text-fluid-xs leading-relaxed text-muted">{node.description.slice(0, 80)}…</p>
              {i < nodes.length - 1 && (
                <span className="pointer-events-none absolute -right-6 top-5 hidden text-muted lg:inline">—</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
