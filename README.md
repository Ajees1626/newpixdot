# Pixdot — Premium Creative Agency Website

A production-grade marketing website for **Pixdot**, a fictional full-service creative agency (branding, digital marketing, UI/UX, graphic design, web & app development, business development, corporate identity, and creative solutions).

Built to feel like an Awwwards / FWA-caliber experience: cinematic scroll-driven animation, a restrained WebGL hero, a custom magnetic cursor, animated page transitions, and a fully theemable light/dark design system.

## Tech Stack

- **React 19** + **TypeScript** + **Vite 5**
- **Tailwind CSS 3** — token-driven design system (CSS variables for color, no hardcoded values)
- **GSAP 3** (`ScrollTrigger`) — scroll-driven reveals, pinned horizontal scroll, magnetic buttons, custom cursor
- **Framer Motion 12** — page transitions, mega menu, mobile menu, lightbox
- **React Three Fiber 9** + **drei 10** — animated 3D hero scene (distorted gradient sphere, floating shards, particles)
- **Lenis** — buttery smooth scrolling, synced with GSAP ScrollTrigger
- **SplitType** — word/line text-reveal animations
- **React Router 6** — routing with animated transitions between every page
- **lucide-react** — icon set

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

Other scripts:

```bash
npm run build     # type-check + production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

> **Note:** dependency versions were chosen for React 19 compatibility (e.g. `@react-three/fiber@^9`, `@react-three/drei@^10`, `framer-motion@^12`, since their v8/v9/v11 predecessors only support React 18). If `npm install` reports peer-dependency conflicts, upgrade npm to a recent version — no `--legacy-peer-deps` flag should be required.

## Project Structure

```
src/
  assets/            Static images, fonts, icons (add your real brand assets here)
  components/
    layout/          Navbar, Footer, Buttons, Cursor, Loader, Theme, Animations, SmoothScroll
    ui/              Shared primitives: Container, SectionHeading, PageHero, TiltCard, ProjectCard, Lightbox, FaqItem, ErrorBoundary
    three/           React Three Fiber hero scene
  sections/          Home-page section building blocks (Hero, About, Services, Industries, Solutions,
                     CaseStudy, Projects, Testimonials, Impact, Clients, CTA, Contact) — reused across
                     detail pages wherever it makes sense (e.g. CTASection)
  pages/             One folder per route (Home, About, Services, ServiceDetails, Industries,
                     IndustryDetails, Solutions, SolutionDetails, CaseStudy, CaseStudyDetails,
                     Projects, ProjectCategory, Contact, NotFound)
  routes/            AppRoutes.tsx — route table + animated transitions
  context/           ThemeContext (light/dark, persisted to localStorage)
  hooks/             useMagnetic, useTilt, useMediaQuery, useMousePositionRef
  constants/         All site copy/data (services, industries, solutions, case studies, projects,
                     testimonials, team, stats, FAQs, navigation) — edit these to rebrand content
  utils/             cn() class helper, gsap setup, icon registry
  styles/            globals.css — design tokens (CSS variables) + base styles
```

## Customizing

- **Colors / theme**: edit the CSS variables in `src/styles/globals.css` (`:root` for light, `.dark` for dark). Every color in the app is a `hsl(var(--token) / <alpha>)` reference — nothing is hardcoded.
- **Typography**: font families are configured in `tailwind.config.js` (`fontFamily`) and loaded via Google Fonts in `index.html`.
- **Content**: all copy, services, industries, solutions, case studies, projects, testimonials, and team data live in `src/constants/*.ts`. Swap in real content/images there.
- **Images**: the design currently uses generated gradients as placeholders for photography (no stock imagery was available in this environment). Drop real assets into `src/assets/images` and swap them into the relevant components/constants.

## Known Follow-ups

- Wire the contact form to a real backend/email service (currently simulates success client-side).
- Replace gradient placeholders with real photography/brand assets once available.
- Wire the newsletter form in the footer to an actual ESP (Mailchimp, Klaviyo, etc.).
