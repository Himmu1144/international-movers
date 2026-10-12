import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({
    url: `${site.url}${path}`,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "weekly"),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.9)),
    page("/about", 0.7),
    page("/contact", 0.8),
    page("/blog", 0.6, "weekly"),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms-and-conditions", 0.2, "yearly"),
  ];
}
