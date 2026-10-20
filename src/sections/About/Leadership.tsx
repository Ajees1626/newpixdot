import Container from "@/components/ui/Container";
import Reveal from "@/components/layout/Animations/Reveal";
import { LEADERSHIP } from "@/constants/team";

export default function Leadership() {
  const member = LEADERSHIP[0];
  if (!member) return null;

  return (
    <section className="relative overflow-hidden bg-surface pb-20 pt-8 sm:pb-28 sm:pt-10 lg:pb-32 lg:pt-12">
      <Container>
        <Reveal>
          <article className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
            {/* Left — heading + leader text */}
            <div className="order-2 flex flex-col justify-center lg:order-1">
              <span className="eyebrow mb-4 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Leadership
              </span>

              <h2 className="max-w-xl font-display text-[clamp(1.85rem,3.5vw,2.85rem)] font-medium leading-[1.08] tracking-tightest text-text">
                The vision behind Pixdot.
              </h2>

              <p className="mt-4 max-w-md text-fluid-sm leading-relaxed text-muted sm:text-fluid-base">
                One director. One clear direction for craft, strategy, and growth.
              </p>

              <div className="mt-8 h-px w-full max-w-sm bg-border" aria-hidden />

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary sm:text-[11px]">
                {member.title ?? "Director"}
              </p>

              <h3 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.1] tracking-tightest text-text">
                {member.name}
              </h3>

              <p className="mt-2 text-fluid-sm font-medium text-primary sm:text-fluid-base">
                {member.role}
              </p>

              {member.bio && (
                <p className="mt-5 max-w-lg text-fluid-sm leading-relaxed text-muted sm:text-fluid-base">
                  {member.bio}
                </p>
              )}

              <dl className="mt-8 grid max-w-md grid-cols-2 gap-6 border-t border-border pt-6">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                    Focus
                  </dt>
                  <dd className="mt-2 text-fluid-sm text-text">Brand & business strategy</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                    Studio
                  </dt>
                  <dd className="mt-2 text-fluid-sm text-text">Pixdot, Chennai</dd>
                </div>
              </dl>
            </div>

            {/* Right — image fills frame, no empty bottom */}
            <div className="order-1 flex w-full lg:order-2">
              <div className="relative w-full lg:min-h-full">
                <div
                  aria-hidden
                  className="absolute -bottom-3 -right-3 hidden h-full w-full border border-border sm:block"
                />
                <div className="relative flex h-full flex-col border border-border bg-background p-3 sm:p-4">
                  <div className="relative min-h-[20rem] flex-1 overflow-hidden border border-border sm:min-h-[24rem] lg:min-h-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-[center_12%]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
