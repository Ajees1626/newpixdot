import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Briefcase, ChevronDown, ChevronLeft, ChevronRight, Search, Star, TrendingUp } from "lucide-react";
import type { CaseStudy } from "@/constants/caseStudies";
import SafeImage from "@/components/ui/SafeImage";
import FlipProjectLink from "./FlipProjectLink";
import MouseGlow from "./MouseGlow";
import { gsap, registerGsap } from "@/utils/gsapConfig";
import { cn } from "@/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

registerGsap();

function shortClient(client: string) {
  const words = client.split(/\s+/);
  if (words.length <= 2) return client;
  return `${words[0]} ${words[1]}`;
}

function industryShort(industry: string) {
  return industry.split("/")[0]?.trim().toUpperCase() || industry.toUpperCase();
}

function ProjectSlideCard({
  cs,
  index,
  isActive,
}: {
  cs: CaseStudy;
  index: number;
  isActive: boolean;
}) {
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <article
      className={cn(
        "relative h-[min(72vh,640px)] w-[min(78vw,420px)] shrink-0 overflow-hidden rounded-[2rem] border border-border shadow-soft transition-all duration-700 ease-premium md:w-[min(42vw,440px)]",
        isActive ? "scale-100 opacity-100" : "scale-[0.94] opacity-55"
      )}
    >
      <div ref={imageRef} className="absolute inset-0">
        {cs.coverImage ? (
          <SafeImage src={cs.coverImage} alt={cs.client} className="h-full w-full object-cover" />
        ) : (
          <div className={cn("h-full w-full bg-gradient-to-br", cs.gradient)} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-4xl font-medium text-white/25 md:text-5xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm">
            {cs.year}
          </span>
        </div>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/70">
          {industryShort(cs.industry)}
        </p>
        <h3 className="mt-2 font-display text-2xl font-medium leading-tight tracking-tightest text-white md:text-[1.75rem]">
          {shortClient(cs.client)}
        </h3>
        <p className="mt-3 line-clamp-2 text-fluid-xs leading-relaxed text-white/75">
          {cs.summary}
        </p>

        <FlipProjectLink
          caseStudy={cs}
          imageRef={imageRef}
          className="mt-6 inline-flex w-fit items-center gap-3 text-fluid-xs font-semibold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
            <ArrowUpRight className="h-4 w-4" />
          </span>
          View Case Study
        </FlipProjectLink>
      </div>
    </article>
  );
}

interface CaseStudySplitHeroProps {
  projects: CaseStudy[];
  businessCount: number;
  onSearchOpen: () => void;
  onExplore: () => void;
}

export default function CaseStudySplitHero({
  projects,
  businessCount,
  onSearchOpen,
  onExplore,
}: CaseStudySplitHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const total = projects.length;

  const go = useCallback(
    (dir: number) => {
      if (total === 0) return;
      setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  useEffect(() => {
    setIndex(0);
  }, [projects]);

  useEffect(() => {
    if (reducedMotion) {
      setCount(businessCount);
      return;
    }
    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: businessCount,
      duration: 2,
      delay: 0.5,
      ease: "power2.out",
      onUpdate: () => setCount(Math.round(counter.v)),
    });
    return () => {
      tween.kill();
    };
  }, [businessCount, reducedMotion]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || total === 0) return;

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;

    gsap.to(track, {
      x: -card.offsetLeft + 24,
      duration: reducedMotion ? 0 : 0.85,
      ease: "power3.inOut",
    });
  }, [index, total, reducedMotion, projects]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-background pt-28 md:pt-32"
    >
      <MouseGlow />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,hsl(var(--secondary)/0.08),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05] [background-image:radial-gradient(hsl(var(--text))_1px,transparent_1px)] [background-size:24px_24px]" />

      <button
        type="button"
        onClick={onSearchOpen}
        data-cursor="open"
        data-cursor-text="SEARCH"
        className="absolute right-6 top-28 z-20 hidden items-center gap-2 rounded-full glass px-4 py-2.5 text-fluid-xs font-medium text-text shadow-soft backdrop-blur-md transition-colors hover:text-primary md:flex lg:right-10 lg:top-32"
      >
        <Search className="h-3.5 w-3.5 text-muted" />
        Search Case Studies
        <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted">⌘</span>
      </button>

      <div className="relative z-10 mx-auto grid h-full min-h-[calc(100dvh-7rem)] max-w-[min(1400px,95vw)] grid-cols-1 gap-10 px-4 pb-10 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-6">
        {/* Left — editorial copy */}
        <div className="flex flex-col justify-center px-2 lg:px-6">
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-primary">Case Studies</p>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="h-1 w-1 rounded-full bg-muted/50" />
            <span className="h-1 w-1 rounded-full bg-muted/40" />
            <span className="h-1 w-1 rounded-full bg-muted/30" />
          </div>

          <h1 className="mt-8 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-tightest text-text">
            Not projects.{" "}
            <span className="text-gradient" data-cursor="hover" data-cursor-text="READ">
              Business transformations.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-fluid-sm leading-relaxed text-muted">
            We partner with ambitious brands to create digital experiences that drive real growth and
            measurable impact.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 border-t border-border/80 pt-8 sm:grid-cols-3 sm:gap-4">
            <div data-cursor="data" data-cursor-text="DATA" className="flex gap-3">
              <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="font-display text-xl font-medium text-text">{count}+</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted">Businesses Transformed</p>
              </div>
            </div>
            <div data-cursor="data" data-cursor-text="DATA" className="flex gap-3">
              <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="font-display text-xl font-medium text-text">4.8/5</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted">Client Satisfaction</p>
              </div>
            </div>
            <div data-cursor="data" data-cursor-text="DATA" className="flex gap-3">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="font-display text-xl font-medium text-text">120+</p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted">Successful Campaigns</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onExplore}
            data-cursor="scroll"
            data-cursor-text="EXPLORE"
            className="mt-10 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-muted transition-colors hover:text-text"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </span>
            Scroll to explore
          </button>
        </div>

        {/* Right — project carousel */}
        <div className="relative flex min-h-[420px] flex-col justify-center lg:min-h-0">
          {total === 0 ? (
            <p className="rounded-[2rem] border border-border bg-surface p-10 text-center text-fluid-sm text-muted">
              No case studies match your filters.
            </p>
          ) : (
            <>
              <div className="mask-fade-x overflow-hidden pl-2 lg:pl-0">
                <div ref={trackRef} className="flex gap-5 will-change-transform">
                  {projects.map((cs, i) => (
                    <ProjectSlideCard key={cs.slug} cs={cs} index={i} isActive={index === i} />
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-4 pr-2 lg:pr-0">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous project"
                    data-cursor="open"
                    data-cursor-text="OPEN"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-text backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next project"
                    data-cursor="open"
                    data-cursor-text="OPEN"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-text backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <p className="min-w-[4.5rem] text-right font-display text-sm tracking-widest text-muted">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onSearchOpen}
        aria-label="Search case studies"
        className="absolute right-4 top-28 z-20 flex h-11 w-11 items-center justify-center rounded-full glass shadow-soft md:hidden"
      >
        <Search className="h-4 w-4" />
      </button>
    </section>
  );
}
