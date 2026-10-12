"use client";

import Link from "next/link";
import { DotMap } from "@/components/DotMap";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, FileText, Globe2, House, MapPin, Ship } from "lucide-react";
import { useState } from "react";
import { EASE, Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ui";

type Pin = { name: string; x: number; y: number; note?: string };

/** World routes arc upward (like flight paths); India routes bow sideways so north–south lines fan out. */
function arcPath(from: Pin, to: Pin, mode: "lift" | "bow") {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy);
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  if (mode === "lift") {
    const lift = Math.min(240, len * 0.32);
    return `M${from.x} ${from.y} Q${mx} ${Math.min(from.y, to.y) - lift} ${to.x} ${to.y}`;
  }
  const k = 0.22;
  return `M${from.x} ${from.y} Q${mx + (dy / len) * len * k} ${my - (dx / len) * len * k} ${to.x} ${to.y}`;
}
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/* ───────── India data (coords in the 553 × 618 space of /public/india-dots.webp) ───────── */
const IN_W = 553;
const IN_H = 618;
const GURGAON: Pin = { name: "Gurgaon", x: 171, y: 177 };
// Approximate road distances from Gurgaon.
const indiaRoutes: Pin[] = [
  { name: "Chandigarh", x: 167, y: 131, note: "≈ 250 km" },
  { name: "Jaipur", x: 148, y: 208, note: "≈ 240 km" },
  { name: "Lucknow", x: 244, y: 209, note: "≈ 560 km" },
  { name: "Ahmedabad", x: 88, y: 286, note: "≈ 900 km" },
  { name: "Mumbai", x: 94, y: 364, note: "≈ 1,400 km" },
  { name: "Pune", x: 112, y: 376, note: "≈ 1,450 km" },
  { name: "Hyderabad", x: 198, y: 398, note: "≈ 1,550 km" },
  { name: "Kolkata", x: 381, y: 295, note: "≈ 1,500 km" },
  { name: "Bengaluru", x: 182, y: 487, note: "≈ 2,100 km" },
  { name: "Chennai", x: 231, y: 484, note: "≈ 2,200 km" },
];
const popularRoutes = ["Bengaluru", "Mumbai", "Pune", "Hyderabad", "Chennai", "Kolkata"];
const ncrAreas = [
  "DLF Phase 1–5",
  "Golf Course Road",
  "Sohna Road",
  "Sushant Lok",
  "South City",
  "Cyber City",
  "Udyog Vihar",
  "New Gurgaon",
  "Delhi",
  "Noida",
  "Faridabad",
];

/* ───────── World data (coords in the 1800 × 665 space of /public/world-dots.webp) ───────── */
const W_W = 1800;
const W_H = 665;
const wp = (name: string, lon: number, lat: number, note: string): Pin => ({ name, x: (lon + 170) * 5, y: (75 - lat) * 5, note });
const WORLD_ORIGIN = wp("Gurgaon", 77.03, 28.46, "");
// TODO(client): confirm the countries they actually serve.
const worldRoutes: Pin[] = [
  wp("Dubai", 55.27, 25.2, "UAE"),
  wp("Doha", 51.53, 25.29, "Qatar"),
  wp("London", -0.12, 51.5, "United Kingdom"),
  wp("Frankfurt", 8.68, 50.11, "Germany"),
  wp("Toronto", -79.38, 43.65, "Canada"),
  wp("New York", -74.0, 40.71, "USA"),
  wp("Singapore", 103.82, 1.35, "Singapore"),
  wp("Sydney", 151.21, -33.87, "Australia"),
];
const worldPoints = [
  { icon: FileText, title: "Documentation help", text: "Inventory and customs paperwork, prepared with you." },
  { icon: Ship, title: "Sea or air freight", text: "Full container, shared container or air." },
  { icon: House, title: "Door to door", text: "Packed at your home here, delivered there." },
];

