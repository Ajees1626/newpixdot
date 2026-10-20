import { useCallback, useState } from "react";
import type { CaseStudy } from "@/constants/caseStudies";
import CaseStudySplitHero from "./CaseStudySplitHero";
import ArchiveReel from "./ArchiveReel";
import CommandSearch, { type CommandSearchFilters } from "./CommandSearch";
import CTASection from "@/sections/CTA/CTASection";
import { cn } from "@/utils/cn";

interface CaseStudyArchiveProps {
  projects: CaseStudy[];
  totalCount: number;
  years: string[];
  year: string;
  onYearChange: (year: string) => void;
  search: CommandSearchFilters;
  quickFilters: string[];
  activeQuickFilter: string | null;
  onQuickFilter: (label: string) => void;
}

export default function CaseStudyArchive({
  projects,
  totalCount,
  years,
  year,
  onYearChange,
  search,
  quickFilters,
  activeQuickFilter,
  onQuickFilter,
}: CaseStudyArchiveProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollToArchive = useCallback(() => {
    document.getElementById("archive-stage")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="bg-background">
      <CaseStudySplitHero
        projects={projects}
        businessCount={totalCount}
        onSearchOpen={() => setSearchOpen(true)}
        onExplore={scrollToArchive}
      />

      <div
        id="archive-stage"
        className="sticky top-[5.5rem] z-30 border-y border-border/70 bg-background/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-[min(1400px,95vw)] items-center gap-4 overflow-x-auto px-4 py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-6">
          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
            Selected Work
          </p>
          <button
            type="button"
            onClick={() => onYearChange("All")}
            data-cursor="data"
            data-cursor-text="DATA"
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 font-display text-lg tracking-tightest transition-colors",
              year === "All"
                ? "bg-text text-background"
                : "text-muted hover:text-text"
            )}
          >
            All
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => onYearChange(y)}
              data-cursor="data"
              data-cursor-text="DATA"
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 font-display text-lg tracking-tightest transition-colors",
                year === y
                  ? "bg-text text-background"
                  : "text-muted hover:text-text"
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <CommandSearch
        filters={search}
        quickFilters={quickFilters}
        activeQuickFilter={activeQuickFilter}
        onQuickFilter={onQuickFilter}
        open={searchOpen}
        onOpenChange={setSearchOpen}
        hideTrigger
      />

      <ArchiveReel projects={projects} activeIndex={activeIndex} onActiveChange={setActiveIndex} />

      <CTASection />
    </div>
  );
}
