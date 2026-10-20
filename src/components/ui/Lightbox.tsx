import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/constants/projects";
import SafeImage from "@/components/ui/SafeImage";
import { cn } from "@/utils/cn";

interface LightboxProps {
  projects: Project[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ projects, index, onClose, onNavigate }: LightboxProps) {
  const project = projects[index];
  const gallery = useMemo(() => {
    if (!project) return [];
    const urls = project.images?.length ? project.images : project.image ? [project.image] : [];
    return [...new Set(urls.filter(Boolean))];
  }, [project]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [project?.id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        if (gallery.length > 1) {
          setImageIndex((i) => (i + 1) % gallery.length);
        } else {
          onNavigate((index + 1) % projects.length);
        }
      }
      if (e.key === "ArrowLeft") {
        if (gallery.length > 1) {
          setImageIndex((i) => (i - 1 + gallery.length) % gallery.length);
        } else {
          onNavigate((index - 1 + projects.length) % projects.length);
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [index, projects.length, onClose, onNavigate, gallery.length]);

  if (!project) return null;

  const activeSrc = gallery[imageIndex] || project.image;
  const hasMulti = gallery.length > 1;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-lg"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          data-cursor="close"
          aria-label="Close gallery"
          className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (hasMulti) {
              setImageIndex((i) => (i - 1 + gallery.length) % gallery.length);
            } else {
              onNavigate((index - 1 + projects.length) % projects.length);
            }
          }}
          data-cursor="hover"
          aria-label="Previous"
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:left-8"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (hasMulti) {
              setImageIndex((i) => (i + 1) % gallery.length);
            } else {
              onNavigate((index + 1) % projects.length);
            }
          }}
          data-cursor="hover"
          aria-label="Next"
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-8"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <motion.div
          key={`${project.id}-${imageIndex}`}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-[min(92vw,960px)] flex-col items-center gap-5 px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-3xl bg-neutral-900",
              project.aspect === "portrait"
                ? "aspect-[3/4] max-h-[72vh] max-w-md"
                : project.aspect === "square"
                  ? "aspect-square max-h-[72vh] max-w-xl"
                  : "aspect-[4/3] max-h-[72vh]"
            )}
          >
            {activeSrc ? (
              <SafeImage
                src={activeSrc}
                alt={project.title}
                className="h-full w-full object-contain"
                fallbackClassName={cn("h-full w-full bg-gradient-to-br", project.gradient)}
              />
            ) : (
              <div className={cn("h-full w-full bg-gradient-to-br", project.gradient)} />
            )}
          </div>

          {hasMulti && (
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 transition-colors",
                    i === imageIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <SafeImage src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="flex w-full max-w-2xl items-center justify-between text-white">
            <div>
              <p className="font-display text-fluid-lg font-medium">{project.title}</p>
              <p className="text-fluid-xs text-white/60">
                {project.client} &middot; {project.category} &middot; {project.year}
              </p>
            </div>
            <p className="text-fluid-xs text-white/50">
              {hasMulti
                ? `${imageIndex + 1} / ${gallery.length}`
                : `${index + 1} / ${projects.length}`}
            </p>
          </div>

          {hasMulti && projects.length > 1 && (
            <button
              type="button"
              onClick={() => onNavigate((index + 1) % projects.length)}
              className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/50 transition-colors hover:text-white"
            >
              Next project →
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
