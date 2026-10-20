import projectsData from "@source-data/projectsData.json";
import { HOME_PREVIEW } from "./preview";
import { GRADIENTS } from "./_helpers";

export type ProjectCategory = "Logo Design" | "Packaging" | "Poster" | "Brand Identity";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  image: string;
  images: string[];
  aspect: "square" | "portrait" | "landscape";
  gradient: string;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Logo Design",
  "Packaging",
  "Poster",
  "Brand Identity",
];

const PROJECT_PATHS = [
  { path: ["logo-design", "company-logo", "projects"], category: "Logo Design" as const, prefix: "logo", aspect: "square" as const },
  { path: ["poster-design", "event-poster", "projects"], category: "Poster" as const, prefix: "poster", aspect: "portrait" as const },
  { path: ["packaging-design", "tech-packaging", "projects"], category: "Packaging" as const, prefix: "packaging", aspect: "square" as const },
  { path: ["branding", "corporate-branding", "projects"], category: "Brand Identity" as const, prefix: "brand", aspect: "landscape" as const },
];

function unwrapProjects(raw: Record<string, { varieties?: Record<string, { projects?: unknown }> }>) {
  const projects: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(raw || {})) {
    projects[key] = val?.varieties || val;
  }
  return projects;
}

export const PROJECTS: Project[] = (() => {
  const data = unwrapProjects(projectsData as Record<string, { varieties?: Record<string, { projects?: unknown }> }>);
  const list: Project[] = [];
  let idx = 0;

  for (const cfg of PROJECT_PATHS) {
    let node: unknown = data;
    for (const key of cfg.path.slice(0, -1)) {
      node = (node as Record<string, unknown>)?.[key];
    }
    const projects = (node as Record<string, unknown>)?.[cfg.path.at(-1)!] ?? node ?? [];
    const items = Array.isArray(projects) ? projects : Object.values(projects as Record<string, unknown>);

    items.forEach((p) => {
      const project = p as { id?: string | number; image?: string; url?: string; relatedImages?: string[] };
      const origId = String(project.id ?? idx);
      const id = `${cfg.prefix}-${origId.replace(/^(logo|poster|packaging|brand)-?/i, "")}`;
      const image = project.image || project.url || "";
      const images = [image, ...(project.relatedImages || [])].filter(Boolean);
      const num = origId.replace(/\D/g, "") || String(idx + 1);

      list.push({
        id,
        title: `${cfg.category} #${num}`,
        client: "Pixdot Client",
        category: cfg.category,
        year: "2025",
        image,
        images,
        aspect: cfg.aspect,
        gradient: GRADIENTS[idx % GRADIENTS.length],
      });
      idx++;
    });
  }

  return list;
})();

export function getProjectsByCategory(category: ProjectCategory | "All") {
  if (category === "All") return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
}

/** Offsets per category — skips the opening items shown first on /projects. */
const FEATURED_OFFSETS: Record<ProjectCategory, number[]> = {
  "Logo Design": [4, 9, 14],
  Poster: [2, 8, 13],
  Packaging: [3, 10, 16],
  "Brand Identity": [1, 4, 7],
};

/** Curated home mix — different picks than the full portfolio grid. */
export function getFeaturedProjects(limit = HOME_PREVIEW.projects): Project[] {
  const featured: Project[] = [];
  const seen = new Set<string>();

  for (const category of PROJECT_CATEGORIES) {
    const pool = getProjectsByCategory(category);
    for (const offset of FEATURED_OFFSETS[category]) {
      const project = pool[offset];
      if (project && !seen.has(project.id)) {
        featured.push(project);
        seen.add(project.id);
      }
      if (featured.length >= limit) return featured;
    }
  }

  return featured.slice(0, limit);
}
