import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import Reveal from "@/components/layout/Animations/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  breadcrumb?: { label: string; href?: string }[];
  /** Optional right-side visual (e.g. industry/service icon) */
  aside?: ReactNode;
}

export default function PageHero({ eyebrow, title, description, breadcrumb, aside }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 sm:pb-24 sm:pt-48">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-radial from-primary/[0.1] via-transparent to-transparent" />
      <Container>
        {breadcrumb && (
          <Reveal className="mb-8 flex items-center gap-2 text-fluid-xs text-muted">
            <Link to="/" data-cursor="hover" className="hover:text-text">
              Home
            </Link>
            {breadcrumb.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3" />
                {crumb.href ? (
                  <Link to={crumb.href} data-cursor="hover" className="hover:text-text">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-text">{crumb.label}</span>
                )}
              </span>
            ))}
          </Reveal>
        )}

        <div
          className={
            aside
              ? "grid items-center gap-6 sm:grid-cols-[minmax(0,1.15fr)_auto] sm:gap-8 lg:gap-10"
              : undefined
          }
        >
          <div className="min-w-0">
            <Reveal y={16}>
              <span className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {eyebrow}
              </span>
            </Reveal>

            <SplitHeading
              as="h1"
              splitBy="words"
              delay={0.1}
              className="mt-6 max-w-2xl text-fluid-4xl font-medium leading-[0.98] tracking-tightest text-text"
            >
              {title}
            </SplitHeading>

            {description && (
              <Reveal delay={0.3} y={16}>
                <p className="mt-8 max-w-lg text-fluid-base text-muted">{description}</p>
              </Reveal>
            )}
          </div>

          {aside && (
            <Reveal
              delay={0.2}
              className="justify-self-start sm:justify-self-end sm:-translate-x-14 lg:-translate-x-28 xl:-translate-x-40"
            >
              {aside}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
