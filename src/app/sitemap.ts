import type { MetadataRoute } from "next";
import { battles } from "@/data/battles";
import { cities } from "@/data/cities";
import { defenders } from "@/data/defenders";
import { palaces } from "@/data/palaces";
import { regions } from "@/data/regions";
import { rulers } from "@/data/rulers";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/regions",
    "/palaces",
    "/palaces/timeline",
    "/gates",
    "/seoul",
    "/rulers",
    "/family-tree",
    "/eras",
    "/films",
    "/sources",
    "/defenders",
    "/defenders/timeline",
    "/defenders/quiz",
    "/defenders/battles",
    ...regions.map((region) => `/regions/${region.slug}`),
    ...cities.map((city) => `/regions/${city.region}/${city.slug}`),
    ...rulers.map((ruler) => `/rulers/${ruler.slug}`),
    ...palaces.map((palace) => `/palaces/${palace.slug}`),
    ...defenders.map((person) => `/defenders/${person.slug}`),
    ...battles.map((battle) => `/defenders/battles/${battle.slug}`),
  ];

  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
  }));
}
