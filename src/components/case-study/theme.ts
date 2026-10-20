import type { CaseStudy } from "@/constants/caseStudies";

export interface CaseStudyTheme {
  id: string;
  heroOverlay: string;
  pageBg: string;
  wallMood: string;
  archiveBg: string;
  accent: string;
  glow: string;
  surface: string;
  textOnHero: string;
  heroTag: string;
  heroLogo: string;
  heroScroll: string;
  gridPattern?: "architectural" | "blueprint" | "clinical" | "diagonal";
  texture?: "paper" | "noise";
}

const THEMES: Record<string, CaseStudyTheme> = {
  interior: {
    id: "interior",
    heroOverlay:
      "from-white/82 via-violet-100/50 to-background/92 dark:from-neutral-950/92 dark:via-violet-950/50 dark:to-neutral-950/88",
    pageBg: "bg-background text-text",
    wallMood: "from-white via-violet-100/30 to-violet-950",
    archiveBg: "#F7F7FB",
    accent: "text-primary dark:text-violet-300",
    glow: "from-violet-600/30 to-fuchsia-500/15",
    surface: "bg-surface dark:bg-neutral-900/30",
    textOnHero: "text-neutral-900 dark:text-white",
    heroTag:
      "border-neutral-900/12 bg-white/65 text-neutral-800 dark:border-white/15 dark:bg-white/10 dark:text-white/85",
    heroLogo: "border-neutral-900/12 bg-white/70 dark:border-white/20 dark:bg-white/10",
    heroScroll: "text-neutral-500 dark:text-white/50",
    gridPattern: "diagonal",
    texture: "noise",
  },
  healthcare: {
    id: "healthcare",
    heroOverlay: "from-white/90 via-sky-50/80 to-blue-100/70 dark:from-sky-950/85 dark:via-blue-950/60 dark:to-neutral-950/88",
    pageBg: "bg-background text-text",
    wallMood: "from-white via-sky-50 to-blue-200",
    archiveBg: "#EEF7FF",
    accent: "text-sky-600 dark:text-sky-400",
    glow: "from-sky-300/40 to-cyan-200/30",
    surface: "bg-sky-50/80 dark:bg-sky-950/25",
    textOnHero: "text-neutral-900 dark:text-white",
    heroTag:
      "border-neutral-900/15 bg-white/60 text-neutral-800 dark:border-white/15 dark:bg-white/10 dark:text-white/85",
    heroLogo: "border-neutral-900/15 bg-white/70 dark:border-white/20 dark:bg-white/10",
    heroScroll: "text-neutral-500 dark:text-white/50",
    gridPattern: "clinical",
  },
  restaurant: {
    id: "restaurant",
    heroOverlay:
      "from-amber-100/85 via-orange-100/70 to-amber-50/90 dark:from-amber-950/85 dark:via-orange-900/55 dark:to-rose-950/75",
    pageBg: "bg-background text-text",
    wallMood: "from-amber-50 via-orange-100 to-orange-900",
    archiveBg: "#FFF8F0",
    accent: "text-orange-700 dark:text-orange-400",
    glow: "from-orange-400/35 to-amber-300/25",
    surface: "bg-orange-50/70 dark:bg-orange-950/20",
    textOnHero: "text-stone-900 dark:text-white",
    heroTag:
      "border-stone-900/12 bg-white/60 text-stone-800 dark:border-white/15 dark:bg-white/10 dark:text-white/85",
    heroLogo: "border-stone-900/12 bg-white/70 dark:border-white/20 dark:bg-white/10",
    heroScroll: "text-stone-600 dark:text-white/50",
    texture: "paper",
  },
  construction: {
    id: "construction",
    heroOverlay:
      "from-zinc-100/88 via-stone-200/65 to-zinc-50/92 dark:from-zinc-900/92 dark:via-slate-800/75 dark:to-zinc-950/90",
    pageBg: "bg-background text-text",
    wallMood: "from-zinc-100 via-stone-200 to-zinc-800",
    archiveBg: "#F4F4F4",
    accent: "text-yellow-700 dark:text-yellow-500",
    glow: "from-yellow-500/20 to-slate-400/15",
    surface: "bg-zinc-100/80 dark:bg-zinc-900/30",
    textOnHero: "text-zinc-900 dark:text-white",
    heroTag:
      "border-zinc-900/12 bg-white/60 text-zinc-800 dark:border-white/15 dark:bg-white/10 dark:text-white/85",
    heroLogo: "border-zinc-900/12 bg-white/70 dark:border-white/20 dark:bg-white/10",
    heroScroll: "text-zinc-600 dark:text-white/50",
    gridPattern: "blueprint",
  },
  education: {
    id: "education",
    heroOverlay:
      "from-indigo-50/88 via-violet-100/60 to-fuchsia-50/90 dark:from-indigo-950/80 dark:via-violet-900/50 dark:to-fuchsia-950/70",
    pageBg: "bg-background text-text",
    wallMood: "from-indigo-50 via-fuchsia-100 to-indigo-900",
    archiveBg: "#F5F3FF",
    accent: "text-fuchsia-600 dark:text-fuchsia-400",
    glow: "from-fuchsia-400/30 to-indigo-300/25",
    surface: "bg-indigo-50/70 dark:bg-indigo-950/25",
    textOnHero: "text-indigo-950 dark:text-white",
    heroTag:
      "border-indigo-900/12 bg-white/60 text-indigo-900 dark:border-white/15 dark:bg-white/10 dark:text-white/85",
    heroLogo: "border-indigo-900/12 bg-white/70 dark:border-white/20 dark:bg-white/10",
    heroScroll: "text-indigo-600 dark:text-white/50",
  },
  default: {
    id: "default",
    heroOverlay:
      "from-background/85 via-violet-100/45 to-background/95 dark:from-violet-950/80 dark:via-fuchsia-900/45 dark:to-indigo-950/78",
    pageBg: "bg-background text-text",
    wallMood: "from-background via-violet-100/20 to-violet-950",
    archiveBg: "#FAFAFA",
    accent: "text-primary",
    glow: "from-violet-500/25 to-fuchsia-400/15",
    surface: "bg-surface",
    textOnHero: "text-neutral-900 dark:text-white",
    heroTag:
      "border-neutral-900/12 bg-white/65 text-neutral-800 dark:border-white/15 dark:bg-white/10 dark:text-white/85",
    heroLogo: "border-neutral-900/12 bg-white/70 dark:border-white/20 dark:bg-white/10",
    heroScroll: "text-neutral-500 dark:text-white/50",
    gridPattern: "architectural",
  },
};

