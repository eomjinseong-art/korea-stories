/** 나두연표 허브로 가는 링크. 이야기 순 영화, 주인공 실존 여부, 동시대 인물. */
const HUB = "https://nadoo-timeline.vercel.app";
const YEARS: Record<string, Record<string, number>> = {"https://korea-stories.vercel.app/rulers/": {"suro": 42, "geunchogo": 360, "seong": 538, "uija": 650, "jinheung": 558, "seondeok": 640, "munmu": 671, "wanggeon": 930, "gwangjong": 962, "gongmin": 1362, "taejo": 1395, "sejong": 1434, "yeonsangun": 1500, "gwanghae": 1616, "yeongjo": 1750, "jeongjo": 1788, "sado": 1748}, "https://korea-stories.vercel.app/defenders/": {"eulji-mundeok": 612, "kim-yu-sin": 634, "jang-bo-go": 837, "gang-gam-chan": 990, "choe-yeong": 1352, "yi-sun-sin": 1572, "an-jung-geun": 1894, "hong-beom-do": 1906, "kim-gu": 1912}};

export function NadooHubPersonLink({ base, slug }: { base: string; slug: string }) {
  const year = YEARS[base]?.[slug];
  const contemporaries = year ? `${HUB}/contemporaries?year=${year}` : `${HUB}/contemporaries`;
  return (
    <aside aria-label="나두연표에서 보기" className="mt-8 rounded-md border border-line p-3 text-sm">
      <a href={contemporaries} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        동시대 인물 보기 · 나두연표 →
      </a>
      {" · "}
      <a href={`${HUB}/films`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        연표에서 보기 (이야기 순 영화)
      </a>
      {" · "}
      <a href={`${HUB}/protagonists`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        영화 주인공 실존 여부
      </a>
    </aside>
  );
}

export function NadooHubFilmsLink() {
  return (
    <aside aria-label="나두연표 영화 허브" className="mt-8 rounded-md border border-line p-3 text-sm">
      <a href={`${HUB}/films`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        모든 역사 영화를 이야기 속 해 순서로 보기 · 나두연표 →
      </a>
      {" · "}
      <a href={`${HUB}/protagonists`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        주인공은 실존 인물일까
      </a>
      {" · "}
      <a href={`${HUB}/contemporaries`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        동시대 인물
      </a>
    </aside>
  );
}
