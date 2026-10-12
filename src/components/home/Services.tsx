import { Phone } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ui";
import { services } from "@/lib/services";
import { site, telHref } from "@/lib/site";

export function Services() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-24 left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our services"
          title={
            <>
              Everything you need to move, <span className="accent">handled</span>.
            </>
          }
          sub="One team for packing, transport and storage — every job gets its own plan, crew and paperwork."
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-7">
          {services.map((service, i) => (
            <li key={service.slug}>
              <Reveal onView delay={(i % 4) * 0.08} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Help strip */}
        <Reveal onView>
          <div className="relative mt-14 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-navy-700 px-6 py-8 text-center shadow-[0_30px_60px_-30px_rgb(0_50_103/0.6)] sm:px-10 lg:flex-row lg:text-left">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-teal-500/30 blur-3xl"
            />
            <div className="relative">
              <p className="font-display text-2xl text-white sm:text-3xl">
                Not sure which service you <span className="accent !text-teal-300">need</span>?
              </p>
              <p className="mt-2 text-white/65">Tell us what you’re moving — we’ll suggest the right plan and price.</p>
            </div>
            <a
              href={telHref}
              className="btn btn-teal relative inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-teal-500 px-6 py-4 font-semibold text-white hover:bg-teal-600"
            >
              <Phone className="i-ring size-4" /> Talk to an expert
              <span className="hidden sm:inline"> · {site.phoneDisplay}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
