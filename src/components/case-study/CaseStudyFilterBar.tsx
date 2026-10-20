import { useState } from "react";
import {
  Cpu,
  GraduationCap,
  HeartPulse,
  Home,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { cn } from "@/utils/cn";

export const CASE_STUDY_FILTER_TABS = [
  { id: "all", label: "All Work", icon: null },
  { id: "interior", label: "Interior", icon: Home },
  { id: "healthcare", label: "Healthcare", icon: HeartPulse },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "technology", label: "Technology", icon: Cpu },
  { id: "food", label: "Food & Beverages", icon: UtensilsCrossed },
] as const;

export type CaseStudyFilterId = (typeof CASE_STUDY_FILTER_TABS)[number]["id"];

export function matchesCaseStudyFilter(haystack: string, filterId: CaseStudyFilterId) {
  const hay = haystack.toLowerCase();
  switch (filterId) {
    case "all":
      return true;
    case "interior":
      return /interior|modular|workspace|architect/.test(hay);
    case "healthcare":
      return /health|hospital|clinic|unani|medical/.test(hay);
    case "education":
      return /education|school|college|university|edtech/.test(hay);
    case "technology":
      return /tech|software|digital|it|hikmath|saas|app/.test(hay);
    case "food":
      return /restaurant|food|beverage|sweet|snack|meat|catering/.test(hay);
    default:
      return true;
  }
}

interface CaseStudyFilterBarProps {
  active: CaseStudyFilterId;
  onChange: (id: CaseStudyFilterId) => void;
  query: string;
  onQueryChange: (value: string) => void;
}

export default function CaseStudyFilterBar({
  active,
  onChange,
  query,
  onQueryChange,
}: CaseStudyFilterBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="sticky top-[4.75rem] z-30 border-y border-border/70 bg-background/95 backdrop-blur-xl sm:top-[5.25rem]">
      <div className="mx-auto max-w-[min(1400px,95vw)] px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CASE_STUDY_FILTER_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onChange(tab.id)}
                  data-cursor="data"
                  data-cursor-text="FILTER"
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-fluid-xs font-medium transition-all duration-300",
                    isActive
                      ? "border-text bg-text text-background"
                      : "border-border bg-surface text-muted hover:border-primary/40 hover:text-text"
                  )}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2">
            {searchOpen ? (
              <div className="flex w-full items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 lg:w-64">
                <Search className="h-4 w-4 shrink-0 text-muted" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full min-w-0 bg-transparent text-fluid-sm text-text outline-none placeholder:text-muted"
                />
                <button
                  type="button"
                  onClick={() => {
                    onQueryChange("");
                    setSearchOpen(false);
                  }}
                  aria-label="Close search"
                  className="text-muted hover:text-text"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                data-cursor="open"
                data-cursor-text="SEARCH"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-fluid-xs font-medium text-text transition-colors hover:border-primary/40 lg:w-auto"
              >
                <Search className="h-3.5 w-3.5 text-muted" />
                Search Projects
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
