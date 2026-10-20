import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-text text-background hover:shadow-glow [&_svg]:text-current",
  secondary: "bg-primary text-primary-foreground hover:shadow-glow [&_svg]:text-current",
  outline:
    "border border-border bg-transparent text-text hover:border-text [&_svg]:text-current",
  ghost: "bg-transparent text-text hover:bg-surface [&_svg]:text-current",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-10 px-5 text-fluid-xs gap-1.5",
  md: "h-12 px-7 text-fluid-sm gap-2",
  lg: "h-16 px-9 text-fluid-base gap-2.5",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };

type ButtonAsLink = BaseProps & Omit<LinkProps, "className"> & { href?: undefined };

type ButtonAsAnchor = BaseProps & {
  href: string;
  to?: undefined;
  target?: string;
  rel?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

/**
 * Universal CTA button. Renders as a <button>, react-router <Link>, or plain
 * <a> depending on which props are passed, and opts into the magnetic
 * pointer-following effect used throughout the site by default.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon = true,
  magnetic = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  const magneticRef = useMagnetic<HTMLElement>(0.3);
  const refProp = magnetic ? { ref: magneticRef as never } : {};

  const classes = cn(
    "btn-magnetic group font-medium tracking-tight",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  const content = (
    <>
      <span className="relative z-10 text-inherit">{children}</span>
      {icon && (
        <ArrowUpRight
          className="relative z-10 h-[1.1em] w-[1.1em] transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );

  if ("to" in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link to={to} data-cursor="hover" className={classes} {...refProp} {...linkRest}>
        {content}
      </Link>
    );
  }

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a href={href} data-cursor="hover" className={classes} {...refProp} {...anchorRest}>
        {content}
      </a>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button data-cursor="hover" className={classes} {...refProp} {...buttonRest}>
      {content}
    </button>
  );
}
