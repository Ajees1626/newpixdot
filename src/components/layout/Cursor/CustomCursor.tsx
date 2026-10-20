import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/utils/gsapConfig";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";

type CursorVariant = "default" | "hover" | "view" | "drag" | "close" | "zoom" | "details" | "open" | "play" | "scroll" | "data";

const VARIANT_LABEL: Record<CursorVariant, string> = {
  default: "",
  hover: "",
  view: "View",
  drag: "Drag",
  close: "Close",
  zoom: "Zoom",
  details: "Details",
  open: "Open",
  play: "Play",
  scroll: "Scroll",
  data: "Data",
};

/**
 * A premium, magnetic custom cursor. It reads `data-cursor` (variant) and
 * `data-cursor-text` (optional label override) attributes from any hovered
 * element, so any component in the app can opt into rich cursor states
 * without this component knowing about them ahead of time.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState("");
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const handleMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button"
      );
      if (!target) {
        setVariant("default");
        setLabel("");
        return;
      }
      const dataVariant = target.getAttribute("data-cursor") as CursorVariant | null;
      const customText = target.getAttribute("data-cursor-text");
      if (dataVariant) {
        setVariant(dataVariant);
        setLabel(customText ?? VARIANT_LABEL[dataVariant]);
      } else {
        setVariant("hover");
        setLabel(customText ?? "");
      }
    };

    const handleOut = (e: PointerEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest("[data-cursor], a, button")) {
        setVariant("default");
        setLabel("");
      }
    };

    const handleDown = () => gsap.to(dot, { scale: 0.6, duration: 0.2 });
    const handleUp = () => gsap.to(dot, { scale: 1, duration: 0.2 });

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const isExpanded = variant !== "default";
  const ringSize =
    variant === "view" || variant === "drag" || variant === "zoom" || variant === "play"
      ? 88
      : variant === "scroll" || variant === "data" || variant === "details" || variant === "open"
        ? 72
        : isExpanded
          ? 56
          : 36;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[10050] mix-blend-difference">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-white transition-[width,height] duration-300 ease-premium"
        style={{ width: ringSize, height: ringSize }}
      >
        <span
          ref={labelRef}
          className="text-[10px] font-semibold uppercase tracking-widest text-white transition-opacity duration-200"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-white"
      />
    </div>,
    document.body
  );
}
