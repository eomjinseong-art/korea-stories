import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { PalaceTimeline } from "@/components/PalaceTimeline";
import { timelineNote } from "@/data/palace-timeline";

export const metadata: Metadata = {
  title: "궁궐 연표",
  description:
    "1394년부터 오늘까지 경복궁, 창덕궁, 창경궁, 덕수궁, 경희궁의 건립과 화재, 중건, 일제강점기 훼손과 복원을 나란히 봅니다.",
  alternates: { canonical: "/palaces/timeline" },
  openGraph: {
    title: "궁궐 연표",
    description: "다섯 궁이 타고 다시 세워진 해를 한 표에 놓습니다. 빈칸은 일이 없었다는 뜻이 아닙니다.",
  },
};

export default function PalaceTimelinePage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/palaces", label: "궁궐" },
          { label: "연표" },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">TIMELINE</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">궁궐 연표</h1>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
        다섯 궁을 같은 해에 나란히 봅니다. 전화기는 표를 옆으로 밀면 됩니다. 해 칸은 밀어도 옆에 남습니다.
      </p>
      <div className="mt-4 max-w-3xl space-y-3">
        {timelineNote.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-sm leading-7 text-ink">
            {paragraph}
          </p>
        ))}
      </div>
      <PalaceTimeline />
      <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/palaces">
          다섯 궁
        </a>
        <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/gates">
          한양도성과 사대문
        </a>
        <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/sources">
          출처
        </a>
      </p>
    </article>
  );
}
