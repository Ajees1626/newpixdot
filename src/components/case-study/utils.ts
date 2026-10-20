import type { CaseStudy } from "@/constants/caseStudies";
import { TESTIMONIALS } from "@/constants/testimonials";
import { PROCESS_LABELS } from "./types";

export function parseMetricValue(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^(-?)(\d+(?:\.\d+)?)\s*(.*)$/i);
  if (match) {
    const suffix = match[3]?.trim() || "";
    return {
      numeric: parseFloat(match[2]),
      suffix,
      prefix: match[1] || "",
      raw: trimmed,
    };
  }
  return { numeric: 0, suffix: "", prefix: "", raw: trimmed };
}

export function formatMetricDisplay(parsed: ReturnType<typeof parseMetricValue>) {
  if (!parsed.numeric && parsed.raw) return parsed.raw;
  const gap = parsed.suffix && !/^[%+xX]/.test(parsed.suffix) ? " " : "";
  return `${parsed.prefix}${parsed.numeric}${gap}${parsed.suffix}`;
}

export function getHeroMetric(caseStudy: CaseStudy) {
  const primary = caseStudy.results[0];
  if (!primary) return { label: "Impact", value: "4X" };
  return { label: primary.label, value: primary.value };
}

export function getSnapshotServices(caseStudy: CaseStudy) {
  if (caseStudy.technologies.length) return caseStudy.technologies.slice(0, 4);
  return [caseStudy.category, "Brand Strategy", "Creative Direction"].filter(Boolean);
}

export function getTeamSize(caseStudy: CaseStudy) {
  const match = caseStudy.team.match(/(\d+)/);
  if (match) return `${match[1]} Members`;
  return "5 Members";
}

export function getProcessSteps(caseStudy: CaseStudy) {
  const steps = caseStudy.process.length
    ? caseStudy.process.slice(0, 4)
    : [...PROCESS_LABELS];

  return steps.map((step, i) => ({
    label: PROCESS_LABELS[i] || `Phase ${i + 1}`,
    description: step,
  }));
}

export function getTimelineSteps(caseStudy: CaseStudy) {
  const titles = ["Challenge", "Strategy", "Execution", "Impact"] as const;
  const texts = [
    caseStudy.problem || caseStudy.summary,
    caseStudy.strategy.replace(/\n+/g, " ").replace(/•/g, "").trim().slice(0, 280) ||
      caseStudy.summary,
    caseStudy.process[0] ||
      "We shipped campaigns, creative systems, and digital touchpoints with continuous optimization.",
    caseStudy.results[0]
      ? `${caseStudy.results[0].label}: ${caseStudy.results[0].value}`
      : "Measurable growth across visibility, engagement, and conversions.",
  ];

  return titles.map((title, i) => ({
    title,
    description: texts[i] || caseStudy.summary,
    image: caseStudy.images[i + 1] || caseStudy.images[i] || caseStudy.coverImage || undefined,
  }));
}

export function getGalleryImages(caseStudy: CaseStudy) {
  const images = caseStudy.images.length
    ? caseStudy.images
    : [caseStudy.coverImage].filter(Boolean);
  return images;
}

export function getBeforeAfter(caseStudy: CaseStudy) {
  const withPair = caseStudy.results.find((r) => r.before && r.after);
  if (withPair) {
    return {
      label: withPair.label,
      before: withPair.before!,
      after: withPair.after!,
      beforeImage: caseStudy.images[0] || caseStudy.coverImage,
      afterImage: caseStudy.images[1] || caseStudy.images[0] || caseStudy.coverImage,
    };
  }

  return {
    label: "Digital Presence",
    before: "Low visibility & inconsistent brand",
    after: "Strong identity & measurable growth",
    beforeImage: caseStudy.images[0] || caseStudy.coverImage,
    afterImage: caseStudy.images[1] || caseStudy.images[0] || caseStudy.coverImage,
  };
}

export function getCaseStudyTestimonial(caseStudy: CaseStudy) {
  const matched = TESTIMONIALS.find(
    (t) =>
      t.company.toLowerCase().includes(caseStudy.client.split(" ")[0].toLowerCase()) ||
      caseStudy.client.toLowerCase().includes(t.company.toLowerCase())
  );

  if (matched) {
    return {
      quote: matched.quote,
      author: matched.author,
      role: matched.role,
      company: matched.company,
    };
  }

  return {
    quote: `Pixdot transformed our digital presence — ${caseStudy.client} now leads with clarity, craft, and measurable momentum.`,
    author: "Project Lead",
    role: "CEO",
    company: caseStudy.client,
  };
}
