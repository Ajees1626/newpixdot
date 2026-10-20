import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/layout/Animations/Reveal";
import Marquee from "@/components/layout/Animations/Marquee";
import CTASection from "@/sections/CTA/CTASection";
import { DynamicIcon } from "@/utils/icons";
import { SOLUTIONS } from "@/constants/solutions";
import { INDUSTRIES } from "@/constants/industries";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/utils/cn";

const CATEGORIES = [
  "All",
  "Strategy",
  "Communication",
  "Design",
  "Research",
  "Marketing",
  "Branding",
  "Consulting",
  "Automation",
  "Development",
] as const;

const SIZE_CLASSES: Record<string, string> = {
  lg: "sm:col-span-2 sm:row-span-2",
  md: "sm:col-span-1 sm:row-span-2",
  sm: "sm:col-span-1 sm:row-span-1",
};

const TECH_STACK = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "CorelDRAW",
  "Figma",
  "Coolors",
  "Adobe Dimension",
  "Mockup Studio",
  "Placeit",
  "Canva",
  "React.js",
  "Next.js",
  "Vue.js",
  "WordPress",
  "Webflow",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "AWS",
  "Vercel",
  "Netlify",
  "Tailwind CSS",
  "Bootstrap",
  "Google Analytics",
  "SEO Tools",
  "Flutter",
  "React Native",
  "Swift",
  "Kotlin",
  "Firebase",
  "AWS Amplify",
  "Python",
  "Postman",
  "App Store",
  "Play Console",
  "Lightroom",
  "Premiere Pro",
  "After Effects",
  "Notion",
  "ClickUp",
  "ChatGPT",
  "Copy.ai",
  "Meta Business Suite",
  "LinkedIn Analytics",
  "Squarespace",
] as const;

const TECH_ROW_SIZE = Math.ceil(TECH_STACK.length / 3);
const TECH_ROWS = [
  TECH_STACK.slice(0, TECH_ROW_SIZE),
  TECH_STACK.slice(TECH_ROW_SIZE, TECH_ROW_SIZE * 2),
  TECH_STACK.slice(TECH_ROW_SIZE * 2),
] as const;

export default function Solutions() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () =>
      selectedCategory === "All"
        ? SOLUTIONS
        : SOLUTIONS.filter((s) => s.category === selectedCategory),
    [selectedCategory]
  );

  useSeo({
    title: "Solutions",
    description:
      "Comprehensive digital solutions — branding, marketing, development, and strategy designed to solve complex business challenges.",
    path: "/solutions",
  });

  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Digital Solutions"
        description="Comprehensive technology solutions designed to solve complex business challenges and drive sustainable growth."
      />

      <section className="pb-20 sm:pb-28 lg:pb-36">
        <Container>
          <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                data-cursor="hover"
                className={cn(
                  "rounded-full border px-4 py-2 text-fluid-xs font-medium transition-colors duration-300",
                  selectedCategory === cat
                    ? "border-text bg-text text-background"
                    : "border-border bg-card text-muted hover:text-text"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:auto-rows-[180px]">
            {filtered.map((solution, i) => (
              <Reveal key={solution.slug} delay={i * 0.04} className={cn(SIZE_CLASSES[solution.size])}>
                <Link
                  to={`/solutions/${solution.slug}`}
                  data-cursor="view"
                  className={cn(
                    "group relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-all duration-500",
                    solution.size === "lg"
                      ? "border-transparent bg-text text-background hover:opacity-95"
                      : "border-border bg-card text-text hover:border-primary/40 dark:border-white/12 dark:hover:border-white/25"
                  )}
                >
                  {solution.size !== "lg" && (
                    <div className="absolute inset-0 -z-10 bg-surface opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-white/5" />
                  )}

                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110",
                        solution.size === "lg"
                          ? "bg-background/15 text-background"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      <DynamicIcon name={solution.icon} className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100",
                        solution.size === "lg" ? "text-background" : "text-primary"
                      )}
                    />
                  </div>

                  <div>
                    <h3 className="font-display text-fluid-lg font-medium tracking-tightest">
                      {solution.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-fluid-sm",
                        solution.size === "lg" ? "text-background/75" : "text-muted"
                      )}
                    >
                      {solution.short}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-16 text-center text-fluid-sm text-muted">
              No solutions in this category yet.
            </p>
          )}
        </Container>
      </section>

      <section className="overflow-hidden border-t border-border bg-surface py-20 sm:py-28">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Industries"
              title="Industries We Serve"
              description="Solutions tailored to unique challenges across sectors."
              className="max-w-xl"
            />
            <Link
              to="/industries"
              data-cursor="hover"
              className="inline-flex items-center gap-1 text-fluid-xs font-medium text-primary transition-opacity hover:opacity-80"
            >
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>

        <Marquee speed="slow" trackClassName="gap-4 pr-4 sm:gap-5 sm:pr-5 lg:gap-5 lg:pr-5">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              to={`/industries/${industry.slug}`}
              data-cursor="hover"
              className="group flex w-56 shrink-0 flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 sm:w-60"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <DynamicIcon name={industry.icon} className="h-4 w-4" strokeWidth={1.5} />
              </span>
              <h3 className="mt-4 truncate text-fluid-sm font-medium text-text">{industry.title}</h3>
              <p className="mt-1 line-clamp-2 text-fluid-xs text-muted">{industry.short}</p>
            </Link>
          ))}
        </Marquee>
      </section>

      <section className="overflow-hidden border-t border-border py-20 sm:py-28">
        <Container>
          <div className="mb-10 text-center sm:mb-14">
            <h2 className="font-display text-fluid-2xl font-medium tracking-tightest text-text sm:text-fluid-3xl">
              Technology Stack
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-fluid-sm text-muted sm:text-fluid-base">
              We use cutting-edge technologies and proven frameworks to build robust, scalable solutions.
            </p>
          </div>
        </Container>

        <div className="flex flex-col gap-3 sm:gap-4">
          {TECH_ROWS.map((row, rowIndex) => (
            <Marquee
              key={rowIndex}
              speed="slow"
              reverse={rowIndex % 2 === 1}
              trackClassName="gap-3 pr-3 sm:gap-4 sm:pr-4 lg:gap-4 lg:pr-4"
            >
              {row.map((tech) => (
                <div
                  key={tech}
                  className="shrink-0 rounded-full border border-border bg-card px-5 py-2.5 transition-colors duration-200 hover:border-primary/25 sm:px-6 sm:py-3"
                >
                  <span className="whitespace-nowrap text-fluid-xs font-medium text-text sm:text-fluid-sm">
                    {tech}
                  </span>
                </div>
              ))}
            </Marquee>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
