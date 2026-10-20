import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap, registerGsap } from "@/utils/gsapConfig";

registerGsap();

/**
 * Soft brand-growth wipe on route changes — inspired by the first-load loader,
 * but shorter and calmer (not a fast rocket feel). Dot grows, mark settles,
 * line expands, then the panel lifts away.
 */
export default function BrandRouteTransition() {
  const { pathname } = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const firstVisit = useRef(true);
  const busy = useRef(false);

  useEffect(() => {
    // Initial Loader already covers the first open — skip one mount
    if (firstVisit.current) {
      firstVisit.current = false;
      return;
    }

    const root = rootRef.current;
    const mark = markRef.current;
    const dot = dotRef.current;
    const word = wordRef.current;
    const line = lineRef.current;
    const label = labelRef.current;
    if (!root || !mark || !dot || !word || !line || !label) return;

    busy.current = true;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        busy.current = false;
        document.body.style.overflow = "";
        gsap.set(root, { yPercent: 0, autoAlpha: 0, pointerEvents: "none" });
      },
    });

    gsap.set(root, { yPercent: 0, autoAlpha: 1, pointerEvents: "auto" });
    gsap.set(mark, { opacity: 0, y: 12 });
    gsap.set(dot, { scale: 0.35, opacity: 0 });
    gsap.set(word, { opacity: 0, y: 8 });
    gsap.set(line, { scaleX: 0 });
    gsap.set(label, { opacity: 0, y: 6 });

    tl.to(root, { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, 0)
      .to(mark, { opacity: 1, y: 0, duration: 0.45 }, 0.05)
      .to(dot, { scale: 1, opacity: 1, duration: 0.55, ease: "power3.out" }, 0.08)
      .to(word, { opacity: 1, y: 0, duration: 0.5 }, 0.18)
      .to(label, { opacity: 1, y: 0, duration: 0.4 }, 0.28)
      .to(line, { scaleX: 1, duration: 0.65, ease: "power2.inOut" }, 0.32)
      .to(dot, { scale: 1.12, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0.55)
      .to(root, { yPercent: -100, duration: 0.75, ease: "power3.inOut" }, 0.95);

    return () => {
      tl.kill();
      busy.current = false;
      document.body.style.overflow = "";
      gsap.set(root, { yPercent: 0, autoAlpha: 0, pointerEvents: "none" });
    };
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background opacity-0"
      aria-hidden
    >
      <div ref={markRef} className="relative flex flex-col items-center gap-7">
        <div className="flex items-center gap-3">
          <span
            ref={dotRef}
            className="h-3 w-3 origin-center rounded-full bg-gradient-brand"
          />
          <span
            ref={wordRef}
            className="font-display text-fluid-xl font-semibold tracking-tightest text-text"
          >
            pixdot
          </span>
        </div>

        <div className="h-px w-[min(52vw,220px)] overflow-hidden bg-border">
          <div
            ref={lineRef}
            className="h-full w-full origin-center scale-x-0 bg-gradient-brand"
          />
        </div>

        <p
          ref={labelRef}
          className="text-[10px] uppercase tracking-[0.32em] text-muted"
        >
          Growing brands
        </p>
      </div>
    </div>
  );
}