function matchTheme(caseStudy: CaseStudy): CaseStudyTheme {
  const hay = `${caseStudy.industry} ${caseStudy.client} ${caseStudy.category}`.toLowerCase();
  if (/magnaa|interior|modular|workspace|architect/.test(hay)) return THEMES.interior;
  if (/health|hospital|clinic|unani|medical/.test(hay)) return THEMES.healthcare;
  if (/restaurant|food|beverage|sweet|snack|meat/.test(hay)) return THEMES.restaurant;
  if (/construction|build|concrete|real estate/.test(hay)) return THEMES.construction;
  if (/education|school|college|edtech|university/.test(hay)) return THEMES.education;
  return THEMES.default;
}

export function getCaseStudyTheme(caseStudy: CaseStudy) {
  return matchTheme(caseStudy);
}

export function splitHeroTitle(caseStudy: CaseStudy) {
  const words = caseStudy.client.trim().split(/\s+/);
  if (words.length >= 2) {
    return {
      line1: words[0].toUpperCase(),
      line2: words.slice(1).join(" ").toUpperCase(),
    };
  }
  const titleWords = caseStudy.title.split(/\s+/);
  return {
    line1: caseStudy.client.toUpperCase(),
    line2: titleWords.slice(-2).join(" ").toUpperCase() || caseStudy.category.toUpperCase(),
  };
}
