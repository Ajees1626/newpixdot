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

const SIZES = [
  "min-h-[320px]",
  "min-h-[200px]",
  "min-h-[380px]",
  "min-h-[220px]",
  "min-h-[260px]",
  "min-h-[340px]",
  "min-h-[190px]",
  "min-h-[300px]",
];

function MasonryTile({
  src,
  alt,
  sizeClass,
  index,
  dimmed,
  onOpen,
}: {
  src: string;
  alt: string;
  sizeClass: string;
  index: number;
  dimmed: boolean;
  onOpen: () => void;
}) {
  const magneticRef = useMagnetic<HTMLButtonElement>(0.15);

  return (
    <button
      ref={magneticRef}
      type="button"
      data-gallery-tile
      data-cursor="zoom"
      data-cursor-text="VIEW"
      onClick={onOpen}
      className={cn(
        "group relative mb-4 w-full break-inside-avoid overflow-hidden rounded-[2rem] border border-border text-left transition-all duration-700",
        sizeClass,
        dimmed ? "scale-[0.97] opacity-40 blur-[6px]" : "opacity-100 blur-0"
      )}
    >
      <SafeImage
        src={src}
        alt={alt}
        className={cn(
          "h-full min-h-[inherit] w-full object-cover transition-all duration-700",
          index === 2 ? "grayscale group-hover:grayscale-0" : "",
          !dimmed && "group-hover:scale-105 group-hover:rotate-1"
        )}
        fallbackClassName="min-h-[180px] w-full"
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40" />
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold uppercase tracking-[0.35em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        View
      </span>
    </button>
  );
}

export default function FloatingGallery({ caseStudy }: CaseStudySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const images = getGalleryImages(caseStudy);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll("[data-gallery-tile]").forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { y: 100, opacity: 0, rotate: i % 2 ? 4 : -4 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            delay: i * 0.04,
            ease: "power3.out",
            scrollTrigger: { trigger: tile, start: "top 94%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [caseStudy.slug]);

  if (!images.length) return null;

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="scroll-mt-28 py-20 sm:py-28 lg:py-36 xl:pl-52"
        onMouseLeave={() => setHovered(null)}
      >
        <Container>
          <SplitHeading
            as="h2"
            splitBy="words"
            className="text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-tightest text-text"
          >
            Visual narrative
          </SplitHeading>
          <p className="mt-4 text-fluid-sm text-muted">
            Free-flow masonry — hover one frame, the rest fall back into blur.
          </p>

          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                onMouseEnter={() => setHovered(i)}
              >
                <MasonryTile
                  src={src}
                  alt={`${caseStudy.client} ${i + 1}`}
                  sizeClass={SIZES[i % SIZES.length]}
                  index={i}
                  dimmed={hovered !== null && hovered !== i}
                  onOpen={() => setLightboxIndex(i)}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          index={lightboxIndex}
          title={caseStudy.client}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
