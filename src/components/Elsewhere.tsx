import type { LinkItem } from "@/data/types";
import { externalAnchor } from "@/lib/site";

export function Elsewhere({ links }: { links?: readonly LinkItem[] }) {
  if (!links || links.length === 0) return null;

  return (
    <aside aria-label="다른 사이트에서 더 보기" className="mt-4 max-w-full rounded-md border border-line bg-card px-3 py-2.5">
      <p className="text-[10px] tracking-[0.14em] text-terra">다른 사이트에서 더 보기</p>
      <ul className="mt-1.5 space-y-1 text-sm">
        {links.map((link) => (
          <li key={link.href} className="max-w-full">
            <a
              href={link.href}
              className="text-laurel underline decoration-line underline-offset-4 hover:text-terra"
              {...externalAnchor(link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
