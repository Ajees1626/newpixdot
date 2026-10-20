import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { Button } from "@/components/layout/Buttons/Button";
import PixdotLogo from "@/components/ui/PixdotLogo";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9980] flex flex-col justify-between bg-background px-6 pb-10 pt-28"
    >
      <div className="mb-6">
        <PixdotLogo asLink variant="full" size="md" />
      </div>
      <nav className="flex flex-col gap-2">
        {NAV_LINKS.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to={link.href}
              onClick={onClose}
              data-cursor="hover"
              className="block border-b border-border py-4 font-display text-fluid-2xl tracking-tightest text-text"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="flex flex-col gap-6">
        <Button to="/contact" onClick={onClose} size="md" className="w-full sm:w-auto">
          Start a Project
        </Button>
        <p className="text-fluid-xs text-muted">{SITE.email}</p>
      </div>
    </motion.div>
  );
}
