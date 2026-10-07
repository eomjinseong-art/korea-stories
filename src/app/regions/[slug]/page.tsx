import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/Crumb";
import { Etymology } from "@/components/Etymology";
import { FilmCards } from "@/components/FilmCards";
import { cityBySlug } from "@/data/cities";
import { regionBySlug, regions } from "@/data/regions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return regions.map((region) => ({ slug: region.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const region = regionBySlug(slug);
  if (!region) return {};
  return {
    title: region.name,
    description: region.lede,
    alternates: { canonical: `/regions/${region.slug}` },
    openGraph: { title: region.name, description: region.lede },
  };
}

export default async function RegionPage({ params }: Props) {
  const { slug } = await params;
  const region = regionBySlug(slug);
  if (!region) notFound();
  const cities = region.citySlugs.flatMap((citySlug) => {
    const city = cityBySlug(citySlug);
    return city ? [city] : [];
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/regions", label: "고을" },
          { label: region.name },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{region.english.toUpperCase()}</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{region.name}</h1>
      <p className="mt-2 text-sm text-muted">
        {region.hanja} · {region.english}
      </p>
      <p className="mt-4 text-sm leading-7 text-ink">{region.lede}</p>

      <section className="mt-8 space-y-3" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="font-serif text-2xl text-ink">
          이 땅의 역사
        </h2>
        {region.overview.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-sm leading-7 text-ink">
            {paragraph}
          </p>
        ))}
      </section>

      <Etymology etymology={region.etymology} />

      <section className="mt-10" aria-labelledby="character-heading">
        <h2 id="character-heading" className="font-serif text-2xl text-ink">
          땅의 결
        </h2>
        <div className="mt-3 space-y-3">
          {region.character.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-sm leading-7 text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="cities-heading">
        <h2 id="cities-heading" className="font-serif text-2xl text-ink">
          주요 도시
        </h2>
        <ul className="mt-4 space-y-3">
          {cities.map((city) => (
            <li key={city.slug}>
              <a
                className="block rounded-lg border border-line bg-card p-4 hover:border-terra"
                href={`/regions/${region.slug}/${city.slug}`}
              >
                <h3 className="font-serif text-xl text-ink">{city.name}</h3>
                <p className="mt-1 text-xs text-terra">
                  {city.english} · {city.hanja}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">{city.lede}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {region.otherPlaces.length > 0 ? (
        <section className="mt-10" aria-labelledby="other-places-heading">
          <h2 id="other-places-heading" className="font-serif text-2xl text-ink">
            같은 도의 다른 고을
          </h2>
          <div className="mt-4 space-y-4">
            {region.otherPlaces.map((place) => (
              <section key={place.name}>
                <h3 className="font-serif text-lg text-ink">{place.name}</h3>
                <p className="mt-1 text-sm leading-7 text-ink">{place.text}</p>
              </section>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10" aria-labelledby="events-heading">
        <h2 id="events-heading" className="font-serif text-2xl text-ink">
          길목의 사건
        </h2>
        <div className="mt-4 space-y-4">
          {region.events.map((event) => (
            <section key={event.title}>
              <h3 className="font-serif text-lg text-ink">{event.title}</h3>
              <p className="mt-1 text-sm leading-7 text-ink">{event.text}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="culture-heading">
        <h2 id="culture-heading" className="font-serif text-2xl text-ink">
          문화 메모
        </h2>
        <div className="mt-3 space-y-3">
          {region.culture.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-sm leading-7 text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <FilmCards slugs={region.filmSlugs} />
    </article>
  );
}
