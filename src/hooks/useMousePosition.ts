import { useEffect, useRef } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Tracks the pointer position in a ref (not state) so consumers such as
 * custom cursors or 3D scenes can read it inside animation loops without
 * triggering React re-renders on every mouse move.
 */
export function useMousePositionRef() {
  const position = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return position;
}
