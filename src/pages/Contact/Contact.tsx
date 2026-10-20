import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, Loader2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqItem from "@/components/ui/FaqItem";
import { Button } from "@/components/layout/Buttons/Button";
import { SITE } from "@/constants/site";
import { GENERAL_FAQS } from "@/constants/faq";
import { useSeo } from "@/hooks/useSeo";
import { cn } from "@/utils/cn";

const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "d4569a33-3eb7-4ab9-97b4-eb36f126a3c4";

const BUDGETS = ["Under $10K", "$10K – $25K", "$25K – $50K", "$50K+"] as const;

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  budget: BUDGETS[0],
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useSeo({
    title: "Contact",
    description: "Tell us about your project. Pixdot responds to every inquiry within one business day.",
    path: "/contact",
  });

  const handleChange =
    (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim(),
          budget: form.budget,
          message: form.message.trim(),
          subject: `Pixdot inquiry from ${form.name.trim()}`,
          from_name: form.name.trim(),
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (result.success) {
        setSubmitted(true);
        setForm(INITIAL_FORM);
      } else {
        setSubmitError(result.message || "Failed to send message. Please try again.");
      }
    } catch {
      setSubmitError("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-card px-4 py-3.5 text-fluid-sm text-text outline-none transition-colors focus:border-primary placeholder:text-muted/50";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start the conversation."
        description="Tell us about your project and timeline. We respond to every inquiry within one business day."
      />

      <section className="pb-28 sm:pb-36">
        <Container className="grid gap-16 lg:grid-cols-[1fr_420px]">
          <Reveal>
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border bg-card p-16 text-center">
                <h3 className="font-display text-fluid-xl font-medium text-text">Thank you!</h3>
                <p className="mt-3 max-w-sm text-fluid-sm text-muted">
                  Your message has been received. Our team will reach out within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  data-cursor="hover"
                  className="mt-6 text-fluid-xs font-medium text-primary hover:opacity-80"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-fluid-xs font-medium text-muted">Full Name *</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange("name")}
                      className={inputClass}
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-fluid-xs font-medium text-muted">Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      className={inputClass}
                      placeholder="jane@company.com"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-fluid-xs font-medium text-muted">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      className={inputClass}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-fluid-xs font-medium text-muted">Company</label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange("company")}
                      className={inputClass}
                      placeholder="Company Inc."
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-fluid-xs font-medium text-muted">Estimated Budget</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, budget }))}
                        data-cursor="hover"
                        className={cn(
                          "rounded-full border px-4 py-2 text-fluid-xs font-medium transition-colors",
                          form.budget === budget
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted hover:text-text"
                        )}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-fluid-xs font-medium text-muted">Project Details *</label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange("message")}
                    className={cn(inputClass, "resize-none")}
                    placeholder="Tell us about your goals, timeline, and vision..."
                  />
                </div>

                {submitError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <p className="text-fluid-sm text-red-600 dark:text-red-400">{submitError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  icon={!isSubmitting}
                  disabled={isSubmitting}
                  className="w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-[1.1em] w-[1.1em] animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="text-fluid-base font-medium text-text">Contact Details</h3>
                <div className="mt-5 space-y-4">
                  <a
                    href={`mailto:${SITE.email}`}
                    data-cursor="hover"
                    className="flex items-start gap-3 text-fluid-sm text-muted transition-colors hover:text-text"
                  >
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {SITE.email}
                  </a>
                  {SITE.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      data-cursor="hover"
                      className="flex items-start gap-3 text-fluid-sm text-muted transition-colors hover:text-text"
                    >
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {phone}
                    </a>
                  ))}
                  <a
                    href={SITE.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="flex items-start gap-3 text-fluid-sm text-muted transition-colors hover:text-text"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {SITE.address}
                  </a>
                  <div className="flex items-start gap-3 text-fluid-sm text-muted">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {SITE.hours}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <div className="aspect-[4/3]">
                  <iframe
                    src={SITE.mapEmbedUrl}
                    title="Pixdot office location"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="h-full w-full border-0 grayscale-[20%] contrast-[1.05]"
                  />
                </div>
                <a
                  href={SITE.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="flex items-center justify-between px-5 py-3 text-fluid-xs text-muted transition-colors hover:text-text"
                >
                  <span>Open in Google Maps</span>
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4 rounded-3xl border border-border bg-card p-7">
                {SITE.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="text-fluid-xs text-muted hover:text-text"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Questions before you reach out?" className="mb-4 max-w-xl" />
          <div className="mt-8 max-w-2xl">
            {GENERAL_FAQS.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
