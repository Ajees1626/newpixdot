import { Layers, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/layout/Animations/Reveal";
import { cn } from "@/utils/cn";

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "Creative Branding",
    text: "We build distinctive brand identities and creative visuals that help businesses stand out.",
    stat: "Brand First",
    color: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    icon: Layers,
    title: "Complete Digital Solutions",
    text: "From branding and design to web development, app development, and digital marketing, we bring your ideas together.",
    stat: "End to End",
    color: "from-cyan-500 via-sky-500 to-blue-600",
  },
  {
    icon: Rocket,
    title: "Ideas Into Action",
    text: "We combine creative thinking and modern technology to turn business goals into engaging digital experiences.",
    stat: "Built to Grow",
    color: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    icon: ShieldCheck,
    title: "Client-Focused Approach",
    text: "We value clear communication, collaborative planning, and tailored solutions at every stage of a project.",
    stat: "Client First",
    color: "from-emerald-400 via-teal-500 to-cyan-600",
  },
];

export default function ServicesHighlights() {
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why Pixdot"
          title="Creative Thinking. Meaningful Business Impact."
          description="At Pixdot Solutions, we bring branding, creative design, web and app development, and digital marketing together to help businesses build stronger brands and grow with confidence."
          className="mb-12 sm:mb-14"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-transparent hover:shadow-soft sm:p-7">
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    item.color
                  )}
                />

                <div
                  className={cn(
                    "pointer-events-none absolute -right-6 -top-6 z-0 h-28 w-28 rounded-full bg-gradient-to-br opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-70",
                    item.color
                  )}
                />

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-card transition-transform duration-500 group-hover:scale-110",
                      item.color
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </span>

                  <span className="rounded-full border border-border bg-surface/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted transition-colors duration-500 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white/90">
                    {item.stat}
                  </span>
                </div>

                <div className="relative z-10 mt-auto pt-8">
                  <h3 className="font-display text-fluid-base font-medium text-text transition-colors duration-500 group-hover:text-white sm:text-fluid-lg">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-fluid-xs leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/85 sm:text-fluid-sm">
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
