import { ArrowRight, Phone } from "lucide-react";
import { DotMap } from "@/components/DotMap";
import { QuoteForm } from "@/components/QuoteForm";
import { CountUp, MaskLine, MouseParallax, Reveal } from "@/components/motion";
import { WhatsAppIcon } from "@/components/icons";
import { site, telHref, waHref } from "@/lib/site";

// Map coordinates are in the 1800 × 665 space of /public/world-dots.webp (lon/lat projected ×5).
const ORIGIN = { x: 1235, y: 233 }; // Gurgaon
const routes = [
  { name: "Dubai", x: 1126, y: 249 },
  { name: "Colombo", x: 1249, y: 340 },
  { name: "Kathmandu", x: 1277, y: 237 },
  { name: "Thimphu", x: 1298, y: 238 },
  { name: "Toronto", x: 453, y: 157 },
];

function arc(to: { x: number; y: number }) {
  const mx = (ORIGIN.x + to.x) / 2;
  const lift = Math.min(260, Math.hypot(to.x - ORIGIN.x, to.y - ORIGIN.y) * 0.35);
  const my = Math.min(ORIGIN.y, to.y) - lift;
  return `M${ORIGIN.x} ${ORIGIN.y} Q${mx} ${my} ${to.x} ${to.y}`;
}

const heroStats = site.stats.slice(0, 3);

export function Hero() {
  return (
    // Pulled up under the sticky header so the transparent header sits on the dark background.
    <section className="relative -mt-[77px] overflow-hidden bg-navy-950 pt-[77px] text-white">
      {/* Background: glows + dotted world map with routes out of Gurgaon */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="breathe absolute -left-40 top-[420px] size-[560px] rounded-full bg-teal-500/20 blur-[140px]" />
        <div className="breathe absolute -right-36 -top-24 size-[700px] rounded-full bg-navy-500/40 blur-[160px] [animation-delay:-4s]" />

        <div className="absolute left-[calc(50%-870px)] top-16 w-[1500px] max-w-none [mask-image:radial-gradient(ellipse_at_62%_40%,black_35%,transparent_72%)] lg:left-[calc(50%-1000px)] lg:top-28">
          <MouseParallax strength={22} className="relative aspect-[1800/665]">
            <DotMap src="/world-dots.webp" className="absolute inset-0 size-full opacity-[0.08] lg:opacity-[0.13]" />
            <svg viewBox="0 0 1800 665" className="absolute inset-0 size-full">
              {routes.map((r, i) => (
                <g key={r.name}>
                  <path
                    d={arc(r)}
                    fill="none"
                    stroke="url(#route)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    pathLength={1}
                    className="hero-route"
                    style={{ animationDelay: `${0.4 + i * 0.35}s` }}
                  />
                  <circle
                    cx={r.x}
                    cy={r.y}
                    r="4"
                    className="fill-teal-300 hero-dot"
                    style={{ animationDelay: `${1.4 + i * 0.35}s` }}
                  />
                  {/* "Shipment" travelling out along the route on loop */}
                  <circle r="3.5" className="fill-white" opacity="0">
                    <animateMotion dur={`${3 + i * 0.4}s`} begin={`${2.2 + i * 0.6}s`} repeatCount="indefinite" path={arc(r)} />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.1;0.85;1"
                      dur={`${3 + i * 0.4}s`}
                      begin={`${2.2 + i * 0.6}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
              <circle cx={ORIGIN.x} cy={ORIGIN.y} r="7" className="fill-teal-300" />
              <circle cx={ORIGIN.x} cy={ORIGIN.y} r="7" className="hero-pulse fill-none stroke-teal-300" strokeWidth="2" />
              <defs>
                <linearGradient id="route" x1="0" x2="1">
                  <stop offset="0" stopColor="#5cccc5" stopOpacity="0.15" />
                  <stop offset="1" stopColor="#5cccc5" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </MouseParallax>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-20 lg:pb-28">
        <div>
          <Reveal y={12} delay={0.05}>
            <p className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] font-medium tracking-wide text-white/80 backdrop-blur transition-colors duration-300 hover:border-teal-300/50 hover:bg-white/10 hover:text-white">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-300 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-teal-300" />
              </span>
              Packers · Movers · Storage
            </p>
          </Reveal>

          <h1 className="mt-7 text-[2rem] leading-[1.1] !text-white sm:text-[2.75rem] lg:text-[3.25rem]">
            <MaskLine delay={0.15}>Packers, Movers and Storage Solutions for Every Move –{" "}</MaskLine>
            <MaskLine delay={0.28}>
              From Doorstep to{" "}
              <span className="relative inline-block">
                <span className="accent !text-teal-300">Destination</span>
                <svg
                  aria-hidden
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.06em] left-0 h-[0.22em] w-full text-teal-300/70"
                >
                  <path
                    d="M3 14 C 50 4, 120 2, 197 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    pathLength={1}
                    className="draw-line"
                  />
                </svg>
              </span>
            </MaskLine>
          </h1>

          <Reveal delay={0.5}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Packing, moving and secure storage for homes, offices and vehicles — across the city, across India and around the
              world.
            </p>
          </Reveal>

          <Reveal delay={0.62} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="btn btn-teal inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-4 font-semibold hover:bg-teal-600 lg:hidden"
            >
              Get Free Quote <ArrowRight className="i-nudge size-4" />
            </a>
            <a
              href={telHref}
              className="btn btn-ghost inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/20 px-6 py-4 font-semibold hover:border-teal-300/60 hover:bg-white/5"
            >
              <Phone className="i-ring size-4 text-teal-300" />
              Call {site.phoneDisplay}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost group hidden items-center justify-center gap-2.5 rounded-lg border border-white/20 px-6 py-4 font-semibold hover:border-[#25D366]/60 hover:bg-white/5 lg:inline-flex"
            >
              <WhatsAppIcon className="i-ring size-4 text-teal-300 transition-colors group-hover:text-[#25D366]" />
              WhatsApp
            </a>
          </Reveal>

          <Reveal delay={0.75}>
            <dl className="mt-12 grid max-w-xl grid-cols-3 border-t border-white/10 pt-8 lg:mt-16">
              {heroStats.map((s, i) => (
                <div
                  key={s.label}
                  className={`group/stat cursor-default ${i ? "border-l border-white/10 pl-4 sm:pl-7" : "pr-2"}`}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[1.75rem] font-medium tracking-tight transition-colors duration-300 group-hover/stat:text-teal-300 sm:text-[2.6rem]">
                    <CountUp value={s.value} delay={0.9 + i * 0.12} suffixClass="text-teal-300" />
                  </dd>
                  <dd className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/50 sm:text-xs">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.4} y={30} x={0} className="lg:translate-x-0">
          <QuoteForm id="quote" />
        </Reveal>
      </div>
    </section>
  );
}
