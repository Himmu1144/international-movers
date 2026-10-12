import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { TopStrip } from "@/components/layout/TopStrip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/motion";
import { MobileBar } from "@/components/layout/MobileBar";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/lib/services";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Packers, Movers & Storage`,
    template: `%s | ${site.name}`,
  },
  description:
    "Safe packing, moving and secure storage for homes, offices and vehicles — local, domestic and international relocation.",
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "@id": `${site.url}/#business`,
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/logo.png`,
  image: `${site.url}/opengraph-image.jpg`,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.pin,
    addressCountry: "IN",
  },
  areaServed: ["Gurgaon", "Delhi NCR", "India", "Worldwide"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "21:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Moving and storage services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` },
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <JsonLd data={businessSchema} />
        <MotionProvider>
          <TopStrip />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBar />
        </MotionProvider>
      </body>
    </html>
  );
}
