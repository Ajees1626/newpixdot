import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import PreviewFade from "@/components/ui/PreviewFade";
import Reveal from "@/components/layout/Animations/Reveal";
import { DynamicIcon } from "@/utils/icons";
import { SERVICES } from "@/constants/services";
import { HOME_PREVIEW } from "@/constants/preview";
import { cn } from "@/utils/cn";

const PREVIEW = SERVICES.slice(0, HOME_PREVIEW.services);

export default function ServicesReveal() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-28 sm:py-36">
      <Container>
        <SectionHeader
          eyebrow="What we do"
          title="Solutions That Drive Results."
          description="We provide comprehensive solutions to help your business thrive in the modern world."
          link={{ label: "View all services", href: "/services" }}
        />

        <PreviewFade>
          <div className="border-t border-border">
            {PREVIEW.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.03} as="div">
                <Link
                  to={`/services/${service.slug}`}
                  data-cursor="view"
                  onMouseEnter={() => setActive(service.slug)}
                  onMouseLeave={() => setActive(null)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border py-6 transition-colors duration-300 sm:grid-cols-[60px_1fr_auto_auto] sm:gap-8"
                >
                  <span className="font-display text-fluid-sm text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={cn(
                      "font-display text-fluid-xl font-medium tracking-tightest text-text transition-all duration-500 ease-premium",
                      active === service.slug && "translate-x-2 text-primary"
                    )}
                  >
                    {service.title}
                  </span>

                  <span className="hidden max-w-xs text-fluid-sm text-muted transition-opacity duration-300 sm:block">
                    {active === service.slug ? service.short : ""}
                  </span>

                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-text transition-all duration-500 ease-premium",
                      active === service.slug && "rotate-45 border-primary bg-primary text-white"
                    )}
                  >
                    {active === service.slug ? (
                      <ArrowUpRight className="h-4 w-4 -rotate-45" />
                    ) : (
                      <DynamicIcon name={service.icon} className="h-4 w-4" />
                    )}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </PreviewFade>
      </Container>
    </section>
  );
}
