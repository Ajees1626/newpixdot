import { Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/layout/Buttons/Button";

export default function CaseStudyPageCTA() {
  return (
    <section className="pb-16 pt-4 sm:pb-20 sm:pt-6">
      <Container>
        <div className="flex flex-col items-start justify-between gap-5 rounded-[1.5rem] border border-border bg-surface px-5 py-5 sm:flex-row sm:items-center sm:rounded-[2rem] sm:px-8 sm:py-6">
          <div className="flex items-start gap-4 sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <p className="max-w-md text-fluid-sm leading-relaxed text-text sm:text-fluid-base">
              Have a project in mind? Let&apos;s create something impactful together.
            </p>
          </div>
          <Button to="/contact" variant="primary" size="md" className="w-full shrink-0 sm:w-auto">
            Start Your Project
          </Button>
        </div>
      </Container>
    </section>
  );
}
