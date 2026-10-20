import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import CTASection from "@/sections/CTA/CTASection";
import { DynamicIcon } from "@/utils/icons";
import { INDUSTRIES } from "@/constants/industries";
import { twGradientToCss } from "@/constants/_helpers";
import { useSeo } from "@/hooks/useSeo";

export default function Industries() {
  useSeo({
    title: "Industries We Serve",
    description:
      "Explore how Pixdot Solutions helps businesses across retail, education, construction, healthcare, hospitality, and other industries with branding, web development, and digital marketing.",
    path: "/industries",
  });

  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="Creative Solutions for Every Industry."
        description="Every business has a unique story and different goals. We bring branding, creative design, web and app development, and digital marketing together to help businesses build stronger identities and meaningful digital experiences."
      />

      <section className="pb-20 sm:pb-28 lg:pb-36">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {INDUSTRIES.map((industry, i) => {
              const hoverBg = twGradientToCss(industry.color);

              return (
                <Reveal key={industry.slug} delay={i * 0.04}>
                  <Link
                    to={`/industries/${industry.slug}`}
                    data-cursor="hover"
                    className="group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-transparent hover:shadow-soft sm:min-h-[220px] sm:p-7"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ backgroundImage: hoverBg }}
                    />

                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white">
                        <DynamicIcon
                          name={industry.icon}
                          className="h-5 w-5"
                        />
                      </span>

                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white group-hover:opacity-100" />
                    </div>

                    <div className="relative z-10 mt-8">
                      <h3 className="truncate font-display text-fluid-lg font-medium tracking-tightest text-text transition-colors duration-500 group-hover:text-white">
                        {industry.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-fluid-xs leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/85 sm:text-fluid-sm">
                        {industry.short}
                      </p>

                      {industry.stats.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {industry.stats.slice(0, 2).map((stat) => (
                            <span
                              key={stat.label}
                              className="rounded-full border border-border bg-surface/80 px-2.5 py-1 text-[10px] font-medium text-muted transition-colors duration-500 group-hover:border-white/25 group-hover:bg-white/15 group-hover:text-white"
                            >
                              {stat.value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
 