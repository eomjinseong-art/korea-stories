import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { FilmCards } from "@/components/FilmCards";
import { HanyangMap } from "@/components/HanyangMap";
import { palaces, relatedSites } from "@/data/palaces";

export const metadata: Metadata = {
  title: "고궁·사대문",
  description:
    "경복궁, 창덕궁, 창경궁, 덕수궁, 경희궁과 종묘·사직단. 언제 누가 지었는지, 어느 왕이 머물렀는지, 일제강점기에 어떻게 훼손되었는지를 짧은 한국어로 적습니다.",
  alternates: { canonical: "/palaces" },
  openGraph: {
    title: "고궁·사대문",
    description:
      "서울의 다섯 궁궐. 법궁과 이궁, 화재와 중건, 대한제국과 일제강점기의 훼손을 궁마다 나눕니다.",
  },
};

const filmSlugs = [...new Set(palaces.flatMap((palace) => palace.filmSlugs))];

export default function PalacesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Crumb items={[{ href: "/", label: "홈" }, { label: "궁궐" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">PALACES</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">고궁·사대문</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        한양의 다섯 궁입니다. 경복궁만 법궁이고, 나머지는 이궁으로 시작해 실제로 왕이 산 시기가 다릅니다. 덕수궁이라는
        이름은 1907년부터입니다. 문은{" "}
        <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/gates">
          한양도성과 사대문
        </a>
        에, 건물이 타고 다시 세워진 해는{" "}
        <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/palaces/timeline">
          궁궐 연표
        </a>
        에 나란히 두었습니다.
      </p>

      <div className="mt-8">
        <HanyangMap />
      </div>

      <ul className="mt-8 space-y-3">
        {palaces.map((palace) => (
          <li key={palace.slug}>
            <a
              className="block rounded-lg border border-line bg-card p-4 hover:border-terra"
              href={`/palaces/${palace.slug}`}
            >
              <p className="text-[11px] tracking-[0.14em] text-terra">
                {palace.english.toUpperCase()} · {palace.role}
              </p>
              <h2 className="mt-1 font-serif text-2xl text-ink">{palace.name}</h2>
              <p className="mt-1 text-xs text-muted">
                {palace.hanja}
                {palace.former ? ` · 옛 이름 ${palace.former}` : ""} · {palace.years}
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">{palace.lede}</p>
            </a>
          </li>
        ))}
      </ul>

      <section className="mt-12" aria-labelledby="related-sites-heading">
        <h2 id="related-sites-heading" className="font-serif text-2xl text-ink">
          궁 밖의 두 축
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted">따로 깊은 글은 두지 않습니다. 도읍의 제사 자리만 짧게 적습니다.</p>
        <div className="mt-4 space-y-6">
          {relatedSites.map((site) => (
            <section key={site.title} id={site.title === "종묘" ? "jongmyo" : "sajik"} className="scroll-mt-40">
              <p className="text-[11px] tracking-[0.14em] text-terra">{site.english?.toUpperCase()}</p>
              <h3 className="mt-1 font-serif text-xl text-ink">{site.title}</h3>
              {site.body.map((paragraph, index) => (
                <p key={index} className="mt-2 text-sm leading-7 text-ink">
                  {paragraph.map((part) => (typeof part === "string" ? part : part.label))}
                </p>
              ))}
            </section>
          ))}
        </div>
      </section>

      <p className="mt-8 text-sm">
        <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/regions/gyeonggi/hanyang">
          한양 · 서울
        </a>
      </p>

      <FilmCards slugs={filmSlugs} heading="궁궐이 나오는 영화·드라마" />
    </div>
  );
}
