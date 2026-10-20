import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/utils/icons";

interface MegaMenuItem {
  label: string;
  href: string;
  icon: string;
}

export default function MegaMenu({
  items,
  cta,
}: {
  items: MegaMenuItem[];
  cta: { label: string; href: string; description: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-full w-[min(90vw,760px)] -translate-x-1/2 pt-4"
    >
      <div className="glass grid grid-cols-3 gap-1 rounded-3xl p-3 shadow-soft">
        <div className="col-span-2 grid grid-cols-2 gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              data-cursor="hover"
              className="group flex items-center gap-3 rounded-2xl p-3 transition-colors duration-300 hover:bg-surface"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <DynamicIcon name={item.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="text-fluid-sm font-medium text-text">{item.label}</span>
            </Link>
          ))}
        </div>
        <Link
          to={cta.href}
          data-cursor="hover"
          className="group flex flex-col justify-between rounded-2xl bg-gradient-brand p-5 text-white"
        >
          <span className="text-fluid-sm font-semibold">{cta.label}</span>
          <span className="text-fluid-xs text-white/80">{cta.description}</span>
          <ArrowRight className="mt-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
