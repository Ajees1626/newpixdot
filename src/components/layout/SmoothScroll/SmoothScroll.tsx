import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

registerGsap();

/**
 * Drives buttery-smooth scrolling across the entire app and keeps GSAP's
 * ScrollTrigger perfectly in sync with Lenis's virtual scroll position.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    window.__lenis = lenis;

    // Bridge Lenis virtual scroll ↔ ScrollTrigger so pinned sections
    // (e.g. horizontal case-study track) don't jump when pin starts/ends.
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.clearScrollMemory();
    };
  }, [reducedMotion]);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
