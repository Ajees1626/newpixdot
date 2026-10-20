import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import { cn } from "@/utils/cn";

registerGsap();

interface YearFilterProps {
  years: string[];
  selected: string;
  onChange: (year: string) => void;
}

export default function YearFilter({ years, selected, onChange }: YearFilterProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-year-item]"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 85%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [years]);

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      className="relative border-t border-border/60 bg-background px-6 py-10 sm:px-10 lg:px-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-primary">Selected Work</p>
          <p className="mt-3 max-w-md text-fluid-sm text-muted">
            Pick a year — projects reshape instantly. No dropdowns. No filters bar.
          </p>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            data-year-item
            onClick={() => onChange("All")}
            data-cursor="data"
            data-cursor-text="DATA"
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 font-display text-[clamp(1.25rem,3vw,2rem)] font-medium tracking-tightest transition-all duration-400",
              selected === "All"
                ? "bg-text text-background"
                : "text-muted hover:text-text"
            )}
          >
            All
          </button>
          {years.map((year) => (
            <button
              key={year}
              type="button"
              data-year-item
              onClick={() => onChange(year)}
              data-cursor="data"
              data-cursor-text="DATA"
              className={cn(
                "shrink-0 rounded-full px-5 py-2.5 font-display text-[clamp(1.25rem,3vw,2rem)] font-medium tracking-tightest transition-all duration-400",
                selected === year
                  ? "bg-text text-background"
                  : "text-muted hover:text-text"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
