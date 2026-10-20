import Hero from "@/sections/Hero/Hero";
import TrustedCompanies from "@/sections/Clients/TrustedCompanies";
import AboutPreview from "@/sections/About/AboutPreview";
import ServicesReveal from "@/sections/Services/ServicesReveal";
import IndustriesGrid from "@/sections/Industries/IndustriesGrid";
import SolutionsBento from "@/sections/Solutions/SolutionsBento";
import CaseStudiesShowcase from "@/sections/CaseStudy/CaseStudiesShowcase";
import FeaturedProjects from "@/sections/Projects/FeaturedProjects";
import ClientWall from "@/sections/Clients/ClientWall";
import Testimonials from "@/sections/Testimonials/Testimonials";
import SuccessStories from "@/sections/Impact/SuccessStories";
import ImpactStats from "@/sections/Impact/ImpactStats";
import CTASection from "@/sections/CTA/CTASection";
import ContactPreview from "@/sections/Contact/ContactPreview";

import { useSeo } from "@/hooks/useSeo";
import { SITE } from "@/constants/site";

export default function Home() {
  useSeo({
    title: `${SITE.name} — Branding, Digital Marketing & Creative Solutions Agency`,
    description: SITE.description,
    path: "/",
  });

  return (
    <>
      <Hero />
      <TrustedCompanies />
      <AboutPreview />
      <ServicesReveal />
      <IndustriesGrid />
      <SolutionsBento />
      <CaseStudiesShowcase />
      <FeaturedProjects />
      <ClientWall />
      <Testimonials />
      <SuccessStories />
      <ImpactStats />
      <CTASection />
      <ContactPreview />
    </>
  );
}
