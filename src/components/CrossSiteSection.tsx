import { externalAnchor } from "@/lib/site";

export function CrossSiteSection({
  id,
  title,
  english,
  links,
}: {
  id: string;
  title: string;
  english: string;
  links: readonly { href: string; label: string; english: string }[];
}) {
  return (
    <section aria-labelledby={id} className="mt-12 max-w-full rounded-lg border border-line bg-card p-5">
      <h2 id={id} className="font-serif text-2xl text-ink">
        {title}
        <span className="ml-2 align-middle font-sans text-sm tracking-wide text-terra">{english}</span>
      </h2>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {links.map((site) => (
          <li key={site.href} className="max-w-full">
            <a
              href={site.href}
              className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
              {...externalAnchor(site.href)}
            >
              {site.label}
            </a>
            <span className="ml-2 text-[11px] tracking-[0.12em] text-terra">{site.english}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
