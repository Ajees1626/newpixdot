import { useEffect, useLayoutEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import SafeImage from "@/components/ui/SafeImage";
import BackgroundEffects from "./BackgroundEffects";
import ThemePattern from "./ThemePattern";
import { consumeFlipPayload } from "./flipTransition";
import { getCaseStudyTheme, splitHeroTitle } from "./theme";
import { useMouseParallax } from "./MouseGlow";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

export default function Hero({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const depthRef = useMouseParallax<HTMLDivElement>(32);
  const theme = getCaseStudyTheme(caseStudy);
  const { line1, line2 } = splitHeroTitle(caseStudy);

  useLayoutEffect(() => {
    const payload = consumeFlipPayload(caseStudy.slug);
    const bg = bgRef.current;
    if (!payload || !bg) return;

    const proxy = document.createElement("div");
    const img = document.createElement("img");
    img.src = payload.src;
    img.alt = "";
    Object.assign(proxy.style, {
      position: "fixed",
      zIndex: "9998",
      top: `${payload.rect.top}px`,
      left: `${payload.rect.left}px`,
      width: `${payload.rect.width}px`,
      height: `${payload.rect.height}px`,
      borderRadius: "2.5rem",
      overflow: "hidden",
      pointerEvents: "none",
    });
    Object.assign(img.style, { width: "100%", height: "100%", objectFit: "cover" });
    proxy.appendChild(img);
    document.body.appendChild(proxy);
    document.body.style.overflow = "hidden";
    gsap.set(bg, { opacity: 0 });

    const tween = gsap.to(proxy, {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      duration: 1.15,
      ease: "power3.inOut",
      onComplete: () => {
        proxy.remove();
        gsap.to(bg, { opacity: 1, duration: 0.5 });
        document.body.style.overflow = "";
      },
    });

    return () => {
      tween.kill();
      proxy.remove();
      document.body.style.overflow = "";
      gsap.set(bg, { opacity: 1 });
    };
  }, [caseStudy.slug]);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const logo = logoRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!section || !bg || !logo || !l1 || !l2) return;

    const split1 = new SplitType(l1, { types: ["chars"] });
    const split2 = new SplitType(l2, { types: ["chars"] });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [...(split1.chars || []), ...(split2.chars || [])],
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(logo, { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power3.out" });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=70%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })
        .to(bg, { scale: 1.14, filter: "blur(10px)", ease: "none" }, 0)
        .to(logo, { scale: 0.5, y: "-20vh", ease: "none" }, 0.1);
    }, sectionRef);

    return () => {
      ctx.revert();
      split1.revert();
      split2.revert();
    };
  }, [caseStudy.slug]);

  return (
    <section
      ref={sectionRef}
      data-cursor="scroll"
      data-cursor-text="SCROLL"
      className="relative h-screen w-full overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {caseStudy.coverImage ? (
          <SafeImage
            src={caseStudy.coverImage}
            alt={caseStudy.client}
            className="h-full w-full scale-105 object-cover"
          />
        ) : (
          <div className={cn("h-full w-full bg-gradient-to-br", caseStudy.gradient)} />
        )}
        <div className={cn("absolute inset-0 bg-gradient-to-br", theme.heroOverlay)} />
        <BackgroundEffects gradient={caseStudy.gradient} />
        <ThemePattern theme={theme} />
      </div>

      <div
        ref={depthRef}
        className="relative z-10 flex h-full flex-col px-5 pt-24 sm:px-8 sm:pt-28 md:px-10 lg:px-16"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={logoRef}
          className={cn(
            "mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.75rem] shadow-2xl backdrop-blur-xl sm:h-28 sm:w-28 sm:rounded-[2rem] md:h-32 md:w-32 md:rounded-[2.5rem]",
            theme.heroLogo
          )}
        >
          {caseStudy.coverImage ? (
            <SafeImage src={caseStudy.coverImage} alt={caseStudy.client} className="h-full w-full object-cover" />
          ) : (
            <span className={cn("font-display text-3xl font-semibold sm:text-4xl", theme.textOnHero)}>
              {caseStudy.client.charAt(0)}
            </span>
          )}
        </div>

        <div className="relative mt-auto pb-20 sm:pb-24 lg:pb-28">
          <div className="mb-5 flex flex-wrap gap-2 sm:mb-6">
            {[caseStudy.year, caseStudy.category, caseStudy.industry].map((tag) => (
              <span
                key={tag}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.22em] backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[10px]",
                  theme.heroTag
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className={cn("font-display font-medium leading-[0.88] tracking-tightest", theme.textOnHero)}>
            <span ref={line1Ref} className="block text-[clamp(2.5rem,11vw,9rem)]">
              {line1}
            </span>
            <span ref={line2Ref} className="block text-[clamp(1.75rem,7vw,6rem)] opacity-80">
              {line2}
            </span>
          </h1>

          <div
            className={cn(
              "absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-60 sm:bottom-8",
              theme.heroScroll
            )}
          >
            <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
