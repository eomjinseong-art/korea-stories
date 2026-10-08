import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { Elsewhere } from "@/components/Elsewhere";
import { eras } from "@/data/eras";

export const metadata: Metadata = {
  title: "시대",
  description:
    "삼국과 가야, 통일신라, 고려, 조선. 남쪽 한국 역사를 네 칸으로 나누는 짧은 연표입니다.",
  alternates: { canonical: "/eras" },
};

export default function ErasPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb items={[{ href: "/", label: "홈" }, { label: "시대" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">ERAS</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">시대</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        연대는 교과서와 삼국사기·고려사·실록에서 널리 쓰는 눈금입니다. 건국 신화의 해는 사실처럼 굵게 쓰지 않습니다.
        북쪽 나라의 영토는 이 글에서 지도로 그리지 않고, 남쪽과 닿는 해만 적습니다.
      </p>
      <div className="mt-10 space-y-12">
        {eras.map((era) => (
          <section key={era.slug} id={era.slug} aria-labelledby={`${era.slug}-heading`} className="scroll-mt-28">
            <p className="text-[11px] tracking-[0.16em] text-terra">{era.english.toUpperCase()}</p>
            <h2 id={`${era.slug}-heading`} className="mt-1 font-serif text-3xl text-ink">
              {era.name}
            </h2>
            <p className="mt-1 text-xs text-muted">{era.years}</p>
            <p className="mt-3 text-sm leading-7 text-ink">{era.summary}</p>
            <div className="mt-3 space-y-3">
              {era.body.map((paragraph) => (
                <p key={paragraph.slice(0, 28)} className="text-sm leading-7 text-ink">
                  {paragraph}
                </p>
              ))}
            </div>
            <Elsewhere links={era.links} />
          </section>
        ))}
      </div>
    </article>
  );
}
