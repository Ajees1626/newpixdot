import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/constants/caseStudies";
import SafeImage from "@/components/ui/SafeImage";
import FlipProjectLink from "./FlipProjectLink";
import ProjectImageReveal from "./ProjectImageReveal";
import ThemePattern from "./ThemePattern";
import NoiseOverlay from "./NoiseOverlay";
import { getCaseStudyTheme } from "./theme";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import { cn } from "@/utils/cn";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

registerGsap();

interface DigitalWallProps {
  projects: CaseStudy[];
  showIntro?: boolean;
  introLabel?: string;
  introTitle?: string;
  introSubtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

function shortName(client: string) {
  return client.split(/\s+/)[0]?.toUpperCase() || client;
}

function WallProgress({ barRef, visible }: { barRef: React.RefObject<HTMLDivElement | null>; visible: boolean }) {
  return createPortal(
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[55] h-[3px] bg-transparent transition-opacity duration-500",
        !visible && "opacity-0"
      )}
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-primary via-secondary to-accent"
        style={{ transformOrigin: "left center" }}
      />
    </div>,
    document.body
  );
}

function WallProjectNav({
  projects,
  activeProjectIndex,
  visible,
  onJump,
}: {
  projects: CaseStudy[];
  activeProjectIndex: number;
  visible: boolean;
  onJump: (index: number) => void;
}) {
  return createPortal(
    <nav
      aria-label="Project chapters"
      className={cn(
        "fixed left-6 top-1/2 z-[40] hidden -translate-y-1/2 flex-col gap-4 transition-opacity duration-500 lg:flex",
        (!visible || activeProjectIndex < 0) && "pointer-events-none opacity-0"
      )}
    >
      {projects.map((cs, i) => {
        const isActive = activeProjectIndex === i;
        return (
          <button
            key={cs.slug}
            type="button"
            onClick={() => onJump(i)}
            data-cursor="open"
            data-cursor-text="OPEN"
            className="group relative flex items-center gap-3 text-left"
          >
            <span
              className={cn(
                "w-6 font-display text-[10px] tracking-[0.25em] transition-colors",
                isActive ? "text-primary" : "text-muted group-hover:text-text"
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "max-w-[120px] truncate text-fluid-xs font-medium transition-colors",
                isActive ? "text-text" : "text-muted group-hover:text-text"
              )}
            >
              {shortName(cs.client)}
            </span>
            <span
              className={cn(
                "absolute -left-3 h-5 w-[2px] rounded-full bg-primary transition-all duration-500",
                isActive ? "scale-y-100 opacity-100 shadow-[0_0_12px_hsl(var(--primary)/0.8)]" : "scale-y-0 opacity-0"
              )}
            />
          </button>
        );
      })}
    </nav>,
    document.body
  );
}

function industryLabel(industry: string) {
  return industry.split("/")[0]?.trim() || industry;
}

function DesktopWallPanel({
  cs,
  index,
  isActive,
  onRegisterRefs,
}: {
  cs: CaseStudy;
  index: number;
  isActive: boolean;
  onRegisterRefs: (
    index: number,
    text: HTMLDivElement | null,
    image: HTMLDivElement | null,
    imageWrap: HTMLDivElement | null
  ) => void;
}) {
  const theme = getCaseStudyTheme(cs);
  const textRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onRegisterRefs(index, textRef.current, artworkRef.current, imageWrapRef.current);
    return () => onRegisterRefs(index, null, null, null);
  }, [index, onRegisterRefs]);

  return (
    <div
      className={cn(
        "absolute inset-0 transition-all duration-700",
        isActive ? "z-10 opacity-100" : "pointer-events-none z-0 scale-[1.02] opacity-0"
      )}
      style={{ backgroundColor: theme.archiveBg }}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-25", theme.wallMood)} />
      <ThemePattern theme={theme} />

      <div className="relative z-10 grid h-full grid-cols-1 items-center gap-8 px-8 md:grid-cols-2 md:gap-12 md:px-12 lg:pl-44 lg:pr-16 xl:pl-52">
        <div ref={textRef} className="flex flex-col justify-center will-change-transform">
          <p className="font-display text-[10px] tracking-[0.35em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[0.92] tracking-tightest text-neutral-900">
            {shortName(cs.client)}
          </h3>
          <p className="mt-3 text-fluid-sm text-neutral-600">{industryLabel(cs.industry)}</p>
          <p className="mt-1 font-display text-fluid-lg text-neutral-400">{cs.year}</p>

          <FlipProjectLink
            caseStudy={cs}
            imageRef={imageWrapRef}
            className="group mt-10 inline-flex w-fit flex-col items-start gap-1 text-left transition-opacity hover:opacity-80"
          >
            <span
              data-cursor="open"
              data-cursor-text="GO"
              className="text-fluid-xs font-semibold uppercase tracking-[0.28em] text-neutral-900"
            >
              Case Study
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-muted transition-transform group-hover:translate-y-0.5">
              ↓ 120 sec Story
            </span>
          </FlipProjectLink>
        </div>

        <div ref={imageWrapRef} className="flex items-center justify-center will-change-transform md:justify-end">
          <ProjectImageReveal cs={cs} isActive={isActive} imageRef={artworkRef} />
        </div>
      </div>
    </div>
  );
}

