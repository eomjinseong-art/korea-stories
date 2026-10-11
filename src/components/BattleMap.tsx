function Frame({
  slug,
  title,
  desc,
  children,
}: {
  slug: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 360 280"
      role="img"
      aria-labelledby={`${slug}-title ${slug}-desc`}
      className="battle-map h-auto w-full rounded-lg border border-line bg-card font-sans"
    >
      <title id={`${slug}-title`}>{title}</title>
      <desc id={`${slug}-desc`}>{desc}</desc>
      <rect width="360" height="280" fill="#fbf7f2" />
      {children}
    </svg>
  );
}

function SalsuMap() {
  return (
    <Frame
      slug="salsu"
      title="살수대첩 모식도"
      desc="북쪽 요동에서 내려온 수나라 별동대가 평양 방향으로 들어왔다가, 살수를 건너 돌아갈 때 고구려군이 강변에서 친 그림입니다. 축척은 없습니다."
    >
      <text x="180" y="28" textAnchor="middle" fontSize="13" fill="#6e6258">
        북 · 요동 (수나라 출발)
      </text>
      <path d="M120 44 V100" stroke="#a34732" strokeWidth="2" fill="none" />
      <path d="M114 92 L120 104 L126 92" fill="#a34732" />
      <text x="136" y="78" fontSize="12" fill="#a34732">
        별동대가 깊숙이 들어옴
      </text>
      <rect x="24" y="118" width="312" height="44" rx="8" fill="#d5e4ea" />
      <text x="180" y="145" textAnchor="middle" fontSize="14" fill="#241c16">
        살수 · 돌아갈 때 친 자리
      </text>
      <path d="M70 162 V210" stroke="#2f4a3c" strokeWidth="2" fill="none" />
      <path d="M64 170 L70 158 L76 170" fill="#2f4a3c" />
      <text x="84" y="190" fontSize="12" fill="#2f4a3c">
        고구려군이 퇴로를 막음
      </text>
      <text x="180" y="248" textAnchor="middle" fontSize="13" fill="#6e6258">
        남 · 평양 방향
      </text>
      <text x="180" y="268" textAnchor="middle" fontSize="11" fill="#6e6258">
        평양과 살수는 이 남쪽 지도 밖
      </text>
    </Frame>
  );
}

function GwijuMap() {
  return (
    <Frame
      slug="gwiju"
      title="귀주대첩 모식도"
      desc="거란군이 북쪽에서 개경 쪽으로 내려왔다가, 성을 떨어뜨리지 못하고 돌아가던 길을 귀주에서 고려군이 막은 그림입니다. 축척은 없습니다."
    >
      <text x="180" y="28" textAnchor="middle" fontSize="13" fill="#6e6258">
        북 · 요 (거란)
      </text>
      <path d="M250 42 C220 90, 200 140, 168 168" stroke="#a34732" strokeWidth="2" fill="none" strokeDasharray="5 4" />
      <text x="262" y="64" fontSize="12" fill="#a34732">
        들어옴
      </text>
      <circle cx="150" cy="124" r="36" fill="#e9e1d4" stroke="#2f4a3c" strokeWidth="2" />
      <text x="150" y="120" textAnchor="middle" fontSize="13" fill="#241c16">
        귀주
      </text>
      <text x="150" y="138" textAnchor="middle" fontSize="11" fill="#2f4a3c">
        퇴로를 막음
      </text>
      <path d="M120 168 C80 190, 70 210, 90 236" stroke="#2f4a3c" strokeWidth="2" fill="none" />
      <path d="M84 226 L92 240 L100 226" fill="#2f4a3c" />
      <text x="180" y="248" textAnchor="middle" fontSize="13" fill="#6e6258">
        남 · 개경 (함락되지 않음)
      </text>
      <text x="180" y="268" textAnchor="middle" fontSize="11" fill="#6e6258">
        개경과 귀주도 이 지도 밖
      </text>
    </Frame>
  );
}

