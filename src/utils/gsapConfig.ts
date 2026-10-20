import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;

/** Registers GSAP plugins exactly once across the whole app. */
export function registerGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;
}

export { gsap, ScrollTrigger, Flip };
