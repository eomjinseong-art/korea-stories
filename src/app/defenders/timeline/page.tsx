import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { DefenderNav } from "@/components/DefenderNav";
import { defenderEras, defendersByEra } from "@/data/defenders";

export const metadata: Metadata = {
  title: "나라를 지킨 사람들 연표",
  description:
    "고구려부터 일제강점기까지, 명장과 독립운동가를 시대 순서로 읽는 짧은 연표입니다.",
  alternates: { canonical: "/defenders/timeline" },
  openGraph: {
    title: "나라를 지킨 사람들 연표",
    description: "시대 순서로 읽는 명장과 독립운동가.",
    url: "/defenders/timeline",
  },
};

export default function DefenderTimelinePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/defenders", label: "나라를 지킨 사람들" },
          { label: "연표" },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">TIMELINE</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">연표</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        시대 순입니다. 같은 시대 안에서는 대표적인 해의 앞뒤입니다. 태어난 해와 싸우는 해가 다를 때는 싸운 해를
        앞세웁니다. 전승은 각 사람 페이지에 적습니다.
      </p>
      <DefenderNav current="timeline" />
      <div className="mt-10 space-y-12">
        {defenderEras.map((era) => {
          const people = defendersByEra(era.slug);
          return (
            <section key={era.slug} aria-labelledby={`timeline-${era.slug}`}>
              <p className="text-[11px] tracking-[0.16em] text-terra">{era.english.toUpperCase()}</p>
              <h2 id={`timeline-${era.slug}`} className="mt-1 font-serif text-3xl text-ink">
                {era.label}
              </h2>
              <p className="mt-2 text-sm leading-7 text-muted">{era.note}</p>
              <ol className="mt-4 space-y-4 border-l border-line pl-4">
                {people.map((person) => (
                  <li key={person.slug} className="relative">
                    <p className="text-xs text-terra">{Math.floor(person.sortYear)}년 · {person.badge}</p>
                    <a
                      href={`/defenders/${person.slug}`}
                      className="font-serif text-xl text-ink underline decoration-line underline-offset-4 hover:text-terra"
                    >
                      {person.name}
                    </a>
                    <p className="text-xs text-muted">
                      {person.english} · {person.years}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-ink">
                      {person.activity}. 상대는 {person.opponent}입니다.
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
    </article>
  );
}
