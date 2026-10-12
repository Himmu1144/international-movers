import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CircleCheck, Phone } from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppIcon } from "@/components/icons";
import { Pill, SectionHeading } from "@/components/ui";
import { serviceContent } from "@/lib/service-content";
import { services } from "@/lib/services";
import { site, telHref, waHref } from "@/lib/site";

// Every slug is prerendered via generateStaticParams, so prefetching already delivers the full page;
// no Suspense placeholder is needed for awaiting `params`.
export const instant = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  const service = services.find((s) => s.slug === slug);
  const content = serviceContent[slug];
  return service && content ? { service, content } : null;
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = getService(slug);
  if (!found) return {};
  return {
    title: { absolute: found.content.metaTitle },
    description: found.content.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: found.content.metaTitle, description: found.content.metaDescription, type: "website" },
  };
}

function SubHeading({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal onView>
      <Pill>{label}</Pill>
      <h2 className="mt-4 text-3xl leading-tight sm:text-[2.4rem]">{children}</h2>
    </Reveal>
  );
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const found = getService(slug);
  if (!found) notFound();
  const { service, content } = found;
  const [before, accent, after = ""] = content.h1;

  const index = services.findIndex((s) => s.slug === slug);
  const related = [1, 2, 3].map((n) => services[(index + n) % services.length]);
  const url = `${site.url}/services/${slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: service.title,
              serviceType: service.title,
              description: content.metaDescription,
              url,
              areaServed: "IN",
              provider: { "@type": "MovingCompany", name: site.name, url: site.url, telephone: site.phone },
            },
            {
              "@type": "FAQPage",
              mainEntity: content.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
                { "@type": "ListItem", position: 3, name: service.title, item: url },
              ],
            },
          ],
        }}
      />

      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${slug}`, label: service.title },
        ]}
        label={service.title}
        title={
          <>
            {before}
            <span className="accent !text-teal-300">{accent}</span>
            {after}
          </>
        }
        intro={content.intro}
        aside={
          <div className="relative mr-2.5 sm:mr-0">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2.5 translate-y-3 rounded-2xl border-2 border-teal-300/30 sm:translate-x-4 sm:translate-y-4"
            />
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
              <div className="relative size-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    priority
                    sizes="(min-width:1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <ImagePlaceholder label={`Photo: ${service.title}`} />
                )}
              </div>
            </div>
          </div>
        }
      />

      {/* Body + sticky quote form */}
      <section className="relative bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1fr_400px] lg:gap-14 lg:px-8 xl:gap-20">
          <div className="min-w-0 space-y-20 lg:space-y-24">
            {/* Overview */}
            <div>
              <SubHeading label="Overview">
                About our <span className="accent">{service.title.toLowerCase()}</span> service
              </SubHeading>
              <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-muted">
                {content.overview.map((p, i) => (
                  <Reveal key={i} onView delay={i * 0.08}>
                    <p>{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div>
              <SubHeading label="What you get">
                What&rsquo;s <span className="accent">included</span>
              </SubHeading>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {content.included.map((item, i) => (
                  <li key={item.title}>
                    <Reveal onView delay={(i % 2) * 0.08} className="h-full">
                      <div className="group flex h-full gap-4 rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgb(0_50_103/0.04),0_10px_28px_-18px_rgb(0_50_103/0.25)] transition-all duration-400 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-[0_24px_48px_-24px_rgb(0_50_103/0.35)]">
                        <CircleCheck
                          className="mt-0.5 size-6 shrink-0 text-teal-500 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12"
                          strokeWidth={1.75}
                        />
                        <div>
                          <h3 className="text-lg leading-snug transition-colors group-hover:text-teal-600">{item.title}</h3>
                          <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <SubHeading label="Process">
                How it <span className="accent">works</span>
              </SubHeading>
              <ol className="relative mt-10 space-y-8 before:absolute before:top-3 before:bottom-3 before:left-[23px] before:w-px before:bg-gradient-to-b before:from-teal-500 before:via-navy-200 before:to-transparent">
                {content.steps.map((step, i) => (
                  <li key={step.title}>
                    <Reveal onView delay={i * 0.1} x={-16} y={0} className="group relative flex gap-6">
                      <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-navy-700 font-display text-lg text-white italic ring-8 ring-white transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-500">
                        {i + 1}
                      </span>
                      <div className="pt-2.5">
                        <h3 className="text-xl transition-colors group-hover:text-teal-600">{step.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{step.text}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQ */}
            <div>
              <SubHeading label="FAQ">
                Frequently asked <span className="accent">questions</span>
              </SubHeading>
              <Reveal onView className="mt-8">
                <Accordion items={content.faqs} />
              </Reveal>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <QuoteForm id="quote" defaultService={service.title} compact />
            <div className="mt-5 rounded-2xl border border-line bg-paper p-6">
              <p className="font-display text-xl text-navy-700">
                Prefer to <span className="accent">talk</span>?
              </p>
              <p className="mt-1.5 text-[15px] text-muted">Our move coordinators are available {site.hours}.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={telHref}
                  className="btn inline-flex items-center justify-center gap-2 rounded-lg bg-navy-700 py-3 text-sm font-semibold text-white"
                >
                  <Phone className="i-ring size-4" /> Call
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener"
                  className="btn inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="i-ring size-4" /> WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Explore more"
            title={
              <>
                Related <span className="accent">services</span>
              </>
            }
          />
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {related.map((s, i) => (
              <li key={s.slug}>
                <Reveal onView delay={i * 0.08} className="h-full">
                  <ServiceCard service={s} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
