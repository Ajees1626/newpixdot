import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import Lightbox from "@/components/ui/Lightbox";
import { PROJECT_CATEGORIES, PROJECTS, type ProjectCategory as CategoryType } from "@/constants/projects";
import { useSeo } from "@/hooks/useSeo";

function resolveCategory(param?: string): CategoryType | undefined {
  if (!param) return undefined;
  return PROJECT_CATEGORIES.find((c) => c.toLowerCase().replace(/\s+/g, "-") === param.toLowerCase());
}

export default function ProjectCategory() {
  const { category: categoryParam } = useParams();
  const category = resolveCategory(categoryParam);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useSeo({
    title: category ? `${category} Projects` : "Projects",
    description: category
      ? `A curated collection of our ${category.toLowerCase()} work at Pixdot.`
      : "Pixdot creative projects",
    path: categoryParam ? `/projects/${categoryParam}` : "/projects",
  });

  if (!category) return <Navigate to="/projects" replace />;

  const projects = PROJECTS.filter((p) => p.category === category);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={category}
        description={`A curated collection of our ${category.toLowerCase()} work.`}
        breadcrumb={[{ label: "Projects", href: "/projects" }, { label: category }]}
      />

      <section className="pb-28 sm:pb-36">
        <Container>
          <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
            {projects.map((project, i) => (
              <div key={project.id} className="break-inside-avoid">
                <ProjectCard project={project} onOpen={() => setOpenIndex(i)} />
              </div>
            ))}
          </div>
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
