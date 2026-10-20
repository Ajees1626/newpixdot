import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsapConfig";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch) return;
    const glow = glowRef.current;
    if (!glow) return;

    const moveX = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3.out" });
    const moveY = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[4] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]"
    />
  );
}

export function useMouseParallax<T extends HTMLElement>(strength = 24) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const moveX = gsap.quickTo(el, "x", { duration: 0.8, ease: "power2.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.8, ease: "power2.out" });
    const rotY = gsap.quickTo(el, "rotateY", { duration: 0.8, ease: "power2.out" });
    const rotX = gsap.quickTo(el, "rotateX", { duration: 0.8, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth - 0.5) * strength;
      const py = (e.clientY / window.innerHeight - 0.5) * strength;
      moveX(px);
      moveY(py);
      rotY(px * 0.15);
      rotX(-py * 0.15);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);

  return ref;
}
