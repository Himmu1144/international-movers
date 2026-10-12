import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: { absolute: "Packers and Movers Services in Gurgaon | International Movers" },
  description:
    "Household shifting, local and domestic moves, international relocation, office moves, vehicle transport, packing and secure storage — all from one team.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
        ]}
        label="Our services"
        title={
          <>
            Every kind of move, <span className="accent !text-teal-300">one</span> team.
          </>
        }
        intro="Packing, moving and secure storage for homes, offices and vehicles — across the city, across India and around the world."
      />

      <section className="bg-paper py-20 lg:py-28">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:gap-6 sm:px-6 lg:grid-cols-4 lg:gap-7 lg:px-8">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal onView delay={(i % 4) * 0.08} className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
