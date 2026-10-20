import solutionsData from "@source-data/solutionsData.json";
import { PROJECTS } from "./projects";
import { GRADIENTS, kebabCase } from "./_helpers";

export interface Solution {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  size: "sm" | "md" | "lg";
  features: string[];
  category?: string;
  color: string;
  bgColor?: string;
  benefits?: string[];
}

const SIZES: Solution["size"][] = ["lg", "md", "sm"];

type RawSolution = {
  id?: string;
  title?: string;
  name?: string;
  short?: string;
  tagline?: string;
  description?: string;
  longDescription?: string;
  icon?: string;
  size?: Solution["size"];
  features?: string[];
  category?: string;
  color?: string;
  bgColor?: string;
  benefits?: string[];
};

export const SOLUTIONS: Solution[] = Object.entries(solutionsData as Record<string, RawSolution>).map(
  ([id, s], i) => ({
    slug: kebabCase(s.id || id),
    title: s.title || s.name || "",
    short: s.short || s.tagline || s.description || "",
    description: s.description || s.longDescription || "",
    icon: s.icon || "Rocket",
    size: s.size || SIZES[i % 3],
    ...(s.category ? { category: s.category } : {}),
    color: s.color || GRADIENTS[i % GRADIENTS.length],
    ...(s.bgColor ? { bgColor: s.bgColor } : {}),
    features: s.features || [],
    ...(s.benefits ? { benefits: s.benefits } : {}),
  })
);

export function getSolutionBySlug(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}

const GALLERY_SIZE = 4;

/** Up to 4 project images for solution detail gallery — safe URLs only. */
export function getSolutionGalleryImages(slug: string, limit = GALLERY_SIZE): string[] {
  const pool = PROJECTS.map((p) => p.image).filter(Boolean);
  if (pool.length === 0) return [];

  let offset = 0;
  for (const char of slug) offset = (offset + char.charCodeAt(0)) % pool.length;

  const images: string[] = [];
  for (let i = 0; i < pool.length && images.length < limit; i++) {
    const image = pool[(offset + i * 11) % pool.length];
    if (!images.includes(image)) images.push(image);
  }

  return images.slice(0, limit);
}
