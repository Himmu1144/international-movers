import type { Metadata } from "next";
import { DotMap } from "@/components/DotMap";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site, telHref } from "@/lib/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative -mt-[77px] flex min-h-[80vh] items-center overflow-hidden bg-navy-950 pt-[77px] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="breathe absolute top-24 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-teal-500/15 blur-[150px]" />
        <DotMap
          src="/world-dots.webp"
          className="absolute top-1/2 left-1/2 aspect-[1800/665] w-[1400px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.06]"
        />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="font-display text-[7rem] leading-none text-teal-300 italic sm:text-[9rem]">404</p>
        <h1 className="mt-4 text-4xl !text-white sm:text-5xl">
          This box got <span className="accent !text-teal-300">misplaced</span>.
        </h1>
        <p className="mt-5 text-lg text-white/65">
          The page you&rsquo;re looking for has moved or doesn&rsquo;t exist. Let&rsquo;s get you back on track.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn btn-teal inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-4 font-semibold hover:bg-teal-600"
          >
            Back to home <ArrowRight className="i-nudge size-4" />
          </Link>
          <a
            href={telHref}
            className="btn btn-ghost inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/20 px-6 py-4 font-semibold hover:border-teal-300/60 hover:bg-white/5"
          >
            <Phone className="i-ring size-4 text-teal-300" /> Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
