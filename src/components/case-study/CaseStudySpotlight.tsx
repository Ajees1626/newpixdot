import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getShortClientLabel, type CaseStudy } from "@/constants/caseStudies";
import SafeImage from "@/components/ui/SafeImage";
import FlipProjectLink from "./FlipProjectLink";
import { getCaseStudyTheme } from "./theme";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import { cn } from "@/utils/cn";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

registerGsap();

function shortClient(client: string) {
  return getShortClientLabel(client);
}

function spotlightHeadline(cs: CaseStudy) {
  const line = cs.summary.replace(/\s+/g, " ").trim();
  if (line.length <= 48) return line.toUpperCase();
  return `${line.slice(0, 45).trim()}…`.toUpperCase();
}

function showcaseImage(cs: CaseStudy) {
  return cs.images[1] || cs.coverImage || cs.images[0] || "";
}

function SpotlightVisual({
  cs,
  imageRef,
}: {
  cs: CaseStudy;
  imageRef: RefObject<HTMLDivElement | null>;
}) {
  const src = showcaseImage(cs);

  return (
    <div ref={imageRef} className="relative h-full w-full" data-cursor="view" data-cursor-text="VIEW">
      <div className="relative h-full w-full overflow-hidden">
        {src ? (
          <SafeImage
            src={src}
            alt={cs.client}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.02]"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br", cs.gradient)} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <p className="pointer-events-none absolute inset-x-0 bottom-0 line-clamp-3 p-4 font-display text-[clamp(0.85rem,1.8vw,1.35rem)] font-medium uppercase leading-snug tracking-tight text-white sm:p-6">
          {spotlightHeadline(cs)}
        </p>
      </div>
    </div>
  );
}

