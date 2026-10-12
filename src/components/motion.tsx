"use client";

// Site-wide motion primitives. Every section uses these so timing and easing stay consistent.
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Respects the OS "reduce motion" setting for every animation below it. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fades + rises in. `onView` waits until scrolled into view (motion); otherwise plays on first paint via CSS,
 *  so above-the-fold content doesn't wait for JavaScript (keeps LCP fast). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  x = 0,
  onView = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  onView?: boolean;
  className?: string;
}) {
  if (!onView) {
    return (
      <div
        className={`anim-rise ${className ?? ""}`}
        style={{ animationDelay: `${delay}s`, ["--rise-y" as string]: `${y}px`, ["--rise-x" as string]: `${x}px` }}
      >
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Headline line that slides up from behind a mask (pure CSS, plays on first paint). */
export function MaskLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
      <span className="anim-mask block" style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}

/** Counts up to the number inside `value` ("8,000+" → 8000) when scrolled into view.
 *  The final number is server-rendered, so crawlers and no-JS users still see it. */
export function CountUp({ value, delay = 0, suffixClass }: { value: string; delay?: number; suffixClass?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const match = value.match(/^([\d,]+)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : NaN;
  const suffix = match ? match[2] : "";
  const fmt = (n: number) => Math.round(n).toLocaleString("en-IN");

  useEffect(() => {
    if (reduce || Number.isNaN(target) || !ref.current) return;
    ref.current.textContent = "0";
  }, [reduce, target]);

  useEffect(() => {
    const el = ref.current;
    if (reduce || Number.isNaN(target) || !inView || !el) return;
    const controls = animate(0, target, { duration: 2, delay, ease: EASE, onUpdate: (v) => (el.textContent = fmt(v)) });
    return () => controls.stop();
  }, [inView, target, delay, reduce]);

  if (Number.isNaN(target)) return <>{value}</>;
  return (
    <>
      <span ref={ref}>{fmt(target)}</span>
      {suffix && <span className={suffixClass}>{suffix}</span>}
    </>
  );
}

/** Drifts children slightly against the mouse position (desktop pointers only). */
export function MouseParallax({
  children,
  strength = 18,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-1, 1], [strength, -strength]), { stiffness: 60, damping: 20 });
  const y = useSpring(useTransform(my, [-1, 1], [strength * 0.6, -strength * 0.6]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

/** Words light up one by one as the block scrolls through the viewport.
 *  Wrap a word in *asterisks* to render it as the italic teal accent. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const accent = w.startsWith("*");
        const clean = w.replace(/\*/g, "");
        return (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent}>
            {clean}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={accent ? "accent" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Vertical parallax for an image inside an overflow-hidden frame. */
export function ParallaxY({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, top: -distance, bottom: -distance }} className="absolute inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}

/** Gentle idle float for badges. */
export function Float({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
