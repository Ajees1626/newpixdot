import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SafeImage from "@/components/ui/SafeImage";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { getBeforeAfter } from "./utils";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

export default function BeforeAfter({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState(50);
  const data = getBeforeAfter(caseStudy);
  const dragging = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector("[data-ba-frame]"),
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  };

  return (
    <section ref={sectionRef} className="bg-surface py-20 sm:py-28 xl:pl-52">
      <Container>
        <SplitHeading
          as="h2"
          splitBy="words"
          className="max-w-3xl text-fluid-2xl font-medium text-text sm:text-fluid-3xl"
        >
          Before & after
        </SplitHeading>
        <p className="mt-4 max-w-xl text-fluid-sm text-muted">{data.label}</p>

        <div
          data-ba-frame
          data-cursor="drag"
          data-cursor-text="DRAG"
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft"
          onPointerDown={(e) => {
            dragging.current = true;
            handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
          }}
          onPointerMove={(e) => {
            if (!dragging.current) return;
            handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
          }}
          onPointerUp={() => {
            dragging.current = false;
          }}
          onPointerLeave={() => {
            dragging.current = false;
          }}
        >
          <div className="relative aspect-[16/10] sm:aspect-[21/9]">
            <SafeImage
              src={data.afterImage}
              alt={`${caseStudy.client} after`}
              className="absolute inset-0 h-full w-full object-cover"
              fallbackClassName="absolute inset-0 h-full w-full"
            />

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <SafeImage
                src={data.beforeImage}
                alt={`${caseStudy.client} before`}
                className="h-full w-full object-cover grayscale"
                fallbackClassName="h-full w-full"
              />
              <div className="absolute inset-0 bg-black/35" />
            </div>

            <div
              className="absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]"
              style={{ left: `${position}%` }}
            >
              <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-md">
                <span className="text-[10px] font-bold text-white">↔</span>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between p-5 sm:p-6">
              <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                Before
              </span>
              <span className="rounded-full bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
                After
              </span>
            </div>
          </div>

          <div className="grid gap-4 border-t border-border p-5 sm:grid-cols-2 sm:p-6">
            <p className={cn("text-fluid-sm text-muted")}>
              <span className="font-semibold text-text">Before: </span>
              {data.before}
            </p>
            <p className={cn("text-fluid-sm text-muted")}>
              <span className="font-semibold text-text">After: </span>
              {data.after}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
