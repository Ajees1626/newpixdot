import { SERVICES } from "./services";
import { INDUSTRIES } from "./industries";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const MEGA_MENU = {
  services: SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}`, icon: s.icon })),
  industries: INDUSTRIES.map((i) => ({ label: i.title, href: `/industries/${i.slug}`, icon: i.icon })),
};
