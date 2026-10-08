/**
 * 가족관계도 (Family Tree).
 *
 * 왕조마다 가계도를 따로 그립니다. 한 파일의 데이터로 칸과 선을 계산하고,
 * 그림은 SVG와 CSS만 씁니다.
 *
 * 선
 * - parent: 부모 → 자식 (금색)
 * - spouse: 배우자 (장미색)
 * - variant-parent: 전승·이설 (보라 점선)
 * - adoptive: 양자·입적 (보라 점선, 생부와 구분)
 * - gap: 생략 (회색 점선). 부모로 세지 않습니다.
 *
 * 칸을 더할 때
 * 1. 같은 세대는 같은 row, 좌우 간격은 1.2 이상.
 * 2. 아버지 열에 아들을 두면 세로 선이 짧아집니다.
 * 3. 왕을 빼면 parent 대신 gap 으로 잇습니다.
 * 4. /rulers/[slug] 가 있을 때만 slug 를 넣습니다.
 */

export type DynastyId = "gojoseon" | "goguryeo" | "baekje" | "silla" | "goryeo" | "joseon";

export type LinkKind = "parent" | "spouse" | "variant-parent" | "adoptive" | "gap";

export type TreeSeed = {
  id: string;
  ko: string;
  english: string;
  band: string;
  col: number;
  y: number;
  dates: string;
  summary: string;
  note?: string;
  slug?: string;
  badge?: "전승" | "이설";
  marker?: "gap";
  aliases?: string[];
};

export type TreeLink = { from: string; to: string; kind: LinkKind };

export type BandMeta = {
  id: string;
  ko: string;
  en: string;
  hint: string;
  color: string;
  soft: string;
};

export type LayoutNode = TreeSeed & {
  x: number;
  y: number;
  w: number;
  h: number;
  sub: string;
  caption: string;
  href?: string;
  keys: string[];
};

export type LayoutEdge = {
  id: string;
  d: string;
  d2?: string;
  kind: LinkKind;
  from: string;
  to: string;
  local: boolean;
  quiet: boolean;
};

export type LayoutBand = BandMeta & {
  top: number;
  height: number;
  nodeIds: string[];
};

export type FamilyTreeLayout = {
  width: number;
  height: number;
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  bands: LayoutBand[];
  byId: Map<string, LayoutNode>;
};

export type RelationPerson = { id: string; ko: string; english: string; href?: string };

export type Relations = {
  parents: RelationPerson[];
  variantParents: RelationPerson[];
  adoptiveParents: RelationPerson[];
  spouses: RelationPerson[];
  children: RelationPerson[];
  variantChildren: RelationPerson[];
  adoptiveChildren: RelationPerson[];
  siblings: RelationPerson[];
};

export type Dynasty = {
  id: DynastyId;
  ko: string;
  en: string;
  lede: string;
  tree: FamilyTreeLayout;
  links: TreeLink[];
  succession?: { id: string; note: string }[];
};

export type Caveat = { id: string; title: string; body: string };

const COL = 120;
const NODE_W = 104;
const NODE_H = 88;
const PAD = 28;
const Y0 = 48;
const ROW = 156;

const PALETTE = [
  { color: "#3e4d7a", soft: "#e7edf7" },
  { color: "#8a5a24", soft: "#fbf3e6" },
  { color: "#1f4d45", soft: "#e7f3ef" },
  { color: "#7a3454", soft: "#f8eef2" },
  { color: "#3d5c6e", soft: "#e8f1f5" },
  { color: "#4e5d8a", soft: "#eef0f8" },
  { color: "#8a4630", soft: "#f8efe8" },
  { color: "#3f5a28", soft: "#eef4e6" },
];

function at(row: number, col: number) {
  return { band: `r${row}`, col, y: Y0 + row * ROW };
}

function rows(labels: { ko: string; en: string; hint: string }[]): BandMeta[] {
  return labels.map((label, index) => ({
    id: `r${index}`,
    ko: label.ko,
    en: label.en,
    hint: label.hint,
    color: PALETTE[index % PALETTE.length].color,
    soft: PALETTE[index % PALETTE.length].soft,
  }));
}

type Box = { id: string; x: number; y: number; w: number; h: number; cx: number; cy: number };

function norm(value: string) {
  return value.toLowerCase().replace(/[\s·.'’\-()/_]/g, "");
}

function placeNodes(seeds: TreeSeed[]): { nodes: LayoutNode[]; width: number; height: number } {
  const minCol = Math.min(...seeds.map((seed) => seed.col));
  const maxCol = Math.max(...seeds.map((seed) => seed.col));
  const width = PAD * 2 + (maxCol - minCol) * COL + NODE_W;
  const nodes: LayoutNode[] = seeds.map((seed) => {
    const keys = [seed.ko, seed.english, seed.id, seed.slug, ...(seed.aliases ?? [])].filter(
      (key): key is string => Boolean(key),
    );
    return {
      ...seed,
      x: PAD + (seed.col - minCol) * COL,
      w: NODE_W,
      h: NODE_H,
      sub: seed.marker === "gap" ? "생략" : seed.english,
      caption: seed.dates,
      href: seed.slug ? `/rulers/${seed.slug}` : undefined,
      keys,
    };
  });
  const height = Math.max(...nodes.map((node) => node.y + node.h)) + 36;
  return { nodes, width, height };
}

function boxes(nodes: LayoutNode[]): Box[] {
  return nodes.map((node) => ({
    id: node.id,
    x: node.x,
    y: node.y,
    w: node.w,
    h: node.h,
    cx: node.x + node.w / 2,
    cy: node.y + node.h / 2,
  }));
}

function directedPath(from: Box, to: Box, kind: LinkKind): { d: string; d2?: string } {
  const downward = from.cy <= to.cy;
  const x1 = from.cx;
  const y1 = downward ? from.y + from.h : from.y;
  const x2 = to.cx;
  const y2 = downward ? to.y : to.y + to.h;
  const sameRow = Math.abs(from.cy - to.cy) < 24;
  if (sameRow && (kind === "variant-parent" || kind === "adoptive" || kind === "gap")) {
    const left = Math.min(x1, x2);
    const right = Math.max(x1, x2);
    const y = Math.min(from.y, to.y);
    return { d: `M ${left} ${y} Q ${(left + right) / 2} ${y - 26}, ${right} ${y}` };
  }
  if (Math.abs(x1 - x2) < 6) return { d: `M ${x1} ${y1} V ${y2}` };
  const mid = (y1 + y2) / 2;
  return { d: `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}` };
}

function spousePath(a: Box, b: Box): { d: string; d2?: string } {
  const left = a.cx <= b.cx ? a : b;
  const right = a.cx <= b.cx ? b : a;
  const x1 = left.x + left.w;
  const x2 = right.x;
  const gap = x2 - x1;
  if (Math.abs(a.cy - b.cy) < 24 && gap < COL * 0.75) {
    const y = (left.cy + right.cy) / 2;
    return { d: `M ${x1} ${y - 2.5} H ${x2}`, d2: `M ${x1} ${y + 2.5} H ${x2}` };
  }
  if (Math.abs(a.cy - b.cy) < 24) {
    const y = left.y;
    const mid = (left.cx + right.cx) / 2;
    const lift = Math.min(34, 16 + Math.abs(right.cx - left.cx) * 0.05);
    return { d: `M ${left.cx} ${y} Q ${mid} ${y - lift}, ${right.cx} ${y}` };
  }
  const upper = a.cy <= b.cy ? a : b;
  const lower = a.cy <= b.cy ? b : a;
  const sx = upper.cx;
  const sy = upper.y + upper.h;
  const tx = lower.cx;
  const ty = lower.y;
  const mid = (sy + ty) / 2;
  const bow = sx <= tx ? 36 : -36;
  return { d: `M ${sx} ${sy} C ${sx + bow} ${mid}, ${tx + bow} ${mid}, ${tx} ${ty}` };
}

function edgePaths(nodes: LayoutNode[], links: TreeLink[]): LayoutEdge[] {
  const box = new Map(boxes(nodes).map((item) => [item.id, item]));
  return links.map((link) => {
    const from = box.get(link.from)!;
    const to = box.get(link.to)!;
    const path = link.kind === "spouse" ? spousePath(from, to) : directedPath(from, to, link.kind);
    const dx = Math.abs(from.cx - to.cx);
    const dy = Math.abs(from.cy - to.cy);
    const local =
      link.kind === "spouse"
        ? dx < COL * 1.6 && dy < NODE_H * 1.4
        : link.kind === "gap"
          ? true
          : dx < COL * 2.2 && dy < 240;
    return {
      id: `${link.kind}-${link.from}-${link.to}`,
      d: path.d,
      d2: path.d2,
      kind: link.kind,
      from: link.from,
      to: link.to,
      local,
      quiet: link.kind === "gap" ? false : Math.hypot(dx, dy) > 620,
    };
  });
}

function validate(dynastyKo: string, nodes: LayoutNode[], links: TreeLink[], bandMeta: BandMeta[]) {
  const ids = new Set<string>();
  for (const node of nodes) {
    if (ids.has(node.id)) throw new Error(`${dynastyKo} id 중복: ${node.id}`);
    ids.add(node.id);
    if (!bandMeta.some((band) => band.id === node.band)) {
      throw new Error(`${dynastyKo} 세대 없음: ${node.id} → ${node.band}`);
    }
  }
  const seen = new Set<string>();
  for (const link of links) {
    if (!ids.has(link.from) || !ids.has(link.to)) {
      throw new Error(`${dynastyKo} 선 오류: ${link.kind} ${link.from} → ${link.to}`);
    }
    const key = `${link.kind}-${link.from}-${link.to}`;
    if (seen.has(key)) throw new Error(`${dynastyKo} 선 중복: ${key}`);
    seen.add(key);
  }
  for (const meta of bandMeta) {
    if (!nodes.some((node) => node.band === meta.id)) {
      throw new Error(`${dynastyKo} 빈 세대: ${meta.id} ${meta.ko}`);
    }
  }
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const a = nodes[i];
      const b = nodes[j];
      const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (overlapX > 2 && overlapY > 2) {
        throw new Error(`${dynastyKo} 칸이 겹칩니다: ${a.ko}(${a.id}) · ${b.ko}(${b.id})`);
      }
    }
  }
}

function buildBands(nodes: LayoutNode[], bandMeta: BandMeta[]): LayoutBand[] {
  return bandMeta.map((meta) => {
    const group = nodes.filter((node) => node.band === meta.id).sort((a, b) => a.y - b.y || a.x - b.x);
    const top = Math.min(...group.map((node) => node.y)) - 40;
    const bottom = Math.max(...group.map((node) => node.y + node.h)) + 14;
    return { ...meta, top, height: bottom - top, nodeIds: group.map((node) => node.id) };
  });
}

function layoutDynasty(dynastyKo: string, seeds: TreeSeed[], links: TreeLink[], bandMeta: BandMeta[]): FamilyTreeLayout {
  const placed = placeNodes(seeds);
  validate(dynastyKo, placed.nodes, links, bandMeta);
  const bands = buildBands(placed.nodes, bandMeta);
  for (let i = 1; i < bands.length; i += 1) {
    const gap = bands[i].top - (bands[i - 1].top + bands[i - 1].height);
    if (gap < 12) throw new Error(`${dynastyKo} 세대 간격이 좁습니다: ${bands[i - 1].ko} → ${bands[i].ko}`);
  }
  return {
    width: placed.width,
    height: placed.height,
    nodes: placed.nodes,
    edges: edgePaths(placed.nodes, links),
    bands,
    byId: new Map(placed.nodes.map((node) => [node.id, node])),
  };
}

function linker() {
  const links: TreeLink[] = [];
  const parent = (from: string, to: string) => links.push({ from, to, kind: "parent" });
  const parents = (child: string, ...from: string[]) => from.forEach((id) => parent(id, child));
  const spouse = (a: string, b: string) => links.push({ from: a, to: b, kind: "spouse" });
  const variant = (from: string, to: string) => links.push({ from, to, kind: "variant-parent" });
  const adopt = (from: string, to: string) => links.push({ from, to, kind: "adoptive" });
  const gap = (from: string, to: string) => links.push({ from, to, kind: "gap" });
  return { links, parent, parents, spouse, variant, adopt, gap };
}

function dynasty(
  id: DynastyId,
  ko: string,
  en: string,
  lede: string,
  bandMeta: BandMeta[],
  seeds: TreeSeed[],
  links: TreeLink[],
  succession?: { id: string; note: string }[],
): Dynasty {
  return {
    id,
    ko,
    en,
    lede,
    links,
    succession,
    tree: layoutDynasty(ko, seeds, links, bandMeta),
  };
}

