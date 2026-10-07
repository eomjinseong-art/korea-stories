import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { regions } from "@/data/regions";

export const metadata: Metadata = {
  title: "고을",
  description:
    "경기도, 강원도, 충청도, 전라도, 경상도, 제주. 조선의 남쪽 도를 오늘의 남한 땅에 맞춰 짧게 정리했습니다.",
  alternates: { canonical: "/regions" },
};

export default function RegionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Crumb items={[{ href: "/", label: "홈" }, { label: "고을" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">PLACES</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">고을</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
        지도의 여섯 칸입니다. 경기도에는 한양·인천·수원을 두고, 충청은 충북·충남·대전·세종을, 전라는 전북·전남·광주를,
        경상은 경북·경남·부산·대구·울산을 한 도로 모았습니다. 제주만 섬이라 따로 가볍게 둡니다.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {regions.map((region) => (
          <li key={region.slug}>
            <a
              className="block rounded-lg border border-line bg-card p-5 hover:border-terra"
              href={`/regions/${region.slug}`}
            >
              <p className="text-[11px] tracking-[0.16em] text-terra">{region.english.toUpperCase()}</p>
              <h2 className="mt-1 font-serif text-2xl text-ink">
                {region.name}
                <span className="ml-2 font-sans text-sm text-muted">{region.hanja}</span>
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{region.lede}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
