import { useEffect, useState } from "react";
import { CASE_STUDY_SECTIONS, type CaseStudySectionId } from "./types";
import { cn } from "@/utils/cn";

const OBSERVED = CASE_STUDY_SECTIONS.map((s) => s.id);

interface StickyNavigationProps {
  active: CaseStudySectionId;
  onNavigate: (id: CaseStudySectionId) => void;
}

export default function StickyNavigation({ active, onNavigate }: StickyNavigationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.65);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Case study sections"
        className={cn(
          "fixed left-8 top-1/2 z-40 hidden w-36 -translate-y-1/2 flex-col gap-5 transition-all duration-500 xl:flex",
          visible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0 pointer-events-none"
        )}
      >
        {CASE_STUDY_SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onNavigate(section.id)}
              data-cursor="details"
              data-cursor-text={section.label.toUpperCase()}
              className="group relative flex items-center gap-3 text-left"
            >
              <span
                className={cn(
                  "w-6 font-display text-[10px] tracking-[0.25em]",
                  isActive ? "text-primary" : "text-muted group-hover:text-text"
                )}
              >
                {section.number}
              </span>
              <span
                className={cn(
                  "text-fluid-xs font-medium",
                  isActive ? "text-text" : "text-muted group-hover:text-text"
                )}
              >
                {section.label}
              </span>
              <span
                className={cn(
                  "absolute -left-4 h-6 w-[2px] rounded-full bg-primary transition-all duration-500",
                  isActive ? "scale-y-100 opacity-100 shadow-[0_0_14px_hsl(var(--primary)/0.7)]" : "scale-y-0 opacity-0"
                )}
              />
            </button>
          );
        })}
      </nav>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md xl:hidden">
        <div className="flex gap-1 overflow-x-auto px-3 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CASE_STUDY_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onNavigate(section.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-wider",
                active === section.id
                  ? "bg-text text-background"
                  : "text-muted"
              )}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export function useCaseStudyScrollSpy(setActive: (id: CaseStudySectionId) => void) {
  useEffect(() => {
    const sections = OBSERVED.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id as CaseStudySectionId);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.15, 0.35, 0.55] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActive]);
}
