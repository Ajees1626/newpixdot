import { useRef, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/constants/caseStudies";
import SafeImage from "@/components/ui/SafeImage";
import FlipProjectLink from "./FlipProjectLink";
import { getCaseStudyTheme } from "./theme";
import { cn } from "@/utils/cn";

function displayCategory(cs: CaseStudy) {
  const hay = `${cs.industry} ${cs.category}`.toLowerCase();
  if (/interior|modular|workspace/.test(hay)) return "Interior Design";
  if (/health|hospital|clinic|unani|medical/.test(hay)) return "Healthcare Marketing";
  if (/education|school|college|university/.test(hay)) return "Education Marketing";
  if (/tech|software|digital|it|hikmath/.test(hay)) return "Technology Branding";
  if (/restaurant|food|beverage|sweet|snack|meat/.test(hay)) return "Food & Beverage";
  return cs.category || "Digital Marketing";
}

function shortSummary(summary: string) {
  const text = summary.replace(/\s+/g, " ").trim();
  if (text.length <= 140) return text;
  return `${text.slice(0, 137)}...`;
}

interface CaseStudyListRowProps {
  cs: CaseStudy;
  globalIndex: number;
}

export default function CaseStudyListRow({ cs, globalIndex }: CaseStudyListRowProps) {
  const theme = getCaseStudyTheme(cs);
  const imageRef = useRef<HTMLDivElement>(null);
  const category = displayCategory(cs);

  return (
    <article
      className="group relative overflow-hidden rounded-[1.5rem] border border-border/80 shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:shadow-soft sm:rounded-[1.75rem] lg:rounded-[2rem]"
      style={{ backgroundColor: theme.archiveBg }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_minmax(0,46%)] lg:items-stretch">
        <div className="flex items-start px-5 pt-6 sm:px-6 sm:pt-7 lg:items-center lg:px-8 lg:py-8">
          <span
            className="font-display text-[clamp(3rem,8vw,5rem)] font-medium leading-none tracking-tightest text-transparent"
            style={{ WebkitTextStroke: "1.5px hsl(var(--secondary) / 0.45)" }}
            aria-hidden
          >
            {String(globalIndex + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col justify-center px-5 pb-5 sm:px-6 sm:pb-6 lg:px-0 lg:py-8 lg:pr-6">
          <h2 className="font-display text-[clamp(1.35rem,3vw,2rem)] font-semibold uppercase leading-tight tracking-tight text-text">
            {cs.client}
          </h2>
          <p className={cn("mt-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-fluid-xs", theme.accent)}>
            {category}
          </p>
          <p className="mt-3 line-clamp-2 max-w-xl text-fluid-xs leading-relaxed text-muted sm:text-fluid-sm">
            {shortSummary(cs.summary)}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-6">
            <span className="font-display text-fluid-sm text-muted/80">{cs.year}</span>
            <FlipProjectLink
              caseStudy={cs}
              imageRef={imageRef}
              className="inline-flex items-center gap-2 text-fluid-xs font-semibold uppercase tracking-[0.2em] text-text transition-colors hover:text-primary"
            >
              View Case Study
              <ArrowUpRight className="h-4 w-4" />
            </FlipProjectLink>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative min-h-[200px] overflow-hidden sm:min-h-[240px] lg:min-h-[220px]"
        >
          {cs.coverImage ? (
            <SafeImage
              src={cs.coverImage}
              alt={cs.client}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className={cn("absolute inset-0 bg-gradient-to-br", cs.gradient)} />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--row-bg,transparent)] via-[var(--row-bg,transparent)]/80 to-transparent lg:via-[var(--row-bg,transparent)]/40" style={{ "--row-bg": theme.archiveBg } as CSSProperties} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black/10" />

          <FlipProjectLink
            caseStudy={cs}
            imageRef={imageRef}
            className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/90 text-neutral-900 shadow-soft backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:bottom-6 sm:right-6"
          >
            <ArrowUpRight className="h-4 w-4" />
          </FlipProjectLink>
        </div>
      </div>
    </article>
  );
}
