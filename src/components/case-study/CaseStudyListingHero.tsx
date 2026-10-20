import { useEffect, useRef, useState } from "react";
import { Briefcase, ChevronDown, Star, TrendingUp } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import Container from "@/components/ui/Container";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

registerGsap();

/**
 * Case Studies listing hero — single large image (no logos / no stacked cards).
 * Replace this URL with your own image anytime.
 */
export const CASE_STUDY_LISTING_HERO_IMAGE =
  "https://res.cloudinary.com/dxiwvcfs5/image/upload/v1784625863/cs1_kn4hqj.png";

interface CaseStudyListingHeroProps {
  businessCount: number;
  /** Optional override — otherwise uses CASE_STUDY_LISTING_HERO_IMAGE */
  heroImage?: string;
  onExplore?: () => void;
}

export default function CaseStudyListingHero({
  businessCount,
  heroImage = CASE_STUDY_LISTING_HERO_IMAGE,
  onExplore,
}: CaseStudyListingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ballWrapRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setCount(businessCount);
      return;
    }
    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: businessCount,
      duration: 2,
      delay: 0.4,
      ease: "power2.out",
      onUpdate: () => setCount(Math.round(counter.v)),
    });
    return () => {
      tween.kill();
    };
  }, [businessCount, reducedMotion]);

  // Text entrance
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-hero-reveal]"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Ball: idle float + scroll-linked motion
  useEffect(() => {
    const section = sectionRef.current;
    const wrap = ballWrapRef.current;
    const ball = ballRef.current;
    if (!section || !wrap || !ball) return;

    if (reducedMotion) {
      gsap.set(ball, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { opacity: 0, scale: 0.88, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.1, delay: 0.2, ease: "power3.out" }
      );

      // Continuous floating / drifting motion
      gsap.to(ball, {
        y: -18,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(ball, {
        x: 10,
        duration: 4.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.4,
      });

      gsap.to(ball, {
        rotate: 6,
        duration: 5.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.2,
      });

      gsap.to(ball, {
        scale: 1.04,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Scroll-driven parallax / drift
      gsap.to(wrap, {
        y: 120,
        rotate: -12,
        scale: 0.86,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [reducedMotion, heroImage]);

  const scrollToWork = () => {
    onExplore?.();
    document.getElementById("case-study-list")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background pb-8 pt-32 md:pt-36 lg:pt-40 sm:pb-10 sm:pt-32 lg:pb-12 lg:pt-36"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-8 xl:gap-10">
          <div className="max-w-xl pt-1 lg:-translate-x-2 lg:pt-2 xl:-translate-x-4">
            <p
              data-hero-reveal
              className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.45em] text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Case Studies
            </p>

            <h1
              data-hero-reveal
              className="mt-4 font-display text-[clamp(2.1rem,4.5vw,3.5rem)] font-medium leading-[1.04] tracking-tightest text-text"
            >
              Stories of real impact
              <span className="text-primary">.</span>
            </h1>

            <p
              data-hero-reveal
              className="mt-5 max-w-lg text-fluid-sm leading-relaxed text-muted sm:text-fluid-base"
            >
              We partner with ambitious brands to create digital experiences that drive real growth
              and measurable impact across industries. From branding and performance marketing to
              websites and campaigns, every case study shows how strategy, craft, and consistency
              turn visibility into results — more leads, stronger trust, and lasting brand presence.
            </p>

            <div
              data-hero-reveal
              className="mt-8 grid grid-cols-1 gap-5 border-t border-border/80 pt-8 xs:grid-cols-3 xs:gap-4"
            >
              <div className="flex gap-3">
                <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <div>
                  <p className="font-display text-xl font-medium text-text sm:text-2xl">{count}+</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted">Businesses Transformed</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Star className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <div>
                  <p className="font-display text-xl font-medium text-text sm:text-2xl">4.8/5</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted">Client Satisfaction</p>
                </div>
              </div>
              <div className="flex gap-3">
                <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <div>
                  <p className="font-display text-xl font-medium text-text sm:text-2xl">120+</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted">Successful Campaigns</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              data-hero-reveal
              onClick={scrollToWork}
              data-cursor="scroll"
              data-cursor-text="EXPLORE"
              className="mt-8 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.38em] text-muted transition-colors hover:text-text sm:mt-10"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface">
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </span>
              Scroll to explore
            </button>
          </div>

          <div className="relative w-full lg:-ml-6 lg:-mt-2 xl:-ml-10 xl:-mt-4" ref={ballWrapRef}>
            <div
              ref={ballRef}
              className="relative mx-auto aspect-square w-full max-w-[440px] will-change-transform sm:max-w-[480px] lg:max-w-[520px]"
              style={{ transformOrigin: "50% 50%" }}
            >
              <SafeImage
                src={heroImage}
                alt="Case studies showcase"
                className="h-full w-full select-none object-contain pointer-events-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
