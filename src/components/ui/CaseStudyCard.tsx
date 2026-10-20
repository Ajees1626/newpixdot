import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/constants/caseStudies";
import { cn } from "@/utils/cn";

type CaseStudyCardVariant = "showcase" | "visual";

interface CaseStudyCardProps {
  cs: CaseStudy;
  variant?: CaseStudyCardVariant;
  className?: string;
}

/** Home / listing cards — showcase = metric card; visual = B&W image, color on hover. */
export default function CaseStudyCard({
  cs,
  variant = "visual",
  className,
}: CaseStudyCardProps) {
  if (variant === "showcase") {
    return (
      <Link
        to={`/case-studies/${cs.slug}`}
        data-cursor="hover"
        className={cn(
          "group block w-full shrink-0 sm:w-[min(420px,88vw)] lg:w-[min(400px,34vw)]",
          className
        )}
      >
        <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-transparent hover:shadow-soft sm:min-h-[240px] sm:p-7">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
              cs.gradient
            )}
          />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="truncate text-fluid-xs font-semibold uppercase tracking-widest text-muted transition-colors duration-500 group-hover:text-white/80">
                {cs.category}
              </p>
              <p className="mt-3 truncate font-display text-fluid-lg font-medium leading-tight text-text transition-colors duration-500 group-hover:text-white sm:text-fluid-xl">
                {cs.client}
              </p>
              <p className="mt-2 truncate text-fluid-xs text-muted transition-colors duration-500 group-hover:text-white/80 sm:text-fluid-sm">
                {cs.title}
              </p>
            </div>
            <div className="mt-8 flex items-end justify-between gap-4">
              <span className="text-fluid-xs text-muted transition-colors duration-500 group-hover:text-white/70">
                {cs.year}
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/case-studies/${cs.slug}`}
      data-cursor="hover"
      className={cn("group block", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface sm:aspect-[16/10] sm:rounded-[1.75rem] md:rounded-[2rem]">
        {cs.coverImage ? (
          <img
            src={cs.coverImage}
            alt={cs.client}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br", cs.gradient)} />
        )}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-80",
            cs.gradient
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent transition-colors duration-500 group-hover:from-black/45 dark:from-black/60 dark:via-black/20" />

        <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 md:p-6">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <span className="rounded-full border border-white/25 bg-black/25 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white backdrop-blur-md sm:px-3 sm:py-1 sm:text-[10px] md:text-fluid-xs">
              {cs.category}
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-white opacity-70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:h-5 sm:w-5" />
          </div>
          <div>
            <p className="truncate font-display text-fluid-base font-medium text-white sm:text-fluid-lg md:text-fluid-xl">
              {cs.client}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-white/80 sm:mt-1 sm:text-fluid-xs">{cs.industry}</p>
          </div>
        </div>
      </div>
      <div className="mt-2.5 flex items-start justify-between gap-2 sm:mt-3 md:mt-4 md:gap-3">
        <p className="line-clamp-2 text-fluid-xs font-medium text-text sm:line-clamp-1 sm:text-fluid-sm md:text-fluid-base">
          {cs.title}
        </p>
        <span className="shrink-0 pt-0.5 text-[10px] text-muted sm:text-fluid-xs">{cs.year}</span>
      </div>
    </Link>
  );
}
