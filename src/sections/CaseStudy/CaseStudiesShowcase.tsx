import { useEffect } from "react";
import { ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import CaseStudySpotlight from "@/components/case-study/CaseStudySpotlight";
import { getHomeCaseStudies } from "@/constants/caseStudies";

const HOME_CASE_STUDIES = getHomeCaseStudies();

registerGsap();

export default function CaseStudiesShowcase() {
  useEffect(() => {
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-background py-4 sm:py-6">
      <CaseStudySpotlight projects={HOME_CASE_STUDIES} viewAllHref="/case-studies" />
    </section>
  );
}
