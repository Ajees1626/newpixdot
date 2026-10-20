import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/constants/caseStudies";
import SafeImage from "@/components/ui/SafeImage";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import { getCaseStudyTheme } from "./theme";
import { cn } from "@/utils/cn";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

registerGsap();

interface CinematicProjectStackProps {
  projects: CaseStudy[];
  showIntro?: boolean;
  introEyebrow?: string;
  introTitle?: string;
  introSubtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function CinematicProjectStack({
  projects,
  showIntro = true,
  introEyebrow = "Case Studies",
  introTitle = "Every scroll tells a different story.",
  introSubtitle = "No cards. No grids. Each project is a cinematic chapter.",
  viewAllHref,
  viewAllLabel = "View all case studies",
}: CinematicProjectStackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const total = showIntro ? projects.length + 1 : projects.length;

  useEffect(() => {
    if (!isDesktop || reducedMotion || projects.length === 0) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const panels = pin.querySelectorAll("[data-cinematic-panel]");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * Math.max(total - 1, 1)}`,
          pin: pin,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              total - 1,
              Math.max(0, Math.round(self.progress * (total - 1)))
            );
            setActive(idx);
          },
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.fromTo(
          panel,
          { opacity: 0, y: 80, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
          i
        );
        if (i > 1) {
          tl.to(
            panels[i - 1],
            { opacity: 0, y: -60, scale: 1.02, duration: 0.8, ease: "power2.in" },
            i
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop, reducedMotion, projects.length, total]);

  if (projects.length === 0) {
    return (
      <p className="py-32 text-center text-fluid-sm text-muted">No case studies to show.</p>
    );
  }

  /* Mobile / tablet: stacked story sections */
  if (!isDesktop || reducedMotion) {
    return (
      <section className="relative">
        {showIntro && (
          <div className="flex min-h-[70vh] flex-col justify-end px-6 pb-16 pt-32 sm:px-10 lg:px-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
              {introEyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,7vw,3.5rem)] font-medium leading-[1.02] tracking-tightest text-text">
              {introTitle}
            </h2>
            <p className="mt-4 max-w-xl text-fluid-sm text-muted">{introSubtitle}</p>
          </div>
        )}
        {projects.map((cs, i) => (
          <MobileProjectSlide key={cs.slug} cs={cs} index={i} />
        ))}
        {viewAllHref && (
          <div className="px-6 pb-20 sm:px-10">
            <Link
              to={viewAllHref}
              data-cursor="open"
              className="inline-flex items-center gap-2 text-fluid-sm font-medium text-text"
            >
              {viewAllLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      style={{ height: `${total * 100}vh` }}
      className="relative"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {showIntro && (
          <div
            data-cinematic-panel
            className={cn(
              "absolute inset-0 flex flex-col justify-end px-16 pb-24 transition-opacity duration-500",
              active === 0 ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
            <div className="relative z-10 max-w-4xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">
                {introEyebrow}
              </p>
              <h2 className="mt-6 font-display text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-tightest text-text">
                {introTitle}
              </h2>
              <p className="mt-6 max-w-xl text-fluid-base text-muted">{introSubtitle}</p>
              {viewAllHref && (
                <Link
                  to={viewAllHref}
                  data-cursor="open"
                  className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-fluid-xs font-medium uppercase tracking-wider text-text transition-colors hover:bg-text hover:text-white dark:hover:bg-white dark:hover:text-neutral-950"
                >
                  {viewAllLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-muted">
              Scroll
            </div>
          </div>
        )}

        {projects.map((cs, i) => {
          const panelIndex = showIntro ? i + 1 : i;
          const theme = getCaseStudyTheme(cs);
          const isActive = active === panelIndex;

          return (
            <div
              key={cs.slug}
              data-cinematic-panel
              className={cn(
                "absolute inset-0 transition-opacity duration-700",
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br", theme.heroOverlay)} />
              {cs.coverImage && (
                <SafeImage
                  src={cs.coverImage}
                  alt={cs.client}
                  className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
                />
              )}

              <div className="relative z-10 grid h-full grid-cols-12 items-center gap-8 px-16">
                <div className="col-span-5">
                  <p className="font-display text-[clamp(4rem,10vw,9rem)] font-medium leading-none text-white/10">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.02] tracking-tightest text-white">
                    {cs.client}
                  </h3>
                  <p className="mt-2 text-fluid-xs uppercase tracking-[0.25em] text-white/60">
                    {cs.industry} · {cs.year}
                  </p>
                  <p className="mt-6 max-w-md text-fluid-sm leading-relaxed text-white/75">
                    {cs.summary.slice(0, 180)}
                    {cs.summary.length > 180 ? "…" : ""}
                  </p>
                  <Link
                    to={`/case-studies/${cs.slug}`}
                    data-cursor="open"
                    data-cursor-text="OPEN"
                    className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-fluid-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-neutral-950"
                  >
                    View case study
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="col-span-7 flex justify-end">
                  <div
                    data-cursor="view"
                    data-cursor-text="VIEW"
                    className="relative w-[min(52vw,620px)] will-change-transform"
                  >
                    <div className={cn("absolute -inset-8 rounded-[3rem] bg-gradient-to-br opacity-40 blur-3xl", theme.glow)} />
                    {cs.coverImage ? (
                      <SafeImage
                        src={cs.coverImage}
                        alt={cs.client}
                        className="relative aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl"
                      />
                    ) : (
                      <div
                        className={cn(
                          "relative aspect-[4/5] w-full rounded-[2.5rem] bg-gradient-to-br shadow-2xl",
                          cs.gradient
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MobileProjectSlide({ cs, index }: { cs: CaseStudy; index: number }) {
  const theme = getCaseStudyTheme(cs);
  return (
    <Link
      to={`/case-studies/${cs.slug}`}
      data-cursor="open"
      className="relative block min-h-[85vh] border-t border-border"
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br", theme.heroOverlay)} />
      {cs.coverImage && (
        <SafeImage
          src={cs.coverImage}
          alt={cs.client}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="relative z-10 flex h-full min-h-[85vh] flex-col justify-between px-6 py-16 sm:px-10">
        <span className="font-display text-6xl font-medium text-white/15">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-display text-[clamp(1.75rem,6vw,2.75rem)] font-medium leading-tight text-white">
            {cs.client}
          </h3>
          <p className="mt-2 text-fluid-xs uppercase tracking-widest text-white/60">
            {cs.category} · {cs.year}
          </p>
          <p className="mt-4 line-clamp-3 text-fluid-sm text-white/75">{cs.summary}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-fluid-xs font-medium uppercase tracking-wider text-white">
            Open case study <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
