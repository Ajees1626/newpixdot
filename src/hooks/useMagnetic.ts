import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsapConfig";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";

/**
 * Gives any element a subtle magnetic pull toward the cursor while hovered,
 * and snaps back with an elastic ease on leave. Strength is in pixels.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    const el = ref.current;
    if (!el || isTouch) return;

    const moveX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      moveX(relX * strength);
      moveY(relY * strength);
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [strength, isTouch]);

  return ref;
}