function gojoseon(): Dynasty {
  const { links, variant, spouse, parent, gap } = linker();
  variant("gj-hwanin", "gj-hwanung");
  spouse("gj-hwanung", "gj-ungnyeo");
  variant("gj-hwanung", "gj-dangun");
  variant("gj-ungnyeo", "gj-dangun");
  parent("gj-wiman", "gj-son");
  parent("gj-son", "gj-ugeo");
  gap("gj-dangun", "gj-gap");
  gap("gj-gap", "gj-jun");

  return dynasty(
    "gojoseon",
    "고조선",
    "Gojoseon",
    "단군은 건국 신화입니다. 위만에서 우거왕까지는 사기가 전하는 왕계이고, 단군과 한 혈통으로 잇지 않습니다.",
    rows([
      { ko: "환인", en: "Hwanin", hint: "단군 이야기의 맨 위입니다. 하늘 신으로 전합니다." },
      { ko: "환웅·웅녀", en: "Hwanung", hint: "환웅과 웅녀는 단군을 낳았다는 신화의 부모입니다." },
      { ko: "단군", en: "Dangun", hint: "고조선의 시조로 삼국유사가 전합니다. 역사의 왕 목록으로 세지 않습니다." },
      { ko: "전승과 위만 사이", en: "Gap", hint: "단군과 위만조선 사이에는 확인된 부자 계보가 없습니다." },
      { ko: "준왕·위만", en: "Wiman", hint: "준왕은 위만에게 왕위를 빼앗긴 왕으로 사기에 나옵니다. 부자가 아닙니다." },
      { ko: "위만의 아들", en: "Unnamed son", hint: "사기는 위만의 아들이 왕위를 이었다고 하면서 이름을 적지 않습니다." },
      { ko: "우거왕", en: "Ugeo", hint: "위만의 손자입니다. 기원전 108년 한나라와의 전쟁에서 고조선이 끝납니다." },
    ]),
    [
      { id: "gj-hwanin", ko: "환인", english: "Hwanin", ...at(0, 0), dates: "전승 · 하늘", badge: "전승", summary: "단군 신화에서 환웅의 아버지로 나오는 하늘 신입니다.", aliases: ["환인", "Hwanin"] },
      { id: "gj-hwanung", ko: "환웅", english: "Hwanung", ...at(1, 0), dates: "전승", badge: "전승", summary: "환인의 아들로 땅에 내려왔다는 신화의 인물입니다. 웅녀와 단군을 두었다고 전합니다.", aliases: ["환웅", "Hwanung"] },
      { id: "gj-ungnyeo", ko: "웅녀", english: "Ungnyeo", ...at(1, 1.2), dates: "전승 · 곰", badge: "전승", summary: "곰이 사람이 되어 환웅과 단군을 낳았다는 신화입니다.", aliases: ["웅녀", "Ungnyeo"] },
      { id: "gj-dangun", ko: "단군", english: "Dangun", ...at(2, 0), dates: "전승 · 시조", badge: "전승", summary: "고조선을 열었다고 삼국유사가 전하는 이름입니다. 기원전 2333년 즉위설은 신화의 연대입니다.", note: "아버지 환웅, 어머니 웅녀는 신화입니다. 위만조선과 혈연으로 잇지 않습니다.", aliases: ["단군왕검", "Dangun", "Tangun"] },
      { id: "gj-gap", ko: "…", english: "Gap", ...at(3, 3.6), marker: "gap", dates: "혈통 없음", summary: "단군 전승과 위만조선 사이를 부모 자식으로 잇는 기록이 없습니다. 이 점선은 생략 표시입니다." },
      { id: "gj-jun", ko: "준왕", english: "King Jun", ...at(4, 4.8), dates: "위만에게 쫓김", summary: "위만이 왕위를 빼앗기 전 고조선의 왕으로 사기에 나옵니다. 단군이나 위만의 아버지는 아닙니다.", aliases: ["준왕", "King Jun"] },
      { id: "gj-wiman", ko: "위만", english: "Wiman", ...at(4, 7.2), dates: "기원전 194년경", summary: "연나라에서 들어와 준왕을 몰아내고 왕이 됩니다. 사기는 아들에게 왕위를 물려 손자 우거까지 이어진다고 적습니다.", aliases: ["위만", "Wiman", "Wei Man"] },
      { id: "gj-son", ko: "아들", english: "Unnamed", ...at(5, 7.2), dates: "이름 미상", summary: "위만의 아들입니다. 사기가 왕위를 이었다고만 하고 이름을 남기지 않았습니다.", aliases: ["위만의 아들"] },
      { id: "gj-ugeo", ko: "우거왕", english: "King Ugeo", ...at(6, 7.2), dates: "–기원전 108", summary: "위만의 손자이고 고조선의 마지막 왕입니다. 기원전 108년 한나라의 공격으로 나라가 무너집니다.", aliases: ["우거", "Ugeo", "Ugŏ"] },
    ],
    links,
  );
}

function goguryeo(): Dynasty {
  const { links, variant, spouse, parents, parent, gap } = linker();
  variant("gg-haemosu", "gg-jumong");
  variant("gg-yuhwa", "gg-jumong");
  spouse("gg-jumong", "gg-soseono");
  spouse("gg-jumong", "gg-ye");
  variant("gg-jumong", "gg-yuri");
  variant("gg-ye", "gg-yuri");
  gap("gg-yuri", "gg-gap-early");
  gap("gg-gap-early", "gg-gogukwon");
  parents("gg-sosurim", "gg-gogukwon");
  parents("gg-gogukyang", "gg-gogukwon");
  parents("gg-gwanggaeto", "gg-gogukyang");
  parents("gg-jangsu", "gg-gwanggaeto");
  gap("gg-jangsu", "gg-gap-mid");
  gap("gg-gap-mid", "gg-pyeongwon");
  parent("gg-pyeongwon", "gg-yeongyang");
  parent("gg-pyeongwon", "gg-yeongnyu");
  parent("gg-pyeongwon", "gg-taeyang");
  parent("gg-taeyang", "gg-bojang");

  return dynasty(
    "goguryeo",
    "고구려",
    "Goguryeo",
    "주몽과 유리왕은 삼국사기 앞부분이라 전승으로 점선을 쳤습니다. 고국원왕에서 광개토왕·장수왕, 그리고 평원왕의 아들 태양에게서 난 보장왕까지는 부모를 실선으로 이었고, 뺀 왕은 …입니다.",
    rows([
      { ko: "해모수·유화", en: "Myth", hint: "주몽의 아버지와 어머니로 전하는 신화입니다." },
      { ko: "주몽", en: "Jumong", hint: "동명성왕입니다. 소서노, 예씨와 짝으로 전합니다. 비류·온조는 백제 가계도에 있습니다." },
      { ko: "유리왕", en: "Yuri", hint: "주몽과 예씨의 아들로 삼국사기가 적습니다. 초기 왕계라 점선입니다." },
      { ko: "초기 생략", en: "Gap", hint: "대무신왕부터 미천왕까지입니다. 유리왕의 아들이 고국원왕이라는 뜻이 아닙니다." },
      { ko: "고국원왕", en: "Gogukwon", hint: "미천왕의 아들입니다. 371년 평양에서 백제 근초고왕에게 죽습니다." },
      { ko: "소수림·고국양", en: "Brothers", hint: "고국원왕의 아들 형제입니다. 소수림왕에게 아들이 없어 아우 고국양왕이 잇습니다." },
      { ko: "광개토왕", en: "Gwanggaeto", hint: "고국양왕의 아들입니다. 비의 재위는 391–412년, 삼국사기는 392–413년입니다." },
      { ko: "장수왕", en: "Jangsu", hint: "광개토왕의 맏아들입니다. 427년 평양으로 도읍을 옮깁니다." },
      { ko: "중기 생략", en: "Gap", hint: "아들 조다는 왕위에 오르기 전에 죽었고 손자 문자명왕이 잇습니다. 그 뒤 안장·안원·양원왕입니다." },
      { ko: "평원왕", en: "Pyeongwon", hint: "양원왕의 아들입니다. 위쪽 …와 부자로 잇지 않았습니다." },
      { ko: "영양·영류·태양", en: "Sons", hint: "평원왕의 아들들입니다. 태양은 왕이 되지 않았습니다." },
      { ko: "보장왕", en: "Bojang", hint: "태양의 아들이고 영류왕의 조카입니다. 고구려의 마지막 왕입니다." },
    ]),
    [
      { id: "gg-haemosu", ko: "해모수", english: "Haemosu", ...at(0, 0), dates: "전승", badge: "전승", summary: "주몽의 아버지로 전하는 하늘 신의 이름입니다.", aliases: ["해모수", "Haemosu"] },
      { id: "gg-yuhwa", ko: "유화", english: "Yuhwa", ...at(0, 1.2), dates: "전승 · 어머니", badge: "전승", summary: "주몽의 어머니로 전하는 이름입니다.", aliases: ["유화", "Yuhwa", "柳花"] },
      { id: "gg-jumong", ko: "주몽", english: "Jumong", ...at(1, 0), dates: "전승 · 기원전 37–19", badge: "전승", summary: "고구려를 연 동명성왕으로 삼국사기가 적습니다. 출생 신화는 점선입니다.", note: "소서노에게서 난 비류·온조는 백제 가계도에 있습니다. 유리왕의 어머니는 예씨입니다.", aliases: ["동명성왕", "동명왕", "추모", "Jumong", "Dongmyeong"] },
      { id: "gg-soseono", ko: "소서노", english: "Soseono", ...at(1, 1.2), dates: "전승 · 왕비", badge: "전승", summary: "주몽의 왕비로 전합니다. 비류와 온조의 어머니라는 이야기는 백제 쪽에 점선으로 있습니다.", aliases: ["소서노", "Soseono"] },
      { id: "gg-ye", ko: "예씨", english: "Lady Ye", ...at(1, 2.4), dates: "전승 · 유리의 어머니", badge: "전승", summary: "주몽의 왕비이고 유리왕의 어머니로 삼국사기가 적습니다. 소서노와는 다른 사람입니다.", aliases: ["예씨부인", "Lady Ye"] },
      { id: "gg-yuri", ko: "유리왕", english: "King Yuri", ...at(2, 2.4), dates: "전승 · 기원전 19–18", badge: "전승", summary: "주몽과 예씨의 아들로 삼국사기가 적는 제2대입니다. 초기 왕계라 점선으로 두었습니다.", aliases: ["유리명왕", "Yuri"] },
      { id: "gg-gap-early", ko: "…", english: "Gap", ...at(3, 2.4), marker: "gap", dates: "여러 왕 생략", summary: "대무신왕, 민중왕, 모본왕, 태조왕, 차대왕, 신대왕, 고국천왕, 산상왕, 동천왕, 중천왕, 서천왕, 봉상왕, 미천왕을 빼 놓았습니다. 고국원왕의 아버지는 미천왕이지 유리왕이 아닙니다." },
      { id: "gg-gogukwon", ko: "고국원왕", english: "Gogukwon", ...at(4, 2.4), dates: "331–371", summary: "미천왕의 아들입니다. 371년 평양성 싸움에서 백제 근초고왕에게 죽습니다. 위쪽 …는 그 사이 왕을 뺀 표시입니다.", aliases: ["고국원왕", "Gogukwon"] },
      { id: "gg-sosurim", ko: "소수림왕", english: "Sosurim", ...at(5, 1.2), dates: "371–384", summary: "고국원왕의 아들입니다. 불교를 받아들이고 율령과 태학을 두었다는 기록이 이 재위에 있습니다. 아들이 없어 아우가 잇습니다.", aliases: ["소수림왕", "Sosurim"] },
      { id: "gg-gogukyang", ko: "고국양왕", english: "Gogukyang", ...at(5, 2.4), dates: "384–391", summary: "고국원왕의 아들이고 소수림왕의 아우입니다. 광개토왕의 아버지입니다.", aliases: ["고국양왕", "Gogukyang"] },
      { id: "gg-gwanggaeto", ko: "광개토왕", english: "Gwanggaeto", ...at(6, 2.4), dates: "391–412", summary: "고국양왕의 아들 담덕입니다. 광개토왕릉비는 391년에 즉위해 412년에 죽은 것으로 읽힙니다.", note: "삼국사기는 재위를 392–413년으로 적습니다.", aliases: ["광개토대왕", "호태왕", "영락대왕", "Gwanggaeto", "Gwanggaeto the Great"] },
      { id: "gg-jangsu", ko: "장수왕", english: "Jangsu", ...at(7, 2.4), dates: "413–491", summary: "광개토왕의 맏아들입니다. 427년 평양으로 도읍을 옮기고, 475년 백제의 한성을 함락합니다.", aliases: ["장수왕", "Jangsu"] },
      { id: "gg-gap-mid", ko: "…", english: "Gap", ...at(8, 2.4), marker: "gap", dates: "문자명–양원", summary: "장수왕의 아들 조다는 왕위에 오르기 전에 죽었고, 손자 문자명왕이 잇습니다. 그 뒤 안장왕, 안원왕, 양원왕이 있습니다. 평원왕은 양원왕의 아들이라 장수왕과 부자가 아닙니다." },
      { id: "gg-pyeongwon", ko: "평원왕", english: "Pyeongwon", ...at(9, 2.4), dates: "559–590", summary: "양원왕의 아들입니다. 영양왕·영류왕·태양의 아버지입니다.", aliases: ["평원왕", "Pyeongwon"] },
      { id: "gg-yeongyang", ko: "영양왕", english: "Yeongyang", ...at(10, 1.2), dates: "590–618", summary: "평원왕의 아들입니다. 수나라의 공격을 막은 재위입니다.", aliases: ["영양왕", "Yeongyang"] },
      { id: "gg-yeongnyu", ko: "영류왕", english: "Yeongnyu", ...at(10, 2.4), dates: "618–642", summary: "평원왕의 아들이고 영양왕의 아우입니다. 642년 연개소문에게 죽습니다. 보장왕의 아버지는 아닙니다.", aliases: ["영류왕", "Yeongnyu"] },
      { id: "gg-taeyang", ko: "태양", english: "Taeyang", ...at(10, 3.6), dates: "왕 아님 · 영류의 아우", summary: "평원왕의 아들이고 영류왕의 아우입니다. 왕위에 오르지 않았고, 아들 보장왕이 마지막 왕이 됩니다. 대양이라고도 적습니다.", aliases: ["대양", "태양왕", "대양왕", "Taeyang"] },
      { id: "gg-bojang", ko: "보장왕", english: "Bojang", ...at(11, 3.6), dates: "642–668", summary: "태양의 아들이고 영류왕의 조카입니다. 연개소문이 영류왕을 죽인 뒤 왕으로 세웠습니다. 668년 평양이 함락되며 고구려가 끝납니다.", aliases: ["보장왕", "Bojang"] },
    ],
    links,
  );
}

