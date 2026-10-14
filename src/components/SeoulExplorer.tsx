"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { SeoulEra, SeoulPin, SeoulRoute, SLink } from "@/data/seoul-explorer";
import type { SeoulImage } from "@/data/seoul-images";

type MapEra = SeoulEra;
type MapLink = SLink;
type CityPin = SeoulPin;
type CityRoute = SeoulRoute;
type CityImage = SeoulImage;

const LON0 = 126.95;
const LON1 = 127.015;
const LAT0 = 37.6;
const LAT1 = 37.528;
const CL = 0.7926;
const K = 1000 / ((LON1 - LON0) * CL);
const W = 1000;
const H = Math.round((LAT0 - LAT1) * K);
const px = (lon: number) => +((lon - LON0) * CL * K).toFixed(1);
const py = (lat: number) => +((LAT0 - lat) * K).toFixed(1);
const pts = (a: number[][]) => a.map(([la, lo]) => `${px(lo)},${py(la)}`).join(" ");

// 모두 [위도, 경도]. 손으로 단순화한 대략의 선입니다.
const WALL = [[37.56,126.9753],[37.5636,126.97],[37.5683,126.9675],[37.574,126.9625],[37.578,126.96],[37.585,126.9625],[37.5925,126.9665],[37.5935,126.9745],[37.596,126.981],[37.5935,126.99],[37.5905,126.997],[37.5866,127.0028],[37.58,127.0075],[37.5711,127.0095],[37.5649,127.0091],[37.556,127.004],[37.551,126.995],[37.5512,126.9882],[37.554,126.98],[37.56,126.9753]];
const STREAM = [[37.5765,126.969],[37.5715,126.974],[37.5695,126.978],[37.5688,126.99],[37.5698,127.0],[37.5703,127.0095],[37.5715,127.015]];
const HAN = [[37.5305,126.95],[37.5265,126.97],[37.5255,126.99],[37.5275,127.005],[37.533,127.015]];
const MOUNTAINS: [string, string, number, number, number, number][] = [
  ["북악산", "Bugaksan", 37.5935, 126.9745, 60, 34],
  ["인왕산", "Inwangsan", 37.583, 126.9595, 40, 60],
  ["낙산", "Naksan", 37.5805, 127.007, 30, 40],
  ["남산(목멱산)", "Namsan", 37.5512, 126.9895, 80, 40],
];
const ROADS: [string, number[][]][] = [
  ["종로", [[37.5705,126.977],[37.5711,127.0095]]],
  ["육조거리", [[37.5762,126.9769],[37.5705,126.977]]],
  ["남대문로", [[37.57,126.9835],[37.56,126.9753]]],
  ["새문안로", [[37.5705,126.977],[37.5683,126.9675]]],
  ["의주로", [[37.5683,126.9675],[37.5722,126.9594],[37.578,126.9545]]],
];
const SOUIMUN: [number, number] = [37.5636, 126.97];

const ERA_LABEL: Record<MapEra, string> = { early: "조선 전기", late: "조선 후기", empire: "대한제국·일제강점기", modern: "현대" };

