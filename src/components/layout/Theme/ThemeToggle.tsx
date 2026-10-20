import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/utils/cn";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-cursor="hover"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "relative flex h-9 w-16 shrink-0 items-center rounded-full border px-1 transition-colors duration-500",
        "border-border bg-card shadow-[inset_0_1px_3px_hsl(var(--text)/0.08)]",
        "hover:border-primary/30 dark:border-white/15 dark:bg-white/10 dark:hover:border-white/25",
        className
      )}
    >
      <Sun
        className={cn(
          "pointer-events-none absolute left-[7px] h-3.5 w-3.5 text-accent transition-opacity duration-300",
          isDark ? "opacity-50" : "opacity-0"
        )}
        strokeWidth={2.25}
      />
      <Moon
        className={cn(
          "pointer-events-none absolute right-[7px] h-3.5 w-3.5 text-secondary transition-opacity duration-300",
          isDark ? "opacity-0" : "opacity-45"
        )}
        strokeWidth={2.25}
      />

      <span
        className={cn(
          "relative flex h-7 w-7 items-center justify-center rounded-full shadow-soft ring-1 transition-all duration-500 ease-premium",
          isDark
            ? "translate-x-[28px] bg-white text-slate-900 ring-black/5"
            : "translate-x-0 bg-text text-background ring-black/10"
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
}
