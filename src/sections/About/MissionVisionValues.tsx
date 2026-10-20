import { Target, Eye, Gem } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import { VALUES } from "@/constants/team";

const PILLARS = [
  {
    icon: Target,
    title: "Mission",
    text: "To empower ambitious businesses with impactful branding, creative design, and digital solutions that drive meaningful growth.",
  },
  {
    icon: Eye,
    title: "Vision",
    text: "To become a trusted creative partner for businesses building stronger brands and shaping the future through digital innovation.",
  },
  {
    icon: Gem,
    title: "Values",
    text: "Creativity, commitment, collaboration, and results the principles that guide every idea, design, and solution we deliver.",
  },
];

export default function MissionVisionValues() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8">
                <pillar.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-6 font-display text-fluid-lg font-medium tracking-tightest text-text">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-fluid-sm text-muted">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, i) => (
            <Reveal key={value.title} delay={0.1 + i * 0.06}>
              <div className="rounded-3xl border border-border p-7">
                <span className="font-display text-fluid-xl text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-4 text-fluid-base font-medium text-text">{value.title}</h4>
                <p className="mt-2 text-fluid-xs text-muted">{value.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