function baekje(): Dynasty {
  const { links, variant, spouse, parent, parents, gap } = linker();
  spouse("bj-jumong", "bj-soseono");
  variant("bj-jumong", "bj-biryu");
  variant("bj-soseono", "bj-biryu");
  variant("bj-jumong", "bj-onjo");
  variant("bj-soseono", "bj-onjo");
  gap("bj-onjo", "bj-gap-early");
  gap("bj-gap-early", "bj-biryu-wang");
  parent("bj-biryu-wang", "bj-geunchogo");
  gap("bj-geunchogo", "bj-gap-mid");
  gap("bj-gap-mid", "bj-biyu");
  parent("bj-biyu", "bj-gaero");
  parent("bj-biyu", "bj-gonji");
  parent("bj-gonji", "bj-dongseong");
  parent("bj-gonji", "bj-muryeong");
  variant("bj-dongseong", "bj-muryeong");
  parent("bj-muryeong", "bj-seong");
  gap("bj-seong", "bj-gap-late");
  gap("bj-gap-late", "bj-mu");
  parent("bj-mu", "bj-uija");

  return dynasty(
    "baekje",
    "백제",
    "Baekje",
    "온조는 주몽·소서노의 아들이라는 전승이라 점선입니다. 근초고왕은 삼국사기가 비류왕의 아들이라고 한 실선이고, 무령왕과 성왕은 아버지와 아들입니다. 뺀 왕 사이는 …입니다.",
    rows([
      { ko: "주몽·소서노", en: "Tradition", hint: "온조 남매의 부모로 전하는 사람들입니다. 고구려 가계도에도 있습니다." },
      { ko: "비류·온조", en: "Founders", hint: "소서노의 아들로 남하했다는 건국 전승입니다. 4세기의 비류왕과는 다른 사람입니다." },
      { ko: "한성 생략", en: "Gap", hint: "온조 뒤에서 비류왕 앞까지입니다. 부자 선이 아닙니다." },
      { ko: "비류왕", en: "Biryu", hint: "4세기 왕입니다. 건국 전승의 비류와 이름이 같을 뿐 다른 사람입니다." },
      { ko: "근초고왕", en: "Geunchogo", hint: "삼국사기는 비류왕의 둘째 아들이라고 합니다. 사이 계왕은 근초고의 아버지가 아닙니다." },
      { ko: "한성 후기", en: "Gap", hint: "근구수왕부터 전지왕 앞까지입니다." },
      { ko: "비유왕", en: "Biyu", hint: "개로왕과 곤지의 아버지입니다." },
      { ko: "개로·곤지", en: "Brothers", hint: "개로왕은 475년 한성을 잃습니다. 곤지는 왕이 아닙니다." },
      { ko: "동성·무령", en: "Muryeong", hint: "곤지의 아들로 보는 형제입니다. 삼국사기의 ‘동성의 아들 무령’은 점선입니다." },
      { ko: "성왕", en: "Seong", hint: "무령왕의 아들입니다. 538년 사비로 도읍을 옮깁니다." },
      { ko: "사비 중기", en: "Gap", hint: "위덕왕, 혜왕, 법왕입니다. 성왕의 아들이 곧 의자왕이라는 뜻이 아닙니다." },
      { ko: "무왕", en: "Mu", hint: "삼국사기는 법왕의 아들이라고 합니다. 법왕을 생략했으므로 부자 선은 긋지 않았습니다." },
      { ko: "의자왕", en: "Uija", hint: "무왕의 아들이고 백제의 마지막 왕입니다." },
    ]),
    [
      { id: "bj-jumong", ko: "주몽", english: "Jumong", ...at(0, 0), dates: "전승 · 고구려", badge: "전승", summary: "고구려 동명성왕입니다. 백제 본기는 소서노와 함께 온조 남매의 부모라고 전합니다.", aliases: ["추모왕", "동명성왕"] },
      { id: "bj-soseono", ko: "소서노", english: "Soseono", ...at(0, 1.2), dates: "전승 · 어머니", badge: "전승", summary: "주몽의 왕비이고 비류·온조의 어머니로 전합니다.", aliases: ["소서노", "Soseono"] },
      { id: "bj-biryu", ko: "비류", english: "Biryu", ...at(1, 0), dates: "전승 · 온조의 형", badge: "전승", summary: "온조의 형으로 미추홀에 자리를 잡았으나 오래가지 못했다는 건국 전승입니다. 4세기 비류왕과 다른 사람입니다.", aliases: ["비류", "Biryu"] },
      { id: "bj-onjo", ko: "온조왕", english: "Onjo", ...at(1, 1.2), dates: "전승 · 기원전 18–28", badge: "전승", summary: "백제를 연 왕으로 삼국사기가 전합니다. 주몽과 소서노의 아들이라는 설은 점선입니다.", aliases: ["온조", "Onjo"] },
      { id: "bj-gap-early", ko: "…", english: "Gap", ...at(2, 1.2), marker: "gap", dates: "한성 초기 생략", summary: "다루왕부터 분서왕까지 여러 왕을 빼 놓았습니다. 비류왕과 온조를 부자로 잇지 않습니다." },
      { id: "bj-biryu-wang", ko: "비류왕", english: "King Biryu", ...at(3, 2.4), dates: "304–344", summary: "한성 시대의 왕입니다. 건국 전승의 비류와는 다른 사람이고, 삼국사기는 근초고왕을 그의 둘째 아들이라고 합니다.", aliases: ["비류왕", "King Biryu"] },
      { id: "bj-geunchogo", ko: "근초고왕", english: "Geunchogo", ...at(4, 2.4), slug: "geunchogo", dates: "346–375", summary: "삼국사기는 비류왕의 둘째 아들이라고 합니다. 그 사이 계왕(344–346)은 분서왕의 아들로 적혀 있어 근초고왕의 아버지가 아닙니다. 371년 고구려 고국원왕이 평양에서 죽습니다.", note: "한성 왕계를 한 줄의 부자만으로 보는 데에는 다른 해석도 있습니다. 여기 실선은 삼국사기의 문장입니다.", aliases: ["근초고왕", "Geunchogo"] },
      { id: "bj-gap-mid", ko: "…", english: "Gap", ...at(5, 2.4), marker: "gap", dates: "근구수–전지", summary: "근구수왕, 침류왕, 진사왕, 아신왕, 전지왕 등을 빼 놓았습니다. 비유왕과 근초고왕을 부자로 잇지 않습니다." },
      { id: "bj-biyu", ko: "비유왕", english: "King Biyu", ...at(6, 2.4), dates: "427–455", summary: "개로왕과 곤지의 아버지입니다.", aliases: ["비유왕", "Biyu"] },
      { id: "bj-gaero", ko: "개로왕", english: "Gaero", ...at(7, 1.2), dates: "455–475", summary: "비유왕의 아들입니다. 475년 고구려 장수왕에게 한성을 잃습니다.", aliases: ["개로왕", "Gaero"] },
      { id: "bj-gonji", ko: "곤지", english: "Gonji", ...at(7, 2.4), dates: "왕 아님 · 개로의 아우", summary: "개로왕의 아우입니다. 동성왕과 무령왕의 아버지로 보는 기록이 묘지석의 나이와 맞습니다.", aliases: ["곤지", "혼지", "Gonji"] },
      { id: "bj-dongseong", ko: "동성왕", english: "Dongseong", ...at(8, 1.2), dates: "479–501", summary: "곤지의 아들입니다. 501년 죽고 무령왕이 잇습니다. 무령왕의 아버지로 적은 삼국사기 문장은 점선입니다.", aliases: ["동성왕", "Dongseong"] },
      { id: "bj-muryeong", ko: "무령왕", english: "Muryeong", ...at(8, 2.4), dates: "501–523", summary: "무령왕릉 지석은 523년에 62세로 죽었다고 하여, 462년생입니다. 어린 동성왕의 아들로 보기 어려워 곤지의 아들, 동성왕의 배다른 형으로 실선을 쳤습니다.", note: "삼국사기는 동성왕의 둘째 아들이라고 합니다. 그 설만 점선입니다. 아들 성왕이 뒤를 잇습니다.", aliases: ["무령왕", "사마왕", "Muryeong", "Muryeong"] },
      { id: "bj-seong", ko: "성왕", english: "King Seong", ...at(9, 2.4), slug: "seong", dates: "523–554", summary: "무령왕의 아들 명농입니다. 538년 웅진에서 사비로 도읍을 옮기고, 554년 관산성에서 죽습니다.", aliases: ["성왕", "명농", "Seong"] },
      { id: "bj-gap-late", ko: "…", english: "Gap", ...at(10, 2.4), marker: "gap", dates: "위덕·혜·법", summary: "위덕왕(554–598), 혜왕(598–599), 법왕(599–600)을 빼 놓았습니다. 성왕과 무왕을 부자로 잇지 않습니다." },
      { id: "bj-mu", ko: "무왕", english: "King Mu", ...at(11, 2.4), dates: "600–641", summary: "삼국사기는 법왕의 아들이라고 합니다. 법왕은 … 안에 있어 부자 선은 긋지 않았습니다. 의자왕의 아버지입니다.", note: "서동요에서 연못의 용이 아버지라는 이야기는 전설입니다.", aliases: ["무왕", "서동", "King Mu"] },
      { id: "bj-uija", ko: "의자왕", english: "King Uija", ...at(12, 2.4), slug: "uija", dates: "641–660", summary: "무왕의 아들이고 백제의 마지막 왕입니다. 660년 사비가 함락됩니다.", aliases: ["의자왕", "Uija"] },
    ],
    links,
  );
}

