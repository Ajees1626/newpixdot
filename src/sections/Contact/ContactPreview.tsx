import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import { Button } from "@/components/layout/Buttons/Button";
import { SITE } from "@/constants/site";

const CONTACT_ITEMS = [
  { icon: Mail, label: "Email us", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Call us", value: SITE.phone, href: `tel:${SITE.phones[0].replace(/\s/g, "")}` },
  { icon: MapPin, label: "Visit us", value: SITE.address, href: SITE.mapLink },
];

export default function ContactPreview() {
  return (
    <section className="py-28 sm:py-36">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Get in touch
          </span>
          <h2 className="mt-6 max-w-lg font-display text-fluid-3xl font-medium leading-[1.05] tracking-tightest text-text">
            Have a project in mind? Let's talk.
          </h2>
          <p className="mt-6 max-w-md text-fluid-base text-muted">
            Tell us about your goals and timeline — we'll respond within one business day with next steps.
          </p>
          <Button to="/contact" size="lg" className="mt-10">
            Get in Touch
          </Button>
        </Reveal>

        <div className="grid gap-4">
          {CONTACT_ITEMS.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08}>
              <a
                href={item.href}
                data-cursor="hover"
                className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-colors duration-500 hover:border-primary/40"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="text-fluid-xs text-muted">{item.label}</p>
                    <p className="text-fluid-sm font-medium text-text">{item.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
