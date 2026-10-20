export interface FlipRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface FlipPayload {
  slug: string;
  src: string;
  rect: FlipRect;
}

const KEY = "pixdot-cs-flip";

export function setFlipPayload(payload: FlipPayload) {
  sessionStorage.setItem(KEY, JSON.stringify(payload));
}

export function consumeFlipPayload(slug: string): FlipPayload | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as FlipPayload;
    if (data.slug !== slug) return null;
    sessionStorage.removeItem(KEY);
    return data;
  } catch {
    return null;
  }
}

export function rectFromElement(el: HTMLElement): FlipRect {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}
