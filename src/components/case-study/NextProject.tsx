import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import SafeImage from "@/components/ui/SafeImage";
import type { CaseStudy } from "@/constants/caseStudies";
import { cn } from "@/utils/cn";

registerGsap();

interface NextProjectProps {
  next: CaseStudy;
}

export default function NextProject({ next }: NextProjectProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector("[data-next-content]"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [next.slug]);

  return (
    <section ref={sectionRef} className="py-8 sm:py-12">
      <Link
        to={`/case-studies/${next.slug}`}
        data-cursor="open"
        data-cursor-text="OPEN"
        className="group relative block min-h-[70vh] overflow-hidden sm:min-h-[80vh]"
      >
        {next.coverImage ? (
          <SafeImage
            src={next.coverImage}
            alt={next.client}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-105"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br", next.gradient)} />
        )}
        <div className="absolute inset-0 bg-black/55 transition-colors duration-700 group-hover:bg-black/40" />

        <div
          data-next-content
          className="relative z-10 flex h-full min-h-[70vh] flex-col items-center justify-center px-6 text-center sm:min-h-[80vh]"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-white/60">Next Project</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,7vw,4.5rem)] font-medium leading-[0.95] tracking-tightest text-white">
            {next.client}
          </h2>
          <p className="mt-3 max-w-xl text-fluid-sm text-white/70">{next.title}</p>
          <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-fluid-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors duration-500 group-hover:bg-white group-hover:text-neutral-950">
            Open case study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </section>
  );
}
