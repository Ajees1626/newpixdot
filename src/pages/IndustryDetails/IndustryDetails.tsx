import { Link, Navigate, useParams } from "react-router-dom";
import { CheckCircle2, Sparkles, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/layout/Animations/Reveal";
import AnimatedCounter from "@/components/layout/Animations/AnimatedCounter";
import CTASection from "@/sections/CTA/CTASection";
import { getIndustryBySlug } from "@/constants/industries";
import { CASE_STUDIES } from "@/constants/caseStudies";
import { DynamicIcon } from "@/utils/icons";
import { useSeo } from "@/hooks/useSeo";

export default function IndustryDetails() {
  const { slug } = useParams();
  const industry = slug ? getIndustryBySlug(slug) : undefined;

  useSeo({
    title: industry ? industry.title : "Industry",
    description: industry?.short || "Pixdot industry expertise",
    path: slug ? `/industries/${slug}` : "/industries",
  });

  if (!industry) return <Navigate to="/industries" replace />;

  const relatedCaseStudy = CASE_STUDIES.find((c) => c.industry === industry.title);

  return (
    <>
      <PageHero
        eyebrow="Industry"
        title={industry.title}
        description={industry.short}
        breadcrumb={[{ label: "Industries", href: "/industries" }, { label: industry.title }]}
        aside={
          <div className="relative flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/12 to-transparent"
            />
            <div className="relative flex h-[70%] w-[70%] items-center justify-center rounded-full border border-border bg-background text-primary">
              <DynamicIcon
                name={industry.icon}
                className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 xl:h-36 xl:w-36"
              />
            </div>
          </div>
        }
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-8">
                <Sparkles className="h-6 w-6 text-primary" />
                <h3 className="mt-5 text-fluid-lg font-medium text-text">Key Features</h3>
                <ul className="mt-4 space-y-3">
                  {industry.features.map((feature) => (
                    <li
                      key={feature}
                      className="border-b border-border pb-3 text-fluid-sm text-muted last:border-0"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-border bg-card p-8">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                <h3 className="mt-5 text-fluid-lg font-medium text-text">Our Solutions</h3>
                <ul className="mt-4 space-y-3">
                  {industry.solutions.map((s) => (
                    <li
                      key={s}
                      className="border-b border-border pb-3 text-fluid-sm text-muted last:border-0"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="Benefits" title="What clients gain." className="mb-12" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {industry.benefits.map((b, i) => (
              <Reveal key={b} delay={i * 0.08}>
                <div className="rounded-3xl border border-border bg-card p-7">
                  <span className="font-display text-fluid-lg text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-fluid-sm text-text">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-10 border-t border-border pt-10">
            {industry.stats.map((stat, i) => {
              const numeric = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
              const suffix = stat.value.replace(/[0-9.]/g, "");
              return (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <AnimatedCounter
                    value={isNaN(numeric) ? 0 : numeric}
                    suffix={suffix}
                    className="font-display text-fluid-2xl font-medium text-text"
                  />
                  <p className="mt-1 text-fluid-xs text-muted">{stat.label}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {relatedCaseStudy && (
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow="Case Study" title="Proof in this industry." className="mb-10" />
            <Link
              to={`/case-studies/${relatedCaseStudy.slug}`}
              data-cursor="view"
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br p-10 text-white sm:aspect-[21/9] ${relatedCaseStudy.gradient}`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-fluid-xs backdrop-blur-md">
                  {relatedCaseStudy.category}
                </span>
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div>
                <p className="font-display text-fluid-2xl font-medium">{relatedCaseStudy.client}</p>
                <p className="mt-2 max-w-lg text-fluid-sm text-white/80">{relatedCaseStudy.title}</p>
              </div>
            </Link>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
