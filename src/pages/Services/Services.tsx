import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import CTASection from "@/sections/CTA/CTASection";
import ServicesHighlights from "@/sections/Services/ServicesHighlights";
import ServicesApproach from "@/sections/Services/ServicesApproach";
import ServicesPageGrid from "@/sections/Services/ServicesPageGrid";
import { SERVICES } from "@/constants/services";
import { useSeo } from "@/hooks/useSeo";

export default function Services() {
  const [query, setQuery] = useState("");

  useSeo({
    title: "Our Services",
    description:
      "Discover Pixdot Solutions' creative, branding, web development, app development, and digital marketing services designed to help businesses grow.",
    path: "/services",
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return SERVICES;

    return SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.short.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Bold Ideas. Powerful Digital Experiences."
        description="From building distinctive brands to developing digital products and delivering strategic marketing, Pixdot brings creativity and technology together to help your business move forward."
      />

      <ServicesHighlights />

      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal className="mb-10 flex justify-center sm:mb-12 sm:justify-start">
            <div className="flex w-full max-w-sm items-center gap-3 rounded-full border border-border bg-card px-5 py-3 transition-colors focus-within:border-primary">
              <Search className="h-4 w-4 shrink-0 text-muted" />

              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Explore our services..."
                aria-label="Search services"
                className="w-full bg-transparent text-fluid-sm text-text outline-none placeholder:text-muted"
              />
            </div>
          </Reveal>

          <ServicesPageGrid services={filtered} />

          {filtered.length === 0 && (
            <p className="py-20 text-center text-fluid-sm text-muted">
              No services found. Try another search.
            </p>
          )}
        </Container>
      </section>

      <ServicesApproach />
      <CTASection />
    </>
  );
}