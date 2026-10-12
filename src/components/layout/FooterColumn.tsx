"use client";

import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

// Collapsible on mobile, always open on desktop.
export function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 lg:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left lg:pointer-events-none lg:py-0"
      >
        <span className="block text-xs leading-4 font-semibold uppercase tracking-[0.2em] text-white/55">{title}</span>
        <Plus className={`size-4 text-white/50 transition-transform duration-300 lg:hidden ${open ? "rotate-45" : ""}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 lg:grid-rows-[1fr] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 lg:pb-0 lg:pt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
