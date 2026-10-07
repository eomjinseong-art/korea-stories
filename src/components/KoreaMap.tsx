import { regions } from "@/data/regions";
import type { RegionSlug } from "@/data/types";
import mapPaths from "@/data/map-paths.json";

const labels: Record<RegionSlug, { x: number; y: number; name: string }> = {
  gyeonggi: { x: 168, y: 112, name: "경기" },
  gangwon: { x: 352, y: 122, name: "강원" },
  chungcheong: { x: 206, y: 286, name: "충청" },
  jeolla: { x: 164, y: 468, name: "전라" },
  gyeongsang: { x: 378, y: 392, name: "경상" },
  jeju: { x: 196, y: 740, name: "제주" },
};

export function KoreaMap() {
  return (
    <figure className="rounded-2xl border border-line bg-sea p-3 shadow-sm sm:p-4">
      <div className="mx-auto w-full max-w-[440px]">
      <svg
        viewBox="0 0 560 810"
        role="img"
        aria-labelledby="map-title map-desc"
        className="block h-auto w-full"
      >
        <title id="map-title">대한민국 남쪽 고을 지도</title>
        <desc id="map-desc">
          경기, 강원, 충청, 전라, 경상, 제주를 누를 수 있습니다. 황해·평안·함경은 그리지 않았습니다.
        </desc>
        <rect width="560" height="810" fill="#d5e4ea" rx="18" />
        <g aria-hidden="true" fill="none" stroke="#b7ced6" strokeWidth="1.2">
          <path d="M28 250c18 8 22 22 16 36" />
          <path d="M40 300c20 6 24 20 12 32" />
          <path d="M46 430c22 8 20 24 8 34" />
          <path d="M70 620c24 6 28 18 14 30" />
          <path d="M520 160c14 10 16 24 6 34" />
          <path d="M528 230c12 12 10 26 0 36" />
          <path d="M250 690c20 8 18 22 6 32" />
        </g>
        <g aria-hidden="true" fill="none" stroke="#6d7f62" strokeWidth="1.1" strokeLinecap="round">
          <path d="M400 78l6 12M412 70l7 14M424 84l6 11" />
          <path d="M430 150l5 10M444 140l6 12" />
        </g>
        <text x="36" y="360" fill="#6e8790" fontSize="12" aria-hidden="true">
          서해
        </text>
        <text x="86" y="668" fill="#6e8790" fontSize="12" aria-hidden="true">
          남해
        </text>
        <text x="516" y="210" fill="#6e8790" fontSize="12" aria-hidden="true">
          동해
        </text>
        <text x="524" y="36" fill="#6e8790" fontSize="12" aria-hidden="true">
          북
        </text>
        {regions.map((region) => {
          const path = mapPaths.regions[region.slug];
          const label = labels[region.slug];
          return (
            <a key={region.slug} className="region" href={`/regions/${region.slug}`}>
              <title>{region.name}</title>
              <path className={`region-shape fill-${region.slug}`} d={path.d} />
              <text className="map-label font-serif" x={label.x} y={label.y} textAnchor="middle">
                {label.name}
              </text>
            </a>
          );
        })}
      </svg>
      </div>
      <figcaption className="mx-auto mt-3 max-w-md text-center text-[11px] leading-5 text-muted">
        조선의 남쪽 도를 오늘의 남한 땅에 맞춰 그렸습니다. 황해·평안·함경은 넣지 않았습니다. 산 표시는 태백산맥의
        자리만 대략 보여 주는 장식입니다. 고을을 누르면 그 이야기로 갑니다.
      </figcaption>
      <ul className="mt-3 flex flex-wrap justify-center gap-2">
        {regions.map((region) => (
          <li key={region.slug}>
            <a
              className="inline-block rounded-full border border-line bg-card px-3 py-1.5 text-sm text-ink hover:border-terra hover:text-terra"
              href={`/regions/${region.slug}`}
            >
              {region.name}
            </a>
          </li>
        ))}
      </ul>
    </figure>
  );
}
