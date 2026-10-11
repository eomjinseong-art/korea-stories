import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BattleMap } from "@/components/BattleMap";
import { Crumb } from "@/components/Crumb";
import { DefenderNav } from "@/components/DefenderNav";
import { FilmCards } from "@/components/FilmCards";
import { battleBySlug, battles } from "@/data/battles";
import { externalAnchor } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return battles.map((battle) => ({ slug: battle.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const battle = battleBySlug(slug);
  if (!battle) return {};
  return {
    title: battle.name,
    description: battle.lede,
    alternates: { canonical: `/defenders/battles/${battle.slug}` },
    openGraph: { title: battle.name, description: battle.lede, url: `/defenders/battles/${battle.slug}` },
  };
}

export default async function BattlePage({ params }: Props) {
  const { slug } = await params;
  const battle = battleBySlug(slug);
  if (!battle) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/defenders", label: "나라를 지킨 사람들" },
          { href: "/defenders#battles", label: "전투" },
          { label: battle.name },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{battle.english.toUpperCase()}</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{battle.name}</h1>
      <p className="mt-2 text-sm text-muted">
        {battle.era} · {battle.year}
      </p>
      <p className="mt-4 text-sm leading-7 text-ink">{battle.lede}</p>
      <DefenderNav />
      <figure className="mt-8">
        <BattleMap slug={battle.slug} />
        <figcaption className="mt-2 text-xs leading-6 text-muted">
          축척이 없는 모식도입니다. 자리를 외우는 그림이고, 해도나 측량 지도가 아닙니다.
        </figcaption>
      </figure>
      <h2 className="mt-10 font-serif text-2xl text-ink">어떻게 이겼나</h2>
      <ol className="mt-4 space-y-5">
        {battle.steps.map((step, index) => (
          <li key={step.title}>
            <h3 className="font-serif text-lg text-ink">
              {index + 1}. {step.title}
            </h3>
            <p className="mt-1 text-sm leading-7 text-ink">{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {battle.people.map((person) => (
          <a
            key={person.slug}
            href={`/defenders/${person.slug}`}
            className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
          >
            {person.label}
          </a>
        ))}
        {battle.links.map((link) => (
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
      {battle.filmSlugs.length > 0 ? <FilmCards slugs={battle.filmSlugs} /> : null}
    </article>
  );
}
