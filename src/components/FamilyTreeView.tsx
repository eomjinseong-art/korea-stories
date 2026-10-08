"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Elsewhere } from "@/components/Elsewhere";
import {
  CAVEATS,
  DYNASTIES,
  exactFocus,
  findFocus,
  relationsOf,
  searchHits,
  type DynastyId,
  type LayoutEdge,
  type LayoutNode,
  type RelationPerson,
} from "@/data/family-tree";

const PURPLE = "#6d4c8a";
const GOLD = "#a6843d";
const ROSE = "#8c2f2b";
const GAP = "#8a8175";

function edgePaint(edge: LayoutEdge, active: boolean, dimming: boolean) {
  const spouse = edge.kind === "spouse";
  const dashed = edge.kind === "variant-parent" || edge.kind === "adoptive";
  const gap = edge.kind === "gap";
  const color = gap ? GAP : dashed ? PURPLE : spouse ? ROSE : GOLD;
  let opacity = gap ? 0.85 : spouse ? (edge.local ? 0.92 : 0.16) : dashed ? (edge.quiet ? 0.28 : 0.6) : edge.local ? 0.82 : edge.quiet ? 0.18 : 0.4;
  if (dimming && !gap) opacity = active ? 1 : 0.05;
  if (dimming && gap) opacity = 0.2;
  return {
    color,
    opacity,
    width: active ? 2.6 : edge.local ? 1.7 : 1.2,
    dash: dashed || gap ? "5 4" : spouse && !edge.local ? "5 4" : undefined,
  };
}

function relatedSet(dynastyId: DynastyId, id: string) {
  const rel = relationsOf(dynastyId, id);
  const ids = new Set<string>([id]);
  for (const group of [
    rel.parents,
    rel.variantParents,
    rel.adoptiveParents,
    rel.spouses,
    rel.children,
    rel.variantChildren,
    rel.adoptiveChildren,
    rel.siblings,
  ]) {
    for (const person of group) ids.add(person.id);
  }
  return ids;
}

