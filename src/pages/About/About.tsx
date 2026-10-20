import PageHero from "@/components/ui/PageHero";
import MissionVisionValues from "@/sections/About/MissionVisionValues";
import Leadership from "@/sections/About/Leadership";
import JourneyTimeline from "@/sections/About/JourneyTimeline";
import WhyChooseUs from "@/sections/About/WhyChooseUs";
import CTASection from "@/sections/CTA/CTASection";
import { useSeo } from "@/hooks/useSeo";

export default function About() {
  useSeo({
    title: "About Us",
    description:
      "Founded in 2023, Pixdot is a creative agency delivering branding, digital experiences, and innovative solutions for ambitious businesses.",
    path: "/about",
  });

  return (
    <>
      <PageHero
        eyebrow="About Pixdot"
        title="We exist to make brands impossible to ignore."
        description="Founded in 2023, Pixdot has evolved into a creative agency delivering bold branding, digital experiences, and innovative solutions for ambitious businesses."
      />
      <MissionVisionValues />
      <Leadership />
      <JourneyTimeline />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
