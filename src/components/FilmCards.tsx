import { filmsBySlugs } from "@/data/films";

export function FilmCards({
  slugs,
  heading = "관련 영화",
}: {
  slugs: string[];
  heading?: string;
}) {
  const items = filmsBySlugs(slugs);
  if (items.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-films-heading">
      <h2 id="related-films-heading" className="font-serif text-2xl text-ink">
        {heading}
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        아래 작품은 극입니다. 분위기를 잡는 데는 도움이 되고, 사실 관계의 교과서는 아닙니다. 불법 영상 링크는 없습니다.
      </p>
      <ul className="mt-4 space-y-4">
        {items.map((film) => (
          <li key={film.slug} id={film.slug} className="rounded-lg border border-line bg-card p-5">
            <h3 className="font-serif text-xl text-ink">「{film.title}」</h3>
            <p className="mt-1 text-xs tracking-wide text-terra">
              {film.english} · {film.year} · {film.kind}
            </p>
            <p className="mt-3 text-sm leading-7 text-ink">{film.why}</p>
            <p className="mt-2 text-sm leading-7 text-muted">{film.fiction}</p>
            {film.links.length > 0 && (
              <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                {film.links.map((link) => (
                  <a key={link.href} href={link.href} className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">
                    {link.label}
                  </a>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
