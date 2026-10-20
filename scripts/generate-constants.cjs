/**
 * Extracts Pixdot source JSON from agent transcript and generates TypeScript constants.
 * Run: node scripts/generate-constants.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CONSTANTS = path.join(ROOT, "src", "constants");
const TRANSCRIPT = path.join(
  process.env.USERPROFILE || process.env.HOME || "",
  ".cursor/projects/a-web-code-new-updated-pixdot/agent-transcripts/63e28a0d-a2e6-4cd7-ba9f-cbc3347e1eec/63e28a0d-a2e6-4cd7-ba9f-cbc3347e1eec.jsonl"
);
const DATA_DIR = path.join(CONSTANTS, "data");
const LEGACY_DATA_DIR = path.join(ROOT, "..", "..", "new pixdot website", "frontend", "src", "data");
const SOURCE_DATA = path.join(CONSTANTS, "_source-data.json");

const GRADIENTS = [
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
];

const INDUSTRY_ICONS = {
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

function kebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tsString(value) {
  if (value == null) return '""';
  return JSON.stringify(String(value));
}

function tsArray(arr, indent = "  ") {
  if (!arr || arr.length === 0) return "[]";
  const items = arr.map((item) => {
    if (typeof item === "string") return `${indent}  ${tsString(item)}`;
    if (typeof item === "object" && item !== null) {
      const entries = Object.entries(item)
        .filter(([, v]) => v !== undefined && v !== null && v !== "")
        .map(([k, v]) => `${indent}    ${k}: ${tsString(v)}`);
      return `${indent}  {\n${entries.join(",\n")}\n${indent}  }`;
    }
    return `${indent}  ${JSON.stringify(item)}`;
  });
  return `[\n${items.join(",\n")}\n${indent}]`;
}

function unwrapProjects(raw) {
  const projects = {};
  for (const [key, val] of Object.entries(raw || {})) {
    projects[key] = val?.varieties || val;
  }
  return projects;
}

function copyRawDataFiles() {
  const files = [
    "caseStudiesData.json",
    "industriesData.json",
    "projectsData.json",
    "servicesData.json",
    "solutionsData.json",
  ];
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const report = [];
  for (const file of files) {
    const src = path.join(LEGACY_DATA_DIR, file);
    const dst = path.join(DATA_DIR, file);
    if (!fs.existsSync(src)) {
      throw new Error(`Missing source file: ${src}`);
    }
    fs.copyFileSync(src, dst);
    const srcContent = fs.readFileSync(src);
    const dstContent = fs.readFileSync(dst);
    report.push({
      file,
      exists: fs.existsSync(dst),
      size: dstContent.length,
      lines: dstContent.toString("utf8").split("\n").length,
      identical: srcContent.equals(dstContent),
    });
  }
  return report;
}

function loadFromDataDir(dir) {
  const read = (name) => JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
  const caseStudies = read("caseStudiesData.json");
  const industries = read("industriesData.json");
  const projectsRaw = read("projectsData.json");
  const servicesRaw = read("servicesData.json");
  const solutionsRaw = read("solutionsData.json");
  return {
    ...caseStudies,
    industries,
    projects: unwrapProjects(projectsRaw),
    services: Object.values(servicesRaw),
    solutions: Object.values(solutionsRaw),
  };
}

function loadSourceData() {
  if (fs.existsSync(SOURCE_DATA)) {
    return JSON.parse(fs.readFileSync(SOURCE_DATA, "utf8"));
  }
  if (fs.existsSync(path.join(DATA_DIR, "caseStudiesData.json"))) {
    return loadFromDataDir(DATA_DIR);
  }
  if (fs.existsSync(path.join(LEGACY_DATA_DIR, "caseStudiesData.json"))) {
    return loadFromDataDir(LEGACY_DATA_DIR);
  }
  return extractJsonFromTranscript();
}

function extractJsonFromTranscript() {
  const content = fs.readFileSync(TRANSCRIPT, "utf8");
  const lines = content.split("\n");
  for (const line of lines) {
    if (!line.includes("caseStudies") || !line.includes("logo-1")) continue;
    const obj = JSON.parse(line);
    const text = obj.message?.content?.find((c) => c.type === "text")?.text || "";
    const marker = 'ok "';
    let start = text.indexOf(marker);
    if (start === -1) start = text.indexOf('ok "{');
    if (start === -1) start = text.indexOf('{"logo"');
    else start = start + marker.length - 1;
    if (start === -1) throw new Error("Could not find JSON start in transcript");

    let jsonStr = text.slice(start);
    // Trim trailing quote if wrapped
    if (jsonStr.endsWith('"')) jsonStr = jsonStr.slice(0, -1);

    // Balance braces
    let depth = 0;
    let end = -1;
    for (let i = 0; i < jsonStr.length; i++) {
      if (jsonStr[i] === "{") depth++;
      else if (jsonStr[i] === "}") {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    if (end === -1) throw new Error("Could not find JSON end");
    jsonStr = jsonStr.slice(0, end);
    return JSON.parse(jsonStr);
  }
  throw new Error("Transcript line not found");
}

function parseSolutionBullets(solution) {
  if (!solution) return [];
  return solution
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("•") || l.startsWith("-") || l.startsWith("*"))
    .map((l) => l.replace(/^[•\-*]\s*/, "").trim())
    .filter(Boolean);
}

