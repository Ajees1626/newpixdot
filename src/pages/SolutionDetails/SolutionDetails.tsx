import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/ui/GalleryGrid";
import Reveal from "@/components/layout/Animations/Reveal";
import CTASection from "@/sections/CTA/CTASection";
import { DynamicIcon } from "@/utils/icons";
import { getSolutionBySlug, getSolutionGalleryImages } from "@/constants/solutions";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/utils/cn";

const TABS = [
  { id: "gallery", label: "Gallery" },
  { id: "benefits", label: "Benefits" },
  { id: "included", label: "Included" },
] as const;

export default function SolutionDetails() {
  const { slug } = useParams();
  const solution = slug ? getSolutionBySlug(slug) : undefined;
  const galleryImages = slug ? getSolutionGalleryImages(slug) : [];
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>("gallery");

  useSeo({
    title: solution ? solution.title : "Solution",
    description: solution?.description || "Pixdot packaged solution",
    path: slug ? `/solutions/${slug}` : "/solutions",
  });

  const gradient = useMemo(() => solution?.color || "from-violet-500 to-fuchsia-500", [solution]);

  if (!solution) return <Navigate to="/solutions" replace />;

  return (
    <>
      <PageHero
        eyebrow="Solution"
        title={solution.title}
        description={solution.description}
        breadcrumb={[{ label: "Solutions", href: "/solutions" }, { label: solution.title }]}
        aside={
          <div className="relative flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64 lg:h-72 lg:w-72">
            <div aria-hidden className="absolute inset-[12%] rounded-full border border-border/50" />
            <div className="relative flex h-[62%] w-[62%] items-center justify-center rounded-full border border-border/70 bg-background text-primary">
              <DynamicIcon
                name={solution.icon}
                className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              />
            </div>
          </div>
        }
      />

      <section className="border-b border-border bg-surface py-3">
        <Container className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-fluid-xs font-medium transition-colors duration-300",
                activeTab === tab.id
                  ? "border-text bg-text text-background"
                  : "border-border bg-card text-muted hover:text-text"
              )}
            >
              {tab.label}
            </button>
          ))}
        </Container>
      </section>

      <section className="pb-20 sm:pb-28 lg:pb-36">
        <Container className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-14">
          <div className="min-w-0">
            <div id="gallery" className="scroll-mt-32">
              <Reveal>
                <SectionHeading eyebrow="Gallery" title="Work from this solution." className="mb-8" />
                <GalleryGrid images={galleryImages} altPrefix={solution.title} bwHoverIndex={2} limit={4} />
              </Reveal>
            </div>

            {solution.benefits && solution.benefits.length > 0 && (
              <div id="benefits" className="scroll-mt-32 mt-14 lg:mt-16">
                <Reveal delay={0.05}>
                  <SectionHeading eyebrow="Benefits" title="What you gain." className="mb-6" />
                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {solution.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors duration-500 hover:border-primary/30 sm:p-5"
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                            gradient
                          )}
                        >
                          <Check className="h-4 w-4" />
                        </span>
                        <span className="text-fluid-sm leading-relaxed text-muted">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            )}
          </div>

          <Reveal delay={0.1}>
            <div
              id="included"
              className="scroll-mt-32 rounded-3xl border border-border bg-card p-6 sm:p-8 lg:sticky lg:top-32 lg:self-start"
            >
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-card",
                  gradient
                )}
              >
                <DynamicIcon name={solution.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 font-display text-fluid-lg font-medium text-text">What&apos;s included</h3>
              <p className="mt-2 text-fluid-sm text-muted">
                Everything bundled in this solution — ready to scope and ship.
              </p>
              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {solution.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-fluid-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