function ImjinMap() {
  return (
    <Frame
      slug="imjin"
      title="임진왜란 해전 모식도"
      desc="한반도 남해의 모식도입니다. 오른쪽 한산은 1592년 넓은 바다, 왼쪽 명량은 1597년 좁은 물목, 가운데 아래 노량은 1598년 퇴로입니다. 축척은 없습니다."
    >
      <path
        d="M70 36 L230 28 C290 40 318 86 292 128 L236 156 L150 164 L78 132 C42 104 40 58 70 36 Z"
        fill="#e9e1d4"
        stroke="#241c16"
        strokeWidth="1.4"
      />
      <text x="168" y="96" textAnchor="middle" fontSize="13" fill="#241c16">
        남해 연안
      </text>
      <text x="250" y="70" textAnchor="end" fontSize="12" fill="#6e6258">
        부산에서 서진
      </text>
      <path d="M268 118 H210" stroke="#a34732" strokeWidth="2" fill="none" />
      <path d="M218 112 L206 118 L218 124" fill="#a34732" />
      <circle cx="300" cy="118" r="6" fill="#2f4a3c" />
      <text x="292" y="108" textAnchor="end" fontSize="12" fill="#2f4a3c">
        한산 1592 · 넓은 바다
      </text>
      <circle cx="176" cy="210" r="6" fill="#2f4a3c" />
      <text x="188" y="214" fontSize="12" fill="#2f4a3c">
        노량 1598 · 물러가는 길
      </text>
      <rect x="36" y="168" width="16" height="26" rx="3" fill="#e9e1d4" stroke="#241c16" />
      <rect x="66" y="160" width="14" height="34" rx="3" fill="#e9e1d4" stroke="#241c16" />
      <path d="M52 182 H66" stroke="#2f4a3c" strokeWidth="3" />
      <text x="24" y="154" fontSize="12" fill="#2f4a3c">
        명량 1597 · 좁은 물목
      </text>
      <text x="180" y="266" textAnchor="middle" fontSize="11" fill="#6e6258">
        축척 없는 모식도 · 세 해전은 다른 자리
      </text>
    </Frame>
  );
}

function CheongsanriMap() {
  return (
    <Frame
      slug="cheongsanri"
      title="청산리와 봉오동 모식도"
      desc="두만강 북쪽 간도의 모식도입니다. 강에 가까운 봉오동은 1920년 6월, 더 북쪽 산악의 청산리는 1920년 10월입니다. 축척은 없습니다."
    >
      <path d="M40 48 L70 78 L100 46 L130 80 L160 50 L190 82 L230 48 L260 76 L300 52 L320 86 L300 100 L40 100 Z" fill="#c9d3b8" />
      <text x="180" y="78" textAnchor="middle" fontSize="13" fill="#241c16">
        청산리 · 10월 · 여러 날의 산악
      </text>
      <path d="M48 150 L86 118 L124 154 L170 116 L214 156 L260 120 L312 152 L300 176 L48 176 Z" fill="#d5e0c8" />
      <text x="180" y="158" textAnchor="middle" fontSize="13" fill="#241c16">
        봉오동 · 6월 · 골짜기
      </text>
      <rect x="0" y="198" width="360" height="22" fill="#d5e4ea" />
      <text x="180" y="214" textAnchor="middle" fontSize="12" fill="#241c16">
        두만강
      </text>
      <text x="180" y="240" textAnchor="middle" fontSize="13" fill="#6e6258">
        남 · 조선
      </text>
      <path d="M70 250 V200" stroke="#a34732" strokeWidth="2" fill="none" />
      <path d="M64 210 L70 198 L76 210" fill="#a34732" />
      <text x="84" y="232" fontSize="12" fill="#a34732">
        일본군이 북으로 들어옴
      </text>
    </Frame>
  );
}

export function BattleMap({ slug }: { slug: string }) {
  if (slug === "salsu") return <SalsuMap />;
  if (slug === "gwiju") return <GwijuMap />;
  if (slug === "imjin-seas") return <ImjinMap />;
  if (slug === "cheongsanri") return <CheongsanriMap />;
  return null;
}
