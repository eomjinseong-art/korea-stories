import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/Crumb";
import { FilmCards } from "@/components/FilmCards";
import { familyTreeHref } from "@/data/family-tree";
import { rulerBySlug, rulers } from "@/data/rulers";
import { externalAnchor } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return rulers.map((ruler) => ({ slug: ruler.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ruler = rulerBySlug(slug);
  if (!ruler) return {};
  return {
    title: ruler.name,
    description: ruler.lede,
    alternates: { canonical: `/rulers/${ruler.slug}` },
    openGraph: { title: ruler.name, description: ruler.lede },
  };
}

export default async function RulerPage({ params }: Props) {
  const { slug } = await params;
  const ruler = rulerBySlug(slug);
  if (!ruler) notFound();
  const treeHref = familyTreeHref(ruler.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Crumb
        items={[
          { href: "/", label: "홈" },
          { href: "/rulers", label: "왕" },
          { label: ruler.name },
        ]}
      />
      <p className="mt-6 text-xs tracking-[0.2em] text-terra">{ruler.era.toUpperCase()}</p>
      <h1 className="mt-2 font-serif text-4xl text-ink">{ruler.name}</h1>
      <p className="mt-2 text-sm text-muted">
        {ruler.formal} · {ruler.english}
      </p>
      <p className="mt-1 text-sm text-muted">{ruler.dates}</p>
      <p className="mt-3 inline-block rounded-full border border-line bg-card px-3 py-1 text-xs text-terra">
        {ruler.badge}
      </p>
      <p className="mt-4 text-sm leading-7 text-ink">{ruler.lede}</p>
      <div className="mt-6 space-y-3">
        {ruler.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-sm leading-7 text-ink">
            {paragraph}
          </p>
        ))}
      </div>
      {ruler.links.length > 0 || treeHref ? (
        <p className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {treeHref ? (
            <a
              href={treeHref}
              className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
            >
              가족관계도에서 보기
            </a>
          ) : null}
          {ruler.links.map((link) => (
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
      <FilmCards slugs={ruler.filmSlugs} />
    </article>
  );
}
