import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import PreviewFade from "@/components/ui/PreviewFade";
import ProjectCard from "@/components/ui/ProjectCard";
import Lightbox from "@/components/ui/Lightbox";
import { getFeaturedProjects } from "@/constants/projects";

const FEATURED = getFeaturedProjects();

export default function FeaturedProjects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 sm:py-36">
      <Container>
        <SectionHeader
          eyebrow="Featured Projects"
          title="Creative work across every format."
          description="A curated spotlight of recent work — explore the full portfolio for every category."
          headingClassName="max-w-lg"
          link={{ label: "View full portfolio", href: "/projects" }}
        />

        <PreviewFade>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {FEATURED.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={() => setOpenIndex(i)}
                  className={i % 5 === 0 ? "sm:col-span-2 sm:row-span-2" : undefined}
                />
              ))}
            </AnimatePresence>
          </div>
        </PreviewFade>
      </Container>

      {openIndex !== null && (
        <Lightbox
          projects={FEATURED}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}
