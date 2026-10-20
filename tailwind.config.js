/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,json}"],
  safelist: [
    {
      pattern:
        /(from|via|to)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(400|500|600|700)/,
    },
  ],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1680px",
      "4xl": "1920px",
    },
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        text: "hsl(var(--text) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.2vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.3vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.95rem + 0.3vw, 1.125rem)",
        "fluid-lg": "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)",
        "fluid-xl": "clamp(1.5rem, 1.3rem + 1vw, 2rem)",
        "fluid-2xl": "clamp(2rem, 1.6rem + 1.8vw, 3rem)",
        "fluid-3xl": "clamp(2.75rem, 2.1rem + 2.8vw, 4.5rem)",
        "fluid-4xl": "clamp(3.5rem, 2.4rem + 4.8vw, 7rem)",
        "fluid-5xl": "clamp(4.5rem, 3rem + 6.5vw, 9.5rem)",
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.03em",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)",
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "gradient-glass": "linear-gradient(135deg, hsl(var(--card) / 0.6) 0%, hsl(var(--card) / 0.15) 100%)",
      },
      boxShadow: {
        glow: "0 0 80px -20px hsl(var(--primary) / 0.5)",
        "glow-lg": "0 0 140px -30px hsl(var(--primary) / 0.6)",
        soft: "0 4px 40px -8px rgb(0 0 0 / 0.12)",
        card: "0 2px 24px -4px rgb(0 0 0 / 0.08)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "spin-slow": "spin 18s linear infinite",
        "pulse-slow": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      maxWidth: {
        "8xl": "1440px",
        "9xl": "1600px",
      },
    },
  },
  plugins: [],
};
