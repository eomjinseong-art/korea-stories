import type { Etymology as EtymologyCopy } from "@/data/types";

export function Etymology({ etymology }: { etymology: EtymologyCopy }) {
  return (
    <section className="mt-10" aria-labelledby="etymology-heading">
      <h2 id="etymology-heading" className="font-serif text-2xl text-ink">
        이름의 유래
      </h2>
      <p className="mt-3 text-sm leading-7 text-ink">{etymology.summary}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <article className="rounded-lg border border-line bg-card p-4">
          <p className="text-[11px] tracking-[0.16em] text-terra">통설</p>
          <p className="mt-2 text-sm leading-7 text-ink">{etymology.consensus}</p>
        </article>
        {etymology.other ? (
          <article className="rounded-lg border border-line bg-stone/50 p-4">
            <p className="text-[11px] tracking-[0.16em] text-muted">다른 설</p>
            <p className="mt-2 text-sm leading-7 text-ink">{etymology.other}</p>
          </article>
        ) : null}
      </div>
    </section>
  );
}
