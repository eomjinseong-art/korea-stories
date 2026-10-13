import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/Crumb";
import { DefenderNav } from "@/components/DefenderNav";
import { FilmCards } from "@/components/FilmCards";
import { battleBySlug } from "@/data/battles";
import { defenderBySlug, defenders } from "@/data/defenders";
import { externalAnchor, SITE_URL } from "@/lib/site";
import { NadooHubPersonLink } from "@/components/NadooHubLink";
import { CoupangCard } from "@/components/CoupangCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return defenders.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const person = defenderBySlug(slug);
  if (!person) return {};
  const title = person.name;
  const description = person.lede;
  return {
    title,
    description,
    alternates: { canonical: `/defenders/${person.slug}` },
    openGraph: { title, description, url: `/defenders/${person.slug}` },
  };
}

export default async function DefenderPage({ params }: Props) {
  const { slug } = await params;
  const person = defenderBySlug(slug);
  if (!person) notFound();
  const battle = person.battleSlug ? battleBySlug(person.battleSlug) : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    alternateName: [person.english, person.hanja],
    description: person.lede,
    url: `${SITE_URL}/defenders/${person.slug}`,
  };

  const facts = [
    { term: "시대", english: "Era", text: `${person.era} · ${person.years}` },
    { term: "상대국", english: "Opponent", text: `${person.opponent} · ${person.opponentEnglish}` },
    { term: "핵심 활동", english: "What they are known for", text: person.activity },
    { term: "전략과 지형", english: "Strategy and terrain", text: person.strategy },
    { term: "유명한 장면", english: "A scene to remember", text: person.scene },
    { term: "기념과 화폐", english: "Memorials and money", text: person.memorials },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/defenders", label: "나라를 지킨 사람들" },
          { label: person.name },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{person.era.toUpperCase()}</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{person.name}</h1>
      <p className="mt-2 text-sm text-muted">
        {person.hanja} · {person.english}
      </p>
      <p className="mt-3 inline-block rounded-full border border-line bg-card px-3 py-1 text-xs text-terra">
        {person.badge}
      </p>
      <p className="mt-4 text-sm leading-7 text-ink">{person.lede}</p>
      <DefenderNav />
      <dl className="mt-8 space-y-6">
        {facts.map((fact) => (
          <div key={fact.term}>
            <dt className="font-serif text-xl text-ink">
              {fact.term}
              <span className="ml-2 font-sans text-xs tracking-wide text-terra">{fact.english}</span>
            </dt>
            <dd className="mt-1 text-sm leading-7 text-ink">{fact.text}</dd>
          </div>
        ))}
        {person.limit ? (
          <div>
            <dt className="font-serif text-xl text-ink">
              같이 적는 경계
              <span className="ml-2 font-sans text-xs tracking-wide text-terra">Boundary</span>
            </dt>
            <dd className="mt-1 text-sm leading-7 text-ink">{person.limit}</dd>
          </div>
        ) : null}
      </dl>
      {battle ? (
        <p className="mt-6 text-sm">
          <a
            href={`/defenders/battles/${battle.slug}`}
            className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
          >
            {battle.name} · 어떻게 이겼나
          </a>
        </p>
      ) : null}
      {person.links.length > 0 ? (
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {person.links.map((link) => (
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
      ) : null}
      {person.filmSlugs.length > 0 ? (
        <FilmCards slugs={person.filmSlugs} />
      ) : (
        <p className="mt-10 text-sm leading-7 text-muted">
          이 사이트가 다루는 영화 가운데 이 사람을 중심으로 한 작품은 없습니다.{" "}
          <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href="/defenders#films">
            영화 체크리스트
          </a>
          는 다른 인물과 전투의 작품입니다.
        </p>
      )}
      <NadooHubPersonLink base="https://korea-stories.vercel.app/defenders/" slug={person.slug!} />
      <CoupangCard />
    </article>
  );
}
