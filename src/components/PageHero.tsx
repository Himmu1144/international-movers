import Link from "next/link";
import { DotMap } from "@/components/DotMap";
import { ArrowRight, Check, ChevronRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { MaskLine, Reveal } from "@/components/motion";
import { Pill } from "@/components/ui";
import { site, telHref } from "@/lib/site";

export type Crumb = { href: string; label: string };

/** Dark hero for inner pages. Sits under the transparent header like the homepage hero. */
export function PageHero({
  crumbs,
  label,
  title,
  intro,
  aside,
  ticks = ["Free pre-move survey", "Fixed written quote", "Insured moves"],
  quoteHref = "#quote",
  actions = true,
}: {
  crumbs: Crumb[];
  label: string;
  title: ReactNode;
  intro: string;
  aside?: ReactNode;
  ticks?: string[];
  quoteHref?: string;
  /** Hide the CTA buttons and ticks (e.g. legal pages). */
  actions?: boolean;
}) {
  return (
    <section className="relative -mt-[77px] overflow-hidden bg-navy-950 pt-[77px] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="breathe absolute -left-40 top-[300px] size-[520px] rounded-full bg-teal-500/20 blur-[140px]" />
        <div className="breathe absolute -right-36 -top-40 size-[640px] rounded-full bg-navy-500/40 blur-[160px] [animation-delay:-4s]" />
        <div className="absolute top-10 left-1/2 w-[1500px] max-w-none -translate-x-[35%] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
          <DotMap src="/world-dots.webp" className="aspect-[1800/665] w-full opacity-[0.07]" />
        </div>
      </div>

      <div
        className={`relative mx-auto grid max-w-7xl gap-12 px-4 pt-10 pb-16 sm:px-6 lg:items-center lg:px-8 lg:pt-14 lg:pb-24 ${
          aside ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : ""
        }`}
      >
        <div>
          <Reveal y={8}>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-white/55">
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="size-3.5 text-white/30" />}
                    {i < crumbs.length - 1 ? (
                      <Link href={c.href} className="link-line hover:text-white">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-teal-300">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <Reveal y={10} delay={0.08} className="mt-7">
            <Pill light>{label}</Pill>
          </Reveal>

          <h1 className="mt-6 text-[2.5rem] leading-[1.05] !text-white sm:text-[3.4rem] lg:text-[3.9rem]">
            <MaskLine delay={0.15}>{title}</MaskLine>
          </h1>

          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{intro}</p>
          </Reveal>

          {actions && (
            <>
              <Reveal delay={0.5} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={quoteHref}
                  className="btn btn-teal inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-4 font-semibold hover:bg-teal-600"
                >
                  Get Free Quote <ArrowRight className="i-nudge size-4" />
                </a>
                <a
                  href={telHref}
                  className="btn btn-ghost inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/20 px-6 py-4 font-semibold hover:border-teal-300/60 hover:bg-white/5"
                >
                  <Phone className="i-ring size-4 text-teal-300" /> Call {site.phoneDisplay}
                </a>
              </Reveal>

              <Reveal delay={0.6}>
                <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                  {ticks.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="grid size-5 place-items-center rounded-full bg-teal-500/20 text-teal-300">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </>
          )}
        </div>

        {aside && (
          <Reveal delay={0.35} y={30}>
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}
