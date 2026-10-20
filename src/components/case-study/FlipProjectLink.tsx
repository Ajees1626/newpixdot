import { useCallback, type ReactNode, type RefObject } from "react";
import { useNavigate } from "react-router-dom";
import type { CaseStudy } from "@/constants/caseStudies";
import { rectFromElement, setFlipPayload } from "./flipTransition";

interface FlipProjectLinkProps {
  caseStudy: CaseStudy;
  imageRef?: RefObject<HTMLElement | null>;
  className?: string;
  children: ReactNode;
}

/** Navigates to case study with GSAP Flip handoff from the preview image. */
export default function FlipProjectLink({
  caseStudy,
  imageRef,
  className,
  children,
}: FlipProjectLinkProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const el = imageRef?.current;
      if (el && caseStudy.coverImage) {
        setFlipPayload({
          slug: caseStudy.slug,
          src: caseStudy.coverImage,
          rect: rectFromElement(el),
        });
      }
      navigate(`/case-studies/${caseStudy.slug}`, { state: { flip: true } });
    },
    [caseStudy, imageRef, navigate]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      data-cursor="open"
      data-cursor-text="GO"
      className={className}
    >
      {children}
    </button>
  );
}
