import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { parseMetricValue } from "./utils";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

function OdometerCounter({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const counter = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: value,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(counter.val)}${suffix}`;
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value, suffix, prefix]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}0{suffix}
    </span>
  );
}

function ProgressRing({ progress }: { progress: number }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        circle,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: circumference * (1 - progress / 100),
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: circle,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [progress, circumference]);

  return (
    <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
      <circle cx="64" cy="64" r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
      <circle
        ref={circleRef}
        cx="64"
        cy="64"
        r={radius}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        className="drop-shadow-[0_0_12px_hsl(var(--primary)/0.45)]"
      />
    </svg>
  );
}

export default function Results({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const bars = section.querySelectorAll("[data-progress-bar]");

    const ctx = gsap.context(() => {
      bars.forEach((bar) => {
        gsap.to(bar, {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  return (
    <section id="results" ref={sectionRef} className="scroll-mt-28 py-20 sm:py-28 lg:py-32">
      <Container>
        <SplitHeading
          as="h2"
          splitBy="words"
          className="max-w-3xl text-fluid-2xl font-medium text-text sm:text-fluid-3xl"
        >
          Metrics that moved
        </SplitHeading>
        <p className="mt-4 max-w-xl text-fluid-sm text-muted">
          Stripe-dashboard clarity — counters, progress lines, and before/after context.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {caseStudy.results.map((result, i) => {
            const parsed = parseMetricValue(result.value);
            const progress = Math.min(parsed.numeric || 68, 100);

            return (
              <div
                key={result.label}
                data-cursor="details"
                data-cursor-text="DETAILS"
                className="group relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 sm:p-8"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <OdometerCounter
                      value={parsed.numeric || 68}
                      suffix={parsed.suffix}
                      prefix={parsed.prefix}
                      className="font-display text-fluid-3xl font-medium text-text sm:text-fluid-4xl"
                    />
                    <p className="mt-2 text-fluid-sm text-muted">{result.label}</p>
                  </div>
                  <ProgressRing progress={progress} />
                </div>

                <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div
                    data-progress-bar
                    className="h-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${progress}%`, transform: "scaleX(0)" }}
                  />
                </div>

                {result.before && result.after ? (
                  <div className="mt-5 grid grid-cols-2 gap-3 text-fluid-xs">
                    <div className="rounded-2xl bg-surface px-3 py-2">
                      <p className="text-muted">Before</p>
                      <p className="mt-1 font-medium text-text">{result.before}</p>
                    </div>
                    <div className="rounded-2xl bg-surface px-3 py-2">
                      <p className="text-muted">After</p>
                      <p className="mt-1 font-medium text-text">{result.after}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
