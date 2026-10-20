import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/layout/Animations/Reveal";
import { DynamicIcon } from "@/utils/icons";
import type { Service } from "@/constants/services";
import { cn } from "@/utils/cn";

interface ServicesPageGridProps {
  services: Service[];
}

export default function ServicesPageGrid({ services }: ServicesPageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => (
        <Reveal key={service.slug} delay={i * 0.04}>
          <Link
            to={`/services/${service.slug}`}
            data-cursor="hover"
            className="group relative flex h-full min-h-[250px] flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-transparent hover:shadow-soft sm:min-h-[260px] sm:p-8"
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 z-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                service.color
              )}
            />
            <div
              className={cn(
                "pointer-events-none absolute -right-8 -top-8 z-0 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-60",
                service.color
              )}
            />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <span
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-card transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                  service.color
                )}
              >
                <DynamicIcon name={service.icon} className="h-6 w-6" />
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white group-hover:opacity-100" />
            </div>

            <div className="relative z-10 mt-10">
              <h3 className="font-display text-fluid-lg font-medium tracking-tightest text-text transition-colors duration-500 group-hover:text-white">
                {service.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-fluid-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/85">
                {service.short}
              </p>
              {service.duration && (
                <span className="mt-4 inline-block rounded-full border border-border bg-surface/50 px-3 py-1 text-fluid-xs text-muted transition-all duration-500 group-hover:border-white/25 group-hover:bg-white/10 group-hover:text-white/90">
                  {service.duration}
                </span>
              )}
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
