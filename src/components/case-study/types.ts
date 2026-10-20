export const CASE_STUDY_SECTIONS = [
  { id: "overview", label: "DNA", number: "01" },
  { id: "process", label: "Process", number: "02" },
  { id: "gallery", label: "Gallery", number: "03" },
  { id: "results", label: "Results", number: "04" },
] as const;

export type CaseStudySectionId = (typeof CASE_STUDY_SECTIONS)[number]["id"];

export interface CaseStudySectionProps {
  caseStudy: import("@/constants/caseStudies").CaseStudy;
}

export const PROCESS_LABELS = ["Research", "Strategy", "Execution", "Growth"] as const;
