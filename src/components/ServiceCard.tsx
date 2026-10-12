import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { Service } from "@/lib/services";

/** Photo card used on the homepage, the services hub and "related services".
 *  Below `sm` it turns compact (no description) so a 2-column grid shows every service at once. */
export function ServiceCard({ service }: { service: Service }) {
  const { slug, title, short, icon: Icon, image } = service;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border-[1.5px] border-navy-700/15 bg-white shadow-[4px_4px_0_rgb(0_160_152/0.16)] sm:rounded-2xl sm:shadow-[6px_6px_0_rgb(0_160_152/0.16)] transition-all duration-400 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:border-navy-700/30 hover:shadow-[10px_10px_0_rgb(0_160_152/0.3)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="relative size-full transition-transform duration-700 ease-out group-hover:scale-[1.07]">
          {image ? (
            <Image src={image} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
          ) : (
            <ImagePlaceholder label={title} />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Icon badge overlapping the image edge */}
      <span className="relative z-10 -mt-[18px] ml-3 grid size-9 place-items-center ring-[3px] sm:-mt-6 sm:ml-5 sm:size-12 sm:ring-4 rounded-full bg-teal-500 text-white shadow-[0_10px_24px_-8px_rgb(0_160_152/0.8)] ring-white transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110">
        <Icon className="size-4 sm:size-5" strokeWidth={1.75} aria-hidden />
      </span>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3 pt-2 pb-3.5 sm:px-5 sm:pt-3.5 sm:pb-6">
        <h3 className="flex-1 text-[15px] leading-tight transition-colors duration-300 group-hover:text-teal-600 sm:flex-none sm:text-[1.3rem] sm:leading-snug">
          <Link href={`/services/${slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-1.5 hidden flex-1 text-[15px] leading-relaxed text-muted sm:block">{short}.</p>

        {/* Visual only — the whole card is the link (see the title). */}
        <span
          aria-hidden
          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 sm:mt-4 sm:gap-1.5 sm:text-sm"
        >
          Read more
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5 sm:size-4" />
        </span>
      </div>
    </article>
  );
}