function MobileSwipeWall({ projects, showIntro, introLabel, introTitle, introSubtitle }: DigitalWallProps) {
  const [index, setIndex] = useState(0);
  const touchStart = useRef(0);
  const slides = showIntro ? ["intro", ...projects.map((p) => p.slug)] : projects.map((p) => p.slug);

  const go = (dir: number) => {
    setIndex((i) => Math.min(slides.length - 1, Math.max(0, i + dir)));
  };

  return (
    <section className="relative h-[100dvh] overflow-hidden">
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
        {showIntro && (
          <div className="flex h-full w-full shrink-0 flex-col items-center justify-center px-6 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-primary">{introLabel}</p>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,10vw,3.5rem)] font-medium leading-[0.95] tracking-tightest text-text">
              {introTitle}
            </h2>
            <p className="mt-4 max-w-sm text-fluid-sm text-muted">{introSubtitle}</p>
            <p className="mt-10 text-[10px] uppercase tracking-[0.35em] text-muted">Swipe →</p>
          </div>
        )}

        {projects.map((cs, i) => (
          <MobileSlide key={cs.slug} cs={cs} index={i} isCurrent={index === i + (showIntro ? 1 : 0)} />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn("h-1 rounded-full transition-all", i === index ? "w-8 bg-primary" : "w-2 bg-border")}
          />
        ))}
      </div>
    </section>
  );
}

function MobileSlide({ cs, index, isCurrent }: { cs: CaseStudy; index: number; isCurrent: boolean }) {
  const theme = getCaseStudyTheme(cs);
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-full w-full shrink-0" style={{ backgroundColor: theme.archiveBg }}>
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20", theme.wallMood)} />
      <div className="relative z-10 flex h-full flex-col px-6 py-20">
        <div ref={imageRef} className="mx-auto w-[78%] max-w-sm">
          {cs.coverImage && (
            <SafeImage
              src={cs.coverImage}
              alt={cs.client}
              data-cursor="view"
              data-cursor-text="VIEW"
              className={cn(
                "aspect-[9/16] w-full rounded-[1.75rem] object-cover shadow-2xl transition-transform duration-700",
                isCurrent && "scale-[1.02]"
              )}
            />
          )}
        </div>
        <div className="mt-auto">
          <p className="font-display text-[10px] tracking-[0.35em] text-muted">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 font-display text-2xl font-medium text-neutral-900">{shortName(cs.client)}</h3>
          <p className="mt-1 text-fluid-xs text-neutral-600">{industryLabel(cs.industry)}</p>
          <p className="mt-0.5 font-display text-lg text-neutral-400">{cs.year}</p>
          <FlipProjectLink
            caseStudy={cs}
            imageRef={imageRef}
            className="group mt-6 inline-flex flex-col items-start gap-0.5"
          >
            <span data-cursor="open" data-cursor-text="GO" className="text-fluid-xs font-semibold uppercase tracking-wider text-neutral-900">
              Case Study
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted">↓ 120 sec Story</span>
          </FlipProjectLink>
        </div>
      </div>
    </div>
  );
}

