import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";

export const metadata: Metadata = {
  title: "출처",
  description:
    "대한민국이야기가 참고한 옛 기록과, 문장을 그대로 옮기지 않는 기준. 전설은 전설이라고 적습니다.",
  alternates: { canonical: "/sources" },
};

const sources = [
  {
    title: "삼국사기",
    text: "김부식 등이 1145년에 엮은 삼국의 정사입니다. 백제·신라·가야가 신라로 흡수되는 줄거리, 왕과 전쟁의 해는 우선 여기를 기준으로 합니다. 초기 왕의 전기는 이 책도 후대에 정리한 이야기라는 점을 같이 적습니다.",
  },
  {
    title: "삼국유사",
    text: "일연이 13세기 후반에 모은 책입니다. 수로왕의 알, 선덕여왕의 예언, 불국사 창건 설화처럼 전설이 많습니다. 이 사이트는 삼국유사의 문장을 역사 연표와 같은 칸에 넣지 않습니다.",
  },
  {
    title: "고려사",
    text: "조선 초의 공식 고려 역사서입니다. 왕건, 광종, 공민왕, 지방 제도와 훈요십조의 전승을 대조할 때 씁니다. 승자의 문장이 섞여 있으므로, 숙청의 명분을 그대로 도덕으로 받지 않습니다.",
  },
  {
    title: "조선왕조실록",
    text: "태조부터 철종까지의 공식 기록입니다. 한양 천도, 훈민정음, 연산군의 사화, 광해군의 폐위, 영조와 사도세자, 정조의 화성 공사는 실록의 사건으로 적습니다. 세자를 처벌한 쪽의 문장은 병의 진단서처럼 중립적이지 않다는 점도 밝힙니다.",
  },
  {
    title: "지리지",
    text: "세종실록 지리지와 신증동국여지승람은 고을 이름의 연혁을 볼 때 기준이 됩니다. 경기·강원·충청·전라·경상의 머리글자, 인주가 인천이 된 개편, 웅진과 사비의 뒷이름 같은 통설은 여기서 뼈대를 잡습니다. 한자 뜻풀이는 다른 설로 나눕니다.",
  },
  {
    title: "난중일기",
    text: "이순신이 남긴 일기입니다. 명량 직전의 배 숫자와 전쟁의 날짜를 영화 자막과 구분할 때 씁니다. 일기의 문장을 이 사이트에 그대로 베끼지는 않습니다.",
  },
];

export default function SourcesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb items={[{ href: "/", label: "홈" }, { label: "출처" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">SOURCES</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">출처</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        글은 아래 기록을 참고해 우리말로 다시 쓴 것입니다. 옛 문장이나 현대 연구서의 문장을 그대로 옮기지 않았고,
        없는 인용과 없는 대사를 만들지 않았습니다. 영화 제목은 개봉한 작품만 적습니다.
      </p>
      <div className="mt-8 space-y-6">
        {sources.map((source) => (
          <section key={source.title}>
            <h2 className="font-serif text-2xl text-ink">{source.title}</h2>
            <p className="mt-2 text-sm leading-7 text-ink">{source.text}</p>
          </section>
        ))}
      </div>
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-ink">적지 않는 것</h2>
        <div className="mt-3 space-y-3 text-sm leading-7 text-ink">
          <p>황해도·평안도·함경도의 고을 페이지는 만들지 않습니다. 그 땅이 역사에 없었다는 뜻이 아닙니다. 이 지도의 범위가 남쪽이기 때문입니다.</p>
          <p>영화를 볼 수 있는 불법 사이트와, 확인하지 못한 쿠팡 이외의 제휴 링크는 넣지 않습니다.</p>
          <p>인물의 사생활 가십, 독살의 미확인 설, 드라마 대사는 사실 칸에 올리지 않습니다. 소문은 소문이라고만 적습니다.</p>
        </div>
      </section>
    </article>
  );
}