function silla(): Dynasty {
  const { links, spouse, parent, parents, gap } = linker();
  gap("sl-alji", "sl-gap-kim");
  gap("sl-gap-kim", "sl-naemul");
  gap("sl-naemul", "sl-gap-late");
  gap("sl-gap-late", "sl-jijeung");
  parent("sl-jijeung", "sl-beopheung");
  parent("sl-jijeung", "sl-ipjong");
  parent("sl-beopheung", "sl-jiso");
  spouse("sl-ipjong", "sl-jiso");
  parents("sl-jinheung", "sl-ipjong", "sl-jiso");
  spouse("sl-jinheung", "sl-sado");
  parents("sl-dongnyun", "sl-jinheung", "sl-sado");
  parents("sl-jinji", "sl-jinheung", "sl-sado");
  parent("sl-dongnyun", "sl-jinpyeong");
  parent("sl-jinji", "sl-yongchun");
  parent("sl-jinpyeong", "sl-seondeok");
  parent("sl-jinpyeong", "sl-cheonmyeong");
  spouse("sl-yongchun", "sl-cheonmyeong");
  parents("sl-muyol", "sl-yongchun", "sl-cheonmyeong");
  parent("sl-seohyeon", "sl-munmyeong");
  parent("sl-seohyeon", "sl-yusin");
  spouse("sl-muyol", "sl-munmyeong");
  parents("sl-munmu", "sl-muyol", "sl-munmyeong");

  return dynasty(
    "silla",
    "신라",
    "Silla",
    "박혁거세, 석탈해, 김알지는 한 가족이 아닙니다. 성씨가 번갈아 왕이 되다가 김씨로 이어집니다. 진흥왕은 법흥왕의 아들이 아니고, 문무왕은 무열왕 김춘추와 김유신의 누이 문명왕후의 아들입니다.",
    rows([
      { ko: "박·석·김", en: "Clans", hint: "세 시조는 부부나 부자가 아닙니다. 초기 왕은 박씨와 석씨가 번갈아 나옵니다." },
      { ko: "김씨 생략", en: "Gap", hint: "김알지와 내물왕 사이의 전승 혈통입니다. 부자 선이 아닙니다." },
      { ko: "내물왕", en: "Naemul", hint: "4세기 후반 김씨 왕이 이어지기 시작하는 자리입니다." },
      { ko: "지증 앞", en: "Gap", hint: "실성·눌지·자비·소지왕과, 지증의 아버지 습보를 빼 놓았습니다." },
      { ko: "지증왕", en: "Jijeung", hint: "법흥왕과 입종의 아버지입니다." },
      { ko: "법흥·입종", en: "Brothers", hint: "지증왕의 아들 형제입니다. 입종은 왕이 아닙니다." },
      { ko: "지소부인", en: "Jiso", hint: "법흥왕의 딸이고 입종의 아내이며 진흥왕의 어머니입니다." },
      { ko: "진흥왕", en: "Jinheung", hint: "입종과 지소의 아들입니다. 법흥왕의 아들은 아닙니다." },
      { ko: "동륜·진지", en: "Sons", hint: "진흥왕의 아들입니다. 동륜은 세자로 일찍 죽고, 진지가 잠시 왕이 됩니다." },
      { ko: "진평·용춘", en: "Cousins", hint: "진평은 동륜의 아들, 용춘은 진지의 아들입니다." },
      { ko: "선덕·천명", en: "Daughters", hint: "진평왕의 딸입니다. 김서현은 김유신 남매의 아버지로 다른 집안입니다." },
      { ko: "무열·문명", en: "Muyeol", hint: "김춘추와 김유신의 누이 문희입니다. 김유신은 왕이 아닙니다." },
      { ko: "문무왕", en: "Munmu", hint: "무열왕과 문명왕후의 아들입니다." },
    ]),
    [
      { id: "sl-hyeokgeose", ko: "박혁거세", english: "Hyeokgeose", ...at(0, 0), dates: "전승 · 기원전 57–4", badge: "전승", summary: "박씨 신라의 시조로 삼국사기와 삼국유사가 전합니다. 알에서 났다는 이야기는 신화입니다. 석탈해·김알지와 부자가 아닙니다.", aliases: ["혁거세", "Hyeokgeose", "Park Hyeokgeose"] },
      { id: "sl-talhae", ko: "석탈해", english: "Talhae", ...at(0, 2.4), dates: "전승 · 57–80", badge: "전승", summary: "석씨 왕의 시조로 전합니다. 박혁거세의 아들이 아니고, 뒤에서 박씨와 석씨가 번갈아 왕이 됩니다.", aliases: ["탈해", "Talhae", "Seok Talhae"] },
      { id: "sl-alji", ko: "김알지", english: "Alji", ...at(0, 4.8), dates: "전승 · 왕 아님", badge: "전승", summary: "금궤에서 나왔다는 김씨 시조의 전승입니다. 왕이 아닙니다. 내물왕과 부자로 확인된 관계가 아닙니다.", aliases: ["알지", "김알지", "Alji"] },
      { id: "sl-gap-kim", ko: "…", english: "Gap", ...at(1, 4.8), marker: "gap", dates: "김씨 전승", summary: "김알지 자손으로 전하는 왕들을 빼 놓았습니다. 내물왕과 김알지를 부자로 잇지 않습니다." },
      { id: "sl-naemul", ko: "내물왕", english: "Naemul", ...at(2, 4.8), dates: "356–402", summary: "김씨 왕이 이어지기 시작하는 4세기의 왕입니다. 앞뒤 …는 생략이지 부자가 아닙니다.", aliases: ["내물마립간", "Naemul"] },
      { id: "sl-gap-late", ko: "…", english: "Gap", ...at(3, 4.8), marker: "gap", dates: "실성–습보", summary: "실성왕, 눌지왕, 자비왕, 소지왕을 빼 놓았습니다. 지증왕의 아버지는 습보갈문왕으로, 내물왕의 증손으로 전합니다. 내물왕과 지증왕은 부자가 아닙니다." },
      { id: "sl-jijeung", ko: "지증왕", english: "Jijeung", ...at(4, 4.8), dates: "500–514", summary: "법흥왕과 입종의 아버지입니다. 왕의 칭호를 쓰기 시작한 재위로 전합니다.", aliases: ["지증왕", "Jijeung"] },
      { id: "sl-beopheung", ko: "법흥왕", english: "Beopheung", ...at(5, 3.6), dates: "514–540", summary: "지증왕의 맏아들입니다. 불교를 공인하고, 딸 지소가 진흥왕의 어머니가 됩니다. 진흥왕의 아버지는 아닙니다.", aliases: ["법흥왕", "Beopheung"] },
      { id: "sl-ipjong", ko: "입종", english: "Ipjong", ...at(5, 5.2), dates: "갈문왕 · 왕 아님", summary: "법흥왕의 아우이고 지증왕의 아들입니다. 지소부인의 남편이며 진흥왕의 아버지입니다.", aliases: ["입종갈문왕", "Ipjong"] },
      { id: "sl-jiso", ko: "지소부인", english: "Lady Jiso", ...at(6, 4.4), dates: "진흥의 어머니", summary: "법흥왕의 딸입니다. 숙부인 입종과 혼인하여 진흥왕을 낳습니다.", aliases: ["지소태후", "지소", "Jiso"] },
      { id: "sl-jinheung", ko: "진흥왕", english: "Jinheung", ...at(7, 4.4), slug: "jinheung", dates: "540–576", summary: "입종과 지소부인의 아들입니다. 법흥왕의 조카이면서 외손자라, 법흥의 아들은 아닙니다. 한강까지 영역을 넓힙니다.", aliases: ["진흥왕", "Jinheung"] },
      { id: "sl-sado", ko: "사도부인", english: "Lady Sado", ...at(7, 5.6), dates: "진흥의 왕비", summary: "진흥왕의 왕비 박씨입니다. 동륜과 진지왕의 어머니입니다. 조선의 사도세자와는 다른 사람입니다.", aliases: ["사도부인", "Lady Sado"] },
      { id: "sl-dongnyun", ko: "동륜", english: "Dongnyun", ...at(8, 3.2), dates: "태자 · 일찍 죽음", summary: "진흥왕의 맏아들로 태자였으나 왕위에 오르기 전에 죽습니다. 진평왕의 아버지입니다.", aliases: ["동륜태자", "Dongnyun"] },
      { id: "sl-jinji", ko: "진지왕", english: "Jinji", ...at(8, 5.6), dates: "576–579", summary: "진흥왕의 아들이고 동륜의 아우입니다. 짧게 왕위에 있다 물러납니다. 김용춘의 아버지입니다.", aliases: ["진지왕", "Jinji"] },
      { id: "sl-jinpyeong", ko: "진평왕", english: "Jinpyeong", ...at(9, 3.2), dates: "579–632", summary: "동륜의 아들입니다. 어머니가 입종의 딸 만호부인이라는 기록이 있습니다. 아들은 없고 딸 선덕·천명이 있습니다.", aliases: ["진평왕", "Jinpyeong"] },
      { id: "sl-yongchun", ko: "김용춘", english: "Yongchun", ...at(9, 4.4), dates: "왕 아님 · 무열의 아버지", summary: "진지왕의 아들입니다. 진평왕의 딸 천명과 혼인하여 무열왕 김춘추를 낳습니다.", aliases: ["용춘", "용수", "Yongchun"] },
      { id: "sl-seondeok", ko: "선덕여왕", english: "Seondeok", ...at(10, 2.0), slug: "seondeok", dates: "632–647", summary: "진평왕의 딸 덕만이고 신라 최초의 여왕입니다. 자녀가 없습니다. 다음은 조카 진덕여왕(647–654)이고, 무열왕은 선덕의 아들이 아닙니다.", aliases: ["선덕여왕", "덕만", "Seondeok"] },
      { id: "sl-cheonmyeong", ko: "천명부인", english: "Cheonmyeong", ...at(10, 3.2), dates: "무열의 어머니", summary: "진평왕의 딸이고 선덕여왕의 자매입니다. 김용춘과 무열왕 김춘추를 낳습니다.", aliases: ["천명공주", "Cheonmyeong"] },
      { id: "sl-seohyeon", ko: "김서현", english: "Kim Seo-hyeon", ...at(10, 8.0), dates: "김유신의 아버지", summary: "김유신과 문명왕후 문희의 아버지입니다. 금관가야 왕족의 후손으로 전합니다.", aliases: ["김서현", "Seo-hyeon"] },
      { id: "sl-muyol", ko: "무열왕", english: "Muyeol", ...at(11, 4.4), dates: "654–661", summary: "김춘추입니다. 아버지는 진지왕의 아들 김용춘, 어머니는 진평왕의 딸 천명입니다. 선덕의 조카이고, 왕비 문명왕후는 김유신의 누이입니다.", aliases: ["김춘추", "태종무열왕", "Muyeol", "Kim Chunchu"] },
      { id: "sl-munmyeong", ko: "문명왕후", english: "Munmyeong", ...at(11, 5.6), dates: "문희 · 문무의 어머니", summary: "김유신의 누이 문희입니다. 무열왕 김춘추의 왕비이고 문무왕의 어머니입니다.", aliases: ["문희", "문명부인", "Munmyeong"] },
      { id: "sl-yusin", ko: "김유신", english: "Kim Yusin", ...at(11, 8.0), dates: "장군 · 595–673", summary: "김서현의 아들이고 문명왕후의 오빠입니다. 왕이 아닙니다. 누이가 무열왕의 왕비가 된 뒤 백제·고구려와의 전쟁에서 신라 쪽 장군으로 남습니다.", aliases: ["김유신", "Kim Yusin", "Yusin"] },
      { id: "sl-munmu", ko: "문무왕", english: "Munmu", ...at(12, 5.0), slug: "munmu", dates: "661–681", summary: "무열왕 김춘추와 문명왕후 문희의 아들입니다. 660년 백제, 668년 고구려가 무너진 뒤의 왕입니다.", aliases: ["문무왕", "Munmu"] },
    ],
    links,
  );
}

function goryeo(): Dynasty {
  const { links, spouse, parent, parents, variant, gap } = linker();
  spouse("gr-taejo", "gr-janghwa");
  spouse("gr-taejo", "gr-sinmyeong");
  spouse("gr-taejo", "gr-sinjeong");
  spouse("gr-taejo", "gr-sinseong");
  parents("gr-hyejong", "gr-taejo", "gr-janghwa");
  parents("gr-jeongjong", "gr-taejo", "gr-sinmyeong");
  parents("gr-gwangjong", "gr-taejo", "gr-sinmyeong");
  parents("gr-daemok", "gr-taejo", "gr-sinjeong");
  parents("gr-daejong", "gr-taejo", "gr-sinjeong");
  parents("gr-anjong", "gr-taejo", "gr-sinseong");
  spouse("gr-gwangjong", "gr-daemok");
  parents("gr-gyeongjong", "gr-gwangjong", "gr-daemok");
  parent("gr-daejong", "gr-seongjong");
  parent("gr-daejong", "gr-heonae");
  parent("gr-daejong", "gr-heonjeong");
  spouse("gr-gyeongjong", "gr-heonae");
  spouse("gr-anjong", "gr-heonjeong");
  parents("gr-mokjong", "gr-gyeongjong", "gr-heonae");
  parents("gr-hyeonjong", "gr-anjong", "gr-heonjeong");
  gap("gr-hyeonjong", "gr-gap");
  gap("gr-gap", "gr-chungsuk");
  spouse("gr-chungsuk", "gr-gongwon");
  parents("gr-gongmin", "gr-chungsuk", "gr-gongwon");
  spouse("gr-gongmin", "gr-noguk");
  variant("gr-gongmin", "gr-u");

  return dynasty(
    "goryeo",
    "고려",
    "Goryeo",
    "왕건의 왕비가 여럿이고, 그 자녀가 왕위를 나누어 받습니다. 광종과 대목왕후는 이복 남매이면서 부부입니다. 현종 뒤에서 충숙왕까지는 …이고, 공민왕과 우왕의 부자는 기록이 갈려 점선입니다.",
    rows([
      { ko: "태조와 왕비", en: "Taejo", hint: "왕이 된 아들의 어머니만 골랐습니다. 왕건의 왕비는 이보다 많습니다." },
      { ko: "태조의 자녀", en: "Children", hint: "혜종·정종·광종은 왕입니다. 대종·안종은 뒤에 추존되었고, 대목은 광종의 왕비입니다." },
      { ko: "경종·성종", en: "Cousins", hint: "경종은 광종의 아들, 성종은 대종의 아들입니다. 헌애·헌정은 성종의 자매입니다." },
      { ko: "목종·현종", en: "Kings", hint: "목종은 경종과 헌애의 아들, 현종은 안종과 헌정의 아들입니다." },
      { ko: "중간 생략", en: "Gap", hint: "덕종부터 충선왕까지입니다. 현종의 아들이 충숙왕이라는 뜻이 아닙니다." },
      { ko: "충숙왕", en: "Chungsuk", hint: "공민왕의 아버지입니다. 아버지는 생략한 충선왕입니다." },
      { ko: "공민왕", en: "Gongmin", hint: "충숙왕과 공원왕후의 아들입니다. 노국대장공주는 원나라 출신의 왕비입니다." },
      { ko: "우왕", en: "U", hint: "당대에는 공민왕의 아들로 왕위에 올랐습니다. 조선 쪽 기록의 신돈 설 때문에 점선입니다." },
    ]),
    [
      { id: "gr-taejo", ko: "태조", english: "Wang Geon", ...at(0, 2.4), slug: "wanggeon", dates: "918–943", summary: "왕건입니다. 궁예를 몰아내고 고려를 엽니다. 조선 태조 이성계와 다른 사람입니다.", aliases: ["왕건", "고려 태조", "Wang Geon"] },
      { id: "gr-janghwa", ko: "장화왕후", english: "Queen Janghwa", ...at(0, 3.6), dates: "오씨 · 혜종의 어머니", summary: "나주 오씨입니다. 태조의 왕비이고 혜종의 어머니입니다.", aliases: ["장화왕후", "Janghwa"] },
      { id: "gr-sinmyeong", ko: "신명왕후", english: "Queen Sinmyeong", ...at(0, 4.8), dates: "유씨 · 광종의 어머니", summary: "신명순성왕후 유씨입니다. 정종과 광종의 어머니입니다.", aliases: ["신명순성왕후", "Sinmyeong"] },
      { id: "gr-sinjeong", ko: "신정왕후", english: "Queen Sinjeong", ...at(0, 7.2), dates: "황보씨 · 태조의 왕비", summary: "황보씨입니다. 대종과 대목왕후의 어머니입니다. 조선의 신정왕후 조씨와는 다른 사람입니다.", aliases: ["신정왕후", "Sinjeong"] },
      { id: "gr-sinseong", ko: "신성왕후", english: "Queen Sinseong", ...at(0, 9.6), dates: "김씨 · 안종의 어머니", summary: "김씨입니다. 안종 왕욱의 어머니입니다.", aliases: ["신성왕후", "Sinseong"] },
      { id: "gr-hyejong", ko: "혜종", english: "Hyejong", ...at(1, 3.6), dates: "943–945", summary: "태조와 장화왕후 오씨의 아들입니다. 재위가 짧고 아우 정종이 잇습니다.", aliases: ["혜종", "Hyejong"] },
      { id: "gr-jeongjong", ko: "정종", english: "Jeongjong", ...at(1, 4.8), dates: "945–949", summary: "태조와 신명왕후 유씨의 아들입니다. 광종의 형입니다. 11세기 중엽의 정종과는 다른 사람입니다.", aliases: ["고려 정종", "정종 왕요", "Jeongjong"] },
      { id: "gr-gwangjong", ko: "광종", english: "Gwangjong", ...at(1, 6.0), slug: "gwangjong", dates: "949–975", summary: "태조와 신명왕후 유씨의 아들입니다. 이복 누이 대목왕후와 혼인합니다. 노비안검과 과거가 이 재위에 있습니다.", aliases: ["광종", "Gwangjong"] },
      { id: "gr-daemok", ko: "대목왕후", english: "Queen Daemok", ...at(1, 7.2), dates: "경종의 어머니", summary: "태조와 신정왕후 황보씨의 딸입니다. 이복 오라버니 광종의 왕비이고 경종의 어머니입니다.", aliases: ["대목왕후", "Daemok"] },
      { id: "gr-daejong", ko: "대종", english: "Daejong", ...at(1, 8.4), dates: "추존 · 왕욱", summary: "태조와 신정왕후의 아들 왕욱(旭)입니다. 살아 있을 때 왕이 아니었고, 아들 성종이 즉위한 뒤 추존됩니다. 안종 왕욱과는 다른 사람입니다.", aliases: ["대종", "왕욱", "Daejong"] },
      { id: "gr-anjong", ko: "안종", english: "Anjong", ...at(1, 9.6), dates: "추존 · 왕욱", summary: "태조와 신성왕후의 아들 왕욱(郁)입니다. 대종과 한자가 다릅니다. 헌정왕후와 현종을 낳고, 뒤에 추존됩니다.", aliases: ["안종", "Anjong"] },
      { id: "gr-gyeongjong", ko: "경종", english: "Gyeongjong", ...at(2, 6.0), dates: "975–981", summary: "광종과 대목왕후의 아들입니다. 왕비 헌애왕후가 목종의 어머니입니다.", aliases: ["경종", "Gyeongjong"] },
      { id: "gr-seongjong", ko: "성종", english: "Seongjong", ...at(2, 8.4), dates: "981–997", summary: "대종과 선의왕후의 아들입니다. 경종의 아들이 아닙니다. 헌애·헌정왕후의 오라버니입니다.", aliases: ["고려 성종", "Seongjong"] },
      { id: "gr-heonae", ko: "헌애왕후", english: "Queen Heonae", ...at(2, 7.2), dates: "천추태후", summary: "대종의 딸이고 경종의 왕비입니다. 목종의 어머니이며, 목종 때 섭정하여 천추태후라 불립니다.", aliases: ["헌애왕후", "천추태후", "Heonae"] },
      { id: "gr-heonjeong", ko: "헌정왕후", english: "Queen Heonjeong", ...at(2, 9.6), dates: "현종의 어머니", summary: "대종의 딸이고 헌애왕후의 자매입니다. 안종과 현종을 낳습니다.", aliases: ["헌정왕후", "Heonjeong"] },
      { id: "gr-mokjong", ko: "목종", english: "Mokjong", ...at(3, 6.0), dates: "997–1009", summary: "경종과 헌애왕후의 아들입니다. 1009년 강조의 정변으로 왕위에서 밀려나고, 현종이 잇습니다.", aliases: ["목종", "Mokjong"] },
      { id: "gr-hyeonjong", ko: "현종", english: "Hyeonjong", ...at(3, 9.6), dates: "1009–1031", summary: "안종과 헌정왕후의 아들입니다. 목종의 아들이 아닙니다. 뒷 고려 왕들은 이 현종의 자손으로 이어집니다.", aliases: ["현종", "Hyeonjong"] },
      { id: "gr-gap", ko: "…", english: "Gap", ...at(4, 6.0), marker: "gap", dates: "덕종–충선", summary: "덕종, 문종, 순종, 선종, 헌종, 숙종, 예종, 인종, 의종, 명종, 신종, 희종, 강종, 고종, 원종, 충렬왕, 충선왕 등을 빼 놓았습니다. 충숙왕의 아버지는 충선왕입니다. 현종과 부자가 아닙니다." },
      { id: "gr-chungsuk", ko: "충숙왕", english: "Chungsuk", ...at(5, 6.0), dates: "1313–1339", summary: "충선왕의 아들이고 공민왕의 아버지입니다. 1330–1332년에는 잠시 왕위에서 물러나 충혜왕이 있었습니다.", aliases: ["충숙왕", "Chungsuk"] },
      { id: "gr-gongwon", ko: "공원왕후", english: "Queen Gongwon", ...at(5, 7.2), dates: "홍씨 · 공민의 어머니", summary: "홍씨입니다. 명덕태후로도 부릅니다. 충숙왕의 왕비이고 공민왕의 어머니입니다.", aliases: ["공원왕후", "명덕태후", "Gongwon"] },
      { id: "gr-gongmin", ko: "공민왕", english: "Gongmin", ...at(6, 6.0), slug: "gongmin", dates: "1351–1374", summary: "충숙왕과 공원왕후 홍씨의 아들입니다. 왕비 노국대장공주는 원나라 황족이고, 그 소생으로 왕이 된 아들은 없습니다.", aliases: ["공민왕", "Gongmin"] },
      { id: "gr-noguk", ko: "노국대장공주", english: "Princess Noguk", ...at(6, 7.2), dates: "원나라 왕비", summary: "공민왕의 왕비입니다. 1365년에 죽습니다. 자녀로 왕이 된 사람은 없습니다.", aliases: ["노국대장공주", "Noguk"] },
      { id: "gr-u", ko: "우왕", english: "King U", ...at(7, 6.0), dates: "1374–1388", badge: "이설", summary: "1374년 공민왕의 아들로 알려져 왕위에 오릅니다. 창왕이 뒤를 이었다가 폐위되고, 신종의 후손 공양왕(1389–1392)이 마지막 왕이 됩니다. 공양왕은 우왕의 아들이 아닙니다.", note: "조선이 선 뒤의 기록은 우왕을 신돈의 아들이라 하여 신우라 부릅니다. 그 말이 갈리므로 공민왕과의 선은 점선입니다.", aliases: ["우왕", "신우", "King U"] },
    ],
    links,
  );
}

