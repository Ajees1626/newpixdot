import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";

registerGsap();

export default function ProgressIndicator() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          gsap.to(bar, { scaleX: self.progress, duration: 0.15, ease: "none", overwrite: true });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-transparent">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-secondary to-accent"
        style={{ transformOrigin: "left center" }}
      />
    </div>
  );
}
