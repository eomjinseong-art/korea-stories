import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/Crumb";
import { Etymology } from "@/components/Etymology";
import { FilmCards } from "@/components/FilmCards";
import { Prose } from "@/components/Prose";
import { palaceBySlug, palaces, type NamedNote } from "@/data/palaces";
import { externalAnchor } from "@/lib/site";
import { CoupangCard } from "@/components/CoupangCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return palaces.map((palace) => ({ slug: palace.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const palace = palaceBySlug(slug);
  if (!palace) return {};
  const title = palace.former ? `${palace.name} · ${palace.former}` : palace.name;
  return {
    title,
    description: palace.lede,
    alternates: { canonical: `/palaces/${palace.slug}` },
    openGraph: { title, description: palace.lede },
  };
}

function Notes({ notes, heading, id }: { notes: NamedNote[]; heading: string; id: string }) {
  return (
    <section className="mt-10" aria-labelledby={id}>
      <h2 id={id} className="font-serif text-2xl text-ink">
        {heading}
      </h2>
      <div className="mt-4 space-y-6">
        {notes.map((note) => (
          <section key={note.title}>
            <h3 className="font-serif text-lg text-ink">{note.title}</h3>
            {note.english ? <p className="mt-1 text-[11px] tracking-[0.14em] text-terra">{note.english}</p> : null}
            <Prose paragraphs={note.body} />
          </section>
        ))}
      </div>
    </section>
  );
}

export default async function PalacePage({ params }: Props) {
  const { slug } = await params;
  const palace = palaceBySlug(slug);
  if (!palace) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/palaces", label: "궁궐" },
          { label: palace.name },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{palace.english.toUpperCase()}</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{palace.name}</h1>
      <p className="mt-2 text-sm text-muted">
        {palace.hanja}
        {palace.former ? ` · ${palace.former}` : ""} · {palace.role}
      </p>
      <p className="mt-1 text-sm text-muted">{palace.years}</p>
      <p className="mt-4 text-sm leading-7 text-ink">{palace.lede}</p>

      <Etymology etymology={palace.etymology} />

      <section className="mt-10" aria-labelledby="founding-heading">
        <h2 id="founding-heading" className="font-serif text-2xl text-ink">
          언제, 누가, 왜
        </h2>
        <Prose paragraphs={palace.founding} />
      </section>

      <Notes notes={palace.residents} heading="누가 머물렀나" id="residents-heading" />
      <Notes notes={palace.events} heading="주요 사건" id="events-heading" />
      <Notes notes={palace.buildings} heading="꼭 볼 건물" id="buildings-heading" />

      <section className="mt-10" aria-labelledby="damage-heading">
        <h2 id="damage-heading" className="font-serif text-2xl text-ink">
          훼손과 복원
        </h2>
        <Prose paragraphs={palace.damage} />
      </section>

      {palace.visit ? (
        <section className="mt-10" aria-labelledby="visit-heading">
          <h2 id="visit-heading" className="font-serif text-2xl text-ink">
            관람
          </h2>
          <Prose paragraphs={palace.visit} />
        </section>
      ) : null}

      <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {palace.links.map((link) => (
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

      <FilmCards slugs={palace.filmSlugs} heading="궁궐이 나오는 영화·드라마" />
      <CoupangCard />
    </article>
  );
}
