"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Phone, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { EASE, Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ui";
import { site, telHref, waHref } from "@/lib/site";

const faqs = [
  {
    q: "How much do packers and movers charge in Gurgaon?",
    a: "It depends on how much you’re moving, the distance, floor and lift access, and extras like dismantling or storage. We do a free survey and give you a fixed, written quote — what we quote is what you pay.",
  },
  {
    q: "How early should I book my move?",
    a: "A week ahead is ideal, especially for weekends, month-end and festive season. For urgent moves, call us — we can often arrange it within a day or two.",
  },
  {
    q: "Can you finish a local move in one day?",
    a: "Yes. Most moves within Gurgaon and Delhi NCR are packed, moved and unloaded the same day, depending on the size of the home and building access.",
  },
  {
    q: "Are my goods insured during the move?",
    a: "Transit insurance is available on request. Our team will explain the cover and cost when you book, so you can decide what suits you.",
  },
  {
    q: "What shouldn’t I pack with my household goods?",
    a: "Keep cash, jewellery, important documents, passports and medicines with you. We also can’t carry gas cylinders, fuel, chemicals or anything flammable.",
  },
  {
    q: "Can you store my things if my new place isn’t ready?",
    a: "Yes. We store goods in our own secure facility for as long as you need — a few days or several months — and deliver whenever you’re ready.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,var(--color-paper)_100%)] py-24 lg:py-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-[480px] w-[560px] [background-image:radial-gradient(var(--color-navy-200)_1.2px,transparent_1.2px)] [background-size:22px_22px] opacity-50 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="FAQ"
          title={
            <>
              Questions, <span className="accent">answered</span>
            </>
          }
          sub="The things people usually ask before booking. Tap one — or just ask us."
        />

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          {/* Chat mockup (desktop) */}
          <div className="hidden lg:sticky lg:top-28 lg:block">
            <Reveal onView y={30}>
              <ChatMock index={open} />
            </Reveal>
          </div>

          {/* Questions */}
          <ul className="space-y-3">
            {faqs.map((f, i) => (
              <li key={f.q}>
                <Reveal onView delay={i * 0.06} y={18}>
                  <FaqItem n={i + 1} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
                </Reveal>
              </li>
            ))}
            <li className="pt-3 lg:hidden">
              <Reveal onView>
                <HelpStrip />
              </Reveal>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ n, item, open, onToggle }: { n: number; item: (typeof faqs)[number]; open: boolean; onToggle: () => void }) {
  const id = `faq-${n}`;
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
        open
          ? "border-transparent bg-white shadow-[0_24px_50px_-26px_rgb(0_50_103/0.45)]"
          : "border-line bg-white/70 hover:-translate-y-0.5 hover:border-navy-200 hover:bg-white hover:shadow-[0_14px_30px_-22px_rgb(0_50_103/0.35)]"
      }`}
    >
      {/* Animated accent bar */}
      <motion.span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 origin-top bg-gradient-to-b from-teal-500 to-teal-300"
        initial={false}
        animate={{ scaleY: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      {/* Soft glow when open */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-teal-500/10 blur-3xl"
        initial={false}
        animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.6 }}
        transition={{ duration: 0.6 }}
      />

      <h3 className="!font-sans">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="relative flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-5 sm:px-6"
        >
          <span
            className={`font-display text-2xl italic transition-colors duration-300 sm:text-3xl ${
              open ? "text-teal-500" : "text-navy-700/20 group-hover:text-navy-700/40"
            }`}
          >
            {String(n).padStart(2, "0")}
          </span>
          <span
            className={`flex-1 text-[15.5px] font-semibold transition-all duration-300 sm:text-[17px] ${
              open ? "text-navy-700" : "text-navy-700/85 group-hover:translate-x-1 group-hover:text-navy-700"
            }`}
          >
            {item.q}
          </span>
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ${
              open
                ? "rotate-[135deg] bg-teal-500 text-white shadow-[0_8px_18px_-6px_rgb(0_160_152/0.7)]"
                : "bg-paper text-navy-700 group-hover:rotate-90 group-hover:bg-navy-700 group-hover:text-white"
            }`}
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
              className="relative pr-6 pb-6 pl-[4.25rem] text-[15px] leading-relaxed text-muted sm:pl-[5.25rem]"
            >
              {item.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Phone-style chat that replays the open question as a conversation.
 *  Keyed by question so every switch starts from a fresh state. */
function ChatMock({ index }: { index: number }) {
  return <ChatPlayer key={index} index={index} />;
}

function ChatPlayer({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const item = faqs[index] ?? null;
  const [stage, setStage] = useState<"ask" | "typing" | "reply">("ask");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView || !item) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStage("typing"), 650));
    timers.push(
      setTimeout(() => {
        setStage("reply");
        let i = 0;
        const words = item.a.split(" ");
        const tick = () => {
          i += 1;
          setTyped(words.slice(0, i).join(" "));
          if (i < words.length) timers.push(setTimeout(tick, 28));
        };
        tick();
      }, 1700),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, item]);

  return (
    <div ref={ref} className="relative mx-auto max-w-md">
      {/* Decorative frame */}
      <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-teal-500/30" />

      <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 shadow-[0_40px_80px_-30px_rgb(0_50_103/0.6)] ring-1 ring-navy-700/20">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b border-white/10 bg-navy-900 px-5 py-4">
          <span className="relative grid size-10 place-items-center rounded-full bg-white p-1.5">
            <Image src="/logo.png" alt="" width={60} height={18} className="h-auto w-full" />
            <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full bg-[#25D366] ring-2 ring-navy-900" />
          </span>
          <span className="leading-tight">
            <span className="block font-semibold text-white">Move coordinator</span>
            <span className="block text-xs text-teal-300">{stage === "typing" ? "typing…" : "online"}</span>
          </span>
        </div>

        {/* Messages */}
        <div className="relative h-[320px] space-y-3 overflow-hidden bg-[radial-gradient(var(--color-navy-800)_1px,transparent_1px)] [background-size:16px_16px] p-5">
          <AnimatePresence mode="popLayout">
            {item && (
              <motion.div
                key={`q-${index}`}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="ml-auto w-fit max-w-[85%] origin-bottom-right rounded-2xl rounded-br-md bg-teal-500 px-4 py-3 text-[15px] leading-snug text-white shadow-lg"
              >
                {item.q}
                <span className="mt-1 block text-right text-[10px] text-white/70">✓✓</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {item && stage === "typing" && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex w-fit gap-1.5 rounded-2xl rounded-bl-md bg-white/10 px-4 py-3.5"
              >
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="size-2 rounded-full bg-white/70"
                    animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </motion.div>
            )}
            {item && stage === "reply" && (
              <motion.div
                key={`a-${index}`}
                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="w-fit max-w-[88%] origin-bottom-left rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[15px] leading-relaxed text-ink shadow-lg"
              >
                {typed}
                {typed.length < item.a.length && (
                  <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-teal-500" />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!item && <p className="pt-32 text-center text-sm text-white/55">Pick a question →</p>}
        </div>

        {/* Input bar = real CTAs */}
        <div className="flex items-center gap-2 border-t border-white/10 bg-navy-900 p-3">
          <span className="flex-1 truncate rounded-full bg-white/5 px-4 py-2.5 text-sm text-white/55">Ask us anything…</span>
          <a
            href={waHref}
            target="_blank"
            rel="noopener"
            aria-label="Chat on WhatsApp"
            className="grid size-10 place-items-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110"
          >
            <WhatsAppIcon className="size-5" />
          </a>
          <a
            href={telHref}
            aria-label="Call us"
            className="ring-hover grid size-10 place-items-center rounded-full bg-teal-500 text-white transition-transform hover:scale-110"
          >
            <Phone className="i-ring size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function HelpStrip() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-navy-700 p-6 text-center text-white sm:flex-row sm:justify-between sm:text-left">
      <div>
        <p className="font-display text-xl">
          Still have <span className="accent !text-teal-300">questions</span>?
        </p>
        <p className="mt-1 text-sm text-white/65">{site.hours}</p>
      </div>
      <div className="grid w-full grid-cols-2 gap-3 sm:w-auto">
        <a
          href={telHref}
          className="btn btn-teal inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-5 py-3 text-sm font-semibold"
        >
          <Phone className="i-ring size-4" /> Call
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener"
          className="btn inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-semibold"
        >
          <WhatsAppIcon className="size-4" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
