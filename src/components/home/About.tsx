import Link from "next/link";
import { ArrowRight, ShieldCheck, UsersRound, Warehouse } from "lucide-react";
import Image from "next/image";
import { CountUp, Float, ParallaxY, Reveal, ScrollWords } from "@/components/motion";
import { site } from "@/lib/site";

const points = [
  {
    icon: ShieldCheck,
    title: "Insured, end to end",
    text: "Transit insurance options on every move, so your goods are covered from pickup to delivery.",
  },
  {
    icon: Warehouse,
    title: "Our own storage",
    text: "A secure, monitored facility for short or long-term storage when your new place isn’t ready.",
  },
  {
    icon: UsersRound,
    title: "Trained in-house crew",
    text: "No outsourced labour. The team that packs your home is the team that delivers it.",
  },
];

export function About() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,var(--color-paper)_100%)] py-24 lg:py-32">
      {/* Faint dot texture, fading out towards the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[520px] w-[620px] [background-image:radial-gradient(var(--color-navy-200)_1.2px,transparent_1.2px)] [background-size:22px_22px] opacity-60 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20 lg:px-8">
        <div>
          <Reveal onView y={12}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-[13px] font-medium text-muted">
              <span className="size-1.5 rounded-full bg-teal-500" />
              About us
            </span>
          </Reveal>

          <h2 className="sr-only">About International Movers and Storage</h2>
          <ScrollWords
            className="mt-7 font-display text-[1.85rem] leading-[1.22] font-medium tracking-[-0.015em] text-navy-700 sm:text-[2.5rem] lg:text-[2.75rem]"
            text="We don’t just move boxes. We move *homes,* offices and the things that matter most — packed with *care,* carried with respect and delivered on time."
          />

          <Reveal onView delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              From a single room in Gurgaon to a full household headed overseas, every move gets its own plan, crew and paperwork
              — with our own storage facility for when timing doesn’t line up.
            </p>
          </Reveal>

          <Reveal onView delay={0.2}>
            <Link
              href="/about"
              className="btn mt-10 inline-flex items-center gap-2 rounded-lg border border-navy-700/15 px-6 py-3.5 font-semibold text-navy-700 hover:border-navy-700 hover:bg-navy-700 hover:text-white"
            >
              More about us <ArrowRight className="i-nudge size-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal onView y={40} className="relative mr-2.5 sm:mr-0">
          {/* Offset frame + dotted patch behind the photo */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-2.5 translate-y-3 rounded-2xl border-2 border-teal-500/35 sm:translate-x-5 sm:translate-y-5"
          />
          <div
            aria-hidden
            className="absolute -top-6 -right-6 size-32 [background-image:radial-gradient(var(--color-teal-500)_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-50"
          />
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgb(0_50_103/0.55)] ring-1 ring-navy-700/10">
            <ParallaxY distance={30} className="absolute inset-0">
              <div className="relative size-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
                <Image
                  src="/images/about-crew.jpg"
                  alt="International Movers and Storage crew loading a bubble-wrapped sofa into a branded moving truck"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[92%_center]"
                />
              </div>
            </ParallaxY>
          </div>

          <Float className="absolute -bottom-8 left-3 sm:-left-10" delay={0.5}>
            <div className="rounded-xl bg-white p-5 shadow-[0_24px_60px_-20px_rgb(0_50_103/0.35)] ring-1 ring-line sm:p-6">
              <p className="font-display text-4xl font-medium tracking-tight text-navy-700 sm:text-5xl">
                <CountUp value={site.stats[3].value} />
              </p>
              <p className="mt-1 text-sm text-muted">sq. ft. secure storage</p>
            </div>
          </Float>

          <Float className="absolute top-6 left-3 sm:-left-8" delay={1.6}>
            <div className="flex items-center gap-2.5 rounded-full bg-navy-950/80 py-2.5 pr-5 pl-3 text-sm font-medium text-white shadow-lg ring-1 ring-white/10 backdrop-blur">
              <span className="grid size-7 place-items-center rounded-full bg-teal-500">
                <ShieldCheck className="size-4" />
              </span>
              Fully insured moves
            </div>
          </Float>
        </Reveal>

        {/* Key points — full width under both columns */}
        <div className="grid gap-5 sm:grid-cols-3 lg:col-span-2 lg:mt-6 lg:gap-6">
          {points.map(({ icon: Icon, ...p }, i) => (
            <Reveal key={p.title} onView delay={0.1 + i * 0.12}>
              <div className="group relative h-full cursor-default overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgb(0_50_103/0.04),0_12px_32px_-16px_rgb(0_50_103/0.18)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-teal-500/40 hover:shadow-[0_2px_4px_rgb(0_50_103/0.05),0_28px_56px_-20px_rgb(0_50_103/0.3)]">
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-teal-500 to-teal-300 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="pointer-events-none absolute top-4 right-6 font-display text-6xl leading-none font-medium text-navy-700/[0.06] italic transition-colors duration-500 group-hover:text-teal-500/15">
                  0{i + 1}
                </span>
                <Icon
                  className="size-8 text-teal-500 transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 text-[1.35rem] transition-colors duration-300 group-hover:text-teal-600">{p.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
