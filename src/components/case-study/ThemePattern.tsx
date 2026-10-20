import type { CaseStudyTheme } from "./theme";
import { cn } from "@/utils/cn";

export default function ThemePattern({ theme }: { theme: CaseStudyTheme }) {
  if (!theme.gridPattern && !theme.texture) return null;

  if (theme.gridPattern === "architectural" || theme.gridPattern === "diagonal") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            theme.gridPattern === "diagonal"
              ? "repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 12px)"
              : "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: theme.gridPattern === "diagonal" ? "auto" : "72px 72px",
        }}
      />
    );
  }

  if (theme.gridPattern === "blueprint") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.5) 31px, rgba(255,255,255,0.5) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.5) 31px, rgba(255,255,255,0.5) 32px)",
        }}
      />
    );
  }

  if (theme.gridPattern === "clinical") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_35%)]"
      />
    );
  }

  if (theme.texture === "paper") {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light",
          "bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence baseFrequency=\"0.9\" numOctaves=\"3\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\" opacity=\"0.5\"/%3E%3C/svg%3E')]"
        )}
      />
    );
  }

  return null;
}
