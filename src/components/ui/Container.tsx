import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("container-px mx-auto w-full max-w-8xl", className)}>
      {children}
    </div>
  );
}