export default function DigitalWall({
  projects,
  showIntro = true,
  introLabel = "Impact Archive",
  introTitle = "Business transformations.",
  introSubtitle = "Not a portfolio grid — a Netflix-style journey through every brand we moved forward.",
  viewAllHref,
  viewAllLabel = "Explore full archive",
}: DigitalWallProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isWide = useMediaQuery("(min-width: 1280px)");
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [wallInView, setWallInView] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const lastActiveRef = useRef(0);
  const panelTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelImageWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const total = showIntro ? projects.length + 1 : projects.length;
  const activeProjectIndex = showIntro ? active - 1 : active;

  const registerPanelRefs = useCallback(
    (
      index: number,
      text: HTMLDivElement | null,
      image: HTMLDivElement | null,
      imageWrap: HTMLDivElement | null
    ) => {
      panelTextRefs.current[index] = text;
      panelImageRefs.current[index] = image;
      panelImageWrapRefs.current[index] = imageWrap;
    },
    []
  );

  const jumpToProject = useCallback(
    (projectIndex: number) => {
      const st = stRef.current;
      if (!st || projectIndex < 0) return;
      const panelIndex = showIntro ? projectIndex + 1 : projectIndex;
      const segments = Math.max(total - 1, 1);
      const target = (panelIndex / segments) * (st.end - st.start) + st.start;
      window.scrollTo({ top: target, behavior: "smooth" });
    },
    [showIntro, total]
  );

  useEffect(() => {
    if (!isDesktop || reducedMotion || projects.length === 0) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    lastActiveRef.current = 0;
    setActive(0);

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        id: "digital-wall",
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * Math.max(total - 1, 1)}`,
        pin: pin,
        scrub: 0.55,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => setWallInView(true),
        onLeaveBack: () => setWallInView(false),
        onLeave: () => setWallInView(false),
        onUpdate: (self) => {
          setWallInView(self.isActive);
          const segments = Math.max(total - 1, 1);
          const raw = self.progress * segments;
          const idx = Math.min(total - 1, Math.max(0, Math.floor(raw)));
          const local = raw - idx;

          const bar = progressBarRef.current;
          if (bar) {
            bar.style.transform = `scaleX(${self.progress})`;
          }

          const projectPanelIndex = showIntro ? idx - 1 : idx;
          if (projectPanelIndex >= 0) {
            const textEl = panelTextRefs.current[projectPanelIndex];
            const imageEl = panelImageRefs.current[projectPanelIndex];
            const imageWrapEl = panelImageWrapRefs.current[projectPanelIndex];
            if (textEl) {
              gsap.set(textEl, {
                y: -local * 40,
                opacity: 1 - local * 0.2,
                filter: `blur(${local * 4}px)`,
              });
            }
            if (imageWrapEl) {
              gsap.set(imageWrapEl, { y: local * 96 });
            }
            if (imageEl) {
              gsap.set(imageEl, { scale: 1 + local * 0.28 });
            }
          }

          if (idx !== lastActiveRef.current) {
            lastActiveRef.current = idx;
            setActive(idx);
          }
        },
      });
      stRef.current = st;
    }, sectionRef);

    return () => {
      ctx.revert();
      stRef.current = null;
    };
  }, [isDesktop, reducedMotion, projects.length, total]);

  if (projects.length === 0) {
    return <p className="py-32 text-center text-fluid-sm text-muted">No stories match your search.</p>;
  }

  if (!isDesktop || reducedMotion) {
    return (
      <MobileSwipeWall
        projects={projects}
        showIntro={showIntro}
        introLabel={introLabel}
        introTitle={introTitle}
        introSubtitle={introSubtitle}
      />
    );
  }

  return (
    <section ref={sectionRef} style={{ height: `${total * 100}vh` }} className="relative">
      <NoiseOverlay />
      <WallProgress barRef={progressBarRef} visible={wallInView} />
      <WallProjectNav
        projects={projects}
        activeProjectIndex={activeProjectIndex}
        visible={wallInView}
        onJump={jumpToProject}
      />

      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {showIntro && (
          <div
            className={cn(
              "absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center transition-all duration-700 md:px-16",
              active === 0 ? "opacity-100" : "pointer-events-none scale-95 opacity-0 blur-sm"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-background" />
            <div className="relative z-10 max-w-5xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.5em] text-primary">{introLabel}</p>
              <h2 className="mt-8 font-display text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.9] tracking-tightest text-text">
                {introTitle}
              </h2>
              <p className="mx-auto mt-8 max-w-xl text-fluid-base text-muted">{introSubtitle}</p>
              {viewAllHref && (
                <Link
                  to={viewAllHref}
                  data-cursor="open"
                  className={cn(
                    "mt-10 inline-flex items-center gap-2 text-fluid-xs font-medium uppercase tracking-widest text-text transition-opacity duration-500",
                    active !== 0 && "pointer-events-none opacity-0"
                  )}
                >
                  {viewAllLabel} <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            <p className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-muted">Scroll</p>
          </div>
        )}

        {projects.map((cs, i) => {
          const panelIndex = showIntro ? i + 1 : i;
          return (
            <DesktopWallPanel
              key={cs.slug}
              cs={cs}
              index={i}
              isActive={active === panelIndex}
              onRegisterRefs={registerPanelRefs}
            />
          );
        })}

        {isWide &&
          createPortal(
            <div
              className={cn(
                "pointer-events-none fixed bottom-8 right-8 z-[50] rounded-full border border-border bg-background/80 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-muted backdrop-blur-md transition-opacity duration-500",
                (activeProjectIndex < 0 || !wallInView) && "opacity-0"
              )}
            >
              {activeProjectIndex >= 0
                ? `${String(activeProjectIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`
                : `00 / ${String(projects.length).padStart(2, "0")}`}
            </div>,
            document.body
          )}
      </div>
    </section>
  );
}
