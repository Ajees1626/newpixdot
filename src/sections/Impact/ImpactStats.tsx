import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import AnimatedCounter from "@/components/layout/Animations/AnimatedCounter";
import { IMPACT_STATS } from "@/constants/stats";

export default function ImpactStats() {
  return (
    <section className="relative overflow-hidden bg-text py-28 text-background sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
      <Container>
        <div className="mb-16 flex flex-col gap-6">
          <Reveal y={16}>
            <span className="inline-flex items-center gap-2 text-fluid-xs font-semibold uppercase tracking-[0.2em] text-background/60">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Our Impact
            </span>
          </Reveal>
          <SplitHeading
            as="h2"
            splitBy="words"
            className="max-w-3xl text-fluid-3xl font-medium leading-[1.05] tracking-tightest text-background"
          >
            A decade measured in outcomes.
          </SplitHeading>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {IMPACT_STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05} className="flex flex-col gap-2">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display text-fluid-2xl font-medium text-background"
              />
              <span className="text-fluid-xs text-background/60">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