function joseon(): Dynasty {
  const { links, spouse, parents, parent, adopt, gap } = linker();
  spouse("js-taejo", "js-sinui");
  parents("js-jeongjong", "js-taejo", "js-sinui");
  parents("js-taejong", "js-taejo", "js-sinui");
  spouse("js-taejong", "js-wongyeong");
  parents("js-yangnyeong", "js-taejong", "js-wongyeong");
  parents("js-sejong", "js-taejong", "js-wongyeong");
  spouse("js-sejong", "js-soheon");
  parents("js-munjong", "js-sejong", "js-soheon");
  parents("js-sejo", "js-sejong", "js-soheon");
  spouse("js-munjong", "js-hyeondeok");
  parents("js-danjong", "js-munjong", "js-hyeondeok");
  spouse("js-sejo", "js-jeonghui");
  parents("js-uigyeong", "js-sejo", "js-jeonghui");
  parents("js-yejong", "js-sejo", "js-jeonghui");
  spouse("js-uigyeong", "js-sohye");
  parents("js-seongjong", "js-uigyeong", "js-sohye");
  spouse("js-seongjong", "js-deposed-yun");
  spouse("js-seongjong", "js-jeonghyeon");
  parents("js-yeonsangun", "js-seongjong", "js-deposed-yun");
  parents("js-jungjong", "js-seongjong", "js-jeonghyeon");
  spouse("js-jungjong", "js-janggyeong");
  spouse("js-jungjong", "js-munjeong");
  spouse("js-jungjong", "js-changbin");
  parents("js-injong", "js-jungjong", "js-janggyeong");
  parents("js-myeongjong", "js-jungjong", "js-munjeong");
  parents("js-deokheung", "js-jungjong", "js-changbin");
  spouse("js-deokheung", "js-hadong");
  parents("js-seonjo", "js-deokheung", "js-hadong");
  spouse("js-seonjo", "js-gongbin");
  spouse("js-seonjo", "js-inbin");
  parents("js-gwanghae", "js-seonjo", "js-gongbin");
  parents("js-jeongwon", "js-seonjo", "js-inbin");
  spouse("js-jeongwon", "js-inheon");
  parents("js-injo", "js-jeongwon", "js-inheon");
  spouse("js-injo", "js-inyeol");
  parents("js-inpyeong", "js-injo", "js-inyeol");
  parents("js-sohyeon", "js-injo", "js-inyeol");
  parents("js-hyojong", "js-injo", "js-inyeol");
  spouse("js-hyojong", "js-inseon");
  parents("js-hyeonjong", "js-hyojong", "js-inseon");
  spouse("js-hyeonjong", "js-myeongseong-queen");
  parents("js-sukjong", "js-hyeonjong", "js-myeongseong-queen");
  spouse("js-sukjong", "js-huibin");
  spouse("js-sukjong", "js-sukbin");
  parents("js-gyeongjong", "js-sukjong", "js-huibin");
  parents("js-yeongjo", "js-sukjong", "js-sukbin");
  spouse("js-yeongjo", "js-jeongbin");
  spouse("js-yeongjo", "js-yeongbin");
  parents("js-hyojang", "js-yeongjo", "js-jeongbin");
  parents("js-sado", "js-yeongjo", "js-yeongbin");
  spouse("js-sado", "js-haegyeong");
  parent("js-sado", "js-euneon");
  parent("js-sado", "js-eunsin");
  parents("js-jeongjo", "js-sado", "js-haegyeong");
  adopt("js-hyojang", "js-jeongjo");
  spouse("js-jeongjo", "js-subin");
  parents("js-sunjo", "js-jeongjo", "js-subin");
  spouse("js-sunjo", "js-sunwon");
  parent("js-euneon", "js-jeongye");
  spouse("js-jeongye", "js-yongseong");
  parents("js-cheoljong", "js-jeongye", "js-yongseong");
  adopt("js-sunjo", "js-cheoljong");
  parent("js-sunwon", "js-hyomyeong");
  parent("js-sunjo", "js-hyomyeong");
  spouse("js-hyomyeong", "js-sinjeong");
  parents("js-heonjong", "js-hyomyeong", "js-sinjeong");
  gap("js-inpyeong", "js-gap-inpyeong");
  gap("js-gap-inpyeong", "js-namyeon");
  adopt("js-eunsin", "js-namyeon");
  parent("js-namyeon", "js-heungseon");
  spouse("js-heungseon", "js-yeoheung");
  parents("js-gojong", "js-heungseon", "js-yeoheung");
  adopt("js-hyomyeong", "js-gojong");
  spouse("js-gojong", "js-empress");
  parents("js-sunjong", "js-gojong", "js-empress");

  const succession: { id: string; note: string }[] = [
    { id: "js-taejo", note: "이성계. 고려를 닫고 조선을 엽니다." },
    { id: "js-jeongjong", note: "태조와 신의왕후의 둘째 아들. 아우에게 왕위를 넘깁니다." },
    { id: "js-taejong", note: "태조의 아들 이방원. 정종의 아우입니다." },
    { id: "js-sejong", note: "태종과 원경왕후의 아들. 형 양녕이 세자에서 물러난 뒤 즉위합니다." },
    { id: "js-munjong", note: "세종의 아들." },
    { id: "js-danjong", note: "문종의 아들. 숙부 세조에게 왕위를 빼앗깁니다." },
    { id: "js-sejo", note: "세종의 아들, 문종의 아우. 단종의 아버지는 아닙니다." },
    { id: "js-yejong", note: "세조의 아들. 아들이 왕위를 잇지 못합니다." },
    { id: "js-seongjong", note: "세조의 손자. 의경세자와 소혜왕후의 아들이고 예종의 조카입니다." },
    { id: "js-yeonsangun", note: "성종과 폐비 윤씨의 아들. 중종반정으로 쫓겨납니다." },
    { id: "js-jungjong", note: "성종과 정현왕후의 아들. 연산군의 배다른 아우입니다." },
    { id: "js-injong", note: "중종과 장경왕후의 아들. 아들이 없습니다." },
    { id: "js-myeongjong", note: "중종과 문정왕후의 아들. 인종의 배다른 아우입니다." },
    { id: "js-seonjo", note: "명종의 아들이 아닙니다. 중종의 아들 덕흥대원군의 아들입니다." },
    { id: "js-gwanghae", note: "선조와 공빈 김씨의 아들. 인조반정으로 쫓겨납니다." },
    { id: "js-injo", note: "광해군의 아들이 아닙니다. 선조의 아들 정원군의 아들, 곧 선조의 손자입니다." },
    { id: "js-hyojong", note: "인조의 아들. 형 소현세자가 먼저 죽습니다." },
    { id: "js-hyeonjong", note: "효종과 인선왕후의 아들." },
    { id: "js-sukjong", note: "현종과 명성왕후의 아들. 고종의 왕비 명성황후와는 다른 사람입니다." },
    { id: "js-gyeongjong", note: "숙종과 희빈 장씨의 아들. 아들이 없습니다." },
    { id: "js-yeongjo", note: "숙종과 숙빈 최씨의 아들. 경종의 배다른 아우입니다." },
    { id: "js-jeongjo", note: "사도세자와 혜경궁 홍씨의 아들. 법적으로는 효장세자의 양자입니다." },
    { id: "js-sunjo", note: "정조와 수빈 박씨의 아들." },
    { id: "js-heonjong", note: "순조의 아들 효명세자와 신정왕후의 아들. 순조의 손자이고 아들이 없습니다." },
    { id: "js-cheoljong", note: "헌종의 아들이 아닙니다. 사도세자의 아들 은언군의 손자입니다." },
    { id: "js-gojong", note: "철종의 아들이 아닙니다. 흥선대원군의 아들이고, 법적으로는 효명세자의 양자입니다." },
    { id: "js-sunjong", note: "고종과 명성황후의 아들. 1910년 나라가 끝납니다." },
  ];

  return dynasty(
    "joseon",
    "조선",
    "Joseon",
    "스물일곱 왕을 모두 넣었습니다. 금색 선은 실제로 낳은 부모입니다. 선조·인조·정조·철종·고종처럼 왕위와 아버지가 어긋나는 곳은 생부를 실선으로, 양자와 입적은 보라 점선으로 구분했습니다.",
    rows([
      { ko: "태조", en: "Taejo", hint: "이성계와 신의왕후입니다. 정종·태종의 어머니입니다." },
      { ko: "정종·태종", en: "Brothers", hint: "태조의 아들 형제입니다. 왕위는 형에서 아우로 넘어갑니다." },
      { ko: "세종", en: "Sejong", hint: "태종의 아들입니다. 형 양녕은 세자에서 물러납니다." },
      { ko: "문종·세조", en: "Brothers", hint: "세종의 아들 형제입니다. 세조는 문종의 아들이 아닙니다." },
      { ko: "단종·예종", en: "Cousins", hint: "단종은 문종의 아들, 예종과 의경세자는 세조의 아들입니다." },
      { ko: "성종", en: "Seongjong", hint: "의경세자의 아들입니다. 예종의 아들이 아닙니다." },
      { ko: "연산·중종", en: "Half-brothers", hint: "성종의 아들들입니다. 어머니가 다릅니다." },
      { ko: "인종·명종", en: "Half-brothers", hint: "중종의 아들들입니다. 덕흥대원군도 중종의 아들이고 왕은 아닙니다." },
      { ko: "선조", en: "Seonjo", hint: "덕흥대원군의 아들입니다. 명종의 아들이 아닙니다." },
      { ko: "광해·원종", en: "Half-brothers", hint: "선조의 아들들입니다. 정원군은 뒤에 원종으로 추존됩니다." },
      { ko: "인조", en: "Injo", hint: "정원군의 아들, 선조의 손자입니다. 인평대군은 고종 가계의 먼 조상입니다." },
      { ko: "효종", en: "Hyojong", hint: "인조의 아들입니다. 형 소현세자는 세자로 죽습니다." },
      { ko: "현종", en: "Hyeonjong", hint: "효종의 아들입니다. 왕비 명성왕후는 고종 때의 명성황후와 다릅니다." },
      { ko: "숙종", en: "Sukjong", hint: "현종의 아들입니다. 경종의 어머니는 희빈 장씨, 영조의 어머니는 숙빈 최씨입니다." },
      { ko: "경종·영조", en: "Half-brothers", hint: "숙종의 아들들입니다. 오른쪽 …는 인평대군 후손을 뺀 표시입니다." },
      { ko: "사도세자", en: "Sado", hint: "영조와 영빈 이씨의 아들입니다. 왕이 되지 못합니다. 은언·은신은 서자입니다." },
      { ko: "정조", en: "Jeongjo", hint: "사도세자의 아들입니다. 효장세자에게 입적된 것은 점선입니다." },
      { ko: "순조", en: "Sunjo", hint: "정조와 수빈 박씨의 아들입니다. 전계대원군·남연군은 다른 갈래입니다." },
      { ko: "효명·철종", en: "Same generation", hint: "효명세자는 순조의 아들, 철종은 전계대원군의 아들, 흥선대원군은 남연군의 아들입니다." },
      { ko: "헌종·고종", en: "Same generation", hint: "헌종은 효명세자의 아들, 고종은 흥선대원군의 아들입니다. 부자가 아닙니다." },
      { ko: "순종", en: "Sunjong", hint: "고종과 명성황후의 아들이고 마지막 황제입니다." },
    ]),
    [
      { id: "js-taejo", ko: "태조", english: "Yi Seong-gye", ...at(0, 3.6), slug: "taejo", dates: "1대 · 1392–1398", summary: "이성계입니다. 1392년 조선을 열고 1394년 한양으로 도읍을 옮깁니다. 고려 태조 왕건과 다른 사람입니다.", aliases: ["이성계", "조선 태조", "Taejo", "Yi Seong-gye"] },
      { id: "js-sinui", ko: "신의왕후", english: "Queen Sinui", ...at(0, 4.8), dates: "한씨 · 태종의 어머니", summary: "태조의 왕비 한씨입니다. 정종과 태종의 어머니입니다.", aliases: ["신의왕후", "Sinui"] },
      { id: "js-jeongjong", ko: "정종", english: "Jeongjong", ...at(1, 2.4), dates: "2대 · 1398–1400", summary: "태조와 신의왕후의 아들 이방과입니다. 아우 태종에게 왕위를 넘깁니다.", aliases: ["이방과", "정종", "Jeongjong"] },
      { id: "js-taejong", ko: "태종", english: "Taejong", ...at(1, 3.6), dates: "3대 · 1400–1418", summary: "태조와 신의왕후의 아들 이방원입니다. 정종의 아우이고 세종의 아버지입니다.", aliases: ["이방원", "태종", "Taejong"] },
      { id: "js-wongyeong", ko: "원경왕후", english: "Queen Wongyeong", ...at(1, 4.8), dates: "민씨 · 세종의 어머니", summary: "태종의 왕비 민씨입니다. 양녕대군과 세종의 어머니입니다.", aliases: ["원경왕후", "Wongyeong"] },
      { id: "js-yangnyeong", ko: "양녕대군", english: "Yangnyeong", ...at(2, 2.4), dates: "세자에서 폐위", summary: "태종과 원경왕후의 맏아들입니다. 세자였으나 물러나고, 아우 세종이 왕이 됩니다.", aliases: ["양녕대군", "Yangnyeong"] },
      { id: "js-sejong", ko: "세종", english: "Sejong", ...at(2, 3.6), slug: "sejong", dates: "4대 · 1418–1450", summary: "태종과 원경왕후의 아들 이도입니다. 훈민정음을 만든 왕입니다. 문종과 세조의 아버지입니다.", aliases: ["세종대왕", "충녕대군", "이도", "Sejong"] },
      { id: "js-soheon", ko: "소헌왕후", english: "Queen Soheon", ...at(2, 4.8), dates: "심씨 · 문종·세조의 어머니", summary: "세종의 왕비 심씨입니다. 문종과 세조의 어머니입니다.", aliases: ["소헌왕후", "Soheon"] },
      { id: "js-munjong", ko: "문종", english: "Munjong", ...at(3, 1.2), dates: "5대 · 1450–1452", summary: "세종과 소헌왕후의 아들입니다. 단종의 아버지이고, 세조의 형입니다.", aliases: ["문종", "Munjong"] },
      { id: "js-hyeondeok", ko: "현덕왕후", english: "Queen Hyeondeok", ...at(3, 2.4), dates: "권씨 · 단종의 어머니", summary: "문종의 왕비 권씨입니다. 단종을 낳고 문종이 즉위하기 전에 죽습니다.", aliases: ["현덕왕후", "Hyeondeok"] },
      { id: "js-sejo", ko: "세조", english: "Sejo", ...at(3, 4.8), dates: "7대 · 1455–1468", summary: "세종과 소헌왕후의 아들 이유입니다. 조카 단종을 몰아내고 왕이 됩니다. 단종의 아버지는 아닙니다.", aliases: ["세조", "수양대군", "Sejo"] },
      { id: "js-jeonghui", ko: "정희왕후", english: "Queen Jeonghui", ...at(3, 6.0), dates: "윤씨 · 예종의 어머니", summary: "세조의 왕비 윤씨입니다. 의경세자와 예종의 어머니입니다.", aliases: ["정희왕후", "Jeonghui"] },
      { id: "js-danjong", ko: "단종", english: "Danjong", ...at(4, 1.2), dates: "6대 · 1452–1455", summary: "문종과 현덕왕후의 아들입니다. 숙부 세조에게 왕위를 빼앗기고 아들이 없습니다.", aliases: ["단종", "Danjong"] },
      { id: "js-uigyeong", ko: "의경세자", english: "Uigyeong", ...at(4, 4.8), dates: "세자 · 1438–1457", summary: "세조와 정희왕후의 아들입니다. 왕위에 오르기 전에 죽고, 뒤에 덕종으로 추존됩니다. 성종의 아버지입니다.", aliases: ["의경세자", "덕종", "Uigyeong", "Deokjong"] },
      { id: "js-sohye", ko: "소혜왕후", english: "Queen Sohye", ...at(4, 6.0), dates: "한씨 · 성종의 어머니", summary: "의경세자의 빈 한씨이고 인수대비로 알려져 있습니다. 성종의 어머니입니다.", aliases: ["소혜왕후", "인수대비", "Sohye"] },
      { id: "js-yejong", ko: "예종", english: "Yejong", ...at(4, 7.2), dates: "8대 · 1468–1469", summary: "세조와 정희왕후의 아들입니다. 일찍 죽어 아들이 왕위를 잇지 못하고, 조카 성종이 다음 왕이 됩니다.", aliases: ["예종", "Yejong"] },
      { id: "js-seongjong", ko: "성종", english: "Seongjong", ...at(5, 4.8), dates: "9대 · 1469–1494", summary: "의경세자와 소혜왕후의 아들입니다. 예종의 아들이 아닙니다. 연산군의 어머니는 폐비 윤씨, 중종의 어머니는 정현왕후입니다.", aliases: ["성종", "Seongjong"] },
      { id: "js-deposed-yun", ko: "폐비 윤씨", english: "Deposed Yun", ...at(5, 6.0), dates: "후궁 출신 · 연산의 어머니", summary: "성종의 왕비였다가 폐위된 윤씨입니다. 연산군의 어머니입니다.", aliases: ["폐비윤씨", "윤씨"] },
      { id: "js-jeonghyeon", ko: "정현왕후", english: "Queen Jeonghyeon", ...at(5, 7.2), dates: "윤씨 · 중종의 어머니", summary: "성종의 왕비 윤씨입니다. 폐비 윤씨와 다른 사람이고, 중종의 어머니입니다.", aliases: ["정현왕후", "Jeonghyeon"] },
      { id: "js-yeonsangun", ko: "연산군", english: "Yeonsangun", ...at(6, 4.8), slug: "yeonsangun", dates: "10대 · 1494–1506", summary: "성종과 폐비 윤씨의 아들입니다. 1506년 중종반정으로 쫓겨나 묘호가 없습니다.", aliases: ["연산군", "Yeonsangun"] },
      { id: "js-jungjong", ko: "중종", english: "Jungjong", ...at(6, 6.6), dates: "11대 · 1506–1544", summary: "성종과 정현왕후의 아들입니다. 연산군의 배다른 아우입니다. 인종·명종·덕흥대원군의 아버지입니다.", aliases: ["중종", "진성대군", "Jungjong"] },
      { id: "js-janggyeong", ko: "장경왕후", english: "Queen Janggyeong", ...at(6, 7.8), dates: "윤씨 · 인종의 어머니", summary: "중종의 왕비 윤씨입니다. 인종의 어머니이고, 문정왕후와는 다른 사람입니다.", aliases: ["장경왕후", "Janggyeong"] },
      { id: "js-munjeong", ko: "문정왕후", english: "Queen Munjeong", ...at(6, 9.0), dates: "윤씨 · 명종의 어머니", summary: "중종의 왕비 윤씨입니다. 명종의 어머니입니다.", aliases: ["문정왕후", "Munjeong"] },
      { id: "js-changbin", ko: "창빈 안씨", english: "Changbin An", ...at(6, 10.2), dates: "후궁 · 덕흥의 어머니", summary: "중종의 후궁 안씨입니다. 왕비가 아니고, 덕흥대원군의 어머니입니다.", aliases: ["창빈안씨", "Changbin"] },
      { id: "js-injong", ko: "인종", english: "Injong", ...at(7, 6.6), dates: "12대 · 1544–1545", summary: "중종과 장경왕후의 아들입니다. 즉위 뒤 곧 죽고 아들이 없습니다.", aliases: ["인종", "Injong"] },
      { id: "js-myeongjong", ko: "명종", english: "Myeongjong", ...at(7, 8.0), dates: "13대 · 1545–1567", summary: "중종과 문정왕후의 아들입니다. 인종의 배다른 아우입니다. 아들이 없어 조카 선조가 잇습니다. 선조의 아버지는 아닙니다.", aliases: ["명종", "Myeongjong"] },
      { id: "js-deokheung", ko: "덕흥대원군", english: "Deokheung", ...at(7, 10.2), dates: "대원군 · 1530–1559", summary: "중종과 창빈 안씨의 아들 이초입니다. 왕이 되지 않았고, 아들 선조가 즉위한 뒤 대원군이 됩니다.", aliases: ["덕흥대원군", "이초", "Deokheung"] },
      { id: "js-hadong", ko: "하동부대부인", english: "Lady Hadong", ...at(7, 11.4), dates: "정씨 · 선조의 어머니", summary: "덕흥대원군의 부인 정씨입니다. 선조의 어머니입니다.", aliases: ["하동부대부인", "Hadong"] },
      { id: "js-seonjo", ko: "선조", english: "Seonjo", ...at(8, 10.2), dates: "14대 · 1567–1608", summary: "덕흥대원군과 하동부대부인의 아들입니다. 명종의 아들이 아닙니다. 광해군의 어머니는 공빈 김씨, 정원군의 어머니는 인빈 김씨입니다.", aliases: ["선조", "하성군", "Seonjo"] },
      { id: "js-gongbin", ko: "공빈 김씨", english: "Gongbin Kim", ...at(8, 11.4), dates: "후궁 · 광해의 어머니", summary: "선조의 후궁 김씨입니다. 왕비가 아니고, 광해군의 어머니입니다.", aliases: ["공빈김씨", "Gongbin"] },
      { id: "js-inbin", ko: "인빈 김씨", english: "Inbin Kim", ...at(8, 12.6), dates: "후궁 · 정원군의 어머니", summary: "선조의 후궁 김씨입니다. 공빈 김씨와 다른 사람이고, 정원군의 어머니입니다.", aliases: ["인빈김씨", "Inbin"] },
      { id: "js-gwanghae", ko: "광해군", english: "Gwanghaegun", ...at(9, 10.2), slug: "gwanghae", dates: "15대 · 1608–1623", summary: "선조와 공빈 김씨의 아들입니다. 1623년 인조반정으로 쫓겨나 묘호가 없습니다. 인조의 아버지는 아닙니다.", aliases: ["광해군", "Gwanghaegun"] },
      { id: "js-jeongwon", ko: "정원군", english: "Wonjong", ...at(9, 12.6), dates: "추존 원종 · 1580–1619", summary: "선조와 인빈 김씨의 아들입니다. 살아 있을 때 왕이 아니었고, 아들 인조가 즉위한 뒤 원종으로 추존됩니다.", aliases: ["정원군", "원종", "Wonjong", "Jeongwon"] },
      { id: "js-inheon", ko: "인헌왕후", english: "Queen Inheon", ...at(9, 13.8), dates: "구씨 · 인조의 어머니", summary: "정원군의 부인 구씨입니다. 인조의 어머니이고, 뒤에 인헌왕후로 추존됩니다.", aliases: ["인헌왕후", "Inheon"] },
      { id: "js-injo", ko: "인조", english: "Injo", ...at(10, 12.6), dates: "16대 · 1623–1649", summary: "정원군과 인헌왕후의 아들입니다. 선조의 손자이고 광해군의 아들이 아닙니다. 소현세자와 효종, 인평대군의 아버지입니다.", aliases: ["인조", "능양군", "Injo"] },
      { id: "js-inyeol", ko: "인열왕후", english: "Queen Inyeol", ...at(10, 13.8), dates: "한씨 · 효종의 어머니", summary: "인조의 왕비 한씨입니다. 소현세자와 효종의 어머니입니다.", aliases: ["인열왕후", "Inyeol"] },
      { id: "js-inpyeong", ko: "인평대군", english: "Inpyeong", ...at(10, 21.6), dates: "인조의 아들 · 왕 아님", summary: "인조와 인열왕후의 아들로 효종의 아우입니다. 고종으로 가는 친가의 먼 조상입니다. 남연군과는 여러 대가 떨어져 …로 빼 두었습니다.", aliases: ["인평대군", "Inpyeong"] },
      { id: "js-sohyeon", ko: "소현세자", english: "Sohyeon", ...at(11, 11.4), dates: "세자 · 1612–1645", summary: "인조와 인열왕후의 맏아들입니다. 세자로 1645년에 죽어서 왕이 되지 못하고, 아우 효종이 잇습니다.", aliases: ["소현세자", "Sohyeon"] },
      { id: "js-hyojong", ko: "효종", english: "Hyojong", ...at(11, 12.6), dates: "17대 · 1649–1659", summary: "인조와 인열왕후의 아들입니다. 형 소현세자가 먼저 죽자 왕이 됩니다.", aliases: ["효종", "봉림대군", "Hyojong"] },
      { id: "js-inseon", ko: "인선왕후", english: "Queen Inseon", ...at(11, 13.8), dates: "장씨 · 현종의 어머니", summary: "효종의 왕비 장씨입니다. 현종의 어머니입니다.", aliases: ["인선왕후", "Inseon"] },
      { id: "js-hyeonjong", ko: "현종", english: "Hyeonjong", ...at(12, 12.6), dates: "18대 · 1659–1674", summary: "효종과 인선왕후의 아들입니다. 숙종의 아버지입니다.", aliases: ["현종", "Hyeonjong"] },
      { id: "js-myeongseong-queen", ko: "명성왕후", english: "Queen Myeongseong", ...at(12, 13.8), dates: "김씨 · 숙종의 어머니", summary: "현종의 왕비 김씨입니다. 숙종의 어머니입니다. 고종의 왕비 명성황후와는 다른 사람입니다.", aliases: ["명성왕후", "Queen Myeongseong"] },
      { id: "js-sukjong", ko: "숙종", english: "Sukjong", ...at(13, 12.6), dates: "19대 · 1674–1720", summary: "현종과 명성왕후의 아들입니다. 경종의 어머니는 희빈 장씨, 영조의 어머니는 숙빈 최씨입니다. 둘 다 왕비가 아닙니다.", aliases: ["숙종", "Sukjong"] },
      { id: "js-huibin", ko: "희빈 장씨", english: "Huibin Jang", ...at(13, 13.8), dates: "후궁 · 경종의 어머니", summary: "숙종의 후궁이고 장희빈으로 알려져 있습니다. 경종의 어머니입니다.", aliases: ["희빈장씨", "장희빈", "Huibin"] },
      { id: "js-sukbin", ko: "숙빈 최씨", english: "Sukbin Choi", ...at(13, 15.0), dates: "후궁 · 영조의 어머니", summary: "숙종의 후궁 최씨입니다. 왕비가 아니고, 영조의 어머니입니다.", aliases: ["숙빈최씨", "Sukbin"] },
      { id: "js-gyeongjong", ko: "경종", english: "Gyeongjong", ...at(14, 12.6), dates: "20대 · 1720–1724", summary: "숙종과 희빈 장씨의 아들입니다. 아들이 없어 배다른 아우 영조가 잇습니다.", aliases: ["경종", "Gyeongjong"] },
      { id: "js-yeongjo", ko: "영조", english: "Yeongjo", ...at(14, 14.4), slug: "yeongjo", dates: "21대 · 1724–1776", summary: "숙종과 숙빈 최씨의 아들 이금입니다. 경종의 배다른 아우입니다. 효장세자의 어머니는 정빈 이씨, 사도세자의 어머니는 영빈 이씨입니다.", aliases: ["영조", "이금", "Yeongjo"] },
      { id: "js-jeongbin", ko: "정빈 이씨", english: "Jeongbin Yi", ...at(14, 15.6), dates: "후궁 · 효장의 어머니", summary: "영조의 후궁 이씨입니다. 1719년 효장세자를 낳습니다.", aliases: ["정빈이씨", "Jeongbin"] },
      { id: "js-yeongbin", ko: "영빈 이씨", english: "Yeongbin Yi", ...at(14, 16.8), dates: "후궁 · 사도의 어머니", summary: "영조의 후궁 이씨입니다. 정빈 이씨와 다른 사람이고, 사도세자의 어머니입니다.", aliases: ["영빈이씨", "Yeongbin"] },
      { id: "js-gap-inpyeong", ko: "…", english: "Gap", ...at(14, 21.6), marker: "gap", dates: "인평의 후손", summary: "인평대군과 남연군 사이를 빼 놓았습니다. 남연군의 친아버지는 이병원이고, 이병원은 인평대군의 5대손으로 전합니다. 이 칸은 부모가 아닙니다." },
      { id: "js-hyojang", ko: "효장세자", english: "Hyojang", ...at(15, 14.4), dates: "세자 · 1719–1728", summary: "영조와 정빈 이씨의 아들입니다. 아홉 살에 죽습니다. 뒤에 진종으로 추존되고, 정조가 법적으로 그의 양자가 됩니다. 정조의 생부는 아닙니다.", aliases: ["효장세자", "진종", "Hyojang", "Jinjo"] },
      { id: "js-sado", ko: "사도세자", english: "Prince Sado", ...at(15, 16.2), slug: "sado", dates: "세자 · 1735–1762", summary: "영조와 영빈 이씨의 아들 이선입니다. 왕이 되지 못했고 1762년 뒤주 안에서 죽습니다. 정조의 생부이고, 은언군·은신군의 아버지입니다.", aliases: ["사도세자", "장헌세자", "이선", "Sado"] },
      { id: "js-haegyeong", ko: "혜경궁", english: "Lady Hong", ...at(15, 17.4), dates: "홍씨 · 정조의 어머니", summary: "사도세자의 빈 홍씨입니다. 정조의 어머니이고, 뒤에 헌경왕후로 추존됩니다.", aliases: ["혜경궁 홍씨", "헌경왕후", "Haegyeong"] },
      { id: "js-euneon", ko: "은언군", english: "Euneon", ...at(15, 19.2), dates: "사도의 아들 · 왕 아님", summary: "사도세자의 아들로 정조의 이복 아우입니다. 전계대원군의 아버지이고 철종의 할아버지입니다.", aliases: ["은언군", "Euneon"] },
      { id: "js-eunsin", ko: "은신군", english: "Eunsin", ...at(15, 20.4), dates: "사도의 아들 · 왕 아님", summary: "사도세자의 아들입니다. 친아들은 없고 남연군을 양자로 들입니다.", aliases: ["은신군", "Eunsin"] },
      { id: "js-jeongjo", ko: "정조", english: "Jeongjo", ...at(16, 16.2), slug: "jeongjo", dates: "22대 · 1776–1800", summary: "사도세자와 혜경궁 홍씨의 아들 이산입니다. 1764년 영조의 명으로 죽은 효장세자의 양자가 되지만, 낳은 아버지는 사도세자입니다.", note: "보라 점선은 효장세자에게 입적된 관계입니다. 생부 선은 금색입니다.", aliases: ["정조", "이산", "Jeongjo"] },
      { id: "js-subin", ko: "수빈 박씨", english: "Subin Park", ...at(16, 17.4), dates: "후궁 · 순조의 어머니", summary: "정조의 후궁 박씨입니다. 순조의 어머니이고, 왕비 효의왕후는 아닙니다.", aliases: ["수빈박씨", "Subin"] },
      { id: "js-sunjo", ko: "순조", english: "Sunjo", ...at(17, 16.2), dates: "23대 · 1800–1834", summary: "정조와 수빈 박씨의 아들입니다. 아들 효명세자가 먼저 죽어 손자 헌종이 잇습니다. 철종을 제사상 아들 대열에 올린 것은 점선입니다.", aliases: ["순조", "Sunjo"] },
      { id: "js-sunwon", ko: "순원왕후", english: "Queen Sunwon", ...at(17, 17.4), dates: "김씨 · 효명세자의 어머니", summary: "순조의 왕비 김씨입니다. 효명세자의 어머니이고, 헌종과 철종이 즉위할 때 왕대비로 결정을 내립니다.", aliases: ["순원왕후", "Sunwon"] },
      { id: "js-jeongye", ko: "전계대원군", english: "Jeongye", ...at(17, 19.2), dates: "대원군 · 철종의 아버지", summary: "은언군의 아들이고 철종의 아버지입니다. 왕이 아닙니다.", aliases: ["전계대원군", "이광", "Jeongye"] },
      { id: "js-yongseong", ko: "용성부대부인", english: "Lady Yongseong", ...at(17, 20.4), dates: "염씨 · 철종의 어머니", summary: "전계대원군의 부인 염씨입니다. 철종의 어머니입니다.", aliases: ["용성부대부인", "Yongseong"] },
      { id: "js-namyeon", ko: "남연군", english: "Namyeon", ...at(17, 21.6), dates: "흥선의 아버지", summary: "친아버지는 이병원입니다. 이병원은 인조의 아들 인평대군의 5대손이라 중간은 …입니다. 양아버지는 사도세자의 아들 은신군입니다. 흥선대원군의 아버지입니다.", note: "은신군으로 향한 점선은 양자입니다. 인평대군으로 향한 점선은 생략한 대수입니다.", aliases: ["남연군", "이구", "Namyeon"] },
      { id: "js-hyomyeong", ko: "효명세자", english: "Hyomyeong", ...at(18, 16.2), dates: "세자 · 1809–1830", summary: "순조와 순원왕후의 아들입니다. 왕위에 오르기 전에 죽고, 뒤에 익종·문조로 추존됩니다. 헌종의 아버지입니다. 고종이 법적으로 그의 양자가 되지만 생부는 아닙니다.", aliases: ["효명세자", "익종", "문조", "Hyomyeong", "Ikjong"] },
      { id: "js-sinjeong", ko: "신정왕후", english: "Queen Sinjeong", ...at(18, 17.4), dates: "조씨 · 헌종의 어머니", summary: "효명세자의 빈 조씨입니다. 헌종의 어머니이고 조대비로 알려져 있습니다. 고려의 신정왕후 황보씨와는 다른 사람입니다.", aliases: ["신정왕후", "조대비", "Sinjeong"] },
      { id: "js-cheoljong", ko: "철종", english: "Cheoljong", ...at(18, 19.2), dates: "25대 · 1849–1863", summary: "전계대원군과 용성부대부인 염씨의 아들입니다. 헌종의 아들이 아닙니다. 순원왕후의 명으로 왕통을 이었고, 제사상 순조를 아버지로 삼은 것은 점선입니다.", note: "생부는 전계대원군입니다.", aliases: ["철종", "이원범", "Cheoljong"] },
      { id: "js-heungseon", ko: "흥선대원군", english: "Heungseon", ...at(18, 21.6), dates: "대원군 · 1820–1898", summary: "남연군의 아들 이하응입니다. 왕이 되지 않았고, 아들 고종이 즉위하면서 대원군이 됩니다.", aliases: ["흥선대원군", "이하응", "Heungseon", "Daewongun"] },
      { id: "js-yeoheung", ko: "여흥부대부인", english: "Lady Yeoheung", ...at(18, 22.8), dates: "민씨 · 고종의 어머니", summary: "흥선대원군의 부인 민씨입니다. 고종의 어머니입니다. 명성황후와는 다른 사람입니다.", aliases: ["여흥부대부인", "Yeoheung"] },
      { id: "js-heonjong", ko: "헌종", english: "Heonjong", ...at(19, 16.2), dates: "24대 · 1834–1849", summary: "효명세자와 신정왕후의 아들입니다. 순조의 손자이고 아들이 없습니다. 철종·고종과 부자가 아닙니다.", aliases: ["헌종", "Heonjong"] },
      { id: "js-gojong", ko: "고종", english: "Gojong", ...at(19, 21.6), dates: "26대 · 1863–1907", summary: "흥선대원군과 여흥부대부인 민씨의 둘째 아들입니다. 철종의 아들이 아닙니다. 신정왕후가 효명세자(익종)의 양자로 삼아 왕통을 잇게 한 것은 점선입니다. 1897년부터 대한제국 황제입니다.", note: "생부는 흥선대원군입니다. 보라 점선은 익종에게 입적된 관계입니다.", aliases: ["고종", "이명복", "이희", "Gojong"] },
      { id: "js-empress", ko: "명성황후", english: "Empress Myeongseong", ...at(19, 22.8), dates: "민씨 · 순종의 어머니", summary: "고종의 왕비 민씨입니다. 순종의 어머니입니다. 현종의 왕비 명성왕후와는 다른 사람입니다.", aliases: ["명성황후", "민비", "Empress Myeongseong"] },
      { id: "js-sunjong", ko: "순종", english: "Sunjong", ...at(20, 21.6), dates: "27대 · 1907–1910", summary: "고종과 명성황후의 아들입니다. 대한제국의 황제로 1907–1910년 자리에 있고, 아들이 없습니다.", aliases: ["순종", "이척", "Sunjong"] },
    ],
    links,
    succession,
  );
}