function parseYear(duration) {
  if (!duration) return "2025";
  const match = String(duration).match(/20\d{2}/);
  return match ? match[0] : "2025";
}

function generateCaseStudies(data) {
  const studies = data.logo?.caseStudies || [];
  const lines = [
    "export interface CaseStudy {",
    "  slug: string;",
    "  id: string;",
    "  client: string;",
    "  title: string;",
    "  category: string;",
    "  industry: string;",
    "  year: string;",
    "  coverImage: string;",
    "  images: string[];",
    "  summary: string;",
    "  problem: string;",
    "  strategy: string;",
    "  process: string[];",
    "  results: { label: string; value: string; before?: string; after?: string }[];",
    "  technologies: string[];",
    "  duration: string;",
    "  team: string;",
    "  gradient: string;",
    "}",
    "",
    "export const CASE_STUDIES: CaseStudy[] = [",
  ];

  studies.forEach((cs, i) => {
    const images = cs.images || [];
    const coverImage = images[0] || "";
    const process = parseSolutionBullets(cs.solution);
    const results = (cs.results || []).map((r) => ({
      label: r.metric || r.label || "",
      value: r.improvement || r.after || r.value || "",
      ...(r.before ? { before: r.before } : {}),
      ...(r.after ? { after: r.after } : {}),
    }));

    lines.push("  {");
    lines.push(`    slug: ${tsString(kebabCase(cs.title))},`);
    lines.push(`    id: ${tsString(cs.id)},`);
    lines.push(`    client: ${tsString(cs.client)},`);
    lines.push(`    title: ${tsString(cs.title)},`);
    lines.push(`    category: ${tsString(cs.category || data.logo?.category || "Digital Marketing")},`);
    lines.push(`    industry: ${tsString(cs.industry)},`);
    lines.push(`    year: ${tsString(parseYear(cs.duration))},`);
    lines.push(`    coverImage: ${tsString(coverImage)},`);
    lines.push(`    images: ${tsArray(images, "    ")},`);
    lines.push(`    summary: ${tsString(cs.fullDescription || cs.summary || cs.challenge || "")},`);
    lines.push(`    problem: ${tsString(cs.challenge || "")},`);
    lines.push(`    strategy: ${tsString(cs.solution || "")},`);
    lines.push(`    process: ${tsArray(process.length ? process : cs.technologies || [], "    ")},`);
    lines.push(`    results: ${tsArray(results, "    ")},`);
    lines.push(`    technologies: ${tsArray(cs.technologies || [], "    ")},`);
    lines.push(`    duration: ${tsString(cs.duration || "2025")},`);
    lines.push(`    team: ${tsString(cs.team || "Pixdot Creative Team")},`);
    lines.push(`    gradient: ${tsString(GRADIENTS[i % GRADIENTS.length])},`);
    lines.push("  },");
  });

  lines.push("];", "", "export function getCaseStudyBySlug(slug: string) {", "  return CASE_STUDIES.find((c) => c.slug === slug);", "}", "");
  return lines.join("\n");
}

