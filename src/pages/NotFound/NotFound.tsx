import Container from "@/components/ui/Container";
import SplitHeading from "@/components/layout/Animations/SplitHeading";
import Reveal from "@/components/layout/Animations/Reveal";
import { Button } from "@/components/layout/Buttons/Button";
import { useSeo } from "@/hooks/useSeo";

export default function NotFound() {
  useSeo({
    title: "Page Not Found",
    description: "The page you are looking for does not exist.",
    path: "/404",
    noIndex: true,
  });

  return (
    <section className="flex min-h-[80vh] items-center justify-center pt-32">
      <Container className="text-center">
        <Reveal>
          <span className="font-display text-fluid-5xl font-medium text-primary/20">404</span>
        </Reveal>
        <SplitHeading
          as="h1"
          splitBy="words"
          delay={0.1}
          className="mx-auto mt-4 max-w-lg text-fluid-2xl font-medium tracking-tightest text-text"
        >
          This page wandered off the grid.
        </SplitHeading>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-sm text-fluid-sm text-muted">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <Button to="/" size="lg" className="mx-auto mt-10">
            Back to Home
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
