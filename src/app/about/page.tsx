import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Handshake, HeartHandshake, ShieldCheck } from "lucide-react";
import { CountUp, ParallaxY, Reveal } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { Pill, SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Meet Your Moving Partner | International Movers and Storage" },
  description:
    "Know about International Movers and Storage, your Gurgaon-based relocation partner for home shifting, office relocation, domestic moving and secure storage.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: HeartHandshake,
    title: "Care first",
    text: "We handle every item like it belongs to our own family — because to you, it matters.",
  },
  { icon: BadgeCheck, title: "Honest pricing", text: "A fixed, written quote before the move. What we quote is what you pay." },
  {
    icon: ShieldCheck,
    title: "Safety, always",
    text: "Proper materials, trained hands and careful loading on every single job.",
  },
  {
    icon: Handshake,
    title: "One point of contact",
    text: "A move coordinator who stays with you from the first call to the last box.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
        label="About us"
        title={
          <>
            Your Partner in Every <span className="accent !text-teal-300">New Beginning</span>
          </>
        }
        quoteHref="/#quote"
        intro="A Gurgaon team of packers, movers and storage specialists — moving homes, offices and vehicles across the city, across India and overseas."
      />

      {/* Story */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
          <Reveal onView y={40} className="relative mr-2.5 sm:mr-0">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2.5 translate-y-3 rounded-2xl border-2 border-teal-500/35 sm:translate-x-5 sm:translate-y-5"
            />
            <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgb(0_50_103/0.55)]">
              <ParallaxY distance={30} className="absolute inset-0">
                <div className="relative size-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
                  <Image
                    src="/images/about-crew.jpg"
                    alt="Our crew loading a wrapped sofa into a branded moving truck"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-[92%_center]"
                  />
                </div>
              </ParallaxY>
            </div>
          </Reveal>

          <div>
            <Reveal onView>
              <Pill>Our story</Pill>
              <h2 className="mt-5 text-[2.2rem] leading-[1.1] sm:text-5xl">
                Built on <span className="accent">trust</span>, one move at a time.
              </h2>
            </Reveal>
            {/* TODO(client): replace with the company's real story (founding year, founder, journey). */}
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-muted">
              <Reveal onView delay={0.08}>
                <p>
                  We started with a simple idea: moving shouldn&rsquo;t be the most stressful week of your year. So we built a
                  team that plans properly, packs properly and turns up when it says it will.
                </p>
              </Reveal>
              <Reveal onView delay={0.14}>
                <p>
                  Today we move families and businesses across Gurgaon and Delhi NCR, to every major city in India and overseas —
                  and with our own storage facility, we can hold your goods safely when dates don&rsquo;t line up.
                </p>
              </Reveal>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {site.stats.slice(0, 4).map((s, i) => (
                <Reveal key={s.label} onView delay={0.1 + i * 0.06}>
                  <div className="rounded-xl border border-line bg-paper p-5 transition-colors hover:border-teal-500/40">
                    <p className="font-display text-4xl text-navy-700">
                      <CountUp value={s.value} suffixClass="text-teal-500" />
                    </p>
                    <p className="mt-1 text-sm text-muted">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="What we stand for"
            title={
              <>
                The way we <span className="accent">work</span>
              </>
            }
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal onView delay={i * 0.08} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgb(0_50_103/0.04),0_12px_32px_-16px_rgb(0_50_103/0.18)] transition-all duration-500 hover:-translate-y-1.5 hover:border-teal-500/40 hover:shadow-[0_28px_56px_-20px_rgb(0_50_103/0.3)]">
                    <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-teal-500 to-teal-300 transition-transform duration-500 group-hover:scale-x-100" />
                    <Icon
                      className="size-8 text-teal-500 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                      strokeWidth={1.5}
                    />
                    <h3 className="mt-5 text-xl transition-colors group-hover:text-teal-600">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 lg:py-24">
        <Reveal onView className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl bg-navy-700 px-6 py-12 text-center shadow-[0_30px_60px_-30px_rgb(0_50_103/0.6)] sm:px-12 lg:flex-row lg:justify-between lg:text-left">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -bottom-24 size-80 rounded-full bg-teal-500/30 blur-3xl"
            />
            <div className="relative">
              <p className="font-display text-3xl text-white sm:text-4xl">
                Ready when <span className="accent !text-teal-300">you</span> are.
              </p>
              <p className="mt-2 text-white/65">Get a free survey and a fixed quote for your move.</p>
            </div>
            <Link
              href="/#quote"
              className="btn btn-teal relative inline-flex shrink-0 items-center gap-2 rounded-lg bg-teal-500 px-7 py-4 font-semibold text-white hover:bg-teal-600"
            >
              Get a free quote <ArrowRight className="i-nudge size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
