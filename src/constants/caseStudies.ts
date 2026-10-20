import caseStudiesData from "@source-data/caseStudiesData.json";
import { HOME_PREVIEW } from "./preview";
import { GRADIENTS, kebabCase, parseSolutionBullets, parseYear } from "./_helpers";

type RawResult = {
  metric?: string;
  label?: string;
  before?: string;
  after?: string;
  improvement?: string;
  value?: string;
};

type RawCaseStudy = {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge?: string;
  solution?: string;
  category?: string;
  summary?: string;
  fullDescription?: string;
  results?: RawResult[];
  technologies?: string[];
  duration?: string;
  team?: string;
  images?: string[];
};

export interface CaseStudy {
  slug: string;
  id: string;
  client: string;
  title: string;
  category: string;
  industry: string;
  year: string;
  coverImage: string;
  images: string[];
  summary: string;
  problem: string;
  strategy: string;
  process: string[];
  results: { label: string; value: string; before?: string; after?: string }[];
  technologies: string[];
  duration: string;
  team: string;
  gradient: string;
}

export const CASE_STUDIES: CaseStudy[] = (
  caseStudiesData.logo.caseStudies as RawCaseStudy[]
).map((cs, i) => {
  const images = cs.images || [];
  const process = parseSolutionBullets(cs.solution);
  const results = (cs.results || []).map((r) => ({
    label: r.metric || r.label || "",
    value: r.improvement || r.after || r.value || "",
    ...(r.before ? { before: r.before } : {}),
    ...(r.after ? { after: r.after } : {}),
  }));

  return {
    slug: kebabCase(cs.title),
    id: cs.id,
    client: cs.client,
    title: cs.title,
    category: cs.category || caseStudiesData.logo.category || "Digital Marketing",
    industry: cs.industry,
    year: parseYear(cs.duration),
    coverImage: images[0] || "",
    images,
    summary: cs.fullDescription || cs.summary || cs.challenge || "",
    problem: cs.challenge || "",
    strategy: cs.solution || "",
    process: process.length ? process : cs.technologies || [],
    results,
    technologies: cs.technologies || [],
    duration: cs.duration || "2025",
    team: cs.team || "Pixdot Creative Team",
    gradient: GRADIENTS[i % GRADIENTS.length],
  };
});

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const index = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (index === -1) return CASE_STUDIES[0];
  return CASE_STUDIES[(index + 1) % CASE_STUDIES.length];
}

/** Short label for rails and spotlight UI — e.g. "Magnaa Modules" → "MAGNAA". */
export function getShortClientLabel(client: string) {
  return client.split(/\s+/)[0]?.toUpperCase() || client.toUpperCase();
}

/** Home page spotlight — first N studies; full list on /case-studies. */
export function getHomeCaseStudies() {
  return CASE_STUDIES.slice(0, HOME_PREVIEW.caseStudies);
}