function generateIndustries(data) {
  const industriesObj = data.industries || {};
  const entries = Object.entries(industriesObj);

  const lines = [
    "export interface Industry {",
    "  slug: string;",
    "  title: string;",
    "  short: string;",
    "  description: string;",
    "  longDescription: string;",
    "  image: string;",
    "  icon: string;",
    "  color: string;",
    "  services: string[];",
    "  features: string[];",
    "  benefits: string[];",
    "  challenges: string[];",
    "  solutions: string[];",
    "  stats: { label: string; value: string }[];",
    "  projects?: string;",
    "  clients?: string;",
    "  growth?: string;",
    "}",
    "",
    "export const INDUSTRIES: Industry[] = [",
  ];

  entries.forEach(([id, ind], i) => {
    const features = ind.features || [];
    const benefits = ind.benefits || [];
    const services = ind.services || [];
    const stats = [];
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

    lines.push("  {");
    lines.push(`    slug: ${tsString(kebabCase(id))},`);
    lines.push(`    title: ${tsString(ind.title || ind.name || id)},`);
    lines.push(`    short: ${tsString(ind.description || "")},`);
    lines.push(`    description: ${tsString(ind.description || "")},`);
    lines.push(`    longDescription: ${tsString(ind.longDescription || ind.description || "")},`);
    lines.push(`    image: ${tsString(ind.image || "")},`);
    lines.push(`    icon: ${tsString(INDUSTRY_ICONS[id] || "Building2")},`);
    lines.push(`    color: ${tsString(ind.color || GRADIENTS[i % GRADIENTS.length])},`);
    lines.push(`    services: ${tsArray(services, "    ")},`);
    lines.push(`    features: ${tsArray(features, "    ")},`);
    lines.push(`    benefits: ${tsArray(benefits, "    ")},`);
    lines.push(`    challenges: ${tsArray(challenges, "    ")},`);
    lines.push(`    solutions: ${tsArray(services, "    ")},`);
    lines.push(`    stats: ${tsArray(stats, "    ")},`);
    if (ind.projects) lines.push(`    projects: ${tsString(String(ind.projects))},`);
    if (ind.clients) lines.push(`    clients: ${tsString(String(ind.clients))},`);
    if (ind.growth) lines.push(`    growth: ${tsString(String(ind.growth))},`);
    lines.push("  },");
  });

  lines.push("];", "", "export function getIndustryBySlug(slug: string) {", "  return INDUSTRIES.find((i) => i.slug === slug);", "}", "");
  return lines.join("\n");
}

