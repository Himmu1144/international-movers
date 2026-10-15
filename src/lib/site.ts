// Single source of truth for business details.
// TODO(client): values marked PLACEHOLDER still need confirming.

export const site = {
  name: "International Movers and Storage",
  shortName: "International Movers",
  tagline: "Your Move • Our Global Reach",
  url: "https://internationalmoversandstorage.com",

  phone: "+919971787042",
  phoneDisplay: "99717 87042",
  whatsapp: "919971787042", // digits only, with country code
  email: "info@internationalmoversandstorage.com",

  address: {
    line: "K1/24, K Block, New Palam Vihar Phase 1, Palam Vihar, Pawala Khasrupur",
    city: "Gurugram",
    state: "Haryana",
    pin: "122017",
  },
  hours: "Mon – Sun, 8:00 AM – 9:00 PM", // PLACEHOLDER
  gst: "GSTIN PLACEHOLDER", // PLACEHOLDER

  stats: [
    { value: "4+", label: "Years Experience" }, // since 2022
    { value: "5,200+", label: "Happy Customers" },
    { value: "3,500+", label: "Moves Completed" },
    { value: "24×7", label: "Customer Support" },
  ],
} as const;

export const telHref = `tel:${site.phone}`;
export const waHref = `https://wa.me/${site.whatsapp}`;
export const mailHref = `mailto:${site.email}`;
export const fullAddress = [site.address.line, site.address.city, `${site.address.state} ${site.address.pin}`.trim()]
  .filter(Boolean)
  .join(", ");

/** "Free Quote" target: the form on the current page if it has one, otherwise the homepage hero form. */
export function quoteHref(pathname: string) {
  const hasForm = pathname === "/" || pathname === "/contact" || pathname.startsWith("/services/");
  return hasForm ? "#quote" : "/#quote";
}
