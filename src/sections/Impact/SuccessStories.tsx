import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/layout/Animations/Reveal";
import AnimatedCounter from "@/components/layout/Animations/AnimatedCounter";
import { CASE_STUDIES } from "@/constants/caseStudies";

const STORIES = CASE_STUDIES.slice(0, 3).map((cs) => ({
  slug: cs.slug,
  client: cs.client,
  headline: cs.results[0],
  title: cs.title,
  gradient: cs.gradient,
}));

export default function SuccessStories() {
  return (
    <section className="py-28 sm:py-36">
      <Container>
        <SectionHeader
          eyebrow="Success Stories"
          title="Numbers that made boardrooms smile."
          link={{ label: "View all case studies", href: "/case-studies" }}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STORIES.map((story, i) => {
            const numericValue = parseFloat(story.headline.value.replace(/[^0-9.]/g, ""));
            const suffix = story.headline.value.replace(/[0-9.]/g, "");
            return (
              <Reveal key={story.slug} delay={i * 0.08}>
                <Link
                  to={`/case-studies/${story.slug}`}
                  data-cursor="view"
                  className="group flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-8 transition-colors duration-500 hover:border-primary/40"
                >
                  <div>
                    <p className="text-fluid-xs font-semibold uppercase tracking-widest text-muted">
                      {story.client}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <AnimatedCounter
                        value={isNaN(numericValue) ? 0 : numericValue}
                        suffix={suffix}
                        className="font-display text-fluid-3xl font-medium text-text"
                      />
                    </div>
                    <p className="mt-1 text-fluid-xs text-muted">{story.headline.label}</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <p className="text-fluid-sm text-text">{story.title}</p>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
