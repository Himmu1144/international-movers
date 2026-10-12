import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { mailHref, site, telHref } from "@/lib/site";

export type LegalSection = { title: string; body: ReactNode };

export function LegalPage({
  slug,
  title,
  updated,
  intro,
  sections,
}: {
  slug: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: `/${slug}`, label: title },
        ]}
        label="Legal"
        title={title}
        intro={`Last updated: ${updated}`}
        actions={false}
      />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
          {/* Table of contents */}
          <nav aria-label="On this page" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">On this page</p>
            <ol className="mt-4 space-y-2.5 border-l border-line">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#s${i + 1}`}
                    className="-ml-px block border-l-2 border-transparent pl-4 text-sm text-muted transition-colors hover:border-teal-500 hover:text-navy-700"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="max-w-3xl text-[16.5px] leading-relaxed text-ink/80 [&_li]:mb-1.5 [&_li::marker]:text-teal-500 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
            <div className="text-lg text-muted">{intro}</div>
            {sections.map((s, i) => (
              <section key={s.title} id={`s${i + 1}`} className="scroll-mt-28">
                <h2 className="mt-12 mb-4 flex items-baseline gap-3 text-2xl">
                  <span className="font-display text-lg text-teal-500 italic">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}

            <div className="mt-14 rounded-2xl border-[1.5px] border-navy-700/15 bg-paper p-6 shadow-[5px_5px_0_rgb(0_160_152/0.16)]">
              <p className="font-display text-xl text-navy-700">{site.name}</p>
              <p className="mt-1 text-[15px] text-muted">
                {site.address.line}, {site.address.city}, {site.address.state} {site.address.pin}
              </p>
              <p className="mt-2 text-[15px]">
                <a href={telHref} className="link-line font-medium text-teal-600">
                  {site.phoneDisplay}
                </a>
                {" · "}
                <a href={mailHref} className="link-line font-medium text-teal-600">
                  {site.email}
                </a>
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
