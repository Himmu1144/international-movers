"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FileText, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { quoteHref, telHref, waHref } from "@/lib/site";

/** Mobile-only action bar. Slides in once the user scrolls past the top, hides while scrolling up. */
export function MobileBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y > document.documentElement.scrollHeight - 40;
      setShow(y > 400 && (y > lastY.current || nearBottom));
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const quote = quoteHref(pathname);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out lg:hidden ${
        show ? "translate-y-0" : "translate-y-[120%]"
      }`}
    >
      <nav
        aria-label="Quick actions"
        className="grid grid-cols-3 gap-1.5 rounded-2xl border border-white/10 bg-navy-950/90 p-1.5 shadow-[0_20px_40px_-12px_rgb(0_0_0/0.5)] backdrop-blur-lg"
      >
        <a
          href={telHref}
          className="flex flex-col items-center gap-1 rounded-xl py-2.5 text-xs font-semibold text-white active:bg-white/10"
        >
          <Phone className="size-5 text-teal-300" />
          Call
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener"
          className="flex flex-col items-center gap-1 rounded-xl py-2.5 text-xs font-semibold text-white active:bg-white/10"
        >
          <WhatsAppIcon className="size-5 text-[#25D366]" />
          WhatsApp
        </a>
        <Link
          href={quote}
          className="flex flex-col items-center gap-1 rounded-xl bg-teal-500 py-2.5 text-xs font-semibold text-white active:bg-teal-600"
        >
          <FileText className="size-5" />
          Free Quote
        </Link>
      </nav>
    </div>
  );
}
