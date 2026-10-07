import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/Crumb";
import { Etymology } from "@/components/Etymology";
import { FilmCards } from "@/components/FilmCards";
import { cities } from "@/data/cities";
import { regionBySlug } from "@/data/regions";

type Props = { params: Promise<{ slug: string; city: string }> };

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.region, city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug && item.region === slug);
  if (!city) return {};
  return {
    title: city.name,
    description: city.lede,
    alternates: { canonical: `/regions/${city.region}/${city.slug}` },
    openGraph: { title: city.name, description: city.lede },
  };
}

export default async function CityPage({ params }: Props) {
  const { slug, city: citySlug } = await params;
  const city = cities.find((item) => item.slug === citySlug && item.region === slug);
  const region = regionBySlug(slug);
  if (!city || !region) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/regions", label: "고을" },
          { href: `/regions/${region.slug}`, label: region.name },
          { label: city.name },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{city.english.toUpperCase()}</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{city.name}</h1>
      <p className="mt-2 text-sm text-muted">
        {city.hanja} · {region.name}
      </p>
      <p className="mt-4 text-sm leading-7 text-ink">{city.lede}</p>

      <Etymology etymology={city.etymology} />

      <section className="mt-10" aria-labelledby="founding-heading">
        <h2 id="founding-heading" className="font-serif text-2xl text-ink">
          어떻게 선 고을인가
        </h2>
        <div className="mt-3 space-y-3">
          {city.founding.map((paragraph) => (
            <p key={paragraph.slice(0, 28)} className="text-sm leading-7 text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="powers-heading">
        <h2 id="powers-heading" className="font-serif text-2xl text-ink">
          누가 다스렸나
        </h2>
        <div className="mt-3 space-y-3">
          {city.powers.map((paragraph) => (
            <p key={paragraph.slice(0, 28)} className="text-sm leading-7 text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="city-events-heading">
        <h2 id="city-events-heading" className="font-serif text-2xl text-ink">
          길목의 사건
        </h2>
        <div className="mt-4 space-y-4">
          {city.events.map((event) => (
            <section key={event.title}>
              <h3 className="font-serif text-lg text-ink">{event.title}</h3>
              <p className="mt-1 text-sm leading-7 text-ink">{event.text}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="city-culture-heading">
        <h2 id="city-culture-heading" className="font-serif text-2xl text-ink">
          문화 메모
        </h2>
        <div className="mt-3 space-y-3">
          {city.culture.map((paragraph) => (
            <p key={paragraph.slice(0, 28)} className="text-sm leading-7 text-ink">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <p className="mt-8 text-sm">
        <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href={`/regions/${region.slug}`}>
          {region.name} 전체 보기
        </a>
      </p>

      <FilmCards slugs={city.filmSlugs} />
    </article>
  );
}
