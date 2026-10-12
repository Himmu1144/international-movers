"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";
import { services } from "@/lib/services";

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mx-6 size-5 shrink-0 text-teal-500 sm:mx-10 sm:size-7">
      <path
        fill="currentColor"
        d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12 6.4-.6 11.4-5.6 12-12Z"
      />
    </svg>
  );
}

/** Endless strip of service names. Drifts on its own; scrolling speeds it up and flips its direction. */
export function Marquee({ baseVelocity = -2.2 }: { baseVelocity?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);

  // 4 identical copies; wrapping at -25% makes the loop seamless.
  const pos = useTransform(x, (v) => `${wrap(-25, -50, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    let move = dir.current * baseVelocity * (delta / 1000);
    move += dir.current * move * Math.abs(f);
    x.set(x.get() + move);
  });

  const items = services.map((s) => s.title);

  return (
    <section aria-label="Our services" className="overflow-hidden border-y border-line bg-paper py-6 sm:py-8">
      <motion.div style={{ x: pos }} className="flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy > 0}>
            {items.map((t, i) => (
              <span key={t} className="flex items-center">
                <span
                  className={`font-display text-3xl leading-none tracking-tight sm:text-5xl ${
                    i % 2 ? "accent" : "font-medium text-navy-700"
                  }`}
                >
                  {t}
                </span>
                <Star />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
