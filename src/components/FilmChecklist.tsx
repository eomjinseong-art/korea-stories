"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "korea-stories-defender-films";

type Item = {
  slug: string;
  title: string;
  english: string;
  year: string;
  kind: string;
};

export function FilmChecklist({ items }: { items: Item[] }) {
  const [checked, setChecked] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setChecked(parsed.filter((value) => typeof value === "string"));
        }
      }
    } catch {
      /* private mode or old data */
    }
    setReady(true);
  }, []);

  function toggle(slug: string) {
    setChecked((prev) => {
      const next = prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* private mode */
      }
      return next;
    });
  }

  const done = items.filter((item) => checked.includes(item.slug)).length;

  return (
    <div>
      <p className="text-sm leading-7 text-muted">
        본 작품은 이 브라우저에만 표시됩니다. {ready ? `${items.length}편 중 ${done}편` : `${items.length}편`}. 각
        제목의 사실과 창작은 영화 페이지에 있습니다. 감상 링크는 없습니다.
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => {
          const id = `film-check-${item.slug}`;
          const on = checked.includes(item.slug);
          return (
            <li key={item.slug} className="rounded-lg border border-line bg-card px-4 py-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <label htmlFor={id} className="flex min-w-0 cursor-pointer items-start gap-3">
                  <input
                    id={id}
                    type="checkbox"
                    className="mt-1 accent-[#a34732]"
                    checked={ready && on}
                    onChange={() => toggle(item.slug)}
                  />
                  <span>
                    <span className="font-serif text-lg text-ink">「{item.title}」</span>
                    <span className="mt-1 block text-xs tracking-wide text-terra">
                      {item.english} · {item.year} · {item.kind}
                    </span>
                  </span>
                </label>
                <a
                  href={`/films#${item.slug}`}
                  className="shrink-0 text-sm text-laurel underline decoration-line underline-offset-4 hover:text-terra"
                >
                  사실과 창작
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
