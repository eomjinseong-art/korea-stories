export const SITE_NAME = "대한민국이야기";
export const SITE_ENGLISH = "Korea Stories";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://korea-stories.vercel.app";

export const SITE_DESCRIPTION =
  "어려운 한국 역사를, 짧은 한국어로. 경기·강원·충청·전라·경상·제주의 고을과, 백제·신라·가야·고려·조선의 길을 잡는 왕을 전설과 역사를 구분해 적습니다.";

export const TAGLINE = "나두 — 나의 모든 일상을 AI와 함께";

export const COUPANG_URL = "https://link.coupang.com/a/hsdzLh1vB6";
export const COUPANG_LINE =
  "삼국은 통일까지 오래 걸렸습니다. 장보기는 로켓이면 됩니다 · 쿠팡 둘러보기";

export const nav = [
  { href: "/#map", label: "지도" },
  { href: "/regions", label: "고을" },
  { href: "/rulers", label: "왕" },
  { href: "/family-tree", label: "가족관계도" },
  { href: "/eras", label: "시대" },
  { href: "/films", label: "영화" },
  { href: "/sources", label: "출처" },
] as const;

export const sisters = [
  { href: "https://nadoo-myth.vercel.app", label: "나두신화", english: "Myth" },
  { href: "https://iliad-stories.vercel.app", label: "일리아스이야기", english: "Iliad" },
  { href: "https://greece-stories.vercel.app", label: "그리스이야기", english: "Greece" },
  { href: "https://rome-stories.vercel.app", label: "로마이야기", english: "Rome" },
  { href: "https://egypt-stories.vercel.app", label: "이집트이야기", english: "Egypt" },
  { href: "https://persia-stories.vercel.app", label: "페르시아이야기", english: "Persia" },
  { href: "https://the-chosen-korean.vercel.app", label: "더 초즌 · 성경", english: "The Chosen · Bible" },
  { href: "https://philosophy-stories.vercel.app", label: "철학이야기", english: "Philosophy" },
  { href: "https://nadoo-timeline.vercel.app", label: "나두연표", english: "Timeline" },
  { href: "https://tinalinkeom.vercel.app", label: "나두 허브", english: "Nadoo Hub" },
] as const;

/** Origins a link checker must not fail when the response is still 404. */
export const linkCheckAllow404 = ["https://iliad-stories.vercel.app"] as const;

export const otherFamilyTrees = [
  { href: "https://rome-stories.vercel.app/family-tree", label: "로마이야기 가족관계도", english: "Rome" },
  { href: "https://greece-stories.vercel.app/family-tree", label: "그리스이야기 가족관계도", english: "Greece" },
  { href: "https://egypt-stories.vercel.app/family-tree", label: "이집트이야기 가족관계도", english: "Egypt" },
  { href: "https://persia-stories.vercel.app/family-tree", label: "페르시아이야기 가족관계도", english: "Persia" },
  { href: "https://nadoo-myth.vercel.app/family-tree", label: "나두신화 가족관계도", english: "Myth" },
  { href: "https://the-chosen-korean.vercel.app/family-tree", label: "더 초즌 · 성경 가족관계도", english: "The Chosen · Bible" },
] as const;

export const otherFilms = [
  { href: "https://rome-stories.vercel.app/movies", label: "로마이야기 영화", english: "Rome" },
  { href: "https://greece-stories.vercel.app/movies", label: "그리스이야기 영화", english: "Greece" },
  { href: "https://egypt-stories.vercel.app/movies", label: "이집트이야기 영화", english: "Egypt" },
  { href: "https://persia-stories.vercel.app/movies", label: "페르시아이야기 영화", english: "Persia" },
  { href: "https://philosophy-stories.vercel.app/films", label: "철학이야기 영화", english: "Philosophy" },
  { href: "https://nadoo-myth.vercel.app/in-media", label: "나두신화 영화", english: "Myth" },
  { href: "https://the-chosen-korean.vercel.app/together", label: "더 초즌 · 성경 영화", english: "The Chosen · Bible" },
] as const;

export function externalAnchor(href: string): { target?: "_blank"; rel?: string } {
  if (href.startsWith("https://") || href.startsWith("http://")) {
    return { target: "_blank", rel: "noopener noreferrer" };
  }
  return {};
}

export const footerNote = [
  "대한민국이야기의 글은 삼국사기, 삼국유사, 고려사, 조선왕조실록과 지리지를 참고해 우리말로 다시 쓴 것입니다. 옛 문장이나 현대 책의 문장을 그대로 옮기지 않았고, 없는 말을 만들어 넣지 않았습니다.",
  "전설은 전설이라고 적습니다. 영화 제목과 상표는 각 권리자의 것입니다. 영화를 볼 수 있는 불법 사이트는 안내하지 않습니다.",
];
