import { Link, Navigate, useParams } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/layout/Animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqItem from "@/components/ui/FaqItem";
import CTASection from "@/sections/CTA/CTASection";
import { DynamicIcon } from "@/utils/icons";
import { getServiceBySlug, SERVICES } from "@/constants/services";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/utils/cn";

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useSeo({
    title: service ? service.title : "Service",
    description: service?.description || "Pixdot creative service",
    path: slug ? `/services/${slug}` : "/services",
  });

  if (!service) return <Navigate to="/services" replace />;

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.description}
        breadcrumb={[{ label: "Services", href: "/services" }, { label: service.title }]}
      />

      <section className="pb-28 sm:pb-36">
        <Container className="grid gap-16 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeading eyebrow="Our Process" title="How we get there." className="mb-12" />
            <div className="space-y-8">
              {service.process.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.06} className="flex gap-6">
                  <span className="font-display text-fluid-2xl font-medium text-primary/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-fluid-lg font-medium text-text">{step.title}</h3>
                    <p className="mt-2 max-w-md text-fluid-sm text-muted">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-20">
              <SectionHeading eyebrow="Gallery" title="Selected craft." className="mb-8" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Reveal key={i} delay={i * 0.04}>
                    <div
                      className={cn(
                        "aspect-square rounded-2xl bg-gradient-to-br",
                        service.color
                      )}
                      style={{ opacity: 0.5 + (i % 3) * 0.15 }}
                    />
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <SectionHeading eyebrow="FAQ" title="Common questions." className="mb-4" />
              <div>
                {service.faqs.map((faq) => (
                  <FaqItem key={faq.question} {...faq} />
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="rounded-3xl border border-border bg-card p-7">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white`}
                >
                  <DynamicIcon name={service.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-fluid-base font-medium text-text">Key Benefits</h3>
                <ul className="mt-4 space-y-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-fluid-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="text-fluid-base font-medium text-text">Technologies &amp; Tools</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1.5 text-fluid-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </Container>
      </section>

      <section className="border-t border-border py-20">
        <Container>
          <SectionHeading eyebrow="Related Services" title="Explore more of what we do." className="mb-10" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link
                  to={`/services/${s.slug}`}
                  data-cursor="view"
                  className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-colors duration-500 hover:border-primary/40"
                >
                  <span className="text-fluid-base font-medium text-text">{s.title}</span>
                  <ArrowUpRight className="h-5 w-5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
