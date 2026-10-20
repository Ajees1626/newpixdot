import { useState } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/layout/Animations/Reveal";
import { SITE } from "@/constants/site";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/utils/cn";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, and other contact information.",
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    body: "We use the information we collect to provide, maintain, and improve our services, respond to your inquiries, send project updates and relevant communications, personalize your experience, and comply with legal obligations.",
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    body: "We do not sell your personal information. We may share data with trusted service providers who help us operate our website and deliver services, or when required by law. Any partners we work with are expected to protect your information appropriately.",
  },
  {
    id: "data-security",
    title: "Data Security",
    body: "We take reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the internet is 100% secure, so we cannot guarantee absolute security.",
  },
  {
    id: "cookies-tracking",
    title: "Cookies and Tracking",
    body: "Our website may use cookies and similar technologies to remember preferences, understand how visitors use the site, and improve performance. You can control cookies through your browser settings. Disabling cookies may affect some site features.",
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: "Depending on applicable law, you may have the right to access, correct, update, or request deletion of your personal information. You may also object to or restrict certain processing. Contact us using the details below to exercise these rights.",
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated” date on this page. Continued use of our website after changes means you accept the updated policy.",
  },
] as const;

function PolicySection({
  id,
  title,
  body,
  defaultOpen = false,
}: {
  id: string;
  title: string;
  body: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div id={id} className="scroll-mt-28 border-b border-border py-5 sm:py-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-fluid-base font-medium text-text">{title}</span>
        <span className="flex shrink-0 items-center gap-1.5 text-fluid-xs text-muted">
          {open ? "Hide" : "Show"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
          />
        </span>
      </button>
      <div
        className="grid overflow-hidden transition-all duration-500 ease-premium"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-fluid-sm leading-relaxed text-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}

export default function Privacy() {
  useSeo({
    title: "Privacy Policy",
    description:
      "Your privacy is important to us. Learn how Pixdot collects, uses, and protects your information.",
    path: "/privacy",
  });

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your privacy is important to us. Learn how we collect, use, and protect your information."
        breadcrumb={[{ label: "Privacy Policy" }]}
      />

      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
            <div>
              <Reveal>
                <p className="mb-8 text-fluid-xs font-medium uppercase tracking-widest text-muted">
                  Last updated: October 2025
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="rounded-3xl border border-border bg-surface/50 px-5 py-2 sm:px-7">
                  {SECTIONS.map((section, i) => (
                    <PolicySection
                      key={section.id}
                      {...section}
                      defaultOpen={i === 0}
                    />
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.1} className="mt-10">
                <div
                  id="contact-us"
                  className="scroll-mt-28 rounded-3xl border border-border bg-card p-6 sm:p-8"
                >
                  <h2 className="font-display text-fluid-lg font-medium text-text">Contact Us</h2>
                  <p className="mt-2 text-fluid-sm text-muted">
                    If you have any questions about this privacy policy, please contact us at:
                  </p>
                  <ul className="mt-6 space-y-3 text-fluid-sm text-muted">
                    <li className="flex items-start gap-2.5">
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <a
                        href={`mailto:${SITE.email}`}
                        className="transition-colors hover:text-text"
                      >
                        {SITE.email}
                      </a>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <a
                        href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
                        className="transition-colors hover:text-text"
                      >
                        {SITE.phones[0]}
                      </a>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{SITE.address}</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>

            <aside className="lg:pt-10">
              <div className="sticky top-28 rounded-2xl border border-border bg-surface/60 p-5">
                <p className="mb-4 text-fluid-xs font-semibold uppercase tracking-widest text-muted">
                  On this page
                </p>
                <nav className="flex flex-col gap-2.5">
                  {SECTIONS.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      data-cursor="hover"
                      className="text-fluid-xs text-muted transition-colors hover:text-primary"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
