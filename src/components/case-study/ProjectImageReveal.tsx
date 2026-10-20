import { useRef, useState } from "react";
import type { CaseStudy } from "@/constants/caseStudies";
import SafeImage from "@/components/ui/SafeImage";
import { getBeforeAfter } from "./utils";
import { cn } from "@/utils/cn";

interface ProjectImageRevealProps {
  cs: CaseStudy;
  isActive: boolean;
  imageRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

/** Hover splits image into before | after with mouse-driven divider. */
export default function ProjectImageReveal({ cs, isActive, imageRef, className }: ProjectImageRevealProps) {
  const [hovering, setHovering] = useState(false);
  const [split, setSplit] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const ba = getBeforeAfter(cs);
  const beforeSrc = ba.beforeImage;
  const afterSrc = ba.afterImage || cs.coverImage;

  const handleMove = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(96, Math.max(4, next)));
  };

  return (
    <div
      ref={imageRef}
      data-cursor="view"
      data-cursor-text="VIEW"
      className={cn("relative w-full max-w-[min(52vw,720px)] will-change-transform", className)}
      style={{ transformStyle: "preserve-3d", perspective: 1200 }}
    >
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-[2.5rem] shadow-[0_50px_120px_rgba(0,0,0,0.35)]"
        onPointerEnter={() => isActive && setHovering(true)}
        onPointerLeave={() => {
          setHovering(false);
          setSplit(50);
        }}
        onPointerMove={(e) => {
          if (!hovering || !isActive) return;
          handleMove(e.clientX);
        }}
      >
        {afterSrc ? (
          <>
            <SafeImage
              src={afterSrc}
              alt={`${cs.client} after`}
              className="aspect-[4/5] w-full object-cover md:aspect-square lg:aspect-[4/5]"
            />

            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                hovering && isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
                {beforeSrc ? (
                  <SafeImage
                    src={beforeSrc}
                    alt={`${cs.client} before`}
                    className="aspect-[4/5] h-full w-full object-cover grayscale md:aspect-square lg:aspect-[4/5]"
                  />
                ) : (
                  <div className="h-full w-full bg-neutral-300 grayscale" />
                )}
                <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                  Before
                </span>
              </div>

              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
                <SafeImage
                  src={afterSrc}
                  alt={`${cs.client} after`}
                  className="aspect-[4/5] h-full w-full object-cover md:aspect-square lg:aspect-[4/5]"
                />
                <span className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
                  After
                </span>
              </div>

              <div
                className="absolute bottom-0 top-0 w-[2px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                style={{ left: `${split}%` }}
              />
            </div>
          </>
        ) : (
          <div className={cn("aspect-[4/5] w-full rounded-[2.5rem] bg-gradient-to-br md:aspect-square lg:aspect-[4/5]", cs.gradient)} />
        )}
      </div>
    </div>
  );
}
