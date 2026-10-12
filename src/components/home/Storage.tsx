import Link from "next/link";
import { ArrowRight, Boxes, CalendarClock, Cctv, Droplets, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { CountUp, Float, ParallaxY, Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

const features = [
  { icon: Cctv, title: "CCTV monitored", text: "Round-the-clock cameras and controlled access." },
  { icon: Droplets, title: "Clean & dry", text: "Protected from dust, damp and pests." },
  { icon: Boxes, title: "Itemised inventory", text: "Every item listed, so you know what’s stored." },
  { icon: CalendarClock, title: "Flexible duration", text: "A week, a month or a year — your call." },
];

const useCases = ["Between homes", "Renovating", "Moving abroad", "Business stock", "Extra space"];

export function Storage() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="breathe absolute -right-32 top-1/4 size-[520px] rounded-full bg-teal-500/20 blur-[140px]" />
        <div className="absolute -left-40 bottom-10 size-[440px] rounded-full bg-navy-500/30 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20 lg:px-8">
        <div>
          <SectionHeading
            light
            align="left"
            label="Storage facility"
            title={
              <>
                Storage you can <span className="accent !text-teal-300">trust</span>, for as long as you need.
              </>
            }
            sub="When the dates don’t line up, your belongings wait safely with us — packed, listed and stored in our own facility, then delivered when you’re ready."
          />

          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {features.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal onView delay={0.1 + i * 0.08} className="h-full">
                  <div className="group h-full rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur sm:p-5 transition-all duration-400 hover:-translate-y-1 hover:border-teal-300/50 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_-20px_rgb(0_160_152/0.5)]">
                    <Icon
                      className="size-7 text-teal-300 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                    <h3 className="mt-3 text-base !text-white sm:mt-4 sm:text-lg">{title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/60 sm:text-[15px]">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal onView delay={0.2}>
            <p className="mt-10 text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">Who it’s for</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {useCases.map((u) => (
                <li
                  key={u}
                  className="cursor-default rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/75 transition-colors duration-300 hover:border-teal-300 hover:bg-teal-300/10 hover:text-white"
                >
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal onView delay={0.25} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services/storage-warehousing"
              className="btn btn-teal inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-4 font-semibold hover:bg-teal-600"
            >
              Explore storage <ArrowRight className="i-nudge size-4" />
            </Link>
            <Link
              href="#quote"
              className="btn btn-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-4 font-semibold hover:border-teal-300/60 hover:bg-white/5"
            >
              Get a storage quote
            </Link>
          </Reveal>
        </div>

        <Reveal onView y={40} className="relative mx-2 sm:mx-6 lg:mx-0">
          <div aria-hidden className="absolute inset-0 -translate-x-4 translate-y-4 rounded-2xl border-2 border-teal-300/25" />
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_40px_90px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/10">
            <ParallaxY distance={30} className="absolute inset-0">
              <div className="relative size-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
                <Image
                  src="/images/storage-facility.jpg"
                  alt="International Movers and Storage facility with wrapped furniture and labelled cartons in a storage bay"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </ParallaxY>
          </div>

          <Float className="absolute -bottom-8 -left-2 sm:-left-8" delay={0.4}>
            <div className="rounded-xl border border-white/15 bg-navy-900/80 p-5 shadow-2xl backdrop-blur-md sm:p-6">
              <p className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
                <CountUp value={site.stats[3].value} />
              </p>
              <p className="mt-1 text-sm text-white/60">sq. ft. of secure space</p>
            </div>
          </Float>

          <Float className="absolute bottom-28 -right-2 sm:-right-6" delay={1.4}>
            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/95 py-3 pr-5 pl-3 text-navy-700 shadow-2xl">
              <span className="grid size-9 place-items-center rounded-lg bg-teal-500 text-white">
                <ShieldCheck className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold">24×7 monitored</span>
                <span className="block text-xs text-muted">CCTV + controlled access</span>
              </span>
            </div>
          </Float>
        </Reveal>
      </div>
    </section>
  );
}
