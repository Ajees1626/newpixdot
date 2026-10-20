import type { ReactNode } from "react";
import Reveal from "@/components/layout/Animations/Reveal";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal y={16}>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <SplitHeading
        as="h2"
        splitBy="words"
        className={cn(
          "max-w-3xl text-fluid-3xl font-medium leading-[1.05] tracking-tightest text-text",
          align === "center" && "mx-auto",
          titleClassName
        )}
      >
        {title}
      </SplitHeading>
      {description && (
        <Reveal y={16} delay={0.1}>
          <p className={cn("max-w-xl text-fluid-base text-muted", align === "center" && "mx-auto")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
