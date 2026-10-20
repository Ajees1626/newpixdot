import { Award, Users, Clock, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/layout/Animations/Reveal";

const REASONS = [
  {
    icon: Award,
    title: "Creative Excellence",
    text: "We create distinctive brand identities and engaging digital experiences that help businesses stand out."
  },
  {
    icon: Users,
    title: "Collaborative Partnership",
    text: "We work closely with every client to understand their goals and deliver solutions tailored to their needs."
  },
  {
    icon: Clock,
    title: "Reliable Execution",
    text: "From planning to delivery, we focus on clear communication, organized workflows, and consistent progress."
  },
  {
    icon: ShieldCheck,
    title: "Business-Focused Solutions",
    text: "We combine creative thinking, modern technology, and strategic execution to support long-term business growth."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-28 sm:py-36">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Why Choose Pixdot"
            title="Creative thinking. Powerful execution. Lasting impact."
            description="At Pixdot Solutions, we bring branding, creative design, web and app development, and digital marketing together to help businesses build stronger identities and meaningful digital experiences."
          />

          <div className="mt-10 aspect-video overflow-hidden rounded-3xl bg-gradient-brand">
            <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25),transparent_50%)]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <reason.icon className="h-6 w-6 text-primary" />

                <h3 className="mt-5 text-fluid-base font-medium text-text">
                  {reason.title}
                </h3>

                <p className="mt-2 text-fluid-xs text-muted">
                  {reason.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}