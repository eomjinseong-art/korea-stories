import { nav, sisters, COUPANG_LINE, COUPANG_URL, externalAnchor, footerNote, SITE_NAME, TAGLINE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-stone/80">
      <aside aria-label="광고" className="mx-auto max-w-6xl px-4 pt-8">
        <a
          href={COUPANG_URL}
          target="_blank"
          rel="sponsored noopener noreferrer nofollow"
          className="flex items-center gap-3 rounded-md border border-line bg-card px-4 py-3 text-sm text-ink transition-colors hover:border-terra hover:text-terra"
        >
          <span className="shrink-0 rounded-sm border border-line px-1.5 py-0.5 text-[10px] tracking-wider text-muted">
            광고
          </span>
          <span className="min-w-0 flex-1">{COUPANG_LINE}</span>
          <span aria-hidden="true" className="shrink-0 text-terra">
            →
          </span>
        </a>
        <p className="mt-2 text-[11px] leading-5 text-muted">
          이 게시물은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </p>
      </aside>
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm leading-6 text-muted">
        <p className="font-serif text-base text-ink">{SITE_NAME}</p>
        <p className="mt-1 text-xs tracking-wide text-terra">{TAGLINE}</p>
        <div className="mt-4 max-w-3xl space-y-2">
          {footerNote.map((paragraph) => (
            <p key={paragraph.slice(0, 16)}>{paragraph}</p>
          ))}
        </div>
        <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
          <a className="underline decoration-line underline-offset-4 hover:text-terra" href="/">
            홈
          </a>
          {nav.map((item) => (
            <a
              key={item.href}
              className="underline decoration-line underline-offset-4 hover:text-terra"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <nav aria-label="나두 역사·신화" className="mt-6 border-t border-line pt-4">
          <p aria-hidden="true" className="text-[10px] tracking-[0.16em] text-terra">
            나두 역사·신화
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs">
            {sisters.map((site) => (
              <li key={site.href} className="max-w-full">
                <a
                  href={site.href}
                  className="underline decoration-line underline-offset-4 hover:text-terra"
                  {...externalAnchor(site.href)}
                >
                  {site.label}{" "}
                  <span className="text-[10px] tracking-wide text-terra">{site.english}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
