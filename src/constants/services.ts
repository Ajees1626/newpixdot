import servicesData from "@source-data/servicesData.json";
import { GRADIENTS, kebabCase } from "./_helpers";

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
  color: string;
  process: { title: string; description: string }[];
  benefits: string[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
  overview?: string;
  longDescription?: string;
  headerTagline?: string;
  technicalTools?: string[];
  whyChoose?: string[];
  price?: string;
  duration?: string;
  bgColor?: string;
}

const SERVICE_ICONS: Record<string, string> = {
  "Brand & Creative": "FaLightbulb",
  "Digital Marketing": "GiArcheryTarget",
  "Packaging Design": "VscPackage",
  "Website Development": "TbWorldCheck",
  "App Development": "CiMobile1",
  "Personal Branding": "IoIosPeople",
};

type RawService = {
  title: string;
  description?: string;
  overview?: string;
  longDescription?: string;
  headerTagline?: string;
  icon?: string;
  color?: string;
  bgColor?: string;
  price?: string;
  duration?: string;
  process?: Array<string | { step?: string; title?: string; description?: string }>;
  steps?: Array<string | { step?: string; title?: string; description?: string }>;
  benefits?: string[];
  whyChoose?: string[];
  technicalTools?: string[];
  technologies?: string[];
  faqs?: { question: string; answer: string }[];
  features?: string[];
};

export const SERVICES: Service[] = Object.values(servicesData as Record<string, RawService>)
  .slice(0, 6)
  .map((s, i) => {
    const process = (s.process || s.steps || []).map((step) => {
      if (typeof step === "string") return { title: step, description: "" };
      if (step.step) return { title: step.step, description: step.description || "" };
      return { title: step.title || "", description: step.description || "" };
    });
    const tools = s.technicalTools || s.technologies || [];

    return {
      slug: kebabCase(s.title),
      title: s.title,
      short: s.headerTagline || s.overview || s.description?.slice(0, 80) || "",
      description: s.description || s.overview || "",
      icon: s.icon || SERVICE_ICONS[s.title] || "Sparkles",
      color: GRADIENTS[i % GRADIENTS.length],
      ...(s.bgColor ? { bgColor: s.bgColor } : {}),
      ...(s.overview ? { overview: s.overview } : {}),
      ...(s.longDescription ? { longDescription: s.longDescription } : {}),
      ...(s.headerTagline ? { headerTagline: s.headerTagline } : {}),
      ...(s.price ? { price: s.price } : {}),
      ...(s.duration ? { duration: s.duration } : {}),
      process,
      benefits: s.benefits || s.whyChoose || [],
      technologies: tools,
      ...(s.technicalTools ? { technicalTools: s.technicalTools } : {}),
      ...(s.whyChoose ? { whyChoose: s.whyChoose } : {}),
      faqs: s.faqs || [],
    };
  });

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
