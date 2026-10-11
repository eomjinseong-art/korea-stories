import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { DefenderNav } from "@/components/DefenderNav";
import { battles } from "@/data/battles";

export const metadata: Metadata = {
  title: "전투",
  description: "살수대첩, 귀주대첩, 임진왜란 주요 해전, 청산리·봉오동. 모식도와 순서로 어떻게 이겼는지 적습니다.",
  alternates: { canonical: "/defenders/battles" },
  openGraph: {
    title: "전투",
    description: "네 전투의 모식도와 승리의 순서.",
    url: "/defenders/battles",
  },
};

export default function BattlesIndexPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/defenders", label: "나라를 지킨 사람들" },
          { label: "전투" },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">BATTLES</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">어떻게 이겼나</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        네 전투만 골랐습니다. 그림은 축척이 없는 모식도입니다. 병력 숫자는 기록마다 달라 여기서 외우지 않습니다.
      </p>
      <DefenderNav />
      <ul className="mt-8 space-y-3">
        {battles.map((battle) => (
          <li key={battle.slug}>
            <a
              className="block rounded-lg border border-line bg-card p-4 hover:border-terra"
              href={`/defenders/battles/${battle.slug}`}
            >
              <p className="text-[11px] tracking-[0.14em] text-terra">
                {battle.english} · {battle.year}
              </p>
              <h2 className="mt-1 font-serif text-xl text-ink">{battle.name}</h2>
              <p className="mt-2 text-sm leading-7 text-muted">{battle.lede}</p>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
