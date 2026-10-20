import type { ClientBrand, LogoPattern } from "@/constants/clients";
import SafeImage from "@/components/ui/SafeImage";
import { cn } from "@/utils/cn";

const SIZE_CLASSES = {
  sm: "h-14 w-[7.5rem] rounded-xl sm:h-16 sm:w-36",
  md: "h-[5.25rem] w-40 rounded-2xl sm:h-24 sm:w-44",
  lg: "h-[5.5rem] w-44 rounded-2xl sm:h-24 sm:w-48 lg:h-28 lg:w-52",
};

const IMG_MAX = {
  sm: "max-h-9",
  md: "max-h-11 sm:max-h-12",
  lg: "max-h-12 sm:max-h-14 lg:max-h-16",
};

function PatternLayer({ pattern, gradient }: { pattern: LogoPattern; gradient: string }) {
  switch (pattern) {
    case "orbit":
      return (
        <>
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.14]`} />
          <div className="absolute inset-[18%] rounded-full border border-text/[0.08]" />
          <div className="absolute inset-[32%] rounded-full border border-dashed border-text/[0.12]" />
        </>
      );
    case "mesh":
      return (
        <>
          <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-[0.12]`} />
          <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(hsl(var(--text)/0.12)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--text)/0.12)_1px,transparent_1px)] [background-size:10px_10px]" />
        </>
      );
    default:
      return <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.12]`} />;
  }
}

interface ClientLogoMarkProps {
  brand: ClientBrand;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}

export default function ClientLogoMark({ brand, size = "md", className }: ClientLogoMarkProps) {
  return (
    <div
      className={cn(
        "group relative shrink-0 overflow-hidden border border-border/70 bg-card shadow-card backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-soft dark:border-white/10",
        brand.logo && "dark:bg-white",
        SIZE_CLASSES[size],
        className
      )}
      aria-label={brand.name}
      title={brand.name}
    >
      {brand.logo ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-3 sm:px-5 sm:py-4">
          <SafeImage
            src={brand.logo}
            alt={brand.name}
            className={cn(
              "w-full object-contain transition-transform duration-500 ease-premium group-hover:scale-105",
              IMG_MAX[size]
            )}
            fallbackClassName="bg-transparent text-[10px]"
          />
        </div>
      ) : (
        <>
          <PatternLayer pattern={brand.pattern} gradient={brand.gradient} />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-0.5 px-3">
            <span
              className={cn(
                "font-display font-semibold tracking-tightest text-text transition-transform duration-500 group-hover:scale-105",
                size === "sm" ? "text-fluid-sm" : size === "md" ? "text-fluid-base" : "text-fluid-lg"
              )}
            >
              {brand.initials}
            </span>
            <span className="max-w-full truncate text-[9px] uppercase tracking-[0.18em] text-muted/70 sm:text-[10px]">
              {brand.name}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
