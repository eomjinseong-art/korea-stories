export function Crumb({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="현재 위치" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <a className="underline decoration-line underline-offset-4 hover:text-terra" href={item.href}>
                {item.label}
              </a>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