function ProjectRail({
  projects,
  active,
  onSelect,
}: {
  projects: CaseStudy[];
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav aria-label="Featured case studies" className="flex h-full flex-col justify-center gap-0.5 py-4">
      {projects.map((cs, i) => {
        const isActive = active === i;
        return (
          <button
            key={cs.slug}
            type="button"
            onClick={() => onSelect(i)}
            data-cursor="details"
            data-cursor-text="VIEW"
            className={cn(
              "group relative flex items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors duration-300",
              isActive ? "text-text" : "text-muted hover:text-text"
            )}
          >
            <span
              className={cn(
                "absolute left-0 h-5 w-[2px] rounded-full bg-primary transition-all duration-500",
                isActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              )}
            />
            <span className={cn("font-display text-xs tracking-[0.18em]", isActive && "text-primary")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={cn("truncate font-display text-xs font-medium tracking-[0.14em]", isActive && "font-semibold")}>
              {shortClient(cs.client)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

interface CaseStudySpotlightProps {
  projects: CaseStudy[];
  viewAllHref?: string;
}

export default function CaseStudySpotlight({
  projects,
  viewAllHref = "/case-studies",
}: CaseStudySpotlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = usePrefersReducedMotion();
  const total = projects.length;
  const current = projects[active];
  const theme = current ? getCaseStudyTheme(current) : null;

  const scrollToIndex = useCallback(
    (index: number) => {
      if (isDesktop && !reducedMotion && triggerRef.current) {
        const st = triggerRef.current;
        const target = st.start + (index / Math.max(total - 1, 1)) * (st.end - st.start);
        window.__lenis?.scrollTo(target, { duration: 1.1 });
      } else {
        setActive(index);
      }
    },
    [isDesktop, reducedMotion, total]
  );

  useEffect(() => {
    if (!current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ghostRef.current,
        { opacity: 0.2, x: -12 },
        { opacity: 0.35, x: 0, duration: 0.65, ease: "power3.out" }
      );
      gsap.fromTo(
        metaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [active, current, reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || !isDesktop || reducedMotion || total <= 1) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        id: "case-study-spotlight",
        trigger: section,
        start: "top top",
        end: () => `+=${(total - 1) * window.innerHeight * 0.75}`,
        pin,
        pinSpacing: true,
        scrub: 0.45,
        anticipatePin: 1,
        onUpdate: (self) => {
          const next = Math.min(total - 1, Math.round(self.progress * (total - 1)));
          setActive((prev) => (prev === next ? prev : next));
        },
      });
      triggerRef.current = st;
    }, sectionRef);

    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, [isDesktop, reducedMotion, total]);

  useEffect(() => {
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => window.clearTimeout(timer);
  }, [projects.length, isDesktop]);

  if (!current || !theme) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={isDesktop && !reducedMotion ? { minHeight: `${total * 75}vh` } : undefined}
    >
      <div
        ref={pinRef}
        className="flex min-h-[100dvh] items-center justify-center px-4 pb-16 pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-40"
      >
        <div className="relative flex w-full max-w-[min(1400px,95vw)] flex-col gap-4">
          {/* Mobile pills — outside box top */}
          <div className="flex gap-2 overflow-x-auto lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {projects.map((cs, i) => (
              <button
                key={cs.slug}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-colors",
                  active === i
                    ? "border-text bg-text text-background"
                    : "border-border bg-surface text-muted"
                )}
              >
                {String(i + 1).padStart(2, "0")} {shortClient(cs.client)}
              </button>
            ))}
          </div>

          {/* Yellow-box stage — everything contained here */}
          <div className="relative h-[min(520px,calc(100dvh-11rem))] overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-soft sm:h-[min(580px,calc(100dvh-10.5rem))] sm:rounded-[2rem] lg:h-[min(640px,calc(100dvh-10rem))]">
            <div className="grid h-[calc(100%-3.25rem)] grid-cols-1 lg:grid-cols-[132px_minmax(0,0.95fr)_minmax(0,1.05fr)]">
              {/* Left rail — inside box */}
              <aside className="hidden border-r border-border/70 bg-surface/50 lg:block">
                <ProjectRail projects={projects} active={active} onSelect={scrollToIndex} />
              </aside>

              {/* Center meta — clipped ghost text */}
              <div
                className="relative flex min-h-[220px] flex-col justify-end overflow-hidden p-5 sm:min-h-[260px] sm:p-7 lg:justify-center lg:p-8"
                style={{ backgroundColor: theme.archiveBg }}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <p
                    ref={ghostRef}
                    className="absolute -bottom-[0.12em] left-4 select-none whitespace-nowrap font-display text-[clamp(3.5rem,14vw,7.5rem)] font-semibold uppercase leading-none tracking-tightest text-text/[0.07] sm:left-6 lg:left-8"
                    aria-hidden
                  >
                    {shortClient(current.client)}
                  </p>
                </div>

                <div ref={metaRef} className="relative z-10 max-w-md">
                  <p className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-medium leading-none tracking-tightest text-text/20">
                    {String(active + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold uppercase tracking-tightest text-text">
                    {shortClient(current.client)}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-fluid-xs text-muted sm:text-fluid-sm">{current.industry}</p>
                  <p className="mt-1 font-display text-fluid-base text-muted/75">{current.year}</p>

                  <FlipProjectLink
                    caseStudy={current}
                    imageRef={imageRef}
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-text transition-colors hover:text-primary"
                  >
                    Case Study
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </FlipProjectLink>
                </div>
              </div>

              {/* Right visual — inside box */}
              <div className="group relative min-h-[240px] border-t border-border/70 lg:min-h-0 lg:border-l lg:border-t-0">
                {projects.map((cs, i) => (
                  <div
                    key={cs.slug}
                    className={cn(
                      "absolute inset-0 transition-all duration-700 ease-premium",
                      active === i
                        ? "z-10 translate-x-0 opacity-100"
                        : "pointer-events-none z-0 translate-x-4 opacity-0"
                    )}
                  >
                    <SpotlightVisual cs={cs} imageRef={i === active ? imageRef : { current: null }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer — inside box bottom */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex h-[3.25rem] items-center justify-between gap-3 border-t border-border/60 bg-background/85 px-4 backdrop-blur-md sm:px-5">
              <Link
                to={viewAllHref}
                data-cursor="hover"
                className="hidden items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted transition-colors hover:text-text sm:inline-flex sm:text-fluid-xs"
              >
                Explore all case studies
                <ArrowUpRight className="h-3 w-3" />
              </Link>

              <div className="ml-auto flex items-center gap-2 sm:gap-3">
                {!isDesktop && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActive((i) => Math.max(0, i - 1))}
                      disabled={active === 0}
                      aria-label="Previous project"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-text disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActive((i) => Math.min(total - 1, i + 1))}
                      disabled={active >= total - 1}
                      aria-label="Next project"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-text disabled:opacity-40"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                <span className="rounded-full border border-border bg-background px-3 py-1.5 font-display text-xs tracking-[0.22em] text-muted sm:px-4 sm:py-2 sm:text-sm">
                  {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
