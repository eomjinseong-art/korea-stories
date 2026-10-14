const places = [
  { href: "/palaces/gyeongbokgung", label: "경복궁", x: 118, y: 86, w: 78, h: 34 },
  { href: "/palaces/changdeokgung", label: "창덕궁", x: 202, y: 100, w: 72, h: 32 },
  { href: "/palaces/changgyeonggung", label: "창경궁", x: 246, y: 142, w: 72, h: 32 },
  { href: "/palaces#jongmyo", label: "종묘", x: 196, y: 182, w: 52, h: 26 },
  { href: "/palaces#sajik", label: "사직", x: 62, y: 124, w: 48, h: 26 },
  { href: "/palaces/gyeonghuigung", label: "경희궁", x: 58, y: 168, w: 70, h: 32 },
  { href: "/palaces/deoksugung", label: "덕수궁", x: 112, y: 252, w: 70, h: 32 },
] as const;

const gates = [
  { href: "/gates#sukjeongmun", label: "숙정문", x: 168, y: 48, gone: false },
  { href: "/gates#changuimun", label: "창의문", x: 52, y: 108, gone: false },
  { href: "/gates#hyehwamun", label: "혜화문", x: 300, y: 92, gone: false },
  { href: "/gates#heunginjimun", label: "흥인지문", x: 326, y: 176, gone: false },
  { href: "/gates#gwanghuimun", label: "광희문", x: 292, y: 268, gone: false },
  { href: "/gates#sungnyemun", label: "숭례문", x: 156, y: 378, gone: false },
  { href: "/gates#souimun", label: "소의문", x: 78, y: 338, gone: true },
  { href: "/gates#donuimun", label: "돈의문", x: 36, y: 214, gone: true },
] as const;

export function HanyangMap() {
  return (
    <figure className="rounded-2xl border border-line bg-card p-3 shadow-sm sm:p-4">
      <figcaption className="px-1 text-xs leading-6 text-muted">
        한양도성 약도. 축척이 아니고, 북쪽이 위입니다. 점선 문은 실물이 없습니다. 사진·사건·산책길이 있는 큰 지도는{" "}
        <a href="/seoul" className="text-laurel underline decoration-line underline-offset-4 hover:text-terra">서울 시내 탐험</a>에 있습니다.
      </figcaption>
      <div className="mx-auto mt-2 w-full max-w-[440px]">
        <svg viewBox="0 0 360 440" role="img" aria-labelledby="hanyang-map-title hanyang-map-desc" className="block h-auto w-full">
          <title id="hanyang-map-title">한양도성과 다섯 궁, 여덟 문의 약도</title>
          <desc id="hanyang-map-desc">
            북악산, 인왕산, 낙산, 남산 사이에 도성을 그리고 경복궁, 창덕궁, 창경궁, 경희궁, 덕수궁, 종묘, 사직단, 청계천, 사대문과 사소문을 대략 놓았습니다. 각 이름을 누르면 글로 갑니다.
          </desc>
          <rect width="360" height="440" fill="#f3eee6" rx="16" />
          <path
            d="M55 118 L108 64 L168 44 L248 60 L304 98 L330 168 L324 236 L286 292 L214 368 L148 392 L86 352 L46 286 L30 206 L44 146 Z"
            fill="#fbf7f2"
            stroke="#2f4a3c"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M62 236 C110 226 150 232 196 228 C246 224 286 234 322 226"
            fill="none"
            stroke="#6f93a3"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="160" y="210" textAnchor="middle" fill="#3d6270" className="font-sans" fontSize="10">
            청계천
          </text>
          <g className="fill-muted font-sans" fontSize="11">
            <text x="168" y="28" textAnchor="middle">
              북악산
            </text>
            <text x="4" y="64">
              인왕산
            </text>
            <text x="318" y="42">
              낙산
            </text>
            <text x="214" y="418" textAnchor="middle">
              남산
            </text>
          </g>
          {places.map((place) => (
            <a key={place.href} href={place.href}>
              <rect
                x={place.x}
                y={place.y}
                width={place.w}
                height={place.h}
                rx="8"
                fill="#e4c4a0"
                stroke="#a34732"
                strokeWidth="1.4"
              />
              <text
                x={place.x + place.w / 2}
                y={place.y + place.h / 2 + 4}
                textAnchor="middle"
                className="fill-ink font-sans"
                fontSize="12"
              >
                {place.label}
              </text>
            </a>
          ))}
          {gates.map((gate) => {
            const below = gate.y > 300 || gate.x > 310;
            const above = gate.y < 40;
            const placeRight = !below && !above && gate.x < 180;
            const x = below || above ? gate.x : gate.x + (placeRight ? 16 : -16);
            const y = below ? gate.y + 22 : above ? gate.y - 16 : gate.y + 4;
            return (
              <a key={gate.href} href={gate.href}>
                <circle
                  cx={gate.x}
                  cy={gate.y}
                  r="13"
                  fill={gate.gone ? "#fbf7f2" : "#241c16"}
                  stroke="#241c16"
                  strokeWidth="1.4"
                  strokeDasharray={gate.gone ? "3 2" : undefined}
                />
                <text
                  x={x}
                  y={y}
                  textAnchor={below || above ? "middle" : placeRight ? "start" : "end"}
                  className="fill-ink font-sans"
                  fontSize="11"
                >
                  {gate.label}
                </text>
              </a>
            );
          })}
        </svg>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs">
        {[...places, ...gates].map((item) => (
          <li key={item.href}>
            <a className="inline-block rounded-full border border-line bg-stone px-2.5 py-1 text-ink hover:border-terra" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </figure>
  );
}
