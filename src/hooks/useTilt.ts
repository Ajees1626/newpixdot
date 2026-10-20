import { useRef, type MouseEvent } from "react";
import { gsap } from "@/utils/gsapConfig";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";

/** Adds a subtle 3D tilt-toward-cursor effect, commonly used on creative cards. */
export function useTilt<T extends HTMLElement>(maxTilt = 10) {
  const ref = useRef<T>(null);
  const isTouch = useIsTouchDevice();

  const handleMove = (e: MouseEvent<T>) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(ref.current, {
      rotateX: -py * maxTilt,
      rotateY: px * maxTilt,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  };

  return { ref, handleMove, handleLeave };
}
