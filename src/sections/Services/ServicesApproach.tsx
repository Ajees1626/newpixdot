 import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/layout/Animations/Reveal";

const STEPS = [
  {
    step: "01",
    title: "Understand & Strategize",
    text: "We understand your business, audience, and goals to create a clear strategy tailored to your brand.",
  },
  {
    step: "02",
    title: "Create & Develop",
    text: "From creative branding and engaging designs to website development and digital marketing, we turn ideas into effective solutions.",
  },
  {
    step: "03",
    title: "Launch & Grow",
    text: "We bring your ideas to life, refine the experience, and help your business build a stronger digital presence.",
  },
];

export default function ServicesApproach() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="From Your Vision to Real-World Impact."
          description="Our collaborative process combines creative thinking, strategic planning, and technology to deliver solutions that support your business goals."
          className="mb-12 sm:mb-14"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {STEPS.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:p-8">
                <span className="font-display text-fluid-2xl font-medium text-primary/40">
                  {item.step}
                </span>

                <h3 className="mt-4 font-display text-fluid-lg font-medium text-text">
                  {item.title}
                </h3>

                <p className="mt-2 text-fluid-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
 