export type RegionSlug =
  | "gyeonggi"
  | "gangwon"
  | "chungcheong"
  | "jeolla"
  | "gyeongsang"
  | "jeju";

export type EraSlug =
  | "baekje"
  | "silla"
  | "gaya"
  | "goryeo"
  | "joseon"
  | "person";

export type Etymology = {
  summary: string;
  consensus: string;
  other?: string;
};

export type LinkItem = {
  href: string;
  label: string;
};

export type Film = {
  slug: string;
  title: string;
  english: string;
  year: string;
  kind: "영화";
  why: string;
  fiction: string;
  links: LinkItem[];
};

export type Region = {
  slug: RegionSlug;
  name: string;
  english: string;
  hanja: string;
  lede: string;
  overview: string[];
  character: string[];
  etymology: Etymology;
  citySlugs: string[];
  otherPlaces: { name: string; text: string }[];
  events: { title: string; text: string }[];
  culture: string[];
  filmSlugs: string[];
};

export type City = {
  slug: string;
  region: RegionSlug;
  name: string;
  english: string;
  hanja: string;
  lede: string;
  etymology: Etymology;
  founding: string[];
  powers: string[];
  events: { title: string; text: string }[];
  culture: string[];
  filmSlugs: string[];
};

export type Ruler = {
  slug: string;
  name: string;
  english: string;
  formal: string;
  era: string;
  eraSlug: EraSlug;
  dates: string;
  badge: "역사" | "전설" | "전설과 역사가 섞임" | "왕이 아님";
  lede: string;
  body: string[];
  filmSlugs: string[];
  links: LinkItem[];
};

export type Era = {
  slug: string;
  name: string;
  english: string;
  years: string;
  summary: string;
  body: string[];
};
