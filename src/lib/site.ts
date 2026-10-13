// Single source of truth for business details.
// TODO(client): every value marked PLACEHOLDER needs confirming before launch.

export const site = {
  name: "International Movers and Storage",
  shortName: "International Movers",
  tagline: "Your Move • Our Global Reach",
  url: "https://internationalmoversandstorage.com",

  phone: "+919999999999", // PLACEHOLDER
  phoneDisplay: "99999 99999", // PLACEHOLDER
  whatsapp: "919999999999", // PLACEHOLDER (digits only, with country code)
  email: "info@internationalmoversandstorage.com",

  address: {
    line: "Office Address Line", // PLACEHOLDER
    city: "Gurgaon", // PLACEHOLDER
    state: "Haryana",
    pin: "122001", // PLACEHOLDER
  },
  hours: "Mon – Sun, 8:00 AM – 9:00 PM", // PLACEHOLDER
  gst: "GSTIN PLACEHOLDER", // PLACEHOLDER

  stats: [
    { value: "10+", label: "Years Experience" }, // PLACEHOLDER
    { value: "5,000+", label: "Happy Customers" }, // PLACEHOLDER
    { value: "8,000+", label: "Moves Completed" }, // PLACEHOLDER
    { value: "50,000", label: "Sq. Ft. Storage" }, // PLACEHOLDER
    { value: "24×7", label: "Customer Support" },
  ],
} as const;

export const telHref = `tel:${site.phone}`;
export const waHref = `https://wa.me/${site.whatsapp}`;
export const mailHref = `mailto:${site.email}`;

/** "Free Quote" target: the form on the current page if it has one, otherwise the homepage hero form. */
export function quoteHref(pathname: string) {
  const hasForm = pathname === "/" || pathname === "/contact" || pathname.startsWith("/services/");
  return hasForm ? "#quote" : "/#quote";
}
