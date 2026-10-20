import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/utils/cn";

export interface CommandSearchFilters {
  query: string;
  category: string;
  industry: string;
  categories: string[];
  industries: string[];
  resultCount: number;
  totalCount: number;
  onQueryChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onIndustryChange: (v: string) => void;
}

interface CommandSearchProps {
  filters: CommandSearchFilters;
  quickFilters?: string[];
  activeQuickFilter?: string | null;
  onQuickFilter?: (label: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
  className?: string;
}

export default function CommandSearch({
  filters,
  quickFilters = [],
  activeQuickFilter,
  onQuickFilter,
  open: controlledOpen,
  onOpenChange,
  hideTrigger = false,
  className,
}: CommandSearchProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  return (
    <>
      {!hideTrigger && (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
            data-cursor="open"
            data-cursor-text="SEARCH"
            className={cn(
              "fixed right-6 top-28 z-[60] hidden items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-fluid-xs font-medium text-muted shadow-soft backdrop-blur-md transition-colors hover:text-text lg:flex",
              className
            )}
          >
            <span className="rounded border border-border px-1.5 py-0.5 text-[10px]">⌘</span>
            Search Projects
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Search"
            className="fixed right-4 top-24 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur-md lg:hidden"
          >
            <Search className="h-4 w-4" />
          </button>
        </>
      )}

      <div
        className={cn(
          "fixed inset-0 z-[70] flex items-start justify-center bg-black/40 px-4 pt-[18vh] backdrop-blur-sm transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search impact archive"
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "w-full max-w-lg rounded-[1.75rem] border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300",
            open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-muted" />
            <input
              ref={inputRef}
              value={filters.query}
              onChange={(e) => filters.onQueryChange(e.target.value)}
              placeholder="Search projects…"
              className="w-full bg-transparent text-fluid-sm text-text outline-none placeholder:text-muted"
            />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close">
              <X className="h-4 w-4 text-muted" />
            </button>
          </div>

          {quickFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {quickFilters.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => onQuickFilter?.(label)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-colors",
                    activeQuickFilter === label
                      ? "bg-primary/15 text-primary"
                      : "border border-border text-muted hover:text-text"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {filters.categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => filters.onCategoryChange(cat)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-colors",
                  filters.category === cat
                    ? "bg-text text-background"
                    : "border border-border text-muted hover:text-text"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {filters.industries.slice(0, 8).map((ind) => (
              <button
                key={ind}
                type="button"
                onClick={() => filters.onIndustryChange(ind)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[10px] font-medium transition-colors",
                  filters.industry === ind
                    ? "bg-primary/15 text-primary"
                    : "border border-border text-muted hover:text-text"
                )}
              >
                {ind}
              </button>
            ))}
          </div>

          <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-muted">
            {filters.resultCount} of {filters.totalCount} stories
          </p>
        </div>
      </div>
    </>
  );
}
