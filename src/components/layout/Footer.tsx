import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FooterColumn } from "@/components/layout/FooterColumn";
import { Year } from "@/components/layout/Year";
import { services } from "@/lib/services";
import { fullAddress, mailHref, site, telHref, waHref } from "@/lib/site";

const company = [
  { href: "/about", label: "About Us" },
  { href: "/services/storage-warehousing", label: "Storage Facility" },
  { href: "/blog", label: "Moving Guides" },
  { href: "/contact", label: "Contact" },
];

const linkCls = "link-line text-[15px] text-white/65 hover:text-white";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      {/* Swoosh from the logo, used as the footer's one decorative motif */}
      <svg
        aria-hidden
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[38%] h-40 w-full text-teal-500/25 sm:top-[34%]"
      >
        <path d="M-20 300 C 380 40, 980 -10, 1460 70" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M-20 318 C 420 70, 1000 20, 1460 96" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Closing statement */}
      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <h2 className="!text-white text-[2.5rem] font-medium leading-[1.05] sm:text-6xl lg:text-7xl">
            Moving soon?
            <br />
            <span className="accent !text-teal-300">We&rsquo;ll carry it</span>
            <br />
            from here.
          </h2>

          <div className="lg:pb-2">
            <p className="text-sm text-white/50">Talk to a move coordinator</p>
            <a
              href={telHref}
              className="link-line mt-2 inline-block font-display text-4xl font-medium tracking-tight text-white hover:text-teal-300 sm:text-5xl"
            >
              {site.phoneDisplay}
            </a>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#quote"
                className="btn btn-teal inline-flex items-center justify-between gap-6 rounded-lg bg-teal-500 px-5 py-4 font-semibold text-white hover:bg-teal-600 sm:justify-start"
              >
                Get a free quote
                <ArrowUpRight className="i-up size-5" />
              </Link>
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="btn btn-ghost inline-flex items-center justify-between gap-6 rounded-lg border border-white/20 px-5 py-4 font-semibold text-white hover:border-teal-300/60 hover:bg-white/5 sm:justify-start"
              >
                WhatsApp us
                <ArrowUpRight className="i-up size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid border-t border-white/10 pt-10 lg:grid-cols-[1.4fr_1fr_0.8fr_1.1fr] lg:gap-12 lg:pt-14">
          <div className="pb-8 lg:pb-0">
            <Image src="/logo-light.png" alt={site.name} width={900} height={264} className="h-auto w-56" />
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/55">
              Packing, moving and secure storage for homes, offices and vehicles — across the city, across India and overseas.
            </p>
          </div>

          <FooterColumn title="Services">
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Company">
            <ul className="space-y-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <div className="pt-8 lg:pt-0">
            <span className="block text-xs leading-4 font-semibold uppercase tracking-[0.2em] text-white/55">Visit / Write</span>
            <address className="mt-6 space-y-4 text-[15px] not-italic leading-relaxed text-white/65">
              <p>{fullAddress}</p>
              <p>
                <a href={mailHref} className="link-line text-white hover:text-teal-300">
                  {site.email}
                </a>
                <br />
                <a href={telHref} className="link-line hover:text-white">
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="text-white/60">{site.hours}</p>
            </address>
          </div>
        </div>
      </div>

      {/* Oversized wordmark */}
      <div aria-hidden className="relative mt-14 select-none overflow-hidden lg:mt-16">
        <span
          data-word="INTERNATIONAL"
          className="block translate-y-[18%] text-center font-display text-[11.5vw] leading-none font-extrabold tracking-tighter whitespace-nowrap text-white/[0.035] before:content-[attr(data-word)]"
        />
      </div>

      {/* Legal bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 pb-28 text-[13px] text-white/60 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:pb-6">
          <p>
            © <Year /> {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="link-line hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="link-line hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
