import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { regions } from "@/data/regions";
import { rulers } from "@/data/rulers";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/regions",
    "/rulers",
    "/family-tree",
    "/eras",
    "/films",
    "/sources",
    ...regions.map((region) => `/regions/${region.slug}`),
    ...cities.map((city) => `/regions/${city.region}/${city.slug}`),
    ...rulers.map((ruler) => `/rulers/${ruler.slug}`),
  ];

  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
  }));
}
