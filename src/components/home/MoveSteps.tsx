"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { EASE, Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ui";

const steps = [
  {
    title: "Free survey & quote",
    text: "Tell us what’s moving. We survey in person or on a video call and send a fixed, written quote — no hidden charges.",
    image: "/images/services/household-shifting.jpg",
  },
  {
    title: "Packing day",
    text: "Our crew packs room by room with quality materials, labels every box and dismantles furniture where needed.",
    image: "/images/services/packing-unpacking.jpg",
  },
  {
    title: "Safe transport",
    text: "Goods are loaded carefully and moved on the agreed date, with updates from your move coordinator along the way.",
    image: "/images/services/domestic-relocation.jpg",
  },
  {
    title: "Delivery & setup",
    text: "We unload, reassemble and place everything where you want it. New place not ready? We’ll store it until it is.",
    image: "/images/services/local-shifting.jpg",
  },
];

const heading = (
  <SectionHeading
    align="left"
    label="How it works"
    title={
      <>
        Your move in four <span className="accent">simple</span> steps
      </>
    }
    sub="One coordinator, one crew and one clear plan — from the first call to the last box."
  />
);

export function MoveSteps() {
  return (
    <section className="relative bg-white">
      <Pinned />
      <Stacked />
    </section>
  );
}

/** Desktop: the section pins and scroll drives the active step. */
function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
  });

  function goTo(i: number) {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / steps.length), behavior: "smooth" });
  }

  return (
    <div ref={ref} className="relative hidden h-[340vh] lg:block">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[0.85fr_1.15fr] items-center gap-16 px-8 pt-16">
          <div>
            {heading}

            <ol className="relative mt-10">
              {/* Track + fill */}
              <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-line" />
              <motion.span
                aria-hidden
                style={{ scaleY: progress }}
                className="absolute top-5 bottom-5 left-5 w-px origin-top bg-gradient-to-b from-teal-500 to-teal-300"
              />

              {steps.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={s.title} className="relative">
                    <button type="button" onClick={() => goTo(i)} className="group flex w-full gap-5 py-3 text-left">
                      <span
                        className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full font-display italic ring-4 ring-white transition-all duration-500 ${
                          on
                            ? "scale-110 bg-teal-500 text-white shadow-[0_8px_20px_-6px_rgb(0_160_152/0.7)]"
                            : done
                              ? "bg-navy-700 text-white"
                              : "bg-paper text-navy-700 group-hover:bg-navy-50"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="pt-1.5">
                        <span
                          className={`block font-display text-xl transition-colors duration-300 ${
                            on ? "text-navy-700" : "text-navy-700/45 group-hover:text-navy-700/75"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span
                          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                            on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-md pt-2 text-[15px] leading-relaxed text-muted">{s.text}</span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Photo stage */}
          <div>
            <div className="relative">
              <div aria-hidden className="absolute inset-0 translate-x-5 translate-y-5 rounded-2xl border-2 border-teal-500/30" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900 shadow-[0_40px_80px_-30px_rgb(0_50_103/0.55)] ring-1 ring-navy-700/10">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <Image src={steps[active].image} alt={steps[active].title} fill sizes="55vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/0 to-transparent" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute bottom-6 left-6 flex items-center gap-4 rounded-xl border border-white/15 bg-navy-950/55 py-3 pr-6 pl-3 text-white backdrop-blur-md"
                  >
                    <span className="font-display text-4xl text-teal-300 italic">0{active + 1}</span>
                    <span className="leading-tight">
                      <span className="block text-xs tracking-[0.18em] text-white/60 uppercase">Step {active + 1} of 4</span>
                      <span className="block font-display text-lg">{steps[active].title}</span>
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Step dots */}
            <div className="mt-10 flex justify-center gap-2">
              {steps.map((s, i) => (
                <span
                  key={s.title}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-teal-500" : "w-1.5 bg-navy-200"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile/tablet: a simple vertical timeline — pinning feels janky on touch. */
function Stacked() {
  return (
    <div className="px-4 py-24 sm:px-6 lg:hidden">
      {heading}
      <ol className="relative mt-12 space-y-10 before:absolute before:top-5 before:bottom-5 before:left-5 before:w-px before:bg-gradient-to-b before:from-teal-500 before:via-navy-200 before:to-transparent">
        {steps.map((s, i) => (
          <li key={s.title}>
            <Reveal onView delay={0.05} className="relative flex gap-5">
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-navy-700 font-display text-white italic ring-4 ring-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 pt-1.5">
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
                <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl shadow-[0_20px_40px_-24px_rgb(0_50_103/0.5)]">
                  <Image src={s.image} alt={s.title} fill sizes="90vw" className="object-cover" />
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
