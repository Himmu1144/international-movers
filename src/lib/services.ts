import { Building2, CarFront, House, MapPinned, PackageOpen, Plane, Truck, Warehouse, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  desc: string;
  icon: LucideIcon;
  image?: string;
};

export const services: Service[] = [
  {
    slug: "household-shifting",
    title: "Household Shifting",
    short: "Complete home packing and moving, 1 BHK to villa",
    desc: "Room-by-room packing for furniture, kitchenware, electronics and fragile decor — from a 1 BHK to a villa.",
    icon: House,
    image: "/images/services/household-shifting.jpg",
  },
  {
    slug: "local-shifting",
    title: "Local Shifting",
    short: "Quick, same-day moves within the city",
    desc: "Quick, careful moves across Gurgaon and Delhi NCR, often completed the same day.",
    icon: MapPinned,
    image: "/images/services/local-shifting.jpg",
  },
  {
    slug: "domestic-relocation",
    title: "Domestic Relocation",
    short: "Door-to-door moves to any city in India",
    desc: "Door-to-door moves to any city in India with tracked transport and on-time delivery.",
    icon: Truck,
    image: "/images/services/domestic-relocation.jpg",
  },
  {
    slug: "international-relocation",
    title: "International Relocation",
    short: "Export packing, customs and overseas shipping",
    desc: "Export-grade packing, documentation support and freight coordination for overseas moves.",
    icon: Plane,
    image: "/images/services/international-relocation.jpg",
  },
  {
    slug: "office-relocation",
    title: "Office Relocation",
    short: "Planned moves with minimal business downtime",
    desc: "Workstations, IT equipment and files moved on a plan built around minimum downtime.",
    icon: Building2,
    image: "/images/services/office-relocation.jpg",
  },
  {
    slug: "car-bike-transport",
    title: "Car & Bike Transport",
    short: "Enclosed carriers for cars, bikes and scooters",
    desc: "Cars, bikes and scooters inspected, secured and carried on suitable carriers.",
    icon: CarFront,
    image: "/images/services/car-bike-transport.jpg",
  },
  {
    slug: "packing-unpacking",
    title: "Packing & Unpacking",
    short: "Multi-layer packing with premium materials",
    desc: "Multi-layer packing with quality cartons, bubble wrap and foam — plus unpacking at your new place.",
    icon: PackageOpen,
    image: "/images/services/packing-unpacking.jpg",
  },
  {
    slug: "storage-warehousing",
    title: "Storage & Warehousing",
    short: "Secure short and long-term storage",
    desc: "Clean, secure and monitored storage for household goods or business stock, short or long term.",
    icon: Warehouse,
    image: "/images/services/storage-warehousing.jpg",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", mega: true },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
