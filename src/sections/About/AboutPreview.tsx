import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/layout/Animations/Reveal";
import AnimatedCounter from "@/components/layout/Animations/AnimatedCounter";
import { Button } from "@/components/layout/Buttons/Button";
import { ABOUT_PREVIEW } from "@/constants/site";

const POINTS = [
  { year: "2023", text: "Pixdot was founded as a creative branding studio." },
  { year: "2024", text: "Expanded into Web, App & Digital Marketing solutions." },
  { year: "2025", text: "Built high-impact brands and launched premium digital experiences." },
  { year: "2026", text: "Scaling with smarter automation, stronger teams & bigger ambitions." },
];

export default function AboutPreview() {
  return (
    <section className="py-28 sm:py-36">
      <Container className="grid gap-12 sm:gap-16 lg:grid-cols-2 lg:items-center">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-border bg-surface shadow-soft">
              <img
                src={ABOUT_PREVIEW.image}
                alt={ABOUT_PREVIEW.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/5" />
              
            </div>
          </Reveal>
          <Reveal delay={0.15} className="absolute -right-4 -top-4 hidden sm:block lg:-right-8">
            <div className="glass flex flex-col items-center rounded-2xl px-6 py-5 shadow-soft">
              <AnimatedCounter
                value={4}
                suffix="+"
                className="font-display text-fluid-xl font-medium text-text"
              />
              <span className="text-fluid-xs text-muted">Years of craft</span>
            </div>
          </Reveal>
        </div>

        <div>
          <SectionHeading
            eyebrow="About Pixdot"
            title="A Decade of Bold Branding."
            description="At Pixdot, we deliver creative and strategic branding, digital, and business development solutions that drive real results.With over 1,000 projects and 500+ satisfied clients, we build brands that inspire trust and create lasting impact"
          />

          <div className="mt-10 space-y-6 border-l border-border pl-6">
            {POINTS.map((point, i) => (
              <Reveal key={point.year} delay={0.1 * i} className="relative">
                <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-fluid-xs font-semibold text-primary">{point.year}</span>
                <p className="mt-1 text-fluid-sm text-muted">{point.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <Button to="/about" variant="outline" size="md" className="mt-10">
              Our Story
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
