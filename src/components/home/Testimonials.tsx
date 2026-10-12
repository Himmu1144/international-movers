import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/ui";

// TODO(client): placeholder testimonials — replace with real customer feedback before launch.

type Review = { name: string; meta: string; text: string };

const reviews: Review[] = [
  {
    name: "Aditi M.",
    meta: "Sector 57, Gurgaon · Local move",
    text: "Honestly I was dreading this move with two kids and a dog. The team came at 8, by 2 pm everything was in the new flat. My mom's old glass showcase came out without a crack, I was shocked.",
  },
  {
    name: "Rohan K.",
    meta: "DLF Phase 4 → Bengaluru",
    text: "Truck reached Bangalore one day later than they first said, but they called and told me in advance so it was fine. Nothing broken. Would use again.",
  },
  {
    name: "Meera I.",
    meta: "Gurgaon → Dubai",
    text: "I had no idea how shipping abroad works. They explained the whole customs thing twice without getting irritated lol. Boxes reached Dubai in good shape.",
  },
  {
    name: "Harpreet S.",
    meta: "Sohna Road · Car + household",
    text: "Sent my Creta and the house stuff to Pune together. They took photos of the car before loading which I liked. Got it back clean, same condition.",
  },
  {
    name: "Ankit V.",
    meta: "Udyog Vihar · Office shift",
    text: "We shifted our office on a Saturday. Monday morning everyone just came and sat at their desk, systems were already set. Thats all I wanted tbh.",
  },
  {
    name: "Sneha J.",
    meta: "Golf Course Road · Storage",
    text: "Kept our furniture with them for around 3 months during renovation. They gave a list of every item and nothing went missing. Sofa came back wrapped like new.",
  },
  {
    name: "Imran Q.",
    meta: "Sushant Lok → Hyderabad",
    text: "Price they told on call was the price I paid. No last minute extra charges for stairs or anything, which happened to me with another company before.",
  },
  {
    name: "Pooja B.",
    meta: "South City · Packing only",
    text: "Booked them just for packing. Two ladies and one guy came, very polite. Every box had room name written on it so unpacking was super easy.",
  },
];

const avatarTones = ["bg-teal-500", "bg-navy-700", "bg-navy-500", "bg-teal-600"];

function Stars({ className = "size-4", wrap = "" }: { className?: string; wrap?: string }) {
  return (
    <span className={`flex gap-0.5 ${wrap}`} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} fill-amber-400 text-amber-400`} />
      ))}
    </span>
  );
}

function ReviewCard({ r, i }: { r: Review; i: number }) {
  const initials = r.name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <figure className="group/card relative w-[290px] shrink-0 rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgb(0_50_103/0.04),0_14px_34px_-20px_rgb(0_50_103/0.3)] transition-all duration-400 hover:-translate-y-1.5 hover:border-teal-500/40 hover:shadow-[0_30px_60px_-28px_rgb(0_50_103/0.4)] sm:w-[360px]">
      <div className="flex items-center justify-between">
        <Stars />
        <Quote className="size-6 fill-teal-500/15 text-teal-500/40" />
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-ink/80">&ldquo;{r.text}&rdquo;</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white ${avatarTones[i % avatarTones.length]}`}
        >
          {initials}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block font-semibold text-navy-700">{r.name}</span>
          <span className="mt-0.5 block truncate text-[13px] text-muted">{r.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Endless row; duplicated once so translateX(-50%) loops seamlessly. Pauses on hover. */
function Row({ items, reverse = false, offset = 0 }: { items: Review[]; reverse?: boolean; offset?: number }) {
  return (
    <div className="group flex overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max gap-5 pr-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "animate-[marquee_70s_linear_infinite_reverse]" : "animate-[marquee_60s_linear_infinite]"
        }`}
      >
        {[...items, ...items].map((r, i) => (
          <div key={i} aria-hidden={i >= items.length}>
            <ReviewCard r={r} i={i + offset} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Reviews"
          title={
            <>
              Moves people <span className="accent">remember</span>
            </>
          }
          sub="What families and businesses say after moving with us — across Gurgaon, India and abroad."
        />
      </div>

      <Reveal onView delay={0.25} className="mt-14 space-y-2">
        {/* Mobile: one row with every review */}
        <div className="sm:hidden">
          <Row items={reviews} />
        </div>
        {/* Larger screens: two rows drifting in opposite directions */}
        <div className="hidden space-y-2 sm:block">
          <Row items={reviews.slice(0, 4).concat(reviews.slice(0, 4))} />
          <Row items={reviews.slice(4).concat(reviews.slice(4))} reverse offset={1} />
        </div>
      </Reveal>
    </section>
  );
}
