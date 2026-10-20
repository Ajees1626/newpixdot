import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryLightboxProps {
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  index,
  title,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const src = images[index];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onNavigate]);

  if (!src) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed inset-0 z-[220] flex items-center justify-center bg-black/92 backdrop-blur-xl"
      >
        <button
          onClick={onClose}
          data-cursor="close"
          aria-label="Close gallery"
          className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-8 sm:top-8"
        >
          <X className="h-5 w-5" />
        </button>

        <button
          onClick={() => onNavigate((index - 1 + images.length) % images.length)}
          data-cursor="hover"
          aria-label="Previous image"
          className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:left-8"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => onNavigate((index + 1) % images.length)}
          data-cursor="hover"
          aria-label="Next image"
          className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 sm:right-8"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 0.92, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-[min(92vw,1100px)] flex-col items-center gap-5 px-4"
        >
          <img
            src={src}
            alt={`${title} ${index + 1}`}
            className="max-h-[72vh] w-full rounded-[2rem] object-contain"
          />
          <div className="flex w-full items-center justify-between text-white">
            <p className="text-fluid-sm text-white/70">{title}</p>
            <p className="font-display text-fluid-xs tracking-[0.2em] text-white/50">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
