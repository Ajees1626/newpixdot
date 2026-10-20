import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsapConfig";
import { cn } from "@/utils/cn";

interface BackgroundEffectsProps {
  gradient: string;
  className?: string;
}

export default function BackgroundEffects({ gradient, className }: BackgroundEffectsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const blobs = el.querySelectorAll("[data-blob]");
    const ctx = gsap.context(() => {
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: i % 2 === 0 ? "12%" : "-10%",
          y: i % 2 === 0 ? "-8%" : "10%",
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(blob, {
          scale: 1.15,
          duration: 6 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        data-blob
        className={cn(
          "absolute -left-[10%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-gradient-to-br opacity-30 blur-[100px]",
          gradient
        )}
      />
      <div
        data-blob
        className={cn(
          "absolute -right-[5%] bottom-[5%] h-[45vh] w-[45vh] rounded-full bg-gradient-to-tr opacity-25 blur-[90px]",
          gradient
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.08),transparent_55%)]" />
    </div>
  );
}
