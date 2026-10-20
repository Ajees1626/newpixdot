import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import PreviewFade from "@/components/ui/PreviewFade";
import Reveal from "@/components/layout/Animations/Reveal";
import { DynamicIcon } from "@/utils/icons";
import { SOLUTIONS } from "@/constants/solutions";
import { HOME_PREVIEW } from "@/constants/preview";
import { cn } from "@/utils/cn";

const SIZE_CLASSES: Record<string, string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-1 sm:row-span-2",
  sm: "sm:col-span-1 sm:row-span-1",
};

type SolutionsBentoProps = {
  /** When true, show only home preview count. Default true for home use. */
  preview?: boolean;
  showHeader?: boolean;
};

export default function SolutionsBento({ preview = true, showHeader = true }: SolutionsBentoProps) {
  const items = preview ? SOLUTIONS.slice(0, HOME_PREVIEW.solutions) : SOLUTIONS;

  const grid = (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:auto-rows-[180px]">
      {items.map((solution, i) => (
        <Reveal key={solution.slug} delay={i * 0.05} className={cn(SIZE_CLASSES[solution.size])}>
          <Link
            to={`/solutions/${solution.slug}`}
            data-cursor="view"
            className={cn(
              "group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-all duration-500",
              solution.size === "lg"
                ? "border-transparent bg-text text-background hover:opacity-95"
                : "border-border bg-card text-text hover:border-primary/40 dark:border-white/12 dark:hover:border-white/25"
            )}
          >
            {solution.size !== "lg" && (
              <div className="absolute inset-0 -z-10 bg-surface opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-white/5" />
            )}
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110",
                  solution.size === "lg"
                    ? "bg-background/15 text-background"
                    : "bg-primary/10 text-primary"
                )}
              >
                <DynamicIcon name={solution.icon} className="h-5 w-5" />
              </span>
              <ArrowUpRight
                className={cn(
                  "h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100",
                  solution.size === "lg" ? "text-background" : "text-primary"
                )}
              />
            </div>
            <div>
              <h3 className="font-display text-fluid-lg font-medium tracking-tightest">
                {solution.title}
              </h3>
              <p
                className={cn(
                  "mt-2 text-fluid-sm",
                  solution.size === "lg" ? "text-background/75" : "text-muted"
                )}
              >
                {solution.short}
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );

  return (
    <section className={cn(preview ? "py-28 sm:py-36" : "pb-20 sm:pb-28 lg:pb-36")}>
      <Container>
        {showHeader && (
          <SectionHeader
            eyebrow="Solutions"
            title="Packaged expertise for common goals."
            description="Curated combinations of our services, bundled for the milestones every ambitious business needs to hit."
            link={preview ? { label: "View all solutions", href: "/solutions" } : undefined}
          />
        )}

        {preview ? <PreviewFade>{grid}</PreviewFade> : grid}
      </Container>
    </section>
  );
}
