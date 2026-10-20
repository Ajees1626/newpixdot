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

const DNA_ROWS = [
  { key: "client", label: "Client" },
  { key: "goal", label: "Goal" },
  { key: "services", label: "Services" },
  { key: "team", label: "Team" },
  { key: "time", label: "Time" },
  { key: "roi", label: "ROI" },
] as const;

export default function ProjectDNA({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const theme = getCaseStudyTheme(caseStudy);
  const metric = getHeroMetric(caseStudy);
  const parsed = parseMetricValue(metric.value);
  const services = getSnapshotServices(caseStudy);

  const values: Record<(typeof DNA_ROWS)[number]["key"], string | string[]> = {
    client: caseStudy.client,
    goal: metric.label || "Generate measurable growth",
    services,
    team: getTeamSize(caseStudy).replace(" Members", ""),
    time: caseStudy.duration,
    roi: formatMetricDisplay(parsed),
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-dna-row]"),
        { x: -24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className={cn("scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-24 lg:py-32 xl:pl-52", theme.surface)}
    >
      <Container className="max-w-3xl">
        <SplitHeading
          as="h2"
          splitBy="words"
          className="text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tightest text-text"
        >
          Project DNA
        </SplitHeading>
        <p className="mt-4 text-fluid-sm text-muted">
          Apple-style specification — everything that defined this engagement.
        </p>

        <div className="mt-14">
          {DNA_ROWS.map((row) => (
            <div key={row.key} data-dna-row data-cursor="data" data-cursor-text="DATA" className="group py-7">
              <div className="h-px w-full bg-gradient-to-r from-border via-primary/30 to-border transition-all duration-500 group-hover:via-primary/60" />
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.38em] text-muted">{row.label}</p>
              {row.key === "services" ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {(values.services as string[]).map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-card px-4 py-2 text-fluid-xs text-text"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className={cn(
                    "mt-3 font-display leading-tight text-text",
                    row.key === "roi"
                      ? "text-[clamp(2.5rem,6vw,4rem)] font-medium"
                      : "text-fluid-xl sm:text-fluid-2xl"
                  )}
                >
                  {values[row.key] as string}
                </p>
              )}
            </div>
          ))}
          <div className="h-px w-full bg-border" />
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <p className={cn("text-[10px] font-semibold uppercase tracking-[0.32em]", theme.accent)}>Challenge</p>
            <p className="mt-3 text-fluid-sm leading-relaxed text-muted">{caseStudy.problem}</p>
          </div>
          <div>
            <p className={cn("text-[10px] font-semibold uppercase tracking-[0.32em]", theme.accent)}>Approach</p>
            <p className="mt-3 whitespace-pre-line text-fluid-sm leading-relaxed text-muted">{caseStudy.strategy}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
