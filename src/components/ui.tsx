import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "@/components/motion";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

type Variant = "primary" | "navy" | "outline" | "ghost-light";

const variants: Record<Variant, string> = {
  primary: "bg-teal-500 text-white hover:bg-teal-600 shadow-[0_8px_20px_-8px_rgb(0_160_152/0.7)]",
  navy: "bg-navy-700 text-white hover:bg-navy-800",
  outline: "border border-navy-700/20 text-navy-700 hover:border-navy-700 hover:bg-navy-50",
  "ghost-light": "border border-white/25 text-white hover:bg-white/10",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { href: string; variant?: Variant } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Pill({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-medium ${
        light
          ? "border-white/15 bg-white/5 text-white/80"
          : "border-line bg-white text-muted shadow-[0_1px_2px_rgb(0_50_103/0.05)]"
      }`}
    >
      <span className={`size-1.5 rounded-full ${light ? "bg-teal-300" : "bg-teal-500"}`} />
      {children}
    </span>
  );
}

/** Section intro: pill label, serif title (wrap the accent word in <span className="accent">), optional sub. */
export function SectionHeading({
  label,
  title,
  sub,
  align = "center",
  light = false,
}: {
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal onView y={12}>
        <Pill light={light}>{label}</Pill>
      </Reveal>
      <Reveal onView delay={0.08}>
        <h2 className={`mt-5 text-[2.2rem] leading-[1.1] sm:text-5xl ${light ? "!text-white" : ""}`}>{title}</h2>
      </Reveal>
      {sub && (
        <Reveal onView delay={0.16}>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? "text-white/65" : "text-muted"}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  );
}
