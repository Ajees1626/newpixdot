import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom fluid type scales from tailwind.config.js must be registered here.
 * Otherwise tailwind-merge treats `text-fluid-*` (font-size) and
 * `text-background` / `text-text` (color) as conflicting `text-*` utilities
 * and silently drops the color — e.g. primary buttons render dark text on a
 * dark background in light mode.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "fluid-xs",
            "fluid-sm",
            "fluid-base",
            "fluid-lg",
            "fluid-xl",
            "fluid-2xl",
            "fluid-3xl",
            "fluid-4xl",
            "fluid-5xl",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
