import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { getHeroMetric, getSnapshotServices, getTeamSize, parseMetricValue } from "./utils";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

const SNAPSHOT_FIELDS = [
  { key: "client", label: "Client" },
  { key: "services", label: "Services" },
  { key: "duration", label: "Duration" },
  { key: "team", label: "Team" },
  { key: "result", label: "Result" },
] as const;

export default function Snapshot({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const metric = getHeroMetric(caseStudy);
  const parsed = parseMetricValue(metric.value);
  const services = getSnapshotServices(caseStudy);

  const values: Record<(typeof SNAPSHOT_FIELDS)[number]["key"], string> = {
    client: caseStudy.client,
    services: services.join(" · "),
    duration: caseStudy.duration,
    team: getTeamSize(caseStudy),
    result: `${parsed.prefix}${parsed.numeric || parsed.raw}${parsed.suffix}`,
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll("[data-snapshot-card]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  return (
    <section id="overview" ref={sectionRef} className="scroll-mt-28 py-20 sm:py-28 lg:py-32">
      <Container>
        <SplitHeading
          as="h2"
          splitBy="words"
          className="max-w-3xl text-fluid-2xl font-medium text-text sm:text-fluid-3xl"
        >
          Project snapshot
        </SplitHeading>
        <p className="mt-4 max-w-xl text-fluid-sm text-muted">
          A distilled view of scope, team, and the outcome that defined this engagement.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {SNAPSHOT_FIELDS.map((field) => (
            <div
              key={field.key}
              data-snapshot-card
              data-cursor="details"
              data-cursor-text="DETAILS"
              className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_40px_hsl(var(--primary)/0.12)] sm:p-7"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-700 group-hover:scale-x-100" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
                {field.label}
              </p>
              <p
                className={cn(
                  "mt-4 font-display leading-tight text-text transition-transform duration-500 group-hover:scale-[1.03]",
                  field.key === "result"
                    ? "text-fluid-2xl font-medium sm:text-fluid-3xl"
                    : "text-fluid-base sm:text-fluid-lg"
                )}
              >
                {values[field.key]}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Challenge</p>
            <p className="mt-4 text-fluid-sm leading-relaxed text-muted">{caseStudy.problem}</p>
          </div>
          <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Strategy</p>
            <p className="mt-4 whitespace-pre-line text-fluid-sm leading-relaxed text-muted">
              {caseStudy.strategy}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
