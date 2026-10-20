import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { getProcessSteps } from "./utils";
import { getCaseStudyTheme } from "./theme";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

export default function ProcessTimeline({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const steps = getProcessSteps(caseStudy);
  const theme = getCaseStudyTheme(caseStudy);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            end: "bottom 35%",
            scrub: 1,
          },
        }
      );

      section.querySelectorAll("[data-process-node]").forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.6, opacity: 0.4 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: node,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="scroll-mt-28 py-20 sm:py-28 lg:py-36 xl:pl-52"
    >
      <Container>
        <SplitHeading
          as="h2"
          splitBy="words"
          className="text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tightest text-text"
        >
          How we built momentum
        </SplitHeading>

        <div className="relative mt-16 max-w-2xl">
          <div
            ref={lineRef}
            className="absolute bottom-4 left-[15px] top-4 w-px origin-top bg-gradient-to-b from-primary/20 via-primary to-primary/30 sm:left-[19px]"
          />

          <div className="space-y-14 sm:space-y-16">
            {steps.map((step, i) => (
              <div key={`${step.label}-${i}`} className="relative pl-14 sm:pl-16">
                <div
                  data-process-node
                  className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background shadow-[0_0_20px_hsl(var(--primary)/0.35)] sm:h-10 sm:w-10"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </div>
                <p className={cn("text-[10px] font-semibold uppercase tracking-[0.32em]", theme.accent)}>
                  {step.label}
                </p>
                <p className="mt-3 text-fluid-base leading-relaxed text-text sm:text-fluid-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
