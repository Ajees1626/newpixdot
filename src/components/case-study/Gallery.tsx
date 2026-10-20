import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import Container from "@/components/ui/Container";
import SafeImage from "@/components/ui/SafeImage";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import { useMagnetic } from "@/hooks/useMagnetic";
import GalleryLightbox from "./GalleryLightbox";
import { getGalleryImages } from "./utils";
import type { CaseStudySectionProps } from "./types";
import { cn } from "@/utils/cn";

registerGsap();

const MASONRY_SIZES = [
  "col-span-2 row-span-2 min-h-[280px] sm:min-h-[360px]",
  "col-span-1 row-span-1 min-h-[180px] sm:min-h-[220px]",
  "col-span-1 row-span-2 min-h-[260px] sm:min-h-[320px]",
  "col-span-2 row-span-1 min-h-[180px] sm:min-h-[200px]",
  "col-span-1 row-span-1 min-h-[180px]",
  "col-span-1 row-span-1 min-h-[180px]",
  "col-span-2 row-span-1 min-h-[200px]",
  "col-span-1 row-span-2 min-h-[280px]",
];

function GalleryTile({
  src,
  alt,
  sizeClass,
  index,
  onOpen,
}: {
  src: string;
  alt: string;
  sizeClass: string;
  index: number;
  onOpen: () => void;
}) {
  const magneticRef = useMagnetic<HTMLButtonElement>(0.2);
  const isBw = index === 2;

  return (
    <button
      ref={magneticRef}
      type="button"
      data-gallery-item
      data-cursor="zoom"
      data-cursor-text="VIEW"
      onClick={onOpen}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-border bg-surface text-left transition-colors duration-500 hover:border-primary/30",
        sizeClass
      )}
    >
      <SafeImage
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-cover blur-[2px] transition-all duration-700 ease-premium group-hover:blur-0 group-hover:scale-105",
          isBw ? "grayscale group-hover:grayscale-0" : ""
        )}
        fallbackClassName="h-full w-full min-h-[160px]"
      />
      <div className="absolute inset-0 bg-black/20 opacity-100 transition-opacity duration-500 group-hover:bg-black/10 group-hover:opacity-60" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.35em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View
      </span>
    </button>
  );
}

export default function Gallery({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const images = getGalleryImages(caseStudy);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll("[data-gallery-item]");

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 60, opacity: 0, rotate: i % 2 === 0 ? -2 : 2, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 0.9,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  if (!images.length) return null;

  return (
    <>
      <section id="gallery" ref={sectionRef} className="scroll-mt-28 bg-surface py-20 sm:py-28 lg:py-32">
        <Container>
          <SplitHeading
            as="h2"
            splitBy="words"
            className="max-w-3xl text-fluid-2xl font-medium text-text sm:text-fluid-3xl"
          >
            Interactive gallery
          </SplitHeading>
          <p className="mt-4 max-w-xl text-fluid-sm text-muted">
            Masonry layout with magnetic hover, blur-to-sharp reveals, and fullscreen viewing.
          </p>

          <div className="mt-12 grid auto-rows-[minmax(160px,auto)] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {images.map((src, i) => (
              <GalleryTile
                key={`${src}-${i}`}
                src={src}
                alt={`${caseStudy.client} ${i + 1}`}
                sizeClass={MASONRY_SIZES[i % MASONRY_SIZES.length]}
                index={i}
                onOpen={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </Container>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          index={lightboxIndex}
          title={caseStudy.title}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
