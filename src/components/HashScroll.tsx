"use client";

import { useEffect } from "react";

/**
 * Browsers ignore a click on "#quote" when the URL already ends in "#quote".
 * This scrolls to the target on every click of a same-page hash link (e.g. all "Free Quote" buttons).
 */
export function HashScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(a instanceof HTMLAnchorElement) || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      // Let the link's own handlers (e.g. closing the mobile menu) run first, then scroll.
      requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
