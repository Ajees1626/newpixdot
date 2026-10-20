import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import { getCaseStudyTestimonial } from "./utils";
import type { CaseStudySectionProps } from "./types";

registerGsap();

export default function Testimonial({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonial = getCaseStudyTestimonial(caseStudy);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector("[data-testimonial-card]"),
        { y: 50, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  return (
    <section ref={sectionRef} className="scroll-mt-24 py-16 sm:scroll-mt-28 sm:py-24 lg:py-28 xl:pl-52">
      <Container>
        <div
          data-testimonial-card
          className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card p-6 shadow-soft sm:rounded-[2rem] sm:p-10 lg:p-14 dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-2xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-secondary/15 blur-3xl" />

          <div className="flex gap-1 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>

          <blockquote className="relative mt-6 max-w-3xl font-display text-fluid-xl font-medium leading-snug text-text sm:text-fluid-2xl">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card font-display text-fluid-sm font-semibold text-text">
              {testimonial.author.charAt(0)}
            </div>
            <div>
              <p className="text-fluid-sm font-medium text-text">{testimonial.author}</p>
              <p className="text-fluid-xs text-muted">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