export function FamilyTreeView() {
  const [dynastyId, setDynastyId] = useState<DynastyId>("gojoseon");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [openSuggest, setOpenSuggest] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const listId = useId();
  const dynasty = DYNASTIES.find((item) => item.id === dynastyId) ?? DYNASTIES[0];
  const tree = dynasty.tree;
  const hits = query.trim() ? searchHits(query).slice(0, 8) : [];
  const selectedNode = selected ? tree.byId.get(selected) : undefined;
  const related = useMemo(
    () => (selected && tree.byId.has(selected) ? relatedSet(dynasty.id, selected) : null),
    [dynasty.id, selected, tree],
  );
  const relations = selected && selectedNode && selectedNode.marker !== "gap" ? relationsOf(dynasty.id, selected) : null;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const focus = params.get("focus");
    const requested = params.get("dynasty");
    if (focus) {
      const found = findFocus(focus);
      if (found) {
        setDynastyId(found.dynastyId);
        setSelected(found.id);
        return;
      }
    }
    if (requested && DYNASTIES.some((item) => item.id === requested)) {
      setDynastyId(requested as DynastyId);
    }
  }, []);

  useEffect(() => {
    if (!selected) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(`ft-${selected}`)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
      inline: "center",
    });
  }, [selected, dynastyId]);

  function writeUrl(nextDynasty: DynastyId, focus: string | null) {
    const url = new URL(window.location.href);
    url.searchParams.set("dynasty", nextDynasty);
    if (focus) url.searchParams.set("focus", focus);
    else url.searchParams.delete("focus");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  function choose(nextDynasty: DynastyId, id: string, label?: string) {
    setDynastyId(nextDynasty);
    setSelected(id);
    setOpenSuggest(false);
    if (label) setQuery(label);
    writeUrl(nextDynasty, id);
  }

  function onQuery(value: string) {
    setQuery(value);
    setOpenSuggest(true);
    const hit = exactFocus(value);
    if (hit) choose(hit.dynastyId, hit.id);
  }

  function selectDynasty(id: DynastyId) {
    setDynastyId(id);
    setSelected(null);
    setOpenSuggest(false);
    writeUrl(id, null);
  }

  return (
    <div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="왕조">
        {DYNASTIES.map((item) => {
          const active = item.id === dynasty.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`shrink-0 rounded-full px-3 py-2 text-sm ${active ? "bg-terra text-white" : "border border-line bg-card text-ink hover:border-terra"}`}
              onClick={() => selectDynasty(item.id)}
            >
              {item.ko}
              <span className={`ml-1.5 text-[10px] tracking-wide ${active ? "text-white/80" : "text-terra"}`}>{item.en}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{dynasty.lede}</p>
      <p className="mt-1 text-sm">
        <a className="text-laurel underline decoration-line underline-offset-4 hover:text-terra" href={`#dynasty-${dynasty.id}`}>
          {dynasty.ko}를 글로 읽기
        </a>
      </p>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <form
          className="relative w-full max-w-md"
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const exact = exactFocus(query);
            const first = exact ?? (hits[0] ? { dynastyId: hits[0].dynasty.id, id: hits[0].node.id } : null);
            if (first) choose(first.dynastyId, first.id, hits.find((hit) => hit.node.id === first.id)?.node.ko ?? query);
          }}
        >
          <label htmlFor="tree-find" className="text-xs text-muted">
            이름 찾기 · Find
          </label>
          <input
            id="tree-find"
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            onFocus={() => setOpenSuggest(true)}
            placeholder="세종, 광개토왕, Sejong"
            aria-label="가족관계도에서 이름 찾기"
            aria-autocomplete="list"
            aria-controls={hits.length > 0 ? listId : undefined}
            className="mt-1 w-full rounded-full border border-line bg-card px-4 py-2 text-sm outline-none focus:border-terra"
          />
          {openSuggest && hits.length > 0 ? (
            <ul id={listId} role="listbox" className="absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-md border border-line bg-card py-1 shadow-lg">
              {hits.map((hit) => (
                <li key={`${hit.dynasty.id}-${hit.node.id}`} role="option" aria-selected={selected === hit.node.id}>
                  <button
                    type="button"
                    className="flex w-full items-baseline justify-between gap-3 px-3 py-2 text-left text-sm hover:bg-stone"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => choose(hit.dynasty.id, hit.node.id, hit.node.ko)}
                  >
                    <span className="font-serif text-ink">{hit.node.ko}</span>
                    <span className="text-xs text-muted">
                      {hit.dynasty.ko} · {hit.node.english}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </form>
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1" aria-label="세대로 이동">
          {tree.bands.map((band) => (
            <button
              key={band.id}
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1 text-xs text-ink hover:border-terra"
              onClick={() => {
                const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                document.getElementById(`band-${dynasty.id}-${band.id}`)?.scrollIntoView({
                  behavior: reduce ? "auto" : "smooth",
                  block: "nearest",
                  inline: "start",
                });
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: band.color }} aria-hidden />
              {band.ko}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
        <li className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#3e4d7a]" aria-hidden />
          색 띠는 세대
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="4" x2="28" y2="4" stroke={GOLD} strokeWidth="2" />
          </svg>
          부모 → 자식
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="2" x2="28" y2="2" stroke={ROSE} strokeWidth="1.4" />
            <line x1="0" y1="6" x2="28" y2="6" stroke={ROSE} strokeWidth="1.4" />
          </svg>
          배우자
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="4" x2="28" y2="4" stroke={PURPLE} strokeWidth="1.6" strokeDasharray="4 3" />
          </svg>
          전승·이설·양자
        </li>
        <li className="inline-flex items-center gap-1.5">
          <svg width="28" height="8" aria-hidden>
            <line x1="0" y1="4" x2="28" y2="4" stroke={GAP} strokeWidth="1.6" strokeDasharray="2 3" />
          </svg>
          … 생략, 부자 아님
        </li>
      </ul>
      <p className="sr-only">
        {CAVEATS.map((item) => item.title).join(". ")}
      </p>

      <div
        ref={scroller}
        className="mt-3 cursor-grab overflow-x-auto overflow-y-hidden rounded-lg border border-line active:cursor-grabbing"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          const target = event.target as HTMLElement;
          if (target.closest("button, a, input")) return;
          const el = scroller.current;
          if (!el) return;
          drag.current = { x: event.clientX, left: el.scrollLeft };
          el.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current || !scroller.current) return;
          scroller.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <div id="family-tree" className="relative" style={{ width: tree.width, height: tree.height }}>
          {tree.bands.map((band) => (
            <div
              key={band.id}
              id={`band-${dynasty.id}-${band.id}`}
              className="absolute left-0"
              style={{ top: band.top, height: band.height, width: tree.width, background: band.soft }}
            >
              <div className="sticky left-2 top-2 z-20 w-max rounded-full border border-white/80 bg-white/90 px-3 py-1 shadow-sm">
                <span className="font-serif text-sm" style={{ color: band.color }}>
                  {band.ko}
                </span>
                <span className="ml-2 text-[10px] tracking-[0.14em] text-terra">{band.en}</span>
              </div>
            </div>
          ))}
          <svg className="absolute inset-0 z-[1]" width={tree.width} height={tree.height} aria-hidden>
            {tree.edges.map((edge) => {
              const active = related ? related.has(edge.from) && related.has(edge.to) && edge.kind !== "gap" : false;
              const paint = edgePaint(edge, active, Boolean(related));
              const halo = related && !active ? 0 : 0.95;
              return (
                <g key={edge.id} fill="none" strokeLinecap="round">
                  <path d={edge.d} stroke="#fbf7f2" strokeWidth={paint.width + 2.4} strokeOpacity={halo} />
                  {edge.d2 ? <path d={edge.d2} stroke="#fbf7f2" strokeWidth={paint.width + 2.4} strokeOpacity={halo} /> : null}
                  <path d={edge.d} stroke={paint.color} strokeWidth={paint.width} strokeOpacity={paint.opacity} strokeDasharray={paint.dash} />
                  {edge.d2 ? (
                    <path d={edge.d2} stroke={paint.color} strokeWidth={paint.width} strokeOpacity={paint.opacity} strokeDasharray={paint.dash} />
                  ) : null}
                </g>
              );
            })}
          </svg>
          {tree.nodes.map((node) => (
            <TreeCard
              key={node.id}
              node={node}
              pressed={selected === node.id}
              dimmed={Boolean(related && !related.has(node.id) && node.marker !== "gap")}
              linked={Boolean(related && related.has(node.id) && selected !== node.id)}
              onSelect={() => choose(dynasty.id, node.id)}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">
        옆으로 밀거나 드래그하면 가계도 전체가 보입니다. 칸을 누르면 부모, 배우자, 자녀, 형제가 밝아집니다. 재위 연도는 칸 아래에 있습니다.
      </p>

      {selectedNode ? (
        <section
          aria-live="polite"
          className="fixed inset-x-3 bottom-3 z-40 max-h-[46vh] overflow-auto rounded-lg border border-line bg-card p-4 shadow-lg sm:inset-x-auto sm:right-4 sm:w-[24rem]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] tracking-[0.16em] text-terra">
                {dynasty.ko} · {tree.bands.find((band) => band.id === selectedNode.band)?.ko}
              </p>
              <h2 className="font-serif text-2xl text-ink">{selectedNode.ko}</h2>
              <p className="text-sm text-muted">
                {selectedNode.english} · {selectedNode.dates}
              </p>
            </div>
            <button type="button" className="rounded border border-line px-2 py-1 text-xs text-muted hover:text-ink" onClick={() => setSelected(null)}>
              닫기
            </button>
          </div>
          <p className="mt-2 text-sm leading-6 text-ink">{selectedNode.summary}</p>
          {selectedNode.note ? <p className="mt-2 text-xs leading-5 text-terra">점선: {selectedNode.note}</p> : null}
          {relations ? (
            <div className="mt-3 space-y-2 text-sm">
              <PeopleRow label="부모" people={relations.parents} empty={relations.parents.length || relations.variantParents.length || relations.adoptiveParents.length ? undefined : "이 그림에는 없음"} onPick={(id) => choose(dynasty.id, id)} />
              <PeopleRow label="전승·이설의 부모" people={relations.variantParents} onPick={(id) => choose(dynasty.id, id)} />
              <PeopleRow label="양자로 이은 부모" people={relations.adoptiveParents} onPick={(id) => choose(dynasty.id, id)} />
              <PeopleRow label="배우자" people={relations.spouses} onPick={(id) => choose(dynasty.id, id)} />
              <PeopleRow label="자녀" people={relations.children} onPick={(id) => choose(dynasty.id, id)} />
              <PeopleRow label="전승·이설의 자녀" people={relations.variantChildren} onPick={(id) => choose(dynasty.id, id)} />
              <PeopleRow label="양자로 이은 자녀" people={relations.adoptiveChildren} onPick={(id) => choose(dynasty.id, id)} />
              <PeopleRow label="형제·자매" people={relations.siblings} onPick={(id) => choose(dynasty.id, id)} />
            </div>
          ) : null}
          <Elsewhere links={selectedNode.also} />
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedNode.href ? (
              <a href={selectedNode.href} className="rounded-full bg-terra px-3 py-1.5 text-sm text-white hover:bg-terra-deep">
                인물 페이지
              </a>
            ) : null}
            <button type="button" className="rounded-full border border-line px-3 py-1.5 text-sm hover:border-terra" onClick={() => setSelected(null)}>
              전체 가계도
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function PeopleRow({
  label,
  people,
  empty,
  onPick,
}: {
  label: string;
  people: RelationPerson[];
  empty?: string;
  onPick: (id: string) => void;
}) {
  if (!people.length && !empty) return null;
  return (
    <div className="flex flex-wrap items-baseline gap-1.5">
      <span className="text-xs text-muted">{label}</span>
      {people.length ? (
        people.map((person) => (
          <button
            key={person.id}
            type="button"
            className="rounded-full border border-line bg-bg px-2 py-0.5 text-xs hover:border-terra"
            onClick={() => onPick(person.id)}
          >
            {person.ko}
          </button>
        ))
      ) : (
        <span className="text-xs text-muted">{empty}</span>
      )}
    </div>
  );
}

function TreeCard({
  node,
  pressed,
  dimmed,
  linked,
  onSelect,
}: {
  node: LayoutNode;
  pressed: boolean;
  dimmed: boolean;
  linked: boolean;
  onSelect: () => void;
}) {
  const band = DYNASTIES.flatMap((item) => item.tree.bands).find((item) => item.nodeIds.includes(node.id));
  const bandColor = band?.color ?? "#3e4d7a";
  const marked = node.badge === "전승" || node.badge === "이설";
  const border = node.marker === "gap" ? GAP : marked ? PURPLE : bandColor;
  return (
    <div
      id={`ft-${node.id}`}
      className="absolute z-10"
      style={{ left: node.x, top: node.y, width: node.w, height: node.h, opacity: dimmed ? 0.28 : 1, scrollMargin: "160px" }}
    >
      {node.badge ? (
        <span className="absolute -top-2 left-1 z-10 rounded-full px-1.5 py-0.5 text-[9px] leading-none text-white" style={{ background: PURPLE }}>
          {node.badge}
        </span>
      ) : null}
      <button
        type="button"
        aria-pressed={pressed}
        onClick={onSelect}
        title={`${node.ko} / ${node.english}. ${node.dates}`}
        className={`flex h-full w-full flex-col items-center justify-center rounded-md border bg-white px-1 text-center ${node.href ? "pr-6" : ""}`}
        style={{
          borderColor: border,
          borderStyle: node.marker === "gap" || marked ? "dashed" : "solid",
          boxShadow: pressed ? "0 0 0 3px #a34732" : linked ? `0 0 0 2px ${border}` : undefined,
        }}
      >
        <span
          aria-hidden
          className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-white"
          style={{ background: node.marker === "gap" ? GAP : bandColor }}
        >
          {node.marker === "gap" ? "…" : node.ko.replace(/\s/g, "").slice(0, 1)}
        </span>
        <span className="mt-0.5 max-w-full truncate font-serif text-[12px] leading-4 text-ink">{node.ko}</span>
        <span className="max-w-full truncate text-[10px] leading-3 text-muted">{node.sub}</span>
        <span className="max-w-full truncate text-[10px] leading-3 text-terra">{node.caption}</span>
      </button>
      {node.href ? (
        <a
          href={node.href}
          className="absolute bottom-1 right-1 z-10 rounded bg-white/90 px-1 text-[10px] leading-4 text-laurel underline"
          aria-label={`${node.ko} 인물 페이지`}
        >
          페이지
        </a>
      ) : null}
    </div>
  );
}
