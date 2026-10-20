import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import SafeImage from "@/components/ui/SafeImage";
import FlipProjectLink from "./FlipProjectLink";
import type { CaseStudy } from "@/constants/caseStudies";
import { getCaseStudyTheme } from "./theme";
import { cn } from "@/utils/cn";

registerGsap();

interface NextProjectHeroProps {
  next: CaseStudy;
}

export default function NextProjectHero({ next }: NextProjectHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const theme = getCaseStudyTheme(next);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector("[data-next-title]"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [next.slug]);

  return (
    <section ref={sectionRef} className="relative">
      <FlipProjectLink
        caseStudy={next}
        imageRef={imageRef}
        className="group relative block min-h-screen w-full overflow-hidden text-left"
      >
        <div ref={imageRef} className="absolute inset-0">
          {next.coverImage ? (
            <SafeImage
              src={next.coverImage}
              alt={next.client}
              className="h-full w-full object-cover opacity-40 grayscale transition-all duration-[1200ms] ease-premium group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0"
            />
          ) : (
            <div className={cn("h-full w-full bg-gradient-to-br opacity-40", next.gradient)} />
          )}
        </div>
        <div className={cn("absolute inset-0 bg-gradient-to-br", theme.heroOverlay)} />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/55">Next Project</p>
          <h2
            data-next-title
            className="mt-6 max-w-5xl font-display text-[clamp(2.5rem,10vw,6rem)] font-medium leading-[0.92] tracking-tightest text-white transition-transform duration-700 group-hover:scale-[1.04]"
          >
            {next.client}
          </h2>
          <p className="mt-4 max-w-xl text-fluid-sm text-white/70">{next.title}</p>
          <span className="mt-10 inline-flex items-center gap-3 text-fluid-xs font-semibold uppercase tracking-[0.25em] text-white">
            Continue
            <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </FlipProjectLink>
    </section>
  );
}
