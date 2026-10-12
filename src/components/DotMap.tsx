import type { CSSProperties } from "react";

/** Decorative dotted map drawn through a CSS mask (white dots, tint via opacity).
 *  A mask isn't an LCP candidate, so this huge background never counts as the page's "main content". */
export function DotMap({ src, className = "", style }: { src: string; className?: string; style?: CSSProperties }) {
  const mask = `url(${src})`;
  return (
    <span
      aria-hidden
      className={`pointer-events-none block bg-white ${className}`}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}
