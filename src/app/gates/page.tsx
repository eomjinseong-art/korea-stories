import type { Metadata } from "next";
import { Crumb } from "@/components/Crumb";
import { HanyangMap } from "@/components/HanyangMap";
import { Prose } from "@/components/Prose";
import { bosingak, gateLinks, greatGates, smallGates, virtueNote, wallParagraphs, type Gate } from "@/data/gates";
import { externalAnchor } from "@/lib/site";

export const metadata: Metadata = {
  title: "한양도성과 사대문",
  description:
    "1396년 한양도성, 숭례문·흥인지문·돈의문·숙정문과 사소문 네 곳. 인·의·예·지와 보신각의 신, 2008년 숭례문 화재, 1915년 돈의문 철거를 짧은 한국어로 적습니다.",
  alternates: { canonical: "/gates" },
  openGraph: {
    title: "한양도성과 사대문",
    description: "한양을 두른 성과 여덟 문. 남아 있는 문과 없어진 문을 구분합니다.",
  },
};

function GateSection({ gate }: { gate: Gate }) {
  return (
    <section id={gate.slug} className="scroll-mt-40 border-t border-line pt-8" aria-labelledby={`${gate.slug}-heading`}>
      <p className="text-[11px] tracking-[0.14em] text-terra">
        {gate.english.toUpperCase()} · {gate.direction} · {gate.virtue}
      </p>
      <h3 id={`${gate.slug}-heading`} className="mt-1 font-serif text-2xl text-ink">
        {gate.name}
        <span className="ml-2 font-sans text-sm text-muted">{gate.aka}</span>
      </h3>
      <p className="mt-1 text-xs text-muted">
        {gate.hanja} · {gate.standing}
      </p>
      <Prose paragraphs={gate.body} />
    </section>
  );
}

export default function GatesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb items={[{ href: "/", label: "홈" }, { label: "사대문" }]} />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">GATES</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">한양도성과 사대문</h1>
      <p className="mt-3 text-sm leading-7 text-muted">
        궁이 도읍의 집이라면 성은 그 집의 울타리입니다. 큰문 넷과 작은문 넷, 그리고 한가운데 종각입니다. 궁의 이야기는{" "}
        <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/palaces">
          고궁·사대문
        </a>
        에 있습니다.
      </p>

      <div className="mt-8">
        <HanyangMap />
      </div>

      <section id="doseong" className="mt-12 scroll-mt-40" aria-labelledby="doseong-heading">
        <h2 id="doseong-heading" className="font-serif text-2xl text-ink">
          한양도성
        </h2>
        <p className="mt-1 text-[11px] tracking-[0.14em] text-terra">HANYANGDOSEONG · 1396</p>
        <Prose paragraphs={wallParagraphs} />
      </section>

      <section id="virtues" className="mt-10 scroll-mt-40" aria-labelledby="virtues-heading">
        <h2 id="virtues-heading" className="font-serif text-2xl text-ink">
          인 · 의 · 예 · 지, 그리고 신
        </h2>
        <Prose paragraphs={virtueNote} />
      </section>

      <section className="mt-12" aria-labelledby="great-gates-heading">
        <h2 id="great-gates-heading" className="font-serif text-2xl text-ink">
          사대문
        </h2>
        <div className="mt-6 space-y-8">
          {greatGates.map((gate) => (
            <GateSection key={gate.slug} gate={gate} />
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="small-gates-heading">
        <h2 id="small-gates-heading" className="font-serif text-2xl text-ink">
          사소문
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted">큰문 사이의 작은문입니다. 덕목을 동서남북에 나누는 이름은 사대문의 것이고, 소문은 길이의 문입니다.</p>
        <div className="mt-6 space-y-8">
          {smallGates.map((gate) => (
            <GateSection key={gate.slug} gate={gate} />
          ))}
        </div>
      </section>

      <section id="bosingak" className="mt-12 scroll-mt-40" aria-labelledby="bosingak-heading">
        <h2 id="bosingak-heading" className="font-serif text-2xl text-ink">
          보신각
        </h2>
        <p className="mt-1 text-[11px] tracking-[0.14em] text-terra">BOSINGAK · 신(信)</p>
        <Prose paragraphs={bosingak} />
      </section>

      <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {gateLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
            {...externalAnchor(link.href)}
          >
            {link.label}
          </a>
        ))}
      </p>
    </article>
  );
}
