import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: { absolute: "Moving Tips and Guides | International Movers and Storage" },
  description:
    "Explore practical moving tips, packing checklists, relocation cost guides and expert advice for local shifting, domestic moves and international relocation.",
  alternates: { canonical: "/blog" },
};

// TODO: add posts (src/lib/posts.ts + /blog/[slug]) once the client's articles are ready.
export default function BlogPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
        ]}
        label="Moving guides"
        title={
          <>
            Tips for a <span className="accent !text-teal-300">smoother</span> move.
          </>
        }
        intro="Packing checklists, cost guides and practical advice for moving across the city, across India or overseas."
        quoteHref="/#quote"
      />

      <section className="bg-paper py-20 lg:py-28">
        <Reveal onView className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="rounded-3xl border-[1.5px] border-navy-700/15 bg-white px-6 py-14 shadow-[6px_6px_0_rgb(0_160_152/0.16)] sm:px-12">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-teal-50 text-teal-600">
              <BookOpen className="size-7" strokeWidth={1.5} />
            </span>
            <h2 className="mt-6 text-3xl">
              Guides are on the <span className="accent">way</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              We&rsquo;re putting together our first moving guides. Meanwhile, explore our services or ask us anything directly.
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-block rounded-full border border-line px-4 py-1.5 text-sm text-navy-700 transition-colors hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="btn btn-teal mt-8 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-6 py-3.5 font-semibold text-white hover:bg-teal-600"
            >
              Ask a question <ArrowRight className="i-nudge size-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
