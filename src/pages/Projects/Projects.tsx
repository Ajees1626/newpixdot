import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import Lightbox from "@/components/ui/Lightbox";
import {
  PROJECT_CATEGORIES,
  getProjectsByCategory,
  type ProjectCategory,
} from "@/constants/projects";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/utils/cn";

export default function Projects() {
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const projects = getProjectsByCategory(category);

  useSeo({
    title: "Our Projects",
    description:
      "Explore Pixdot Solutions' creative portfolio, featuring branding, logo design, packaging, digital creatives, and digital experiences for businesses across industries.",
    path: "/projects",
  });

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Ideas Made Visible. Brands Made Memorable."
        description="Explore the creative work behind our projects, from distinctive brand identities and packaging to digital creatives and engaging brand experiences."
      />

      <section className="pb-28 sm:pb-36">
        <Container>
          <Reveal className="mb-10 flex flex-wrap gap-2">
            {(["All", ...PROJECT_CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                data-cursor="hover"
                aria-pressed={category === cat}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-fluid-xs font-medium transition-colors duration-300",
                  category === cat
                    ? "border-text bg-text text-background"
                    : "border-border text-muted hover:text-text"
                )}
              >
                {cat}
              </button>
            ))}
          </Reveal>

          <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
            <AnimatePresence mode="popLayout">
              {projects.map((project, i) => (
                <div key={project.id} className="break-inside-avoid">
                  <ProjectCard
                    project={project}
                    onOpen={() => setOpenIndex(i)}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>

          {projects.length === 0 && (
            <p className="py-20 text-center text-fluid-sm text-muted">
              No projects in this category yet. Explore another category to see
              more of our work.
            </p>
          )}
        </Container>
      </section>

      {openIndex !== null && (
        <Lightbox
          projects={projects}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}
 