"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { EASE } from "@/components/motion";

export function Accordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div
            key={item.q}
            className={`rounded-xl border bg-white transition-all duration-300 ${
              isOpen
                ? "border-teal-500/40 shadow-[0_18px_40px_-24px_rgb(0_50_103/0.35)]"
                : "border-line shadow-[0_1px_2px_rgb(0_50_103/0.04)] hover:border-navy-200"
            }`}
          >
            <h3 className="!font-sans">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span
                  className={`text-[15.5px] font-semibold transition-colors sm:text-base ${isOpen ? "text-teal-700" : "text-navy-700 group-hover:text-teal-600"}`}
                >
                  {item.q}
                </span>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? "rotate-45 bg-teal-500 text-white"
                      : "bg-paper text-navy-700 group-hover:bg-teal-50 group-hover:text-teal-600"
                  }`}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
