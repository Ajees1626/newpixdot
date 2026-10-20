import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronDown, ChevronLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import SafeImage from "@/components/ui/SafeImage";
import Reveal from "@/components/layout/Animations/Reveal";
import { getCaseStudyBySlug, getNextCaseStudy, type CaseStudy } from "@/constants/caseStudies";
import { useSeo } from "@/hooks/useSeo";
import { getBeforeAfter, getCaseStudyTestimonial } from "@/components/case-study/utils";
import { PROCESS_LABELS, type CaseStudySectionId } from "@/components/case-study/types";
import { ScrollTrigger, registerGsap } from "@/utils/gsapConfig";
import { cn } from "@/utils/cn";

registerGsap();

const NAV = [
  { id: "overview" as const, label: "Overview" },
  { id: "process" as const, label: "Process" },
  { id: "gallery" as const, label: "Gallery" },
  { id: "results" as const, label: "Results" },
];

function workImage(cs: CaseStudy) {
  return cs.images[1] || cs.images[2] || cs.coverImage;
}

function LiteNav({
  active,
  onNavigate,
}: {
  active: CaseStudySectionId;
  onNavigate: (id: CaseStudySectionId) => void;
}) {
  return (
    <div className="sticky top-16 z-30 border-b border-border/70 bg-background/90 backdrop-blur-md sm:top-[4.75rem]">
      <Container className="flex items-center gap-1.5 overflow-x-auto py-2.5 sm:gap-2 sm:py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Link
          to="/case-studies"
          className="mr-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1.5 text-[11px] font-medium text-muted transition-colors hover:text-text sm:mr-2 sm:gap-1.5 sm:border-0 sm:bg-transparent sm:px-0"
          aria-label="All case studies"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden xs:inline sm:inline">All</span>
        </Link>
        <span className="mx-0.5 hidden h-4 w-px shrink-0 bg-border sm:mx-1 sm:block" />
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-[10px] font-medium tracking-wide transition-colors sm:px-3.5 sm:text-[11px]",
              active === item.id
                ? "bg-text text-background"
                : "text-muted hover:bg-surface hover:text-text"
            )}
          >
            {item.label}
          </button>
        ))}
      </Container>
    </div>
  );
}

function LiteHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const heroSrc = workImage(caseStudy);
  const markSrc = caseStudy.coverImage;
  const primaryResult = caseStudy.results[0];

  return (
    <section className="relative overflow-hidden bg-background pt-20 sm:pt-24 lg:pt-28">
      {/* Soft wash — light look, no heavy blur logo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(ellipse_at_20%_0%,hsl(var(--primary)/0.07),transparent_55%)]" />

      <Container className="relative">
        <Reveal>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-text"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Case studies
          </Link>
        </Reveal>

        <div className="mt-8 flex flex-col gap-10 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <Reveal delay={0.04}>
              <div className="flex flex-wrap items-center gap-2">
                {markSrc && (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card sm:h-12 sm:w-12">
                    <SafeImage src={markSrc} alt="" className="h-full w-full object-cover" />
                  </span>
                )}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[caseStudy.year, caseStudy.category, caseStudy.industry].map((tag) => (
                    <span
                      key={tag}
                      className="max-w-[14rem] truncate rounded-full border border-border/80 bg-surface/80 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-muted sm:max-w-none sm:px-3 sm:text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 font-display text-[clamp(2.35rem,8vw,5.5rem)] font-medium leading-[0.94] tracking-tightest text-text sm:mt-7">
                {caseStudy.client}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-2xl text-fluid-sm leading-relaxed text-muted sm:mt-6 sm:text-fluid-base">
                {caseStudy.summary}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 grid grid-cols-2 gap-5 border-t border-border/70 pt-6 sm:mt-10 sm:grid-cols-3 sm:gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Duration</p>
                  <p className="mt-1.5 text-fluid-sm font-medium text-text">{caseStudy.duration}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Focus</p>
                  <p className="mt-1.5 text-fluid-sm font-medium text-text">{caseStudy.category}</p>
                </div>
                {primaryResult && (
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Key result</p>
                    <p className="mt-1.5 font-display text-fluid-lg font-medium text-primary">
                      {primaryResult.value}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="hidden shrink-0 lg:block">
            <a
              href="#overview"
              className="sticky top-32 flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.35em] text-muted transition-colors hover:text-text"
            >
              Scroll
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </span>
            </a>
          </Reveal>
        </div>
      </Container>

      {/* Wide cinematic band — light, clean, unique */}
      <div className="relative mt-10 sm:mt-12 lg:mt-14">
        <Reveal>
          <div className="relative mx-auto aspect-[16/10] w-full max-w-8xl overflow-hidden sm:aspect-[21/9] lg:aspect-[2.4/1]">
            {heroSrc ? (
              <SafeImage
                src={heroSrc}
                alt={caseStudy.client}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className={cn("h-full w-full bg-gradient-to-br", caseStudy.gradient)} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-5 pb-5 sm:px-8 sm:pb-7 lg:px-10">
              <p className="max-w-md truncate font-display text-fluid-sm font-medium text-white drop-shadow sm:text-fluid-base">
                {caseStudy.title}
              </p>
              <a
                href="#overview"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md transition-colors hover:bg-white/25 lg:hidden"
              >
                Explore
                <ChevronDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LiteOverview({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section id="overview" className="scroll-mt-28 border-t border-border/60 bg-background py-12 sm:scroll-mt-36 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">Overview</p>
          <h2 className="mt-3 max-w-2xl font-display text-fluid-2xl font-medium tracking-tightest text-text sm:text-fluid-3xl">
            {caseStudy.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal delay={0.05}>
            <article className="rounded-[1.5rem] border border-border/80 bg-surface/60 p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">Challenge</p>
              <p className="mt-4 text-fluid-sm leading-relaxed text-text sm:text-fluid-base">
                {caseStudy.problem || caseStudy.summary}
              </p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="rounded-[1.5rem] border border-border/80 bg-card p-6 sm:p-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">Approach</p>
              <p className="mt-4 whitespace-pre-line text-fluid-sm leading-relaxed text-text sm:text-fluid-base">
                {caseStudy.strategy.replace(/^•\s*/gm, "• ").slice(0, 520)}
                {caseStudy.strategy.length > 520 ? "…" : ""}
              </p>
            </article>
          </Reveal>
        </div>

        {caseStudy.technologies.length > 0 && (
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

function LiteProcess({ caseStudy }: { caseStudy: CaseStudy }) {
  const steps =
    caseStudy.process.length > 0
      ? caseStudy.process.slice(0, 4).map((text, i) => ({
          label: PROCESS_LABELS[i] || `Step ${i + 1}`,
          text,
        }))
      : PROCESS_LABELS.map((label, i) => ({
          label,
          text: caseStudy.technologies[i] || "Crafted with clarity, iteration, and measurable outcomes.",
        }));

  return (
    <section id="process" className="scroll-mt-28 bg-surface/50 py-12 sm:scroll-mt-36 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">Process</p>
          <h2 className="mt-3 font-display text-fluid-2xl font-medium tracking-tightest text-text sm:text-fluid-3xl">
            How we got there.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.label} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-[1.35rem] border border-border/70 bg-background p-5 sm:p-6">
                <span className="font-display text-fluid-2xl font-medium text-primary/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-fluid-lg font-medium text-text">{step.label}</h3>
                <p className="mt-3 line-clamp-5 text-fluid-xs leading-relaxed text-muted sm:text-fluid-sm">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function LiteGallery({ caseStudy }: { caseStudy: CaseStudy }) {
  const images = (caseStudy.images.length > 1 ? caseStudy.images.slice(1) : caseStudy.images).slice(0, 6);

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="scroll-mt-28 bg-background py-12 sm:scroll-mt-36 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">Gallery</p>
          <h2 className="mt-3 font-display text-fluid-2xl font-medium tracking-tightest text-text sm:text-fluid-3xl">
            Selected frames.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {images.map((src, i) => (
            <Reveal key={`${src}-${i}`} delay={i * 0.05}>
              <div
                className={cn(
                  "overflow-hidden rounded-[1.25rem] bg-surface sm:rounded-[1.35rem]",
                  i === 0 && "aspect-[4/3] sm:col-span-2 sm:aspect-[16/9]",
                  i !== 0 && "aspect-[4/3]"
                )}
              >
                <SafeImage
                  src={src}
                  alt={`${caseStudy.client} gallery ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function LiteResults({ caseStudy }: { caseStudy: CaseStudy }) {
  const results = caseStudy.results;
  if (!results.length) return null;

  return (
    <section id="results" className="scroll-mt-28 border-t border-border/60 bg-background py-12 sm:scroll-mt-36 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">Results</p>
          <h2 className="mt-3 font-display text-fluid-2xl font-medium tracking-tightest text-text sm:text-fluid-3xl">
            Impact in numbers.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.06}>
              <div className="rounded-[1.5rem] border border-border/80 bg-surface/50 p-6 sm:p-8">
                <p className="font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-tight text-text">
                  {r.value}
                </p>
                <p className="mt-3 text-fluid-sm text-muted">{r.label}</p>
                {(r.before || r.after) && (
                  <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted/80">
                    {r.before && <span>{r.before}</span>}
                    {r.before && r.after && <span className="mx-2 text-primary">→</span>}
                    {r.after && <span>{r.after}</span>}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function LiteBeforeAfter({ caseStudy }: { caseStudy: CaseStudy }) {
  const data = getBeforeAfter(caseStudy);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  if (!data.beforeImage || !data.afterImage) return null;

  const handleMove = (clientX: number, rect: DOMRect) => {
    setPosition(Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <section className="bg-surface/40 py-12 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">Transformation</p>
          <h2 className="mt-3 font-display text-fluid-2xl font-medium tracking-tightest text-text sm:text-fluid-3xl">
            Before & after
          </h2>
          <p className="mt-3 max-w-lg text-fluid-sm text-muted">{data.label}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="relative mt-8 overflow-hidden rounded-[1.5rem] border border-border/70 bg-card select-none"
            onPointerDown={(e) => {
              dragging.current = true;
              handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
            }}
            onPointerMove={(e) => {
              if (!dragging.current) return;
              handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
            }}
            onPointerUp={() => {
              dragging.current = false;
            }}
            onPointerLeave={() => {
              dragging.current = false;
            }}
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10]">
              <SafeImage
                src={data.afterImage}
                alt={`${caseStudy.client} after`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <SafeImage
                  src={data.beforeImage}
                  alt={`${caseStudy.client} before`}
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div
                className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white"
                style={{ left: `${position}%` }}
              >
                <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-[10px] font-semibold text-text">
                  ↔
                </span>
              </div>
            </div>
            <div className="grid gap-3 border-t border-border p-5 sm:grid-cols-2 sm:p-6">
              <p className="text-fluid-sm text-muted">
                <span className="font-medium text-text">Before: </span>
                {data.before}
              </p>
              <p className="text-fluid-sm text-muted">
                <span className="font-medium text-text">After: </span>
                {data.after}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function LiteTestimonial({ caseStudy }: { caseStudy: CaseStudy }) {
  const t = getCaseStudyTestimonial(caseStudy);

  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl px-1 text-center sm:px-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-primary">Client voice</p>
            <blockquote className="mt-5 font-display text-fluid-lg font-medium leading-snug text-text sm:mt-6 sm:text-fluid-xl lg:text-fluid-2xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <p className="mt-8 text-fluid-sm font-medium text-text">{t.author}</p>
            <p className="mt-1 text-fluid-xs text-muted">
              {t.role}, {t.company}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function LiteNext({ next }: { next: CaseStudy }) {
  return (
    <section className="border-t border-border/70 bg-surface/50 py-14 sm:py-16">
      <Container>
        <Link
          to={`/case-studies/${next.slug}`}
          data-cursor="view"
          className="group flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">Next study</p>
            <p className="mt-2 font-display text-fluid-xl font-medium text-text transition-colors group-hover:text-primary sm:text-fluid-2xl">
              {next.client}
            </p>
            <p className="mt-1 text-fluid-sm text-muted">{next.industry}</p>
          </div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight className="h-5 w-5 text-text" />
          </span>
        </Link>
      </Container>
    </section>
  );
}

export default function CaseStudyDetails() {
  const { slug } = useParams();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;
  const nextCaseStudy = slug ? getNextCaseStudy(slug) : undefined;
  const [active, setActive] = useState<CaseStudySectionId>("overview");

  useSeo({
    title: caseStudy ? `${caseStudy.client} Case Study` : "Case Study",
    description: caseStudy?.summary || "Pixdot case study",
    path: slug ? `/case-studies/${slug}` : "/case-studies",
    image: caseStudy?.coverImage || "/og-image.jpg",
  });

  const handleNavigate = useCallback((id: CaseStudySectionId) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (!caseStudy) return;
    const ids = NAV.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [caseStudy, slug]);

  useEffect(() => {
    registerGsap();
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => window.clearTimeout(timer);
  }, [slug]);

  if (!caseStudy) return <Navigate to="/case-studies" replace />;

  return (
    <div className="relative min-h-screen bg-background text-text">
      <LiteHero caseStudy={caseStudy} />
      <LiteNav active={active} onNavigate={handleNavigate} />
      <LiteOverview caseStudy={caseStudy} />
      <LiteProcess caseStudy={caseStudy} />
      <LiteGallery caseStudy={caseStudy} />
      <LiteResults caseStudy={caseStudy} />
      <LiteBeforeAfter caseStudy={caseStudy} />
      <LiteTestimonial caseStudy={caseStudy} />
      {nextCaseStudy && <LiteNext next={nextCaseStudy} />}
    </div>
  );
}
