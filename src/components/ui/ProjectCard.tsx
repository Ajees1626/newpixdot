import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import type { Project } from "@/constants/projects";
import SafeImage from "@/components/ui/SafeImage";
import { cn } from "@/utils/cn";

const ASPECT_CLASSES: Record<Project["aspect"], string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
};

export default function ProjectCard({
  project,
  onOpen,
  className,
}: {
  project: Project;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      data-cursor="view"
      className={cn(
        "group relative w-full overflow-hidden rounded-3xl bg-surface text-left",
        ASPECT_CLASSES[project.aspect],
        className
      )}
    >
      {project.image ? (
        <SafeImage
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          fallbackClassName={cn("absolute inset-0 bg-gradient-to-br", project.gradient)}
        />
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br", project.gradient)} />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-display text-fluid-base font-medium text-white">{project.title}</p>
          <p className="text-fluid-xs text-white/70">{project.category}</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          <Expand className="h-4 w-4" />
        </span>
      </div>
    </motion.button>
  );
}
