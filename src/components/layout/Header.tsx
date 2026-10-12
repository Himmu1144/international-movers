"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, FileCheck2, Menu, Phone, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { navLinks, services } from "@/lib/services";
import { quoteHref, site, telHref, waHref } from "@/lib/site";

const STORAGE_HREF = "/services/storage-warehousing";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/services") return pathname.startsWith("/services") && pathname !== STORAGE_HREF;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };
  // Every page opens with a dark hero, so the header sits transparent over it until the user scrolls.
  const overlay = !scrolled && !megaOpen;

  const quote = quoteHref(pathname);

  const closeAll = () => {
    setMegaOpen(false);
    setDrawerOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-white/85 shadow-[0_6px_24px_-12px_rgb(0_50_103/0.25)] backdrop-blur-lg"
            : overlay
              ? "border-white/10 bg-transparent"
              : "border-transparent bg-white"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled ? "h-16" : "h-[76px]"
          }`}
        >
          <Link href="/" onClick={closeAll} className="shrink-0" aria-label={`${site.name} — home`}>
            <Image
              src={overlay ? "/logo-header-light.png" : "/logo-header.png"}
              alt={site.name}
              width={900}
              height={201}
              priority
              className={`w-auto transition-all duration-300 ${scrolled ? "h-9" : "h-10 sm:h-11"}`}
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                const base = `relative flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:origin-left after:bg-teal-500 after:transition-transform after:duration-300 ${
                  overlay
                    ? active
                      ? "text-white after:scale-x-100"
                      : "text-white/75 hover:text-white after:scale-x-0 hover:after:scale-x-100"
                    : active
                      ? "text-navy-700 after:scale-x-100"
                      : "text-ink/75 hover:text-navy-700 after:scale-x-0 hover:after:scale-x-100"
                }`;

                if (!("mega" in link)) {
                  return (
                    <li key={link.href}>
                      <Link href={link.href} className={base} aria-current={active ? "page" : undefined}>
                        {link.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.href} className="static" onMouseEnter={openMega} onMouseLeave={closeMega}>
                    <button
                      type="button"
                      className={base}
                      aria-expanded={megaOpen}
                      aria-controls="mega-menu"
                      onClick={() => setMegaOpen((o) => !o)}
                    >
                      {link.label}
                      <ChevronDown className={`size-4 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
                    </button>

                    <div
                      id="mega-menu"
                      className={`absolute inset-x-0 top-full transition-all duration-200 ${
                        megaOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                      }`}
                    >
                      <div className="mx-auto max-w-7xl px-8 pt-2">
                        <div className="grid grid-cols-[1fr_280px] overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
                          <ul className="grid grid-cols-2 gap-1 p-4">
                            {services.map(({ slug, title, short, icon: Icon }, i) => (
                              <li
                                key={slug}
                                className={`transition-all duration-500 ease-out ${megaOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                                style={{ transitionDelay: megaOpen ? `${60 + i * 35}ms` : "0ms" }}
                              >
                                <Link
                                  href={`/services/${slug}`}
                                  onClick={closeAll}
                                  className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors duration-300 hover:bg-paper"
                                >
                                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-600 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white group-hover:shadow-[0_8px_18px_-6px_rgb(0_160_152/0.6)]">
                                    <Icon className="size-5" aria-hidden />
                                  </span>
                                  <span>
                                    <span className="flex items-center gap-1.5 font-semibold text-navy-700 transition-colors duration-300 group-hover:text-teal-600">
                                      {title}
                                      <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                                    </span>
                                    <span className="mt-0.5 block text-sm leading-snug text-muted">{short}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <div className="relative flex flex-col justify-between overflow-hidden bg-navy-700 p-6 text-white">
                            <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-teal-500/25 blur-2xl" />
                            <div className="relative">
                              <FileCheck2 className="size-8 text-teal-300" aria-hidden />
                              <p className="mt-4 font-display text-lg font-bold leading-snug">Free pre-move survey</p>
                              <p className="mt-2 text-sm leading-relaxed text-white/70">
                                We check your goods and share a fixed, written quote. No hidden charges.
                              </p>
                            </div>
                            <div className="relative mt-6 space-y-2">
                              <Link
                                href={quote}
                                onClick={closeAll}
                                className="btn btn-teal flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-semibold hover:bg-teal-600"
                              >
                                Book free survey <ArrowRight className="i-nudge size-4" />
                              </Link>
                              <Link
                                href="/services"
                                onClick={closeAll}
                                className="link-line mx-auto block w-fit text-center text-sm text-white/70 hover:text-white"
                              >
                                View all services
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-5 lg:flex">
            <a href={telHref} className="ring-hover group hidden items-center gap-2.5 xl:flex">
              <span
                className={`grid size-10 place-items-center rounded-full transition duration-300 group-hover:scale-105 ${
                  overlay
                    ? "bg-white/10 text-white group-hover:bg-white/20"
                    : "bg-navy-50 text-navy-700 group-hover:bg-navy-700 group-hover:text-white"
                }`}
              >
                <Phone className="i-ring size-4" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className={`block text-xs ${overlay ? "text-white/60" : "text-muted"}`}>Call us anytime</span>
                <span className={`block font-semibold ${overlay ? "text-white" : "text-navy-700"}`}>{site.phoneDisplay}</span>
              </span>
            </a>
            <Link
              href={quote}
              className="btn btn-teal rounded-lg bg-teal-500 px-5 py-2.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgb(0_160_152/0.7)] hover:bg-teal-600"
            >
              Free Quote
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={telHref}
              aria-label="Call us"
              className="idle-ping grid size-11 place-items-center rounded-full bg-teal-500 text-white shadow-[0_6px_16px_-6px_rgb(0_160_152/0.8)] transition active:scale-90"
            >
              <Phone className="size-[18px]" />
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              onClick={() => setDrawerOpen(true)}
              className={`grid size-11 place-items-center rounded-full border transition active:scale-90 ${overlay ? "border-white/25 text-white" : "border-line text-navy-700"}`}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — outside <header> so its backdrop-filter doesn't trap position:fixed */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${drawerOpen ? "" : "pointer-events-none"}`} inert={!drawerOpen}>
        <div
          onClick={() => setDrawerOpen(false)}
          className={`absolute inset-0 bg-navy-950/50 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-white transition-transform duration-300 ease-out ${
            drawerOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
          }`}
        >
          <div className="flex h-[76px] items-center justify-between border-b border-line px-5">
            <Image src="/logo-header.png" alt={site.name} width={900} height={201} className="h-9 w-auto" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
              className="grid size-11 place-items-center rounded-full bg-paper text-navy-700"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {navLinks.map((link, i) => {
                const active = isActive(pathname, link.href);
                const enter = `transition-all duration-500 ease-out ${drawerOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`;
                const enterDelay = { transitionDelay: drawerOpen ? `${120 + i * 45}ms` : "0ms" };
                const row = `flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[17px] font-semibold transition-colors ${
                  active ? "bg-teal-50 text-teal-700" : "text-navy-700 hover:bg-paper"
                }`;

                if (!("mega" in link)) {
                  return (
                    <li key={link.href} className={enter} style={enterDelay}>
                      <Link href={link.href} onClick={closeAll} className={row}>
                        {link.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.href} className={enter} style={enterDelay}>
                    <button
                      type="button"
                      className={row}
                      aria-expanded={mobileServicesOpen}
                      onClick={() => setMobileServicesOpen((o) => !o)}
                    >
                      {link.label}
                      <ChevronDown
                        className={`size-5 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ${mobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <ul className="overflow-hidden">
                        {services.map(({ slug, title, icon: Icon }) => (
                          <li key={slug}>
                            <Link
                              href={`/services/${slug}`}
                              onClick={closeAll}
                              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] text-ink/80 transition-colors active:bg-teal-50 hover:bg-paper"
                            >
                              <Icon className="size-[18px] text-teal-600" aria-hidden />
                              {title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-2.5 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Link
              href={quote}
              onClick={closeAll}
              className="btn flex items-center justify-center gap-2 rounded-lg bg-navy-700 py-3.5 font-semibold text-white"
            >
              Get Free Quote <ArrowRight className="i-nudge size-4" />
            </Link>
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={telHref}
                className="btn btn-teal flex items-center justify-center gap-2 rounded-lg bg-teal-500 py-3 font-semibold text-white"
              >
                <Phone className="i-ring size-4" /> Call
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="btn flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 font-semibold text-white"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
