import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  Facebook,
  Gavel,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  Twitter,
  Youtube,
  X,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import { Button } from "@/components/layout/Buttons/Button";
import PixdotLogo from "@/components/ui/PixdotLogo";
import { SITE } from "@/constants/site";
import { NAV_LINKS } from "@/constants/navigation";
import { SERVICES } from "@/constants/services";
import { cn } from "@/utils/cn";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

function BehanceIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden {...props}>
      <path d="M22 7h-7V5.5h7V7zm1.2 8.2c-.5 1.9-2.1 3.3-4.6 3.3-3.2 0-5.3-2.1-5.3-5.2 0-3.2 2.2-5.3 5.2-5.3 2.9 0 4.8 1.8 5.1 4.5H16.8c.2 1.2 1 1.9 2.2 1.9.9 0 1.6-.4 1.8-1.1h2.4zM16.7 11h4.1c-.2-1-.9-1.5-2-1.5-1.2 0-1.9.6-2.1 1.5zM9.6 18.5H3.5V5.5h5.8c3 0 5 1.7 5 4.2 0 1.7-1 3-2.5 3.5 1.9.5 3.1 2 3.1 3.9 0 2.8-2.3 4.4-5.3 4.4zM6.2 10.7h2.7c1.3 0 2.1-.7 2.1-1.8s-.8-1.7-2.1-1.7H6.2v3.5zm3.1 5.9c1.4 0 2.3-.7 2.3-1.9s-.9-1.9-2.3-1.9H6.2v3.8h3.1z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  Facebook,
  Instagram,
  YouTube: Youtube,
  X: Twitter,
  Behance: BehanceIcon,
  WhatsApp: MessageCircle,
  LinkedIn: Linkedin,
};

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (!showTerms) return;

    const lenis = window.__lenis;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [showTerms]);

  const termsModal =
    showTerms &&
    createPortal(
      <div className="fixed inset-0 z-[10040] flex items-center justify-center p-4">
        <button
          type="button"
          aria-label="Close terms"
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowTerms(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-title"
          className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-soft"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-gradient-to-r from-primary to-secondary px-5 py-5 text-white sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <Gavel className="h-5 w-5" />
              </span>
              <div>
                <h2 id="terms-title" className="font-display text-fluid-lg font-medium">
                  Terms & Conditions
                </h2>
                <p className="text-fluid-xs text-white/80">Legal Information</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTerms(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            data-lenis-prevent
            className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-5 py-6 text-fluid-sm leading-relaxed text-muted sm:px-6"
          >
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <h3 className="mb-3 flex items-center gap-3 font-display text-fluid-lg font-medium text-text">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                  P
                </span>
                Welcome to Pixdot!
              </h3>
              <p className="leading-relaxed">
                By accessing or using our website (www.pixdotsolutions.com), you agree to the following
                terms and conditions. Please read them carefully before continuing.
              </p>
              <p className="mt-3 text-fluid-xs font-medium text-muted">Last Updated: October 2025</p>
            </div>

            {(
              [
                {
                  n: "1",
                  t: "General",
                  body: "Pixdot is a creative digital agency offering services in branding, digital marketing, website development, and related areas. By using our website, you accept our terms and agree to follow them.",
                },
                {
                  n: "2",
                  t: "Use of Our Website",
                  body: "You agree not to misuse our website or attempt to disrupt its operation.",
                  bullets: [
                    "All content, visuals, and data on this site are owned by Pixdot and protected by copyright laws.",
                    "You may not copy, reproduce, or distribute our materials without written permission.",
                  ],
                },
                {
                  n: "3",
                  t: "Services",
                  bullets: [
                    "All our services are offered based on project discussions and written agreements.",
                    "Prices and timelines may vary depending on project requirements.",
                    "Once a project is approved and payment is made, no refunds will be provided unless specifically stated.",
                  ],
                },
                {
                  n: "4",
                  t: "Payments",
                  bullets: [
                    "All payments should be made as per the agreed proposal or quotation.",
                    "Any delay in payment may affect project timelines or result in suspension of services.",
                    "Taxes, if applicable, will be charged extra.",
                  ],
                },
                {
                  n: "5",
                  t: "Client Responsibilities",
                  bullets: [
                    "Clients must provide accurate information, materials, and feedback on time.",
                    "Any delay in providing content or approvals may impact delivery schedules.",
                  ],
                },
                {
                  n: "6",
                  t: "Intellectual Property",
                  bullets: [
                    "Final project files will be shared only after full payment.",
                    "Pixdot retains the right to showcase completed works in our portfolio or social media, unless the client requests otherwise in writing.",
                  ],
                },
                {
                  n: "7",
                  t: "Limitation of Liability",
                  body: "Pixdot shall not be held responsible for any loss, damage, or delay caused by factors beyond our control (e.g., internet issues, hosting downtime, or third-party failures).",
                },
                {
                  n: "8",
                  t: "Updates to Terms",
                  body: "We may update these Terms & Conditions occasionally. Changes will be effective once published on this page.",
                },
              ] as const
            ).map((section) => (
              <div key={section.n} className="border-l-4 border-secondary pl-4">
                <h3 className="mb-2 flex items-center gap-2 font-display text-fluid-base font-medium text-text">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-white">
                    {section.n}
                  </span>
                  {section.t}
                </h3>
                {"body" in section && section.body ? <p className="mb-2">{section.body}</p> : null}
                {"bullets" in section && section.bullets ? (
                  <ul className="list-disc space-y-1.5 pl-5">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <p className="mb-3 flex items-center gap-2 font-medium text-text">
                <Shield className="h-4 w-4 text-secondary" />
                Legal Department
              </p>
              <div className="space-y-1.5">
                <p>
                  <span className="font-medium text-text">Email:</span> {SITE.email}
                </p>
                <p>
                  <span className="font-medium text-text">Phone:</span> {SITE.phones[0]}
                </p>
                <p>
                  <span className="font-medium text-text">Address:</span> {SITE.address}
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={() => setShowTerms(false)}
              className={cn(
                "rounded-full border border-border px-5 py-2.5 text-fluid-xs font-medium text-muted transition-colors hover:text-text"
              )}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setShowTerms(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-fluid-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              <Shield className="h-3.5 w-3.5" />
              I Agree
            </button>
          </div>
        </div>
      </div>,
      document.body
    );

  return (
    <>
      <footer className="relative overflow-hidden border-t border-border bg-surface pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent"
        />

        <Container>
          <Reveal>
            <div className="flex flex-col gap-8 border-b border-border pb-20 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="max-w-2xl font-display text-fluid-3xl font-medium leading-[1.05] tracking-tightest text-text">
                Let&apos;s build something{" "}
                <span className="text-gradient">unforgettable</span> together.
              </h2>
              <Button to="/contact" size="lg" className="shrink-0">
                Start a Project
              </Button>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-10 py-16 sm:grid-cols-3 lg:grid-cols-5">
            <Reveal className="col-span-2 sm:col-span-1 lg:col-span-2">
              <PixdotLogo
                asLink
                variant="full"
                size="lg"
                className="max-w-[200px] sm:max-w-[240px]"
                imgClassName="h-12 w-auto max-h-14 object-contain object-left sm:h-14"
              />
              <p className="mt-5 max-w-xs text-fluid-sm text-muted">{SITE.description}</p>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="mb-4 text-fluid-xs font-semibold uppercase tracking-widest text-muted">
                Navigate
              </p>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      data-cursor="hover"
                      className="text-fluid-sm text-text/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mb-4 text-fluid-xs font-semibold uppercase tracking-widest text-muted">
                Services
              </p>
              <ul className="flex flex-col gap-3">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      data-cursor="hover"
                      className="text-fluid-sm text-text/80 transition-colors hover:text-primary"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mb-4 text-fluid-xs font-semibold uppercase tracking-widest text-muted">
                Contact
              </p>

              <div className="space-y-3 text-fluid-xs text-muted">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2 transition-colors hover:text-text"
                >
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{SITE.email}</span>
                </a>
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <p className="flex flex-wrap items-center gap-x-1.5">
                    {SITE.phones.map((phone, i) => (
                      <span key={phone} className="inline-flex items-center gap-x-1.5">
                        {i > 0 && <span className="text-border">·</span>}
                        <a
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="transition-colors hover:text-text"
                        >
                          {phone}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <p className="max-w-[14rem] leading-relaxed">
                    {SITE.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <a
                href={SITE.mapLink}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="mt-4 block overflow-hidden rounded-2xl border border-border bg-background"
                aria-label="Open Pixdot location on Google Maps"
              >
                <iframe
                  title="Pixdot office map"
                  src={SITE.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none h-28 w-full border-0 grayscale-[30%] contrast-[1.05]"
                />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-2 pb-4 sm:gap-3">
              {SITE.social.map((s) => {
                const Icon = SOCIAL_ICONS[s.label] ?? MessageCircle;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </Reveal>
        </Container>

        <div className="border-t border-border py-8">
          <Container className="flex flex-col items-center justify-between gap-4 text-fluid-xs text-muted sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Pixdot. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="transition-colors hover:text-text">
                Privacy Policy
              </Link>
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="transition-colors hover:text-text"
              >
                Terms & Conditions
              </button>
            </div>
          </Container>
        </div>

        <div aria-hidden className="select-none overflow-hidden">
          <p className="translate-y-[0.15em] text-center font-display text-[18vw] font-bold leading-none tracking-tightest text-text/[0.04]">
            pixdot
          </p>
        </div>
      </footer>

      {termsModal}
    </>
  );
}
