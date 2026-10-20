import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Quote, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import SafeImage from "@/components/ui/SafeImage";
import {
  getTestimonialGroups,
  type Testimonial,
} from "@/constants/testimonials";
import { cn } from "@/utils/cn";

const GROUPS = getTestimonialGroups();
const ROTATE_MS = 6000;

const SLIDE_TRANSITION = {
  type: "tween" as const,
  duration: 0.95,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

const CARD_STAGGER = 0.08;

function TestimonialCard({
  testimonial,
  featured,
  index,
  isActive,
}: {
  testimonial: Testimonial;
  featured: boolean;
  index: number;
  isActive: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={
        isActive
          ? { opacity: 1, y: 0 }
          : reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 0.85, y: 0 }
      }
      transition={{
        duration: 0.7,
        delay: reduceMotion ? 0 : index * CARD_STAGGER,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors duration-500 hover:border-primary/40 sm:rounded-3xl sm:p-6 lg:p-7",
        featured && "sm:min-h-[260px] lg:min-h-0 lg:p-10"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Quote className="h-6 w-6 shrink-0 text-primary/30 sm:h-8 sm:w-8" />
        {typeof testimonial.rating === "number" && (
          <div className="flex gap-0.5 text-primary" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
            ))}
          </div>
        )}
      </div>

      {testimonial.video && (
        <button
          type="button"
          data-cursor="hover"
          aria-label={`Play video testimonial from ${testimonial.author}`}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 hover:scale-110 sm:right-6 sm:top-6 sm:h-10 sm:w-10"
        >
          <Play className="h-3.5 w-3.5" fill="currentColor" />
        </button>
      )}

      <p
        className={cn(
          "mt-4 line-clamp-6 text-fluid-sm leading-relaxed text-text sm:mt-6 sm:line-clamp-5 sm:text-fluid-base",
          featured && "sm:line-clamp-8 sm:text-fluid-base lg:line-clamp-none lg:text-fluid-lg lg:leading-snug"
        )}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-6 flex items-center gap-3 sm:mt-8">
        {testimonial.image ? (
          <SafeImage
            src={testimonial.image}
            alt={testimonial.author}
            className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
            fallbackClassName={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display text-fluid-xs font-semibold text-white sm:h-10 sm:w-10",
              testimonial.gradient
            )}
          />
        ) : (
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br sm:h-10 sm:w-10 ${testimonial.gradient} font-display text-fluid-xs font-semibold text-white`}
          >
            {testimonial.author.charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-fluid-sm font-medium text-text">{testimonial.author}</p>
          <p className="truncate text-fluid-xs text-muted">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const advance = useCallback(() => {
    setActiveGroup((prev) => (prev + 1) % GROUPS.length);
  }, []);

  useEffect(() => {
    if (reduceMotion || GROUPS.length <= 1 || paused) return;

    const timer = window.setInterval(advance, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [advance, paused, reduceMotion]);

  return (
    <section className="bg-surface py-20 sm:py-28 lg:py-36">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Don't take our word for it."
          className="mb-10 sm:mb-14 lg:mb-16"
        />

        <div
          className="relative overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <motion.div
            ref={trackRef}
            className="flex will-change-transform"
            animate={{ x: `-${activeGroup * 100}%` }}
            transition={reduceMotion ? { duration: 0 } : SLIDE_TRANSITION}
          >
            {GROUPS.map((group, groupIndex) => (
              <div
                key={group.map((t) => t.id).join("-")}
                className="w-full shrink-0 px-0.5"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5 lg:auto-rows-fr">
                  {group.map((testimonial, i) => (
                    <div
                      key={testimonial.id}
                      className={cn(
                        "min-h-0",
                        i === 0 && "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                      )}
                    >
                      <TestimonialCard
                        testimonial={testimonial}
                        featured={i === 0}
                        index={i}
                        isActive={groupIndex === activeGroup}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
