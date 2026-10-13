import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { fullAddress, mailHref, site, telHref, waHref } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact Us | Free Moving Quote | International Movers and Storage" },
  description:
    "Call, WhatsApp or send your move details for a free, no-obligation quote. Packers, movers and storage in Gurgaon, Delhi NCR and across India.",
  alternates: { canonical: "/contact" },
};


const channels = [
  { icon: Phone, label: "Call us", value: site.phoneDisplay, href: telHref, note: "Fastest way to get a quote" },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with us",
    href: waHref,
    note: "Send photos of your items",
    external: true,
  },
  { icon: Mail, label: "Email", value: site.email, href: mailHref, note: "We reply within a few hours" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
        label="Contact us"
        title={
          <>
            Let&rsquo;s plan your <span className="accent !text-teal-300">move</span>.
          </>
        }
        intro="Tell us what you’re moving and where — we’ll come back with a clear, fixed quote. No obligation, no hidden charges."
      />

      <section className="relative bg-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_440px] lg:gap-16 lg:px-8">
          <div className="min-w-0">
            {/* Channels */}
            <ul className="grid gap-4 sm:grid-cols-3">
              {channels.map(({ icon: Icon, label, value, href, note, external }, i) => (
                <li key={label}>
                  <Reveal onView delay={i * 0.08} className="h-full">
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener" } : {})}
                      className="group relative flex h-full flex-col rounded-2xl border-[1.5px] border-navy-700/15 bg-white p-6 shadow-[5px_5px_0_rgb(0_160_152/0.16)] transition-all duration-400 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_rgb(0_160_152/0.3)]"
                    >
                      <span className="grid size-12 place-items-center rounded-xl bg-teal-50 text-teal-600 transition-all duration-400 group-hover:-rotate-6 group-hover:bg-teal-500 group-hover:text-white">
                        <Icon className="size-5" />
                      </span>
                      <span className="mt-5 text-sm text-muted">{label}</span>
                      <span className="mt-0.5 font-semibold break-all text-navy-700 transition-colors group-hover:text-teal-600">
                        {value}
                      </span>
                      <span className="mt-2 text-[13px] text-muted">{note}</span>
                      <ArrowUpRight className="absolute top-5 right-5 size-5 text-navy-700/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-teal-500" />
                    </a>
                  </Reveal>
                </li>
              ))}
            </ul>

            {/* Office + hours */}
            <Reveal onView className="mt-6">
              <div className="grid gap-6 rounded-2xl border border-line bg-white p-6 shadow-[0_14px_34px_-22px_rgb(0_50_103/0.3)] sm:grid-cols-2 sm:p-8">
                <div className="flex gap-4">
                  <MapPin className="mt-1 size-6 shrink-0 text-teal-500" strokeWidth={1.75} />
                  <div>
                    <h2 className="text-xl">Visit our office</h2>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{fullAddress}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`}
                      target="_blank"
                      rel="noopener"
                      className="link-line mt-3 inline-block text-sm font-semibold text-teal-600"
                    >
                      Get directions
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="mt-1 size-6 shrink-0 text-teal-500" strokeWidth={1.75} />
                  <div>
                    <h2 className="text-xl">Working hours</h2>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{site.hours}</p>
                    <p className="mt-1 text-[13px] text-muted">Moves can be scheduled on weekends and holidays.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal onView className="mt-6">
              <div className="overflow-hidden rounded-2xl border border-line shadow-[0_14px_34px_-22px_rgb(0_50_103/0.3)]">
                <iframe
                  title="Office location map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`}
                  className="h-[320px] w-full grayscale-[30%] lg:h-[380px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <QuoteForm id="quote" compact />
          </div>
        </div>
      </section>
    </>
  );
}