function generateProjects(data) {
  const projectPaths = [
    { path: ["logo-design", "company-logo", "projects"], category: "Logo Design", prefix: "logo", aspect: "square" },
    { path: ["poster-design", "event-poster", "projects"], category: "Poster", prefix: "poster", aspect: "portrait" },
    { path: ["packaging-design", "tech-packaging", "projects"], category: "Packaging", prefix: "packaging", aspect: "square" },
    { path: ["branding", "corporate-branding", "projects"], category: "Brand Identity", prefix: "brand", aspect: "landscape" },
  ];

  const lines = [
    'export type ProjectCategory = "Logo Design" | "Packaging" | "Poster" | "Brand Identity";',
    "",
    "export interface Project {",
    "  id: string;",
    "  title: string;",
    "  client: string;",
    "  category: ProjectCategory;",
    "  year: string;",
    "  image: string;",
    "  images: string[];",
    '  aspect: "square" | "portrait" | "landscape";',
    "  gradient: string;",
    "}",
    "",
    "export const PROJECT_CATEGORIES: ProjectCategory[] = [",
    '  "Logo Design",',
    '  "Packaging",',
    '  "Poster",',
    '  "Brand Identity",',
    "];",
    "",
    "export const PROJECTS: Project[] = [",
  ];

  let idx = 0;
  for (const cfg of projectPaths) {
    let node = data.projects;
    for (const key of cfg.path.slice(0, -1)) {
      node = node?.[key];
    }
    const projects = node?.[cfg.path.at(-1)] || node || [];
    const list = Array.isArray(projects) ? projects : Object.values(projects);

    list.forEach((p) => {
      const origId = p.id || String(idx);
      const id = `${cfg.prefix}-${origId.replace(/^(logo|poster|packaging|brand)-?/i, "")}`;
      const image = p.image || p.url || "";
      const related = p.relatedImages || [];
      const images = [image, ...related].filter(Boolean);
      const num = origId.replace(/\D/g, "") || String(idx + 1);

      lines.push("  {");
      lines.push(`    id: ${tsString(id)},`);
      lines.push(`    title: ${tsString(`${cfg.category} #${num}`)},`);
      lines.push(`    client: "Pixdot Client",`);
      lines.push(`    category: ${tsString(cfg.category)},`);
      lines.push(`    year: "2025",`);
      lines.push(`    image: ${tsString(image)},`);
      lines.push(`    images: ${tsArray(images, "    ")},`);
      lines.push(`    aspect: ${tsString(cfg.aspect)},`);
      lines.push(`    gradient: ${tsString(GRADIENTS[idx % GRADIENTS.length])},`);
      lines.push("  },");
      idx++;
    });
  }

  lines.push(
    "];",
    "",
    'export function getProjectsByCategory(category: ProjectCategory | "All") {',
    '  if (category === "All") return PROJECTS;',
    "  return PROJECTS.filter((p) => p.category === category);",
    "}",
    ""
  );
  return lines.join("\n");
}

function generateServices(data) {
  const servicesRaw = data.services || [];
  const list = Array.isArray(servicesRaw) ? servicesRaw.slice(0, 6) : Object.values(servicesRaw).slice(0, 6);

  const lines = [
    "export interface Service {",
    "  slug: string;",
    "  title: string;",
    "  short: string;",
    "  description: string;",
    "  icon: string;",
    "  color: string;",
    "  process: { title: string; description: string }[];",
    "  benefits: string[];",
    "  technologies: string[];",
    "  faqs: { question: string; answer: string }[];",
    "  overview?: string;",
    "  longDescription?: string;",
    "  headerTagline?: string;",
    "  technicalTools?: string[];",
    "  whyChoose?: string[];",
    "  price?: string;",
    "  duration?: string;",
    "  bgColor?: string;",
    "}",
    "",
    "export const SERVICES: Service[] = [",
  ];

  const serviceIcons = {
    "Brand & Creative": "Sparkles",
    "Digital Marketing": "TrendingUp",
    "Packaging Design": "Package",
    "Website Development": "Globe",
    "App Development": "Smartphone",
    "Personal Branding": "User",
  };

  list.forEach((s) => {
    const process = (s.process || s.steps || []).map((step) => {
      if (typeof step === "string") return { title: step, description: "" };
      if (step.step) return { title: step.step, description: step.description || "" };
      return step;
    });
    const tools = s.technicalTools || s.technologies || [];
    const faqs = s.faqs || [];

    lines.push("  {");
    lines.push(`    slug: ${tsString(kebabCase(s.title))},`);
    lines.push(`    title: ${tsString(s.title)},`);
    lines.push(`    short: ${tsString(s.short || s.headerTagline || s.overview || s.description?.slice(0, 80) || "")},`);
    lines.push(`    description: ${tsString(s.description || s.overview || "")},`);
    lines.push(`    icon: ${tsString(s.icon || serviceIcons[s.title] || "Sparkles")},`);
    lines.push(`    color: ${tsString(s.color || "from-violet-500 to-fuchsia-500")},`);
    if (s.bgColor) lines.push(`    bgColor: ${tsString(s.bgColor)},`);
    if (s.overview) lines.push(`    overview: ${tsString(s.overview)},`);
    if (s.longDescription) lines.push(`    longDescription: ${tsString(s.longDescription)},`);
    if (s.headerTagline) lines.push(`    headerTagline: ${tsString(s.headerTagline)},`);
    if (s.price) lines.push(`    price: ${tsString(s.price)},`);
    if (s.duration) lines.push(`    duration: ${tsString(s.duration)},`);
    lines.push(`    process: ${tsArray(process, "    ")},`);
    lines.push(`    benefits: ${tsArray(s.benefits || s.whyChoose || [], "    ")},`);
    lines.push(`    technologies: ${tsArray(tools, "    ")},`);
    if (s.technicalTools) lines.push(`    technicalTools: ${tsArray(s.technicalTools, "    ")},`);
    if (s.whyChoose) lines.push(`    whyChoose: ${tsArray(s.whyChoose, "    ")},`);
    lines.push(`    faqs: ${tsArray(faqs, "    ")},`);
    lines.push("  },");
  });

  lines.push("];", "", "export function getServiceBySlug(slug: string) {", "  return SERVICES.find((s) => s.slug === slug);", "}", "");
  return lines.join("\n");
}

function generateSolutions(data) {
  const solutionsRaw = data.solutions || [];
  const list = Array.isArray(solutionsRaw) ? solutionsRaw.slice(0, 19) : Object.values(solutionsRaw).slice(0, 19);
  const sizes = ["lg", "md", "sm"];

  const lines = [
    "export interface Solution {",
    "  slug: string;",
    "  title: string;",
    "  short: string;",
    "  description: string;",
    "  icon: string;",
    '  size: "sm" | "md" | "lg";',
    "  features: string[];",
    "  category?: string;",
    "  color?: string;",
    "  bgColor?: string;",
    "  benefits?: string[];",
    "}",
    "",
    "export const SOLUTIONS: Solution[] = [",
  ];

  list.forEach((s, i) => {
    lines.push("  {");
    lines.push(`    slug: ${tsString(kebabCase(s.title || s.name))},`);
    lines.push(`    title: ${tsString(s.title || s.name)},`);
    lines.push(`    short: ${tsString(s.short || s.tagline || s.description?.slice(0, 80) || "")},`);
    lines.push(`    description: ${tsString(s.description || s.longDescription || "")},`);
    lines.push(`    icon: ${tsString(s.icon || "Rocket")},`);
    lines.push(`    size: ${tsString(s.size || sizes[i % 3])},`);
    if (s.category) lines.push(`    category: ${tsString(s.category)},`);
    if (s.color) lines.push(`    color: ${tsString(s.color)},`);
    if (s.bgColor) lines.push(`    bgColor: ${tsString(s.bgColor)},`);
    lines.push(`    features: ${tsArray(s.features || [], "    ")},`);
    if (s.benefits) lines.push(`    benefits: ${tsArray(s.benefits, "    ")},`);
    lines.push("  },");
  });

  lines.push("];", "", "export function getSolutionBySlug(slug: string) {", "  return SOLUTIONS.find((s) => s.slug === slug);", "}", "");
  return lines.join("\n");
}

function main() {
  const copyReport = copyRawDataFiles();
  const data = loadSourceData();
  fs.writeFileSync(SOURCE_DATA, JSON.stringify(data, null, 2));

  const files = {
    caseStudies: generateCaseStudies(data),
    industries: generateIndustries(data),
    projects: generateProjects(data),
    services: generateServices(data),
    solutions: generateSolutions(data),
  };

  const report = [];
  for (const [name, content] of Object.entries(files)) {
    const filePath = path.join(CONSTANTS, `${name}.ts`);
    fs.writeFileSync(filePath, content);
    const lineCount = content.split("\n").length;
    report.push(`${name}.ts: ${lineCount} lines`);
  }

  const copyLines = copyReport.map(
    (r) =>
      `${r.file}: ${r.exists ? "yes" : "no"} | ${r.size} bytes | ${r.lines} lines | identical: ${r.identical}`
  );

  const summary = [
    "Raw JSON copy:",
    ...copyLines,
    "",
    `Case studies: ${data.logo?.caseStudies?.length || 0}`,
    `Industries: ${Object.keys(data.industries || {}).length}`,
    `Services: ${(Array.isArray(data.services) ? data.services : Object.values(data.services || {})).slice(0, 6).length}`,
    `Solutions: ${Math.min(19, (Array.isArray(data.solutions) ? data.solutions : Object.values(data.solutions || {})).length)}`,
    ...report,
  ].join("\n");

  fs.writeFileSync(path.join(ROOT, "GENERATION_REPORT.txt"), summary);
  console.log(summary);
}

main();
