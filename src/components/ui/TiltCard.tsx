import type { ReactNode } from "react";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/utils/cn";

export default function TiltCard({
  children,
  className,
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const { ref, handleMove, handleLeave } = useTilt<HTMLDivElement>(maxTilt);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("[transform-style:preserve-3d] will-change-transform", className)}
    >
      {children}
    </div>
  );
}
