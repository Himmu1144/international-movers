import { About } from "@/components/home/About";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { MoveSteps } from "@/components/home/MoveSteps";
import { Services } from "@/components/home/Services";
import { Storage } from "@/components/home/Storage";
import { Testimonials } from "@/components/home/Testimonials";
import { WhereWeMove } from "@/components/home/WhereWeMove";

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
