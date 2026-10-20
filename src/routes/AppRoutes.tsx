import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/layout/Animations/PageTransition";

const Home = lazy(() => import("@/pages/Home/Home"));
const About = lazy(() => import("@/pages/About/About"));
const Services = lazy(() => import("@/pages/Services/Services"));
const ServiceDetails = lazy(() => import("@/pages/ServiceDetails/ServiceDetails"));
const Industries = lazy(() => import("@/pages/Industries/Industries"));
const IndustryDetails = lazy(() => import("@/pages/IndustryDetails/IndustryDetails"));
const Solutions = lazy(() => import("@/pages/Solutions/Solutions"));
const SolutionDetails = lazy(() => import("@/pages/SolutionDetails/SolutionDetails"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy/CaseStudy"));
const CaseStudyDetails = lazy(() => import("@/pages/CaseStudyDetails/CaseStudyDetails"));
const Projects = lazy(() => import("@/pages/Projects/Projects"));
const ProjectCategory = lazy(() => import("@/pages/ProjectCategory/ProjectCategory"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));

export default function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={null}>
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:slug" element={<IndustryDetails />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:slug" element={<SolutionDetails />} />
            <Route path="/case-studies" element={<CaseStudy />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetails />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:category" element={<ProjectCategory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </Suspense>
  );
}
