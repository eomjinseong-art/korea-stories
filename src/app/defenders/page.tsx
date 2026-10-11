import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { CrossSiteSection } from "@/components/CrossSiteSection";
import { DefenderNav } from "@/components/DefenderNav";
import { FilmChecklist } from "@/components/FilmChecklist";
import { battles } from "@/data/battles";
import { checklistSlugs, defenders, defendersByLane, lanes } from "@/data/defenders";
import { filmsBySlugs } from "@/data/films";
import { nadooTimeline, nadooWorld, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "나라를 지킨 사람들",
  description:
    "명장과 독립운동가. 을지문덕의 살수, 강감찬의 귀주, 이순신의 한산·명량·노량, 홍범도의 봉오동과 김좌진의 청산리. 전승은 전승이라고 적습니다.",
  alternates: { canonical: "/defenders" },
  keywords: ["나라를 지킨 사람들", "명장", "독립운동가", "Defenders of Korea", "살수대첩", "귀주대첩", "이순신", "안중근"],
  openGraph: {
    title: "나라를 지킨 사람들",
    description: "명장 16명과 독립운동가 11명. 전승은 전승이라고 적습니다.",
    url: "/defenders",
  },
};

const laneOrder = ["general", "activist"] as const;

export default function DefendersPage() {
  const checklist = filmsBySlugs([...checklistSlugs]).map((film) => ({
    slug: film.slug,
    title: film.title,
    english: film.english,
    year: film.year,
    kind: film.kind,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "나라를 지킨 사람들",
    alternateName: "Defenders of Korea",
    url: `${SITE_URL}/defenders`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    inLanguage: "ko",
    about: defenders.map((person) => ({
      "@type": "Person",
      name: person.name,
      alternateName: person.english,
      url: `${SITE_URL}/defenders/${person.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Crumb items={[{ href: "/", label: "홈" }, { label: "나라를 지킨 사람들" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">DEFENDERS OF KOREA</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">나라를 지킨 사람들</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
        왕만으로 전쟁이 설명되지 않습니다. 명장 {defendersByLane("general").length}명과 독립운동가{" "}
        {defendersByLane("activist").length}명을 골랐습니다. 전체 명단이 아닙니다. 전설과 확인되지 않는 이름은
        전승이라고 적고, 평가가 갈리는 사람은 행위와 이후 행로를 나눕니다.
      </p>
      <DefenderNav current="home" />

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {laneOrder.map((lane) => {
          const meta = lanes[lane];
          const people = defendersByLane(lane);
          return (
            <section key={lane} id={lane === "general" ? "generals" : "activists"} aria-labelledby={`${lane}-heading`}>
              <p className="text-[11px] tracking-[0.16em] text-terra">{meta.english.toUpperCase()}</p>
              <h2 id={`${lane}-heading`} className="mt-1 font-serif text-3xl text-ink">
                {meta.label}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">{meta.note}</p>
              <ul className="mt-4 space-y-3">
                {people.map((person) => (
                  <li key={person.slug}>
                    <a
                      className="block rounded-lg border border-line bg-card p-4 hover:border-terra"
                      href={`/defenders/${person.slug}`}
                    >
                      <p className="text-[11px] tracking-[0.14em] text-terra">
                        {person.english} · {person.badge}
                      </p>
                      <h3 className="mt-1 font-serif text-xl text-ink">{person.name}</h3>
                      <p className="mt-1 text-xs text-muted">
                        {person.era} · {person.years} · {person.opponent}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-muted">{person.lede}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section id="battles" className="mt-14 scroll-mt-28" aria-labelledby="battles-heading">
        <p className="text-[11px] tracking-[0.16em] text-terra">BATTLES</p>
        <h2 id="battles-heading" className="mt-1 font-serif text-3xl text-ink">
          어떻게 이겼나
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
          네 전투만 골라, 모식도와 순서로 적습니다. 그림은 축척이 없는 설명용이고, 저작권 있는 지도를 베끼지 않았습니다.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {battles.map((battle) => (
            <li key={battle.slug}>
              <a
                className="block h-full rounded-lg border border-line bg-card p-4 hover:border-terra"
                href={`/defenders/battles/${battle.slug}`}
              >
                <p className="text-[11px] tracking-[0.14em] text-terra">
                  {battle.english} · {battle.year}
                </p>
                <h3 className="mt-1 font-serif text-xl text-ink">{battle.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{battle.lede}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="films" className="mt-14 scroll-mt-28" aria-labelledby="films-heading">
        <p className="text-[11px] tracking-[0.16em] text-terra">FILM CHECKLIST</p>
        <h2 id="films-heading" className="mt-1 font-serif text-3xl text-ink">
          영화 체크리스트
        </h2>
        <div className="mt-3 max-w-3xl">
          <FilmChecklist items={checklist} />
        </div>
      </section>

      <section className="mt-14" aria-labelledby="inside-heading">
        <h2 id="inside-heading" className="font-serif text-2xl text-ink">
          이 사이트 안에서
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <li>
            <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/rulers">
              왕
            </a>
          </li>
          <li>
            <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/family-tree">
              가족관계도
            </a>
          </li>
          <li>
            <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/films">
              관련 영화
            </a>
          </li>
          <li>
            <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/sources">
              출처
            </a>
          </li>
        </ul>
      </section>

      <CrossSiteSection
        id="defender-sisters"
        title="나두연표 · 나두세계"
        english="Timeline and world"
        links={[nadooTimeline, ...nadooWorld]}
      />
    </div>
  );
}
