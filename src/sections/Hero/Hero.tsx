import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import Reveal from "@/components/layout/Animations/Reveal";
import { Button } from "@/components/layout/Buttons/Button";
import { IMPACT_STATS } from "@/constants/stats";
import { PIXDOT_LOGOS } from "@/constants/logos";

const FUTURE_INDUSTRIES = ["AI & ML", "SaaS", "FinTech", "HealthTech", "Web3", "Cloud"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background pt-32">
      {/* Soft logo watermark — right side, behind content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex h-[88%] w-full items-start justify-end overflow-hidden pt-8 sm:pt-10 lg:pt-12"
      >
        <img
          src={PIXDOT_LOGOS.mark}
          alt=""
          decoding="async"
          className="h-[min(120vh,1280px)] w-auto max-w-none translate-x-[16%] select-none object-contain opacity-[0.05] mix-blend-multiply sm:translate-x-[14%] dark:opacity-[0.1] dark:mix-blend-screen"
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-center">
        <Reveal y={16}>
          <span className="eyebrow mx-auto sm:mx-0">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Digital &middot; Product &middot; Future-Tech Design Agency
          </span>
        </Reveal>

        <SplitHeading
          as="h1"
          splitBy="words"
          delay={0.1}
          className="mt-6 max-w-5xl text-center font-display text-fluid-5xl font-medium leading-[0.95] tracking-tightest text-text sm:text-left"
        >
          We build brands for what&apos;s next.
        </SplitHeading>

        <Reveal delay={0.3} y={16}>
          <p className="mx-auto mt-8 max-w-xl text-center text-fluid-base text-muted sm:mx-0 sm:text-left">
          Pixdot is a forward-thinking Branding and Business Development company delivering strategic and creative solutions across Web Development, App Development, Graphic Design, and Digital Marketing to help brands thrive in the digital era.


          </p>
        </Reveal>

        <Reveal delay={0.4} y={16}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Button to="/contact" size="lg">
              Start a Project
            </Button>
            <Button to="/case-studies" variant="outline" size="lg">
              View Our Work
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.5} y={12}>
          <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-2 sm:mx-0 sm:justify-start">
            <span className="text-fluid-xs text-muted/70">Built for</span>
            {FUTURE_INDUSTRIES.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-border px-3 py-1 text-fluid-xs text-muted"
              >
                {industry}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>

      <Reveal delay={0.5}>
        <Container className="relative z-10 flex flex-wrap items-center justify-between gap-8 border-t border-border py-8">
          {IMPACT_STATS.slice(0, 4).map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="font-display text-fluid-xl font-medium text-text">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="text-fluid-xs text-muted">{stat.label}</span>
            </div>
          ))}
          <div className="hidden items-center gap-2 text-fluid-xs text-muted sm:flex">
            <ArrowDown className="h-4 w-4 animate-bounce" />
            Scroll to explore
          </div>
        </Container>
      </Reveal>
    </section>
  );
}
