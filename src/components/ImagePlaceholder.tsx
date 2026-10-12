import { ImageIcon } from "lucide-react";

// Stand-in until the GPT-generated photo is ready. Swap for <Image> in place.
export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,var(--color-navy-700),var(--color-navy-900))] p-8 text-center text-white/60">
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]" />
      <ImageIcon className="relative size-10 text-teal-300" strokeWidth={1.5} />
      <p className="relative max-w-[16rem] text-sm leading-relaxed">{label}</p>
    </div>
  );
}
