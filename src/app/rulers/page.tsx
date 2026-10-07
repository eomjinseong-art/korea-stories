import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { FilmCards } from "@/components/FilmCards";
import { eraOrder, rulersByEra } from "@/data/rulers";

export const metadata: Metadata = {
  title: "왕",
  description:
    "백제·신라·가야·고려·조선에서 길을 잡는 왕과 세자, 그리고 이순신. 전체 명단이 아니라 짧은 전기입니다.",
  alternates: { canonical: "/rulers" },
};

export default function RulersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Crumb items={[{ href: "/", label: "홈" }, { label: "왕" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">RULERS</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">왕</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        남쪽 역사의 전체 왕 명단이 아닙니다. 고을 이야기와 이어지는 이름만 골랐습니다. 사도세자와 이순신은 왕이
        아니므로 표시를 달리했습니다. 전설은 전설이라고 적습니다.
      </p>
      <div className="mt-10 space-y-12">
        {eraOrder.map((era) => {
          const people = rulersByEra(era.slug);
          return (
            <section key={era.slug} aria-labelledby={`era-${era.slug}`}>
              <h2 id={`era-${era.slug}`} className="font-serif text-2xl text-ink">
                {era.label}
              </h2>
              <p className="mt-1 text-sm leading-7 text-muted">{era.note}</p>
              <ul className="mt-4 space-y-3">
                {people.map((person) => (
                  <li key={person.slug}>
                    <a
                      className="block rounded-lg border border-line bg-card p-4 hover:border-terra"
                      href={`/rulers/${person.slug}`}
                    >
                      <p className="text-[11px] tracking-[0.14em] text-terra">
                        {person.english} · {person.badge}
                      </p>
                      <h3 className="mt-1 font-serif text-xl text-ink">{person.name}</h3>
                      <p className="mt-1 text-xs text-muted">
                        {person.formal} · {person.dates}
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
      <FilmCards
        slugs={["the-throne", "masquerade", "the-kings-letters", "roaring-currents", "hwangsanbeol"]}
      />
    </div>
  );
}
