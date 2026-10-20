import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, MEGA_MENU } from "@/constants/navigation";
import { Button } from "@/components/layout/Buttons/Button";
import ThemeToggle from "@/components/layout/Theme/ThemeToggle";
import PixdotLogo from "@/components/ui/PixdotLogo";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { cn } from "@/utils/cn";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const openMenu = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveMenu(label);
  };

  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      <header
        className={cn(
          "fixed left-1/2 z-[9990] w-[calc(100vw-32px)] -translate-x-1/2 transition-all duration-500 ease-premium md:w-[min(1400px,95vw)]",
          scrolled ? "top-4" : "top-6"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2 transition-all duration-500 ease-premium sm:px-6",
            scrolled
              ? "glass shadow-soft"
              : "border border-transparent bg-background/40 backdrop-blur-md dark:bg-background/35"
          )}
        >
            <PixdotLogo
              asLink
              variant="full"
              size="md"
              className="max-w-[148px] py-1 sm:max-w-[168px]"
              imgClassName="h-8 w-auto max-h-9 object-contain object-left sm:h-9"
            />

            <nav className="hidden items-center gap-1 xl:flex">
              {NAV_LINKS.map((link) => {
                const isServices = link.label === "Services";
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => isServices && openMenu(link.label)}
                    onMouseLeave={() => isServices && scheduleClose()}
                  >
                    <Link
                      to={link.href}
                      data-cursor="hover"
                      className={cn(
                        "relative flex items-center px-4 py-2 text-fluid-xs font-medium text-text",
                        isServices && "group"
                      )}
                    >
                      {link.label}
                      {isServices && (
                        <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-text transition-transform duration-300 ease-premium group-hover:scale-x-100" />
                      )}
                    </Link>
                    <AnimatePresence>
                      {isServices && activeMenu === link.label && (
                        <MegaMenu
                          items={MEGA_MENU.services}
                          cta={{
                            label: "Not sure what you need?",
                            description: "Book a free discovery call with our strategists.",
                            href: "/contact",
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 xl:flex">
              <ThemeToggle />
              <Button to="/contact" size="sm">
                Start a Project
              </Button>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                data-cursor="hover"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/50 text-text backdrop-blur-sm transition-colors hover:bg-card"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
      </header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
