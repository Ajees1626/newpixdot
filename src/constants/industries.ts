import industriesData from "@source-data/industriesData.json";
import { GRADIENTS, INDUSTRY_ICONS, kebabCase } from "./_helpers";

export interface Industry {
  slug: string;
  title: string;
  short: string;
  description: string;
  longDescription: string;
  image: string;
  icon: string;
  color: string;
  services: string[];
  features: string[];
  benefits: string[];
  challenges: string[];
  solutions: string[];
  stats: { label: string; value: string }[];
  projects?: string;
  clients?: string;
  growth?: string;
}

export const INDUSTRIES: Industry[] = Object.entries(industriesData).map(([id, ind], i) => {
  const features = ind.features || [];
  const benefits = ind.benefits || [];
  const services = ind.services || [];
  const stats: { label: string; value: string }[] = [];
  if (ind.projects) stats.push({ label: "Projects", value: String(ind.projects) });
  if (ind.clients) stats.push({ label: "Clients", value: String(ind.clients) });
  if (ind.growth) stats.push({ label: "Growth", value: String(ind.growth) });

  const challenges =
    features.length >= 3
      ? features.slice(0, 3)
      : (ind.longDescription || ind.description || "")
          .split(".")
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, 3);

  return {
    slug: kebabCase(id),
    title: ind.name || id,
    short: ind.description || "",
    description: ind.description || "",
    longDescription: ind.longDescription || ind.description || "",
    image: ind.image || "",
    icon: ind.icon || INDUSTRY_ICONS[id] || "Building2",
    color: ind.color || GRADIENTS[i % GRADIENTS.length],
    services,
    features,
    benefits,
    challenges,
    solutions: services,
    stats,
    ...(ind.projects ? { projects: String(ind.projects) } : {}),
    ...(ind.clients ? { clients: String(ind.clients) } : {}),
    ...(ind.growth ? { growth: String(ind.growth) } : {}),
  };
});

export function getIndustryBySlug(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
