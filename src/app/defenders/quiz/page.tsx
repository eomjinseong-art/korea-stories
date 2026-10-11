import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { DefenderNav } from "@/components/DefenderNav";
import { DefenderQuiz } from "@/components/DefenderQuiz";
import { defenderQuiz } from "@/data/defender-quiz";

export const metadata: Metadata = {
  title: "나라를 지킨 사람들 퀴즈",
  description:
    "살수, 안시성, 귀주, 명량, 진주, 하얼빈, 훙커우, 봉오동, 의열단. 열 문제로 이름과 자리를 가려 봅니다.",
  alternates: { canonical: "/defenders/quiz" },
  openGraph: {
    title: "나라를 지킨 사람들 퀴즈",
    description: "명장과 독립운동가 열 문제. 전승과 기록을 구분합니다.",
    url: "/defenders/quiz",
  },
};

export default function DefenderQuizPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/defenders", label: "나라를 지킨 사람들" },
          { label: "퀴즈" },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">QUIZ</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">퀴즈</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        열 문제입니다. 영화의 장면이 아니라 이 사이트의 글을 기준으로 합니다. 양만춘은 전승이고, 봉오동과 청산리는 다른
        달의 다른 지휘관입니다.
      </p>
      <DefenderNav current="quiz" />
      <DefenderQuiz questions={defenderQuiz} />
    </article>
  );
}
