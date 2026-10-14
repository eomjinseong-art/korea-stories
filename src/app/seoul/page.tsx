import type { Metadata } from "next";
import { CoupangCard } from "@/components/CoupangCard";
import { Crumb } from "@/components/Crumb";
import { SeoulExplorer } from "@/components/SeoulExplorer";
import { SEOUL_ERAS, SEOUL_PINS, SEOUL_ROUTES, SEOUL_STORY_NOTE } from "@/data/seoul-explorer";
import { SEOUL_IMAGES } from "@/data/seoul-images";
import { nadooTimeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "서울 시내 탐험",
  description:
    "경복궁·창덕궁·종묘에서 정동·탑골공원·서대문형무소까지 서울 29곳을 지도와 사진으로. 조선 왕의 하루, 3·1운동의 날, 대한제국 정동길 산책 경로.",
  alternates: { canonical: "/seoul" },
};

const link = "text-laurel underline decoration-line underline-offset-4 hover:text-terra";

export default function SeoulPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Crumb items={[{ href: "/", label: "홈" }, { label: "서울 시내 탐험" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">SEOUL EXPLORER</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">서울 시내 탐험</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
        북악산·인왕산·낙산·남산을 잇는 한양도성 안팎의 29곳입니다. 핀을 누르면 사진과 세운 사람, 그곳에서 있었던 일, 그때와 지금이 열립니다. 궁궐과 문의 긴 설명은{" "}
        <a className={link} href="/palaces">궁궐</a>·<a className={link} href="/gates">사대문</a>, 인물은{" "}
        <a className={link} href="/rulers">왕</a>·<a className={link} href="/defenders">지킨 사람들</a>에 있습니다.
      </p>
      <p className="text-xs text-muted">Explore 29 places of Joseon Hanyang and modern Seoul, with photos and three walking routes.</p>
      <SeoulExplorer pins={SEOUL_PINS} routes={SEOUL_ROUTES} images={SEOUL_IMAGES} eras={SEOUL_ERAS} storyNote={SEOUL_STORY_NOTE} />
      <CoupangCard copy={{ icon: "🏯", ko: "사대문은 밤 10시에 닫혔지만, 로켓배송은 새벽에도 문 앞까지 와요", en: "Seoul's gates shut at curfew. Deliveries still reach your door at dawn." }} />
      <section className="mt-10" aria-labelledby="seoul-list">
        <h2 id="seoul-list" className="font-serif text-2xl text-ink">
          장소 목록 <span className="text-sm text-muted">All places</span>
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {SEOUL_PINS.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="block rounded-md border border-line bg-card px-3 py-2 text-sm hover:border-terra">
                <span className="text-ink">{p.ko}</span>
                <span className="block text-[11px] text-muted">{p.en} · {p.builder.en}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-7 text-muted">
          사진은 모두 Wikimedia Commons의 퍼블릭 도메인·CC·공공누리 제1유형 사진이며, 각 카드에 작가와 라이선스를 적었습니다. 같은 시대 세계에서 무슨 일이 있었는지는{" "}
          <a className={link} href={nadooTimeline.href} target="_blank" rel="noopener noreferrer">{nadooTimeline.label}</a>에서 이어 볼 수 있습니다.
        </p>
      </section>
    </div>
  );
}
