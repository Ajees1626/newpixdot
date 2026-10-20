import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import CaseStudyListingHero from "@/components/case-study/CaseStudyListingHero";
import CaseStudyFilterBar, {
  matchesCaseStudyFilter,
  type CaseStudyFilterId,
} from "@/components/case-study/CaseStudyFilterBar";
import CaseStudyListRow from "@/components/case-study/CaseStudyListRow";
import CaseStudyPageCTA from "@/components/case-study/CaseStudyPageCTA";
import { CASE_STUDIES } from "@/constants/caseStudies";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/utils/cn";

const PAGE_SIZE = 5;

export default function CaseStudy() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CaseStudyFilterId>("all");
  const [page, setPage] = useState(0);

  useSeo({
    title: "Case Studies | Pixdot Solutions",
    description:
      "Explore Pixdot Solutions case studies across branding, creative design, web development, and digital marketing to discover our approach to solving business challenges.",
    path: "/case-studies",
  });

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return CASE_STUDIES.filter((cs) => {
      const searchableContent = [
        cs.industry,
        cs.client,
        cs.category,
        cs.title,
        cs.summary,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchableContent.includes(normalizedQuery);

      const matchesFilter = matchesCaseStudyFilter(
        searchableContent,
        filter
      );

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);

  const pageItems = filtered.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE
  );

  const rangeStart =
    filtered.length === 0 ? 0 : currentPage * PAGE_SIZE + 1;

  const rangeEnd = Math.min(
    filtered.length,
    (currentPage + 1) * PAGE_SIZE
  );

  useEffect(() => {
    setPage(0);
  }, [query, filter]);

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(Math.max(0, totalPages - 1));
    }
  }, [page, totalPages]);

  const navigatePage = (direction) => {
    setPage((current) =>
      Math.max(0, Math.min(totalPages - 1, current + direction))
    );

    document
      .getElementById("case-study-list")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-background text-text">
      <CaseStudyListingHero businessCount={CASE_STUDIES.length} />

      <CaseStudyFilterBar
        active={filter}
        onChange={setFilter}
        query={query}
        onQueryChange={setQuery}
      />

      <section
        id="case-study-list"
        className="scroll-mt-28 pb-8 sm:pb-10"
      >
        <Container>
          <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7">
            {pageItems.map((cs, i) => (
              <Reveal key={cs.slug} delay={i * 0.05}>
                <CaseStudyListRow
                  cs={cs}
                  globalIndex={currentPage * PAGE_SIZE + i}
                />
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center sm:py-20">
              <p className="font-display text-fluid-lg font-medium text-text">
                No matching case studies found.
              </p>
              <p className="mt-2 text-fluid-sm text-muted">
                Try another search term or choose a different category to
                explore Pixdot's work.
              </p>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-8 sm:flex-row">
              <p
                className="text-fluid-xs text-muted"
                aria-live="polite"
              >
                Showing{" "}
                <span className="font-medium text-text">
                  {rangeStart}–{rangeEnd}
                </span>{" "}
                of{" "}
                <span className="font-medium text-text">
                  {filtered.length}
                </span>{" "}
                case studies
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigatePage(-1)}
                  disabled={currentPage === 0}
                  aria-label="Previous page"
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-fluid-xs font-medium uppercase tracking-wider transition-colors",
                    currentPage === 0
                      ? "cursor-not-allowed opacity-40"
                      : "text-text hover:border-primary hover:text-primary"
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>

                <span
                  className="min-w-[4.5rem] text-center font-display text-sm tracking-widest text-muted"
                  aria-label={`Page ${currentPage + 1} of ${totalPages}`}
                >
                  {String(currentPage + 1).padStart(2, "0")} /{" "}
                  {String(totalPages).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={() => navigatePage(1)}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Next page"
                  className={cn(
                    "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-fluid-xs font-medium uppercase tracking-wider transition-colors",
                    currentPage >= totalPages - 1
                      ? "cursor-not-allowed border-border opacity-40"
                      : "border-text bg-text text-background hover:opacity-90"
                  )}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </Container>
      </section>

      <CaseStudyPageCTA />
    </div>
  );
}
 