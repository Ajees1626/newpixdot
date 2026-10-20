import { useState } from "react";
import { cn } from "@/utils/cn";

interface SafeImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export default function SafeImage({
  src,
  alt,
  className,
  fallbackClassName,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-surface text-fluid-xs text-muted",
          fallbackClassName,
          className
        )}
        role="img"
        aria-label={alt}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
