export const GRADIENTS = [
  "from-indigo-500 via-violet-500 to-fuchsia-500",
  "from-emerald-400 via-teal-500 to-cyan-500",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-sky-400 via-blue-500 to-indigo-500",
  "from-rose-400 via-pink-500 to-fuchsia-500",
  "from-lime-400 via-green-500 to-emerald-500",
  "from-violet-500 via-purple-500 to-indigo-500",
  "from-cyan-400 via-sky-500 to-blue-500",
  "from-orange-400 via-red-500 to-rose-500",
  "from-teal-400 via-cyan-500 to-blue-500",
] as const;

/** Tailwind color token → hex (for JSON-driven gradients that JIT may miss). */
const TW_COLOR: Record<string, string> = {
  "slate-600": "#475569",
  "slate-700": "#334155",
  "gray-600": "#4b5563",
  "red-500": "#ef4444",
  "red-600": "#dc2626",
  "orange-500": "#f97316",
  "orange-600": "#ea580c",
  "orange-700": "#c2410c",
  "amber-500": "#f59e0b",
  "amber-600": "#d97706",
  "yellow-600": "#ca8a04",
  "lime-500": "#84cc16",
  "green-500": "#22c55e",
  "green-600": "#16a34a",
  "emerald-600": "#059669",
  "teal-500": "#14b8a6",
  "cyan-500": "#06b6d4",
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
  "indigo-500": "#6366f1",
  "indigo-600": "#4f46e5",
  "purple-500": "#a855f7",
  "purple-600": "#9333ea",
  "fuchsia-500": "#d946ef",
  "pink-400": "#f472b6",
  "pink-500": "#ec4899",
  "pink-600": "#db2777",
};

/**
 * Converts Tailwind gradient utility string e.g. "from-blue-500 to-indigo-600"
 * into a CSS linear-gradient that always renders (no JIT dependency).
 */
export function twGradientToCss(colorClass: string, angle = "135deg"): string {
  const tokens = colorClass.match(/(?:from|via|to)-([a-z]+-\d{2,3})/g) || [];
  const hexes = tokens
    .map((t) => TW_COLOR[t.replace(/^(from|via|to)-/, "")] || "#6366f1")
    .filter(Boolean);
  if (hexes.length === 0) return `linear-gradient(${angle}, #6366f1, #a855f7)`;
  if (hexes.length === 1) return `linear-gradient(${angle}, ${hexes[0]}, ${hexes[0]})`;
  return `linear-gradient(${angle}, ${hexes.join(", ")})`;
}


export const INDUSTRY_ICONS: Record<string, string> = {
  healthcare: "HeartPulse",
  Education: "GraduationCap",
  "IT Industry": "Cpu",
  "E-commerce": "ShoppingCart",
  Retail: "Store",
  food: "UtensilsCrossed",
  "snacks-sweets": "Cookie",
  "spices-catering": "Leaf",
  "real-estate": "Building",
  "beauty-personal-care": "Sparkles",
  "laundry-cleaning": "Shirt",
  "travel-transport": "Plane",
  "nutrition-supplements": "Apple",
  "agri-bio-products": "Wheat",
  jewelry: "Gem",
  sports: "Trophy",
  "government-events": "Landmark",
  automobile: "Car",
  "interiors-construction": "Hammer",
  "lifestyle-perfume": "Gem",
  logistics: "Truck",
};

export function kebabCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseSolutionBullets(solution?: string) {
  if (!solution) return [];
  return solution
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("•") || l.startsWith("-") || l.startsWith("*"))
    .map((l) => l.replace(/^[•\-*]\s*/, "").trim())
    .filter(Boolean);
}

export function parseYear(duration?: string) {
  if (!duration) return "2025";
  const match = String(duration).match(/20\d{2}/);
  return match ? match[0] : "2025";
}
