import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/layout/Animations/Reveal";
import { MILESTONES } from "@/constants/team";

export default function JourneyTimeline() {
  return (
    <section className="py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Our Journey"
          title="From a creative vision to a growing digital solutions agency."
          description="The milestones shaping Pixdot's journey."
          className="mb-16 max-w-3xl"
        />

        <div className="relative border-l border-border pl-8 sm:pl-12">
          {MILESTONES.map((milestone, i) => (
            <Reveal
              key={`${milestone.year}-${milestone.title}`}
              delay={i * 0.06}
              className="relative pb-14 last:pb-0"
            >
              <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-background bg-primary sm:-left-[57px]" />
              <span className="font-display text-fluid-xl font-medium text-primary">
                {milestone.year}
              </span>
              <h3 className="mt-2 text-fluid-lg font-medium text-text">{milestone.title}</h3>
              <p className="mt-2 max-w-lg text-fluid-sm text-muted">{milestone.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
