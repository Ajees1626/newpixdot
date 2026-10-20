import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import {
  formatMetricDisplay,
  getHeroMetric,
  getSnapshotServices,
  getTeamSize,
  parseMetricValue,
} from "./utils";
import { getCaseStudyTheme } from "./theme";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

export default function ProjectOverview({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = getCaseStudyTheme(caseStudy);
  const metric = getHeroMetric(caseStudy);
  const parsed = parseMetricValue(metric.value);
  const services = getSnapshotServices(caseStudy);

  const rows = [
    { label: "Client", value: caseStudy.client },
    { label: "Duration", value: caseStudy.duration },
    { label: "Team", value: getTeamSize(caseStudy) },
    { label: "Result", value: formatMetricDisplay(parsed), highlight: true },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-overview-row]"),
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className={cn("scroll-mt-28 py-20 sm:py-28 lg:py-36 xl:pl-52", theme.surface)}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SplitHeading
              as="h2"
              splitBy="words"
              className="text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-tightest text-text"
            >
              The story behind the work
            </SplitHeading>
            <p className="mt-5 max-w-xl text-fluid-sm leading-relaxed text-muted sm:text-fluid-base">
              {caseStudy.summary}
            </p>

            <div className="mt-12 space-y-0">
              {rows.map((row) => (
                <div
                  key={row.label}
                  data-overview-row
                  data-cursor="details"
                  data-cursor-text="DATA"
                  className="group border-t border-border py-6 transition-colors duration-500 hover:border-primary/30"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted">
                    {row.label}
                  </p>
                  <p
                    className={cn(
                      "mt-2 font-display leading-snug text-text transition-transform duration-500 group-hover:translate-x-1",
                      row.highlight
                        ? "text-[clamp(2rem,5vw,3rem)] font-medium"
                        : "text-fluid-lg sm:text-fluid-xl"
                    )}
                  >
                    {row.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-border bg-card px-4 py-2 text-fluid-xs text-muted"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-card/80 p-7 backdrop-blur-sm sm:p-9">
              <p className={cn("text-[10px] font-semibold uppercase tracking-[0.32em]", theme.accent)}>
                Challenge
              </p>
              <p className="mt-4 text-fluid-sm leading-relaxed text-muted">{caseStudy.problem}</p>
            </div>
            <div className="rounded-[2rem] border border-border bg-card/80 p-7 backdrop-blur-sm sm:p-9">
              <p className={cn("text-[10px] font-semibold uppercase tracking-[0.32em]", theme.accent)}>
                Strategy
              </p>
              <p className="mt-4 whitespace-pre-line text-fluid-sm leading-relaxed text-muted">
                {caseStudy.strategy}
              </p>
            </div>
            <div className="rounded-[2rem] border border-dashed border-primary/25 bg-primary/5 p-7 sm:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-primary">
                Key outcome
              </p>
              <p className="mt-3 font-display text-fluid-2xl font-medium text-text">
                {formatMetricDisplay(parsed)}
              </p>
              <p className="mt-1 text-fluid-sm text-muted">{metric.label}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
