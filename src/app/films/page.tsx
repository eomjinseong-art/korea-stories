import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { CrossSiteSection } from "@/components/CrossSiteSection";
import { FilmCards } from "@/components/FilmCards";
import { films } from "@/data/films";
import { otherFilms } from "@/lib/site";

export const metadata: Metadata = {
  title: "관련 영화",
  description:
    "나랏말싸미, 사도, 광해, 명량, 남한산성 등 한국 역사를 배경으로 한 영화. 제목과 해, 어디가 창작인지만 적습니다. 감상 링크는 없습니다.",
  alternates: { canonical: "/films" },
};

export default function FilmsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Crumb items={[{ href: "/", label: "홈" }, { label: "영화" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">FILMS</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">관련 영화</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        한국 역사를 처음 상상할 때 영화가 먼저인 경우가 많습니다. 제목은 실제로 개봉한 작품만 적었습니다. 각 카드는 왜
        보면 좋은지, 어디가 창작인지 두 단락으로 나눕니다. 스트리밍 링크는 없습니다.
      </p>
      <FilmCards slugs={films.map((film) => film.slug)} heading="작품" />
      <CrossSiteSection id="other-films-heading" title="다른 사이트의 영화" english="Films on sister sites" links={otherFilms} />
    </div>
  );
}
