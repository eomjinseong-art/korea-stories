"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/data/defender-quiz";
import { CoupangCard } from "@/components/CoupangCard";

export function DefenderQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [picks, setPicks] = useState<Record<string, number | undefined>>({});
  const [graded, setGraded] = useState(false);

  const answered = questions.filter((question) => picks[question.id] !== undefined).length;
  const complete = answered === questions.length;
  const score = questions.filter((question) => picks[question.id] === question.answer).length;

  return (
    <form
      className="mt-8 space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        if (complete) setGraded(true);
      }}
    >
      {questions.map((question, index) => {
        const pick = picks[question.id];
        const correct = pick === question.answer;
        return (
          <fieldset key={question.id} className="rounded-lg border border-line bg-card p-4">
            <legend className="px-1 font-serif text-lg text-ink">
              {index + 1}. {question.prompt}
            </legend>
            <div className="mt-3 space-y-2">
              {question.choices.map((choice, choiceIndex) => {
                const id = `${question.id}-${choiceIndex}`;
                return (
                  <label key={choice} htmlFor={id} className="flex cursor-pointer items-start gap-2 text-sm leading-6">
                    <input
                      id={id}
                      type="radio"
                      name={question.id}
                      className="mt-1 accent-[#a34732]"
                      checked={pick === choiceIndex}
                      onChange={() => {
                        setPicks((prev) => ({ ...prev, [question.id]: choiceIndex }));
                        setGraded(false);
                      }}
                    />
                    <span>{choice}</span>
                  </label>
                );
              })}
            </div>
            {graded ? (
              <p className="mt-3 text-sm leading-7 text-ink">
                <span className="text-terra">{correct ? "맞았습니다." : "다시 읽어 볼 자리입니다."}</span>{" "}
                {question.explain}
              </p>
            ) : null}
          </fieldset>
        );
      })}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={!complete}
          className="rounded-full bg-terra px-4 py-2 text-sm text-white hover:bg-terra-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          채점하기
        </button>
        <p className="text-sm text-muted">
          {complete ? "열 문제를 모두 골랐습니다." : `${questions.length}문제 중 ${answered}문제를 골랐습니다.`}
        </p>
      </div>
      {graded ? (
        <p aria-live="polite" className="font-serif text-2xl text-ink">
          {questions.length}문제 중 {score}개
        </p>
      ) : null}
      {graded ? <CoupangCard /> : null}
    </form>
  );
}
