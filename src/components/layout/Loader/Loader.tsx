import { useEffect, useRef, useState } from "react";
import { gsap } from "@/utils/gsapConfig";

interface LoaderProps {
  onComplete: () => void;
}

/**
 * Full-screen premium preloader shown once per session. Animates a
 * percentage counter alongside the Pixdot mark, then wipes away to reveal
 * the app underneath.
 */
export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap
          .timeline({ onComplete })
          .to(barRef.current, { scaleX: 1, duration: 0.4, ease: "power2.inOut" })
          .to(rootRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            delay: 0.2,
          });
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 2.1,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(counter.value)),
    });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[10100] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-gradient-brand animate-pulse-slow" />
          <span className="font-display text-fluid-xl font-semibold tracking-tightest text-text">
            pixdot
          </span>
        </div>

        <div className="flex items-baseline font-display text-fluid-4xl font-medium tabular-nums text-text">
          {String(progress).padStart(3, "0")}
          <span className="text-fluid-lg text-muted">%</span>
        </div>

        <div className="h-px w-[min(60vw,280px)] overflow-hidden bg-border">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-brand"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>

      <p className="absolute bottom-10 text-fluid-xs uppercase tracking-[0.3em] text-muted">
        Branding &middot; Digital &middot; Design
      </p>
    </div>
  );
}