export const DYNASTIES: Dynasty[] = [gojoseon(), goguryeo(), baekje(), silla(), goryeo(), joseon()];

export const CAVEATS: Caveat[] = [
  {
    id: "gap",
    title: "점선 … 는 생략입니다",
    body: "읽기 쉽게 왕을 뺀 자리입니다. 금색 부자 선이 아니고, 위 사람과 아래 사람이 아버지와 아들이 아닙니다.",
  },
  {
    id: "tradition",
    title: "전승",
    body: "단군, 주몽의 출생, 온조, 박혁거세·석탈해·김알지는 훗날 기록이 전하는 이야기입니다. 부모 선은 보라 점선이고 칸에 전승이라고 적습니다.",
  },
  {
    id: "muryeong",
    title: "무령왕의 아버지",
    body: "삼국사기는 동성왕의 둘째 아들이라고 합니다. 무령왕릉 지석은 523년에 62세로 죽어서 462년생입니다. 어린 동성왕의 아들로 보기 어려워, 실선은 곤지의 아들로 두고 삼국사기 설만 점선으로 남겼습니다.",
  },
  {
    id: "gwanggaeto-years",
    title: "광개토왕의 해",
    body: "칸의 391–412는 광개토왕릉비를 따른 것입니다. 삼국사기는 392–413으로 적습니다. 장수왕은 413–491로 적었습니다.",
  },
  {
    id: "uwang",
    title: "우왕",
    body: "즉위할 때는 공민왕의 아들로 왕위에 올랐습니다. 조선이 선 뒤의 기록은 신돈의 아들이라 하여 왕위에서 지웠습니다. 말이 갈리므로 점선만 두었고, 신돈을 아버지 칸으로 넣지는 않았습니다.",
  },
  {
    id: "adoption",
    title: "양자와 입적",
    body: "정조는 사도세자의 아들로 낳아지고 1764년 효장세자의 양자가 됩니다. 철종은 전계대원군의 아들로 낳아지고 제사상 순조의 아들 대열에 오릅니다. 고종은 흥선대원군의 아들로 낳아지고 익종(효명세자)의 양자로 왕통을 잇습니다. 낳은 아버지는 금색, 법적인 아버지는 보라 점선입니다.",
  },
  {
    id: "namyeon",
    title: "남연군의 두 집",
    body: "친아버지는 이병원이고, 이병원은 인조 아들 인평대군의 5대손입니다. 중간 대수는 …입니다. 양아버지는 사도세자의 아들 은신군입니다.",
  },
  {
    id: "names",
    title: "같은 이름",
    body: "고려 태조는 왕건, 조선 태조는 이성계입니다. 현종의 왕비 명성왕후와 고종의 왕비 명성황후는 다른 사람입니다. 고려의 대종 왕욱(旭)과 안종 왕욱(郁)도 다릅니다. 신라 사도부인은 조선 사도세자가 아닙니다.",
  },
];

