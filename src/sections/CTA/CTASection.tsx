import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import Reveal from "@/components/layout/Animations/Reveal";
import { Button } from "@/components/layout/Buttons/Button";

export default function CTASection() {
  return (
    <section className="py-28 sm:py-36">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand px-8 py-20 text-center sm:px-16 sm:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-1/4 top-0 h-full w-1/2 animate-spin-slow rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-1/4 bottom-0 h-full w-1/2 animate-spin-slow rounded-full bg-white/10 blur-3xl [animation-direction:reverse]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <Reveal y={16}>
              <span className="eyebrow justify-center text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Ready when you are
              </span>
            </Reveal>
            <SplitHeading
              as="h2"
              splitBy="words"
              delay={0.1}
              className="mx-auto mt-6 max-w-xl text-fluid-3xl font-medium leading-[1.05] tracking-tightest text-white"
            >
              Let's turn your vision into an unmistakable brand.
            </SplitHeading>
            <Reveal delay={0.3} y={16}>
              <p className="mx-auto mt-6 max-w-md text-fluid-base text-white/80">
                Book a free discovery call and see how Pixdot can accelerate your next chapter of growth.
              </p>
            </Reveal>
            <Reveal delay={0.4} y={16}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button to="/contact" variant="primary" size="lg" className="bg-white text-black hover:shadow-none">
                  Start a Project
                </Button>
                <Button to="/case-studies" variant="outline" size="lg" className="border-white/30 text-white hover:border-white">
                  See Our Work
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
