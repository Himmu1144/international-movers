import { About } from "@/components/home/About";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { MoveSteps } from "@/components/home/MoveSteps";
import { Services } from "@/components/home/Services";
import { Storage } from "@/components/home/Storage";
import { Testimonials } from "@/components/home/Testimonials";
import { WhereWeMove } from "@/components/home/WhereWeMove";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Packers, Movers and Storage in Gurgaon | International Movers" },
  description:
    "Looking for packers and movers in Gurgaon? Get home shifting, office relocation, packing and storage services with a free moving quote.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Storage />
      <MoveSteps />
      <WhereWeMove />
      <Testimonials />
      <Faq />
    </>
  );
}