const byDynasty = new Map(DYNASTIES.map((item) => [item.id, item]));

export function dynastyById(id: string): Dynasty | undefined {
  return byDynasty.get(id as DynastyId);
}

function personRef(dynasty: Dynasty, id: string): RelationPerson {
  const node = dynasty.tree.byId.get(id);
  if (!node) throw new Error(id);
  return { id: node.id, ko: node.ko, english: node.english, href: node.href };
}

function byX(dynasty: Dynasty) {
  return (a: RelationPerson, b: RelationPerson) =>
    (dynasty.tree.byId.get(a.id)?.x ?? 0) - (dynasty.tree.byId.get(b.id)?.x ?? 0);
}

export function relationsOf(dynastyId: DynastyId, id: string): Relations {
  const dynasty = byDynasty.get(dynastyId);
  if (!dynasty) throw new Error(dynastyId);
  const order = byX(dynasty);
  const pick = (kind: LinkKind, direction: "from" | "to") =>
    dynasty.links
      .filter((link) => link.kind === kind && (direction === "to" ? link.to === id : link.from === id))
      .map((link) => personRef(dynasty, direction === "to" ? link.from : link.to))
      .sort(order);
  const parents = pick("parent", "to");
  const variantParents = pick("variant-parent", "to");
  const adoptiveParents = pick("adoptive", "to");
  const children = pick("parent", "from");
  const variantChildren = pick("variant-parent", "from");
  const adoptiveChildren = pick("adoptive", "from");
  const spouses = dynasty.links
    .filter((link) => link.kind === "spouse" && (link.from === id || link.to === id))
    .map((link) => personRef(dynasty, link.from === id ? link.to : link.from))
    .sort(order);
  const parentIds = new Set(parents.map((person) => person.id));
  const siblingIds = new Set<string>();
  for (const link of dynasty.links) {
    if (link.kind !== "parent" || !parentIds.has(link.from) || link.to === id) continue;
    siblingIds.add(link.to);
  }
  const siblings = [...siblingIds].map((siblingId) => personRef(dynasty, siblingId)).sort(order);
  return { parents, variantParents, adoptiveParents, spouses, children, variantChildren, adoptiveChildren, siblings };
}

