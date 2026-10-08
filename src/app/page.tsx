import { cities } from "@/data/cities";
import { eras } from "@/data/eras";
import { films } from "@/data/films";
import { regions } from "@/data/regions";
import { rulers } from "@/data/rulers";
import { KoreaMap } from "@/components/KoreaMap";
import { externalAnchor, sisters, SITE_DESCRIPTION, SITE_NAME, SITE_URL, TAGLINE } from "@/lib/site";

const paths = [
  {
    href: "/regions",
    index: "01",
    english: "Places",
    title: "고을",
    text: "경기·강원·충청·전라·경상, 그리고 제주. 지도의 칸이 곧 목차입니다.",
  },
  {
    href: "/rulers",
    index: "02",
    english: "Rulers",
    title: "왕",
    text: "백제·신라·가야의 길목, 고려와 조선에서 길을 잡는 이름. 전체 명단은 아닙니다.",
  },
  {
    href: "/family-tree",
    index: "03",
    english: "Family Tree",
    title: "가족관계도",
    text: "고조선부터 조선 27왕까지. 왕위를 이은 순서와, 실제로 낳은 아버지를 구분해 그립니다.",
  },
  {
    href: "/eras",
    index: "04",
    english: "Eras",
    title: "시대",
    text: "삼국과 가야, 통일신라, 고려, 조선. 한 단어로 외우기 전에 네 칸으로 나눕니다.",
  },
  {
    href: "/films",
    index: "05",
    english: "Films",
    title: "관련 영화",
    text: "사도, 명량, 남한산성, 나랏말싸미처럼 남쪽 역사를 배경으로 한 작품. 어디가 창작인지도 함께.",
  },
  {
    href: "/sources",
    index: "06",
    english: "Sources",
    title: "출처",
    text: "삼국사기, 삼국유사, 고려사, 조선왕조실록. 이 사이트가 문장을 지어내지 않는 기준.",
  },
];

const reading = [
  { href: "/#map", label: "지도에서 남쪽 여섯 고을의 자리" },
  { href: "/regions/gyeonggi/hanyang", label: "한양이 도읍이 된 해" },
  { href: "/regions/gyeongsang/gyeongju", label: "경주가 천 년 가까이 수도였던 이유" },
  { href: "/regions/chungcheong/buyeo", label: "백제가 부여에서 끝난 일" },
  { href: "/rulers/sejong", label: "훈민정음은 한글이라는 이름보다 먼저" },
  { href: "/family-tree?dynasty=joseon&focus=js-seonjo", label: "선조는 명종의 아들이 아니다" },
  { href: "/rulers/sado", label: "사도세자는 왕이 아니었다" },
  { href: "/films#roaring-currents", label: "명량의 배 숫자는 영화 자막이 아니다" },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        alternateName: ["Korea Stories", "한국이야기", "쉬운 한국 역사"],
        url: SITE_URL,
        inLanguage: "ko",
        description: SITE_DESCRIPTION,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section
        id="map"
        aria-labelledby="home-heading"
        className="grid items-start gap-6 py-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:py-8"
      >
        <div className="order-2 lg:order-1 lg:pt-4">
          <p className="text-xs tracking-[0.3em] text-terra">KOREA STORIES</p>
          <h1 id="home-heading" className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
            대한민국이야기
          </h1>
          <p className="mt-4 text-lg text-muted">어려운 한국 역사를, 짧은 한국어로</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
            백제·신라·가야, 고려와 조선을 남쪽 고을의 이야기로 읽습니다. 어려운 말에는 쉬운 풀이를 붙입니다.
          </p>
          <p className="mt-3 text-xs text-terra">{TAGLINE}</p>
          <p className="mt-4 max-w-xl text-xs leading-6 text-muted">
            전설은 전설이라고 적습니다. 고을 {regions.length}곳, 도시 {cities.length}곳, 길을 잡는 사람 {rulers.length}
            명, 영화 {films.length}편을 짧은 글로 정리했습니다. 고구려의 영토와 고려의 수도 개경은 이 지도
            북쪽 밖입니다. 남쪽과 겹치는 대목만 적습니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a className="rounded-full bg-terra px-4 py-2 text-white hover:bg-terra-deep" href="/regions">
              고을부터 보기
            </a>
            <a className="rounded-full border border-line bg-card px-4 py-2 hover:border-terra" href="/rulers">
              왕 목록
            </a>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <KoreaMap />
        </div>
      </section>

      <div className="dentil opacity-50" aria-hidden="true" />

      <section className="mt-10" aria-labelledby="era-heading">
        <h2 id="era-heading" className="font-serif text-2xl text-ink">
          네 시대
        </h2>
        <p className="mt-1 text-sm text-muted">한국사를 한 덩어리로 외우면 어렵습니다. 먼저 이 네 칸만 나누세요.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {eras.map((era) => (
            <a
              key={era.slug}
              className="rounded-lg border border-line bg-card p-5 hover:border-terra"
              href={`/eras#${era.slug}`}
            >
              <p className="text-[11px] tracking-[0.16em] text-terra">{era.english.toUpperCase()}</p>
              <h3 className="mt-1 font-serif text-2xl text-ink">{era.name}</h3>
              <p className="mt-1 text-xs text-muted">{era.years}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{era.summary}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="menu-heading">
        <h2 id="menu-heading" className="font-serif text-2xl text-ink">
          모든 길
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {paths.map((item) => (
            <a
              key={item.href}
              className="group rounded-lg border border-line bg-card p-5 transition hover:border-terra hover:shadow-sm"
              href={item.href}
            >
              <p className="font-serif text-xs text-terra">
                {item.index} · {item.english}
              </p>
              <h3 className="mt-1 font-serif text-xl text-ink group-hover:text-terra">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl text-ink">처음 읽는 순서</h2>
          <ol className="mt-4 space-y-2 text-sm">
            {reading.map((item, index) => (
              <li key={item.href}>
                <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href={item.href}>
                  {index + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
        <section aria-labelledby="sister-sites-heading" className="rounded-lg border border-line bg-card p-5">
          <h2 id="sister-sites-heading" className="font-serif text-2xl text-ink">
            나두 역사·신화
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            신의 이야기와 그리스·로마·이집트의 글은 나두의 다른 사이트에 있습니다. 대한민국이야기는 남쪽 고을의 정치,
            전쟁, 지명을 적습니다.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {sisters.map((site) => (
              <li key={site.href}>
                <a
                  href={site.href}
                  className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
                  {...externalAnchor(site.href)}
                >
                  {site.label}
                </a>
                <span className="ml-2 text-[11px] tracking-[0.12em] text-terra">{site.english}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
}
