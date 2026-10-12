"use client";

import { useState, type ComponentType, type FormEvent, type InputHTMLAttributes } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, ChevronDown, LoaderCircle, MapPin, Navigation, Package, Phone, User } from "lucide-react";
import { EASE } from "@/components/motion";
import { services } from "@/lib/services";
import { telHref } from "@/lib/site";

const control =
  "peer h-12 w-full rounded-lg border border-line bg-paper pl-11 pr-4 text-[15px] text-ink placeholder:text-muted/60 outline-none transition-all duration-200 hover:border-navy-200 hover:bg-white focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/12";

function Field({
  id,
  label,
  icon: Icon,
  ...input
}: { id: string; label: string; icon: ComponentType<{ className?: string }> } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-medium text-ink/70 transition-colors group-focus-within:text-teal-600"
      >
        {label}
      </label>
      <div className="relative">
        <input id={id} className={control} {...input} />
        <Icon className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-muted/60 transition-all duration-200 group-hover:text-navy-500 peer-focus:scale-110 peer-focus:text-teal-500" />
      </div>
    </div>
  );
}

export function QuoteForm({
  id,
  defaultService = services[0].title,
  compact = false,
}: {
  id?: string;
  defaultService?: string;
  /** Single-column fields, for narrow sidebars. */
  compact?: boolean;
}) {
  const row = compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2";
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const payload = { ...Object.fromEntries(new FormData(e.currentTarget)), page: window.location.pathname };
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("idle");
    }
  }

  return (
    <div
      id={id}
      className="glow-border group/card scroll-mt-28 rounded-2xl bg-white p-6 text-ink shadow-[0_30px_80px_-20px_rgb(0_0_0/0.55)] transition-shadow duration-500 hover:shadow-[0_40px_100px_-20px_rgb(0_160_152/0.35)] sm:p-8"
    >
      {state === "sent" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex min-h-[440px] flex-col items-center justify-center text-center"
        >
          <span className="grid size-16 place-items-center rounded-full bg-teal-50">
            <svg
              viewBox="0 0 24 24"
              className="size-8 text-teal-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <motion.path
                d="M5 12.5l4.5 4.5L19 7.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              />
            </svg>
          </span>
          <h2 className="mt-5 text-3xl">
            Thank <span className="accent">you</span>
          </h2>
          <p className="mt-3 max-w-xs text-muted">
            Your move coordinator will call you shortly with a free, no-obligation quote.
          </p>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="link-line mt-6 text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            Send another enquiry
          </button>
        </motion.div>
      ) : (
        <>
          <h2 className="text-[1.75rem] leading-tight">
            Get a free <span className="accent">quote</span>
          </h2>
          <p className="mt-1.5 flex items-start gap-2 text-[15px] text-muted">
            <span className="relative mt-2 flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-teal-500" />
            </span>
            Tell us a little about your move — we&rsquo;ll handle the rest.
          </p>

          <form onSubmit={onSubmit} className="relative mt-6 space-y-4">
            <div className={row}>
              <Field id="q-name" name="name" label="Full name" icon={User} required autoComplete="name" placeholder="Your name" />
              <Field
                id="q-phone"
                name="phone"
                label="Mobile number"
                icon={Phone}
                type="tel"
                inputMode="numeric"
                required
                pattern="[0-9+\s]{10,14}"
                autoComplete="tel"
                placeholder="10-digit mobile"
              />
            </div>

            <div className={row}>
              <Field id="q-from" name="from" label="Moving from" icon={MapPin} required placeholder="Locality, city" />
              <Field id="q-to" name="to" label="Moving to" icon={Navigation} required placeholder="City or country" />
            </div>

            <div className="group">
              <label
                htmlFor="q-service"
                className="mb-1.5 block text-[13px] font-medium text-ink/70 transition-colors group-focus-within:text-teal-600"
              >
                Service needed
              </label>
              <div className="relative">
                <select
                  id="q-service"
                  name="service"
                  defaultValue={defaultService}
                  className={`${control} cursor-pointer appearance-none pr-10`}
                >
                  {services.map((s) => (
                    <option key={s.slug}>{s.title}</option>
                  ))}
                </select>
                <Package className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-muted/60 transition-all duration-200 group-hover:text-navy-500 peer-focus:scale-110 peer-focus:text-teal-500" />
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted transition-transform duration-300 group-focus-within:rotate-180 group-focus-within:text-teal-500" />
              </div>
            </div>

            {/* Honeypot — hidden from people, bots fill it in */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] size-px opacity-0"
            />

            {error && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}{" "}
                <a href={telHref} className="font-semibold underline">
                  Call us
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={state === "sending"}
              className="btn btn-teal mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-teal-500 font-semibold text-white hover:bg-teal-600 disabled:pointer-events-none disabled:opacity-80"
            >
              {state === "sending" ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Get my free quote <ArrowRight className="i-nudge size-4" />
                </>
              )}
            </button>
          </form>

          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[13px] text-muted">
            {["No obligation", "Fixed written quote", "No hidden charges"].map((t) => (
              <li key={t} className="flex items-center gap-1.5 transition-colors hover:text-ink">
                <Check className="size-3.5 text-teal-500" strokeWidth={3} />
                {t}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