export type SearchHit = { dynasty: Dynasty; node: LayoutNode; exact: boolean; prefix: boolean };

export function searchNodes(query: string): LayoutNode[] {
  return searchHits(query).map((hit) => hit.node);
}

export function searchHits(query: string): SearchHit[] {
  const q = norm(query);
  if (!q) return [];
  const hits: SearchHit[] = [];
  for (const item of DYNASTIES) {
    for (const node of item.tree.nodes) {
      if (node.marker === "gap") continue;
      const keys = node.keys.map(norm);
      const exact = keys.some((key) => key === q);
      const prefix = keys.some((key) => key.startsWith(q));
      const hit = exact || prefix || keys.some((key) => key.includes(q));
      if (hit) hits.push({ dynasty: item, node, exact, prefix });
    }
  }
  return hits.sort(
    (a, b) =>
      Number(b.exact) - Number(a.exact) ||
      Number(b.prefix) - Number(a.prefix) ||
      a.node.ko.localeCompare(b.node.ko, "ko"),
  );
}

export function exactFocus(query: string): { dynastyId: DynastyId; id: string } | null {
  const hits = searchHits(query).filter((hit) => hit.exact);
  if (hits.length !== 1) return null;
  return { dynastyId: hits[0].dynasty.id, id: hits[0].node.id };
}

export function findFocus(value: string): { dynastyId: DynastyId; id: string } | null {
  const exact = exactFocus(value);
  if (exact) return exact;
  for (const item of DYNASTIES) {
    if (item.tree.byId.has(value)) return { dynastyId: item.id, id: value };
  }
  const hits = searchHits(value);
  if (hits.length === 1) return { dynastyId: hits[0].dynasty.id, id: hits[0].node.id };
  return null;
}

export function familyTreeHref(slug: string): string | null {
  for (const item of DYNASTIES) {
    const node = item.tree.nodes.find((person) => person.slug === slug);
    if (node) return `/family-tree?dynasty=${item.id}&focus=${node.id}`;
  }
  return null;
}

function assertParent(dynastyId: DynastyId, child: string, parent: string) {
  const item = byDynasty.get(dynastyId)!;
  const ok = item.links.some((link) => link.kind === "parent" && link.from === parent && link.to === child);
  if (!ok) throw new Error(`부자 선 없음: ${parent} → ${child}`);
}

function assertNoParent(dynastyId: DynastyId, child: string, parent: string) {
  const item = byDynasty.get(dynastyId)!;
  const bad = item.links.some((link) => link.kind === "parent" && link.from === parent && link.to === child);
  if (bad) throw new Error(`있으면 안 되는 부자 선: ${parent} → ${child}`);
}

function assertKind(dynastyId: DynastyId, kind: LinkKind, from: string, to: string) {
  const item = byDynasty.get(dynastyId)!;
  const ok = item.links.some((link) => link.kind === kind && link.from === from && link.to === to);
  if (!ok) throw new Error(`${kind} 없음: ${from} → ${to}`);
}

function siblingSet(dynastyId: DynastyId, id: string) {
  return new Set(relationsOf(dynastyId, id).siblings.map((person) => person.id));
}

assertKind("gojoseon", "variant-parent", "gj-hwanung", "gj-dangun");
assertNoParent("gojoseon", "gj-ugeo", "gj-dangun");
assertNoParent("gojoseon", "gj-wiman", "gj-dangun");
assertParent("gojoseon", "gj-son", "gj-wiman");
assertParent("gojoseon", "gj-ugeo", "gj-son");

assertKind("goguryeo", "variant-parent", "gg-jumong", "gg-yuri");
assertParent("goguryeo", "gg-gwanggaeto", "gg-gogukyang");
assertParent("goguryeo", "gg-jangsu", "gg-gwanggaeto");
assertParent("goguryeo", "gg-bojang", "gg-taeyang");
assertNoParent("goguryeo", "gg-bojang", "gg-yeongnyu");
assertNoParent("goguryeo", "gg-gogukwon", "gg-yuri");
assertNoParent("goguryeo", "gg-pyeongwon", "gg-jangsu");
assertNoParent("goguryeo", "gg-gwanggaeto", "gg-sosurim");

assertKind("baekje", "variant-parent", "bj-soseono", "bj-onjo");
assertKind("baekje", "variant-parent", "bj-jumong", "bj-onjo");
assertParent("baekje", "bj-geunchogo", "bj-biryu-wang");
assertParent("baekje", "bj-seong", "bj-muryeong");
assertParent("baekje", "bj-muryeong", "bj-gonji");
assertKind("baekje", "variant-parent", "bj-dongseong", "bj-muryeong");
assertParent("baekje", "bj-uija", "bj-mu");
assertNoParent("baekje", "bj-uija", "bj-seong");
assertNoParent("baekje", "bj-muryeong", "bj-geunchogo");

assertNoParent("silla", "sl-jinheung", "sl-beopheung");
assertParent("silla", "sl-jinheung", "sl-ipjong");
assertParent("silla", "sl-jinheung", "sl-jiso");
assertParent("silla", "sl-jiso", "sl-beopheung");
assertParent("silla", "sl-seondeok", "sl-jinpyeong");
assertParent("silla", "sl-muyol", "sl-yongchun");
assertParent("silla", "sl-muyol", "sl-cheonmyeong");
assertParent("silla", "sl-munmu", "sl-muyol");
assertParent("silla", "sl-munmu", "sl-munmyeong");
assertParent("silla", "sl-munmyeong", "sl-seohyeon");
assertParent("silla", "sl-yusin", "sl-seohyeon");
assertNoParent("silla", "sl-munmu", "sl-seondeok");
assertNoParent("silla", "sl-jijeung", "sl-naemul");
if (!siblingSet("silla", "sl-yusin").has("sl-munmyeong")) throw new Error("김유신과 문명왕후는 남매입니다");

assertParent("goryeo", "gr-gwangjong", "gr-taejo");
assertParent("goryeo", "gr-gwangjong", "gr-sinmyeong");
assertParent("goryeo", "gr-gyeongjong", "gr-daemok");
assertParent("goryeo", "gr-hyeonjong", "gr-anjong");
assertNoParent("goryeo", "gr-hyeonjong", "gr-mokjong");
assertParent("goryeo", "gr-gongmin", "gr-chungsuk");
assertNoParent("goryeo", "gr-chungsuk", "gr-hyeonjong");
assertKind("goryeo", "variant-parent", "gr-gongmin", "gr-u");
assertNoParent("goryeo", "gr-u", "gr-gongmin");

assertParent("joseon", "js-sejong", "js-taejong");
assertParent("joseon", "js-seonjo", "js-deokheung");
assertNoParent("joseon", "js-seonjo", "js-myeongjong");
assertParent("joseon", "js-injo", "js-jeongwon");
assertParent("joseon", "js-jeongwon", "js-seonjo");
assertNoParent("joseon", "js-injo", "js-gwanghae");
assertParent("joseon", "js-yeongjo", "js-sukbin");
assertParent("joseon", "js-sado", "js-yeongjo");
assertParent("joseon", "js-sado", "js-yeongbin");
assertParent("joseon", "js-jeongjo", "js-sado");
assertParent("joseon", "js-jeongjo", "js-haegyeong");
assertKind("joseon", "adoptive", "js-hyojang", "js-jeongjo");
assertNoParent("joseon", "js-jeongjo", "js-hyojang");
assertParent("joseon", "js-sunjo", "js-subin");
assertParent("joseon", "js-heonjong", "js-hyomyeong");
assertParent("joseon", "js-cheoljong", "js-jeongye");
assertNoParent("joseon", "js-cheoljong", "js-heonjong");
assertParent("joseon", "js-gojong", "js-heungseon");
assertParent("joseon", "js-gojong", "js-yeoheung");
assertKind("joseon", "adoptive", "js-hyomyeong", "js-gojong");
assertNoParent("joseon", "js-gojong", "js-cheoljong");
assertParent("joseon", "js-sunjong", "js-gojong");
assertParent("joseon", "js-sunjong", "js-empress");
assertKind("joseon", "gap", "js-inpyeong", "js-gap-inpyeong");
assertNoParent("joseon", "js-namyeon", "js-inpyeong");
assertKind("joseon", "adoptive", "js-eunsin", "js-namyeon");
if (relationsOf("joseon", "js-inpyeong").children.some((person) => person.id === "js-namyeon")) {
  throw new Error("인평대군과 남연군을 부자로 세면 안 됩니다");
}
if (!siblingSet("joseon", "js-jeongjong").has("js-taejong")) throw new Error("정종·태종");
if (!siblingSet("joseon", "js-munjong").has("js-sejo")) throw new Error("문종·세조");
if (siblingSet("joseon", "js-seonjo").has("js-myeongjong")) throw new Error("선조와 명종은 형제가 아닙니다");
if (siblingSet("joseon", "js-gojong").has("js-heonjong")) throw new Error("고종과 헌종은 형제가 아닙니다");

const joseonKings = [
  "js-taejo", "js-jeongjong", "js-taejong", "js-sejong", "js-munjong", "js-danjong", "js-sejo", "js-yejong",
  "js-seongjong", "js-yeonsangun", "js-jungjong", "js-injong", "js-myeongjong", "js-seonjo", "js-gwanghae",
  "js-injo", "js-hyojong", "js-hyeonjong", "js-sukjong", "js-gyeongjong", "js-yeongjo", "js-jeongjo",
  "js-sunjo", "js-heonjong", "js-cheoljong", "js-gojong", "js-sunjong",
];
const joseonTree = byDynasty.get("joseon")!;
if (joseonKings.length !== 27) throw new Error("조선 왕 수가 27이 아닙니다");
for (const id of joseonKings) {
  if (!joseonTree.tree.byId.has(id)) throw new Error(`조선 왕 없음: ${id}`);
}
if (joseonTree.succession?.length !== 27) throw new Error("조선 왕위 순서가 27이 아닙니다");