/* ───────── Shared interactive map ───────── */
function RouteMap({
  src,
  w,
  h,
  origin,
  pins,
  active,
  setActive,
  originLabel,
  dotOpacity,
}: {
  src: string;
  w: number;
  h: number;
  origin: Pin;
  pins: Pin[];
  active: string | null;
  setActive: (n: string | null) => void;
  originLabel: string;
  dotOpacity: string;
}) {
  const current = pins.find((p) => p.name === active);
  return (
    <div className="relative" style={{ aspectRatio: `${w} / ${h}` }} onMouseLeave={() => setActive(null)}>
      <DotMap src={src} className={`absolute inset-0 size-full ${dotOpacity}`} />
      <svg viewBox={`0 0 ${w} ${h}`} aria-hidden className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id={`route-${w}`} x1="0" x2="1">
            <stop offset="0" stopColor="#5cccc5" stopOpacity="0.25" />
            <stop offset="1" stopColor="#5cccc5" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        {pins.map((p, i) => (
          <motion.path
            key={p.name}
            d={arcPath(origin, p, w > 1000 ? "lift" : "bow")}
            fill="none"
            stroke={`url(#route-${w})`}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            animate={{ strokeWidth: active === p.name ? 2.6 : 1.3 }}
            transition={{ pathLength: { duration: 1.3, delay: 0.15 + i * 0.09, ease: EASE }, strokeWidth: { duration: 0.25 } }}
            style={{ opacity: active === null || active === p.name ? 1 : 0.2, transition: "opacity 0.3s" }}
          />
        ))}
      </svg>

      {/* Origin */}
      <span
        className="absolute grid size-4 -translate-x-1/2 -translate-y-1/2 place-items-center"
        style={{ left: pct(origin.x, w), top: pct(origin.y, h) }}
      >
        <span className="absolute size-full animate-ping rounded-full bg-teal-300/50 [animation-duration:2.2s]" />
        <span className="relative size-3 rounded-full bg-teal-300 ring-2 ring-navy-950" />
      </span>
      <span
        className="pointer-events-none absolute translate-x-3 -translate-y-1/2 rounded-full bg-teal-700 px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap sm:text-xs"
        style={{ left: pct(origin.x, w), top: pct(origin.y, h) }}
      >
        {originLabel}
      </span>

      {/* Destination pins */}
      {pins.map((p) => (
        <button
          key={p.name}
          type="button"
          aria-label={p.name}
          onMouseEnter={() => setActive(p.name)}
          onFocus={() => setActive(p.name)}
          onClick={() => setActive(active === p.name ? null : p.name)}
          className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center"
          style={{ left: pct(p.x, w), top: pct(p.y, h) }}
        >
          <span
            className={`absolute size-full rounded-full bg-teal-300/30 transition-transform duration-300 ${active === p.name ? "scale-150" : "scale-50"}`}
          />
          <span
            className={`relative size-2 rounded-full ring-2 transition-all duration-300 ${
              active === p.name ? "scale-150 bg-white ring-teal-300" : "bg-teal-300 ring-navy-950"
            }`}
          />
        </button>
      ))}

      {/* Tooltip */}
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="pointer-events-none absolute z-10 w-max -translate-x-1/2 -translate-y-[calc(100%+16px)] rounded-xl bg-white px-4 py-2.5 text-navy-700 shadow-2xl"
            style={{ left: pct(current.x, w), top: pct(current.y, h) }}
          >
            <p className="font-display text-lg leading-none">{current.name}</p>
            {current.note && <p className="mt-1 text-xs text-muted">{current.note}</p>}
            <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────── Tab panels ───────── */
function IndiaPanel() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
      <div className="mx-auto w-full max-w-[440px]">
        <RouteMap
          src="/india-dots.webp"
          w={IN_W}
          h={IN_H}
          origin={GURGAON}
          pins={indiaRoutes}
          active={active}
          setActive={setActive}
          originLabel="Gurgaon HQ"
          dotOpacity="opacity-[0.2]"
        />
      </div>

      <div>
        <h3 className="text-2xl !text-white">
          Gurgaon &amp; <span className="accent !text-teal-300">Delhi NCR</span>
        </h3>
        <p className="mt-2 text-white/60">Same-day local moves across every sector and neighbourhood.</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {ncrAreas.map((a) => (
            <li
              key={a}
              className="cursor-default rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/75 transition-colors duration-300 hover:border-teal-300/70 hover:text-white"
            >
              {a}
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-2xl !text-white">
          Popular <span className="accent !text-teal-300">routes</span>
        </h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {popularRoutes.map((city) => {
            const r = indiaRoutes.find((p) => p.name === city)!;
            const on = active === city;
            return (
              <li key={city}>
                <Link
                  href="/services/domestic-relocation"
                  onMouseEnter={() => setActive(city)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(city)}
                  onBlur={() => setActive(null)}
                  className={`group flex items-center justify-between rounded-lg border px-4 py-3 transition-all duration-300 ${
                    on ? "border-teal-300/60 bg-white/[0.08]" : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  }`}
                >
                  <span className="text-[15px]">
                    <span className="text-white/55">Gurgaon</span>
                    <ArrowRight className="mx-1.5 inline size-3.5 text-teal-300" />
                    <span className="font-medium">{city}</span>
                  </span>
                  <span className="text-xs text-white/65">{r.note}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/services/domestic-relocation"
            className="btn btn-teal inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 font-semibold hover:bg-teal-600"
          >
            Domestic relocation <ArrowRight className="i-nudge size-4" />
          </Link>
          <Link
            href="/services/local-shifting"
            className="btn btn-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 font-semibold hover:border-teal-300/60 hover:bg-white/5"
          >
            Local shifting
          </Link>
        </div>
      </div>
    </div>
  );
}

function WorldPanel() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <div className="mx-auto max-w-5xl">
        <RouteMap
          src="/world-dots.webp"
          w={W_W}
          h={W_H}
          origin={WORLD_ORIGIN}
          pins={worldRoutes}
          active={active}
          setActive={setActive}
          originLabel="Gurgaon HQ"
          dotOpacity="opacity-[0.16]"
        />
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {worldRoutes.map((d) => (
          <li key={d.name}>
            <button
              type="button"
              onMouseEnter={() => setActive(d.name)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === d.name ? null : d.name)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-300 ${
                active === d.name
                  ? "border-teal-300 bg-teal-300/15 text-white"
                  : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {d.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {worldPoints.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-400 hover:-translate-y-1 hover:border-teal-300/50 hover:bg-white/[0.07]"
          >
            <Icon className="size-6 text-teal-300 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
            <h4 className="mt-3 text-lg !text-white">{title}</h4>
            <p className="mt-1 text-[15px] text-white/60">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/services/international-relocation"
          className="btn btn-teal inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 font-semibold hover:bg-teal-600"
        >
          International relocation <ArrowRight className="i-nudge size-4" />
        </Link>
        <Link
          href="#quote"
          className="btn btn-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 font-semibold hover:border-teal-300/60 hover:bg-white/5"
        >
          Get an overseas quote
        </Link>
      </div>
    </div>
  );
}

/* ───────── Section ───────── */
const tabs = [
  { id: "india", label: "Across India", icon: MapPin },
  { id: "world", label: "Worldwide", icon: Globe2 },
] as const;

export function WhereWeMove() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("india");

  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-white lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="breathe absolute top-1/3 left-1/4 size-[640px] rounded-full bg-navy-500/30 blur-[160px]" />
        <div className="absolute top-1/2 right-10 size-[380px] rounded-full bg-teal-500/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          label="Where we move"
          title={
            <>
              Wherever you&rsquo;re <span className="accent !text-teal-300">headed</span>
            </>
          }
          sub="Local moves across Gurgaon & NCR, door-to-door relocation to any Indian city, and international moves overseas."
        />

        {/* Tabs */}
        <Reveal onView delay={0.2} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Where we move"
            className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1.5"
          >
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                onClick={() => setTab(id)}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-7 ${
                  tab === id ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {tab === id && (
                  <motion.span
                    layoutId="where-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-teal-500 shadow-[0_8px_20px_-8px_rgb(0_160_152/0.8)]"
                  />
                )}
                <Icon className="relative size-4" />
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 lg:mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {tab === "india" ? <IndiaPanel /> : <WorldPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
