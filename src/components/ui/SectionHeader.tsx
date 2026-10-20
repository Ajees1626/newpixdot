import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/layout/Animations/Reveal";
import { cn } from "@/utils/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  className?: string;
  headingClassName?: string;
  link?: { label: string; href: string };
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  headingClassName,
  link,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-16 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        className={cn("mb-0", headingClassName)}
      />
      {link && (
        <Reveal delay={0.1} className="shrink-0">
          <Link
            to={link.href}
            data-cursor="hover"
            className="group inline-flex items-center gap-1.5 text-fluid-sm font-medium text-text transition-colors hover:text-primary"
          >
            {link.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
