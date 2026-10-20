import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border py-6">
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-fluid-base font-medium text-text">{question}</span>
        <ChevronDown
          className={cn("h-5 w-5 shrink-0 text-muted transition-transform duration-300", open && "rotate-180")}
        />
      </button>
      <div
        className="grid overflow-hidden transition-all duration-500 ease-premium"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-fluid-sm text-muted">{answer}</p>
        </div>
      </div>
    </div>
  );
}
