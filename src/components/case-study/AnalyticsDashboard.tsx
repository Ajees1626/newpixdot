import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { formatMetricDisplay, parseMetricValue } from "./utils";
import { getCaseStudyTheme } from "./theme";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

function SparkGraph({ progress }: { progress: number }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = 280;
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: len * (1 - progress / 100),
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: { trigger: path, start: "top 88%", once: true },
    });
  }, [progress]);

  return (
    <svg viewBox="0 0 240 48" className="h-12 w-full max-w-xs" aria-hidden>
      <path
        ref={pathRef}
        d="M0 40 L30 35 L60 28 L90 18 L120 22 L150 8 L180 12 L210 4 L240 10"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetricPanel({
  label,
  value,
  before,
  after,
  index,
}: {
  label: string;
  value: string;
  before?: string;
  after?: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const parsed = parseMetricValue(value);
  const progress = Math.min(Math.max(parsed.numeric || 55, 12), 100);

  useEffect(() => {
    const el = ref.current;
    const bar = barRef.current;
    const num = numRef.current;
    if (!el || !bar || !num) return;

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: progress / 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      if (parsed.numeric) {
        gsap.to(counter, {
          v: parsed.numeric,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            const gap = parsed.suffix && !/^[%+xX]/.test(parsed.suffix) ? " " : "";
            num.textContent = `${parsed.prefix}${Math.round(counter.v)}${gap}${parsed.suffix}`;
          },
        });
      }
    }, ref);

    return () => ctx.revert();
  }, [value, progress, parsed]);

  return (
    <div
      ref={ref}
      data-cursor="data"
      data-cursor-text="DATA"
      className="rounded-[2rem] border border-border bg-card p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted">{label}</p>
          <p className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-medium leading-none text-text">
            <span ref={numRef}>{formatMetricDisplay(parsed)}</span>
          </p>
        </div>
        <span className="font-display text-fluid-xs text-muted/50">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="mt-6">
        <SparkGraph progress={progress} />
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>

      {(before || after) && (
        <div className="mt-6 flex items-center gap-6 border-t border-border pt-6 text-fluid-sm">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">Before</p>
            <p className="mt-1 font-medium text-muted">{before || "—"}</p>
          </div>
          <span className="text-primary">↓</span>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted">After</p>
            <p className="mt-1 font-display text-fluid-lg font-medium text-text">{after || "—"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AnalyticsDashboard({ caseStudy }: CaseStudySectionProps) {
  const theme = getCaseStudyTheme(caseStudy);

  return (
    <section id="results" className={cn("scroll-mt-28 py-20 sm:py-28 lg:py-36 xl:pl-52", theme.surface)}>
      <Container>
        <SplitHeading
          as="h2"
          splitBy="words"
          className="text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tightest text-text"
        >
          Live analytics
        </SplitHeading>
        <p className="mt-4 text-fluid-sm text-muted">Traffic, engagement, ROI — animated like a product dashboard.</p>

        <div className="mt-12 space-y-6">
          {caseStudy.results.map((r, i) => (
            <MetricPanel
              key={r.label}
              label={r.label}
              value={r.value}
              before={r.before}
              after={r.after}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
