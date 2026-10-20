 
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import PreviewFade from "@/components/ui/PreviewFade";
import Reveal from "@/components/layout/Animations/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import { DynamicIcon } from "@/utils/icons";
import { INDUSTRIES } from "@/constants/industries";
import { twGradientToCss } from "@/constants/_helpers";
import { HOME_PREVIEW } from "@/constants/preview";

const PREVIEW = INDUSTRIES.slice(0, HOME_PREVIEW.industries);

export default function IndustriesGrid() {
  return (
    <section className="bg-surface py-28 sm:py-36">
      <Container>
        <SectionHeader
          eyebrow="Industries We Serve"
          title="Creative Solutions for Every Ambitious Business."
          description="From retail and education to construction and professional services, Pixdot Solutions helps businesses strengthen their brands, build digital experiences, and connect with their audiences."
          link={{ label: "Explore All Industries", href: "/industries" }}
        />

        <PreviewFade fadeFrom="surface">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PREVIEW.map((industry, i) => {
              const hoverBg = twGradientToCss(industry.color);

              return (
                <Reveal key={industry.slug} delay={i * 0.05}>
                  <TiltCard maxTilt={6}>
                    <Link
                      to={`/industries/${industry.slug}`}
                      data-cursor="view"
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-transparent hover:shadow-soft"
                    >
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ backgroundImage: hoverBg }}
                      />

                      <div className="relative z-10 flex items-start justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white">
                          <DynamicIcon
                            name={industry.icon}
                            className="h-5 w-5"
                          />
                        </span>

                        <ArrowUpRight className="h-5 w-5 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white group-hover:opacity-100" />
                      </div>

                      <div className="relative z-10 mt-10">
                        <h3 className="font-display text-fluid-lg font-medium tracking-tightest text-text transition-colors duration-500 group-hover:text-white">
                          {industry.title}
                        </h3>

                        <p className="mt-2 text-fluid-sm text-muted transition-colors duration-500 group-hover:text-white/85">
                          {industry.short}
                        </p>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </PreviewFade>
      </Container>
    </section>
  );
}
 