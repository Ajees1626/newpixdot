import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/constants/caseStudies";
import FlipProjectLink from "./FlipProjectLink";
import ProjectImageReveal from "./ProjectImageReveal";
import ThemePattern from "./ThemePattern";
import { getCaseStudyTheme } from "./theme";
import { cn } from "@/utils/cn";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function shortName(client: string) {
  return client.split(/\s+/)[0]?.toUpperCase() || client;
}

function industryLabel(industry: string) {
  return industry.split("/")[0]?.trim() || industry;
}

function ReelSlide({
  cs,
  index,
  isActive,
}: {
  cs: CaseStudy;
  index: number;
  isActive: boolean;
}) {
  const theme = getCaseStudyTheme(cs);
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id={`archive-${cs.slug}`}
      data-archive-slide
      className="relative flex min-h-[100dvh] snap-start snap-always items-center overflow-hidden"
      style={{ backgroundColor: theme.archiveBg }}
    >
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-20", theme.wallMood)} />
      <ThemePattern theme={theme} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-24 md:grid-cols-2 md:gap-14 md:px-10 lg:px-16">
        <div className={cn("transition-all duration-700", isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-80")}>
          <p className="font-display text-[10px] tracking-[0.35em] text-muted">{String(index + 1).padStart(2, "0")}</p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[0.92] tracking-tightest text-neutral-900">
            {shortName(cs.client)}
          </h2>
          <p className="mt-3 text-fluid-sm text-neutral-600">{industryLabel(cs.industry)}</p>
          <p className="mt-1 font-display text-xl text-neutral-400">{cs.year}</p>

          <FlipProjectLink
            caseStudy={cs}
            imageRef={imageWrapRef}
            className="group mt-8 inline-flex flex-col items-start gap-1"
          >
            <span className="text-fluid-xs font-semibold uppercase tracking-[0.28em] text-neutral-900">Case Study</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-muted">↓ 120 sec Story</span>
          </FlipProjectLink>
        </div>

        <div ref={imageWrapRef} className="flex justify-center md:justify-end">
          <ProjectImageReveal cs={cs} isActive={isActive} imageRef={artworkRef} />
        </div>
      </div>
    </section>
  );
}

function MobileReel({ projects }: { projects: CaseStudy[] }) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(0);

  const go = (dir: number) => {
    setIndex((i) => Math.min(projects.length - 1, Math.max(0, i + dir)));
  };

  return (
    <div className="relative h-[100dvh] overflow-hidden">
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={(e) => {
          touchStart.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const diff = touchStart.current - e.changedTouches[0].clientX;
          if (diff > 50) go(1);
          if (diff < -50) go(-1);
        }}
      >
        {projects.map((cs, i) => (
          <div key={cs.slug} className="h-full w-full shrink-0">
            <ReelSlide cs={cs} index={i} isActive={index === i} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Project ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn("h-1 rounded-full transition-all", i === index ? "w-8 bg-primary" : "w-2 bg-border")}
          />
        ))}
      </div>
    </div>
  );
}

interface ArchiveReelProps {
  projects: CaseStudy[];
  activeIndex: number;
  onActiveChange: (index: number) => void;
}

export default function ArchiveReel({ projects, activeIndex, onActiveChange }: ArchiveReelProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isDesktop) return;
    const slides = document.querySelectorAll<HTMLElement>("[data-archive-slide]");
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = Array.from(slides).indexOf(visible.target as HTMLElement);
        if (idx >= 0) onActiveChange(idx);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-20% 0px -20% 0px" }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [isDesktop, projects, onActiveChange]);

  if (projects.length === 0) {
    return <p className="py-32 text-center text-fluid-sm text-muted">No stories match your filters.</p>;
  }

  if (!isDesktop) {
    return <MobileReel projects={projects} />;
  }

  return (
    <div className="relative mx-auto max-w-6xl lg:flex lg:px-16">
      <aside className="sticky top-32 z-20 hidden h-fit w-36 shrink-0 flex-col gap-3 self-start py-8 md:flex">
        {projects.map((cs, i) => (
          <button
            key={cs.slug}
            type="button"
            onClick={() => document.getElementById(`archive-${cs.slug}`)?.scrollIntoView({ behavior: "smooth" })}
            data-cursor="open"
            data-cursor-text="OPEN"
            className={cn(
              "group flex items-center gap-2 text-left transition-colors",
              activeIndex === i ? "text-text" : "text-muted hover:text-text"
            )}
          >
            <span className="w-5 font-display text-[10px] tracking-[0.2em]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="truncate text-[11px] font-medium uppercase tracking-wider">
              {shortName(cs.client)}
            </span>
          </button>
        ))}
      </aside>

      <div className="min-w-0 flex-1 snap-y snap-mandatory">
        {projects.map((cs, i) => (
          <ReelSlide key={cs.slug} cs={cs} index={i} isActive={activeIndex === i} />
        ))}
      </div>
    </div>
  );
}
