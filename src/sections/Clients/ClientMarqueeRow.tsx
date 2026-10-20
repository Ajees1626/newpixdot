import Marquee from "@/components/layout/Animations/Marquee";
import ClientLogoMark from "@/components/ui/ClientLogoMark";
import { CLIENTS, CLIENT_BRANDS, type ClientBrand } from "@/constants/clients";
import { cn } from "@/utils/cn";

interface BaseProps {
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

interface TextMarqueeProps extends BaseProps {
  variant?: "text";
  names?: string[];
  textClassName?: string;
}

interface LogoMarqueeProps extends BaseProps {
  variant: "logo";
  brands?: ClientBrand[];
  size?: "sm" | "md" | "lg";
}

type ClientMarqueeRowProps = TextMarqueeProps | LogoMarqueeProps;

export default function ClientMarqueeRow(props: ClientMarqueeRowProps) {
  const { reverse = false, speed = "slow", className } = props;

  if (props.variant === "logo") {
    const brands = props.brands ?? CLIENT_BRANDS;
    const size = props.size ?? "lg";

    return (
      <Marquee reverse={reverse} speed={speed} pauseOnHover className={className}>
        {brands.map((brand) => (
          <ClientLogoMark key={brand.id} brand={brand} size={size} />
        ))}
      </Marquee>
    );
  }

  const names = props.names ?? CLIENTS;

  return (
    <Marquee reverse={reverse} speed={speed} pauseOnHover className={className}>
      {names.map((name) => (
        <span
          key={name}
          className={cn(
            "shrink-0 font-display text-fluid-lg font-semibold text-muted/60 transition-colors duration-300 hover:text-text",
            props.textClassName
          )}
        >
          {name}
        </span>
      ))}
    </Marquee>
  );
}
