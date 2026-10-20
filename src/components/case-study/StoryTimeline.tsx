import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SafeImage from "@/components/ui/SafeImage";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { getTimelineSteps } from "./utils";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

export default function StoryTimeline({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const steps = getTimelineSteps(caseStudy);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const items = section.querySelectorAll("[data-timeline-item]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );

      items.forEach((item) => {
        const dot = item.querySelector("[data-timeline-dot]");
        const text = item.querySelector("[data-timeline-text]");
        const image = item.querySelector("[data-timeline-image]");

        gsap.fromTo(
          dot,
          { scale: 0.4, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: item,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          text,
          { x: -24, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (image) {
          gsap.fromTo(
            image,
            { x: 40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 72%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  return (
    <section
      id="strategy"
      ref={sectionRef}
      className="scroll-mt-28 bg-surface py-20 sm:py-28 lg:py-32"
    >
      <Container>
        <SplitHeading
          as="h2"
          splitBy="words"
          className="max-w-3xl text-fluid-2xl font-medium text-text sm:text-fluid-3xl"
        >
          Story timeline
        </SplitHeading>
        <p className="mt-4 max-w-xl text-fluid-sm text-muted">
          How discovery became direction — and direction became measurable impact.
        </p>

        <div className="relative mt-14 lg:mt-20">
          <div
            ref={lineRef}
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-primary/20 via-primary to-primary/20 sm:left-[15px]"
          />

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, i) => (
              <div
                key={`${step.title}-${i}`}
                data-timeline-item
                className="relative grid gap-6 pl-10 sm:grid-cols-[1fr_280px] sm:gap-10 sm:pl-14 lg:grid-cols-[1fr_360px]"
              >
                <span
                  data-timeline-dot
                  className={cn(
                    "absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background sm:h-8 sm:w-8",
                    "shadow-[0_0_20px_hsl(var(--primary)/0.35)]"
                  )}
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>

                <div data-timeline-text>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                    {step.title}
                  </p>
                  <p className="mt-3 max-w-xl text-fluid-base leading-relaxed text-text sm:text-fluid-lg">
                    {step.description}
                  </p>
                </div>

                {step.image && (
                  <div
                    data-timeline-image
                    className="overflow-hidden rounded-[2rem] border border-border bg-card"
                  >
                    <SafeImage
                      src={step.image}
                      alt={`${caseStudy.client} — ${step.title}`}
                      className="aspect-[4/3] w-full object-cover"
                      fallbackClassName="aspect-[4/3] w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