function LinkRow({ title, en, links }: { title: string; en: string; links: MapLink[] }) {
  if (!links.length) return null;
  return (
    <div className="mt-3">
      <p className="text-xs font-medium text-ink">
        {title} <span className="text-[10px] tracking-wider text-muted">{en}</span>
      </p>
      <ul className="mt-1.5 flex flex-wrap gap-1.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            {l.href.startsWith("http") ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-line bg-bg px-2.5 py-1 text-xs text-laurel hover:border-terra hover:text-terra">
                {l.label} ↗
              </a>
            ) : (
              <Link href={l.href} className="inline-block rounded-full border border-line bg-bg px-2.5 py-1 text-xs text-laurel hover:border-terra hover:text-terra">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SeoulExplorer({ pins, routes, images, eras, storyNote }: { pins: CityPin[]; routes: CityRoute[]; images: Record<string, CityImage>; eras: { id: MapEra; ko: string; en: string }[]; storyNote: string }) {
  const [era, setEra] = useState<MapEra | "all">("all");
  const [selected, setSelected] = useState("gyeongbokgung");
  const [routeId, setRouteId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const byId = useMemo(() => new Map(pins.map((p) => [p.id, p])), [pins]);

  useEffect(() => {
    const read = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (byId.has(id)) {
        setEra("all");
        setSelected(id);
        document.getElementById("seoul-explorer")?.scrollIntoView({ block: "start" });
      }
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, [byId]);

  const visiblePins = useMemo(() => (era === "all" ? pins : pins.filter((p) => p.events.some((e) => e.era === era))), [era, pins]);
  const visibleRoutes = era === "all" ? routes : routes.filter((r) => r.era === era);
  const route = visibleRoutes.find((r) => r.id === routeId) ?? null;
  const pin = visiblePins.find((p) => p.id === selected) ?? null;
  const img = pin ? images[pin.id] : undefined;

  useEffect(() => {
    if (!playing || !route) return;
    if (step >= route.steps.length - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 2200);
    return () => clearTimeout(t);
  }, [playing, step, route]);

  useEffect(() => {
    if (route) setSelected(route.steps[step].pin);
  }, [route, step]);

  const events = pin ? pin.events.filter((e) => era === "all" || e.era === era) : [];
  const stepPins = route ? route.steps.map((s) => byId.get(s.pin)!) : [];

  return (
    <section id="seoul-explorer" aria-labelledby="city-heading" className="mt-8 scroll-mt-24">
      <style>{`
        @keyframes cx-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .cx-seg-new { stroke-dasharray: 1; animation: cx-draw .9s ease-out both; }
        @media (prefers-reduced-motion: reduce) { .cx-seg-new { animation: none; } }
      `}</style>
      <h2 id="city-heading" className="sr-only">서울 시내 지도 Seoul map</h2>
      <div className="flex flex-wrap gap-2" role="group" aria-label="시대 필터 Era filter">
        {[{ id: "all" as const, ko: "전체", en: "All" }, ...eras].map((e) => (
          <button key={e.id} type="button" aria-pressed={era === e.id} onClick={() => setEra(e.id)}
            className={`rounded-full border px-3 py-1.5 text-sm ${era === e.id ? "border-terra bg-terra text-white" : "border-line bg-card text-ink hover:border-terra"}`}>
            {e.ko} <span className="text-[10px] opacity-80">{e.en}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <div className="overflow-hidden rounded-lg border border-line bg-[#efe7d8]">
            <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full touch-manipulation" role="img" aria-label="조선 한양·서울 시내 지도 Map of Hanyang/Seoul">
              <defs>
                {routes.map((r) => (
                  <marker key={r.id} id={`cx-arrow-${r.id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M0,0 L10,5 L0,10 z" fill={r.color} />
                  </marker>
                ))}
              </defs>
              <rect x="0" y={py(37.5285)} width={W} height={H - py(37.5285)} fill="#d5e4ea" opacity="0.5" />
              <polyline points={pts(HAN)} fill="none" stroke="#9cc0cf" strokeWidth="26" strokeLinecap="round" />
              <text x={px(126.96)} y={py(37.5255) + 8} fontSize="16" fill="#5f8aa0" fontStyle="italic">한강 Han River (가장자리)</text>
              {MOUNTAINS.map(([ko, en, la, lo, rx, ry]) => (
                <g key={en}>
                  <ellipse cx={px(lo)} cy={py(la)} rx={rx * 1.5} ry={ry * 1.5} fill="#cfdcc2" opacity="0.85" />
                  <text x={px(lo)} y={py(la) + 5} textAnchor="middle" fontSize="15" fill="#4f6b45" fontStyle="italic">{ko}</text>
                </g>
              ))}
              <polyline points={pts(STREAM)} fill="none" stroke="#9cc0cf" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
              <text x={px(126.996)} y={py(37.5698) + 20} fontSize="13" fill="#5f8aa0" fontStyle="italic">청계천</text>
              {ROADS.map(([name, p]) => (
                <g key={name}>
                  <polyline points={pts(p)} fill="none" stroke="#c9b79c" strokeWidth="5" />
                  <text x={(px(p[0][1]) + px(p[1][1])) / 2} y={(py(p[0][0]) + py(p[1][0])) / 2 - 6} fontSize="11" fill="#8a7658" textAnchor="middle">{name}</text>
                </g>
              ))}
              <polygon points={pts(WALL)} fill="none" stroke="#6e6258" strokeWidth="5" strokeLinejoin="round" />
              <g>
                <rect x={px(SOUIMUN[1]) - 6} y={py(SOUIMUN[0]) - 6} width="12" height="12" fill="#fff" stroke="#6e6258" strokeDasharray="3 2" />
                <text x={px(SOUIMUN[1]) - 10} y={py(SOUIMUN[0]) + 4} fontSize="11" fill="#6e6258" textAnchor="end">소의문 터</text>
              </g>

              {route ? (
                <g>
                  {stepPins.slice(1, step + 1).map((s, i) => {
                    const a = stepPins[i];
                    const isNew = i === step - 1;
                    return (
                      <line key={`${route.id}-${i}-${isNew ? step : "o"}`} x1={px(a.lon)} y1={py(a.lat)} x2={px(s.lon)} y2={py(s.lat)} pathLength={1}
                        className={isNew ? "cx-seg-new" : undefined} stroke={route.color} strokeWidth="5" strokeLinecap="round" strokeOpacity={isNew ? 1 : 0.6}
                        markerEnd={`url(#cx-arrow-${route.id})`} />
                    );
                  })}
                  {stepPins.slice(0, step + 1).map((s, i) => (
                    <g key={i}>
                      <circle cx={px(s.lon) + 12} cy={py(s.lat) - 12} r="10" fill={route.color} />
                      <text x={px(s.lon) + 12} y={py(s.lat) - 8} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">{i + 1}</text>
                    </g>
                  ))}
                </g>
              ) : null}

              {visiblePins.map((p) => {
                const on = p.id === selected;
                return (
                  <g key={p.id} role="button" tabIndex={0} aria-label={`${p.ko} ${p.en}`} aria-pressed={on}
                    onClick={() => setSelected(p.id)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelected(p.id); } }}
                    className="cursor-pointer outline-none">
                    <circle cx={px(p.lon)} cy={py(p.lat)} r="13" fill="transparent" />
                    {p.kind === "gate" ? (
                      <rect x={px(p.lon) - (on ? 8 : 6)} y={py(p.lat) - (on ? 8 : 6)} width={on ? 16 : 12} height={on ? 16 : 12} fill={on ? "#a34732" : "#2f4a3c"} stroke="#fff" strokeWidth="2" />
                    ) : (
                      <circle cx={px(p.lon)} cy={py(p.lat)} r={on ? 8 : 6} fill={on ? "#a34732" : p.kind === "palace" ? "#7d3324" : "#241c16"} stroke="#fff" strokeWidth="2" />
                    )}
                    <text x={px(p.lon) + (p.lx ?? 10)} y={py(p.lat) + (p.ly ?? 4)} textAnchor={p.anchor ?? "start"} fontSize={on ? 16 : 12.5} fontWeight={on ? 700 : 500}
                      fill={on ? "#7d3324" : "#241c16"} stroke="#efe7d8" strokeWidth="3.5" paintOrder="stroke">
                      {p.ko.replace(/\(.*\)/, "").replace(/·.*$/, "")}
                    </text>
                  </g>
                );
              })}
              <g fontSize="13" fill="#6e6258">
                <line x1="20" y1={H - 56} x2="50" y2={H - 56} stroke="#6e6258" strokeWidth="5" />
                <text x="58" y={H - 52}>한양도성 City wall (1396–)</text>
                <rect x="29" y={H - 42} width="12" height="12" fill="#2f4a3c" />
                <text x="58" y={H - 32}>문 Gate · 점선 네모 = 없어진 문</text>
                <circle cx="35" cy={H - 16} r="6" fill="#7d3324" />
                <text x="58" y={H - 12}>궁궐·사당 Palace/shrine · 검은 점 = 장소</text>
              </g>
            </svg>
          </div>
          <p className="mt-1 text-[11px] leading-5 text-muted">
            지도: 코드로 그린 단순화 지도입니다. 산·성곽·물길·길·건물 위치는 대략이고 축척이 정확하지 않습니다. 한강은 실제로 남산보다 더 남쪽에 있습니다. Simplified map drawn in code; positions approximate.
          </p>
          <div className="mt-3">
            <p className="text-xs font-medium text-ink">장소 바로가기 <span className="text-[10px] text-muted">Places</span></p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {visiblePins.map((p) => (
                <button key={p.id} type="button" onClick={() => setSelected(p.id)} aria-pressed={p.id === selected}
                  className={`rounded-full border px-2.5 py-1 text-xs ${p.id === selected ? "border-terra bg-terra text-white" : "border-line bg-card hover:border-terra"}`}>
                  {p.ko}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-line bg-card p-4">
            <p className="text-xs font-medium text-ink">산책 경로 <span className="text-[10px] text-muted">Walking routes</span></p>
            {visibleRoutes.length ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {visibleRoutes.map((r) => (
                  <button key={r.id} type="button" aria-pressed={r.id === routeId}
                    onClick={() => { setRouteId(r.id === routeId ? null : r.id); setStep(0); setPlaying(false); }}
                    className="rounded-full border px-2.5 py-1 text-xs"
                    style={r.id === routeId ? { background: r.color, borderColor: r.color, color: "#fff" } : { borderColor: r.color, color: r.color }}>
                    {r.ko}
                  </button>
                ))}
              </div>
            ) : null}
            {route ? (
              <div className="mt-3">
                <p className="text-xs text-muted">{route.en}</p>
                {route.note ? <p className="mt-1 text-[11px] text-muted">{route.note}</p> : null}
                <div className="mt-2 rounded-md bg-bg p-3" aria-live="polite">
                  <p className="text-xs text-terra">{step + 1} / {route.steps.length} · {route.steps[step].time} · {byId.get(route.steps[step].pin)?.ko}</p>
                  <p className="mt-1 text-sm text-ink">{route.steps[step].ko}</p>
                  <p className="text-[11px] text-muted">{route.steps[step].en}</p>
                </div>
                <div className="mt-2 flex gap-2">
                  <button type="button" disabled={step === 0} onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} className="flex-1 rounded-full border border-line px-3 py-2 text-sm disabled:opacity-40">← 이전 Prev</button>
                  <button type="button" onClick={() => { if (step >= route.steps.length - 1) setStep(0); setPlaying((p) => !p); }} className="rounded-full border border-line px-3 py-2 text-sm">{playing ? "멈춤" : "재생"}</button>
                  <button type="button" disabled={step === route.steps.length - 1} onClick={() => { setPlaying(false); setStep((s) => Math.min(route.steps.length - 1, s + 1)); }} className="flex-1 rounded-full bg-terra px-3 py-2 text-sm text-white disabled:opacity-40">다음 Next →</button>
                </div>
              </div>
            ) : null}
          </div>

          <article className="overflow-hidden rounded-lg border border-line bg-card" aria-live="polite">
            {pin ? (
              <>
                {img ? (
                  <figure>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} width={img.w} height={img.h} alt={`${pin.ko} 사진 (${pin.en})`} className="block h-auto w-full bg-stone" loading="lazy" decoding="async" />
                    <figcaption className="px-4 pt-1.5 text-[10px] leading-4 text-muted">
                      {pin.photoNote ? <span className="block">{pin.photoNote}</span> : null}
                      사진: {img.author || "작가 미상"} ·{" "}
                      {img.licenseUrl ? <a href={img.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline">{img.license}</a> : img.license} ·{" "}
                      <a href={img.source} target="_blank" rel="noopener noreferrer" className="underline">Wikimedia Commons</a>
                    </figcaption>
                  </figure>
                ) : null}
                <div className="p-4">
                  <p className="text-[11px] tracking-[0.12em] text-terra">{pin.en.toUpperCase()}</p>
                  <h3 className="mt-0.5 font-serif text-xl text-ink">{pin.ko}</h3>
                  <p className="mt-2 text-xs font-medium text-ink">세운 사람·왕과 때 <span className="text-[10px] text-muted">Builder / king & date</span></p>
                  <p className="text-sm text-ink">{pin.builder.ko}</p>
                  <p className="text-[11px] text-muted">{pin.builder.en}</p>
                  <p className="mt-3 text-xs font-medium text-ink">여기서 있었던 일 <span className="text-[10px] text-muted">What happened{era !== "all" ? ` · ${ERA_LABEL[era]}` : ""}</span></p>
                  <ol className="mt-1.5 space-y-2">
                    {events.map((e, i) => (
                      <li key={i} className="border-l-2 border-terra/50 pl-2.5">
                        <p className="text-sm text-ink"><span className="mr-1 font-medium text-terra">{e.year}</span>{e.ko}</p>
                        <p className="text-[11px] text-muted">{e.en}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="rounded-md bg-bg p-2.5">
                      <p className="text-[11px] font-medium text-terra">그때 Then</p>
                      <p className="text-sm text-ink">{pin.then.ko}</p>
                      <p className="text-[11px] text-muted">{pin.then.en}</p>
                    </div>
                    <div className="rounded-md bg-bg p-2.5">
                      <p className="text-[11px] font-medium text-laurel">지금 Now</p>
                      <p className="text-sm text-ink">{pin.now.ko}</p>
                      <p className="text-[11px] text-muted">{pin.now.en}</p>
                    </div>
                  </div>
                  <LinkRow title="인물" en="People" links={pin.people} />
                  
                  <LinkRow title="영화·드라마" en="Films & dramas" links={pin.films} />
                  <LinkRow title="더 보기" en="More" links={pin.more} />
                  {pin.stories.length ? (
                    <div className="mt-4 rounded-md border border-dashed border-[#a6843d] bg-[#fbf3e6] p-3">
                      <p className="text-xs font-medium text-[#8a5a24]">전해지는 이야기 <span className="text-[10px] opacity-80">Unverified tales</span></p>
                      <ul className="mt-1.5 space-y-1.5">
                        {pin.stories.map((s, i) => (
                          <li key={i}><p className="text-sm text-ink">{s.ko}</p><p className="text-[11px] text-muted">{s.en}</p></li>
                        ))}
                      </ul>
                      <p className="mt-2 text-[10px] text-muted">{storyNote}</p>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <p className="p-4 text-sm text-muted">이 시대에는 고른 장소의 사건이 없습니다. 다른 핀을 고르세요. No events here in this era.</p>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
