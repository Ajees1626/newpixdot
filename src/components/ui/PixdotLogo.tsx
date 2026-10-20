import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { PIXDOT_LOGOS } from "@/constants/logos";
import { cn } from "@/utils/cn";

type LogoSize = "sm" | "md" | "lg" | "xl";

const SIZE: Record<LogoSize, { full: string; mark: string }> = {
  sm: { full: "h-7 sm:h-8", mark: "h-7 w-7 sm:h-8 sm:w-8" },
  md: { full: "h-8 sm:h-9", mark: "h-8 w-8 sm:h-9 sm:w-9" },
  lg: { full: "h-10 sm:h-12", mark: "h-10 w-10 sm:h-12 sm:w-12" },
  xl: { full: "h-14 sm:h-16", mark: "h-14 w-14 sm:h-16 sm:w-16" },
};

interface PixdotLogoProps {
  /** Full wordmark or icon-only mark */
  variant?: "full" | "mark";
  size?: LogoSize;
  /** Wrap in home link */
  asLink?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Theme-aware Pixdot logo.
 * Light navbar → 1_eyzdsa.png · Dark navbar → 3_p2wa6g.png
 */
export default function PixdotLogo({
  variant = "full",
  size = "md",
  asLink = false,
  className,
  imgClassName,
}: PixdotLogoProps) {
  const { theme } = useTheme();

  const src =
    variant === "mark"
      ? PIXDOT_LOGOS.mark
      : theme === "dark"
        ? PIXDOT_LOGOS.fullWhite
        : PIXDOT_LOGOS.fullNavy;

  const heightClass = variant === "mark" ? SIZE[size].mark : SIZE[size].full;

  const image = (
    <img
      key={src}
      src={src}
      alt="Pixdot"
      width={variant === "mark" ? 48 : 200}
      height={48}
      decoding="async"
      className={cn(
        "w-auto max-w-full object-contain object-left",
        !imgClassName && heightClass,
        imgClassName
      )}
    />
  );

  const shellClass = cn("inline-flex shrink-0 items-center", className);

  if (asLink) {
    return (
      <Link to="/" data-cursor="hover" aria-label="Pixdot home" className={shellClass}>
        {image}
      </Link>
    );
  }

  return <span className={shellClass}>{image}</span>;
}
