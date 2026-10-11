import { battles } from "./battles";
import { films } from "./films";
import type { LinkItem } from "./types";

export type DefenderLane = "general" | "activist";

export type DefenderEraSlug = "goguryeo" | "silla" | "goryeo" | "joseon" | "colonial";

export type DefenderBadge = "역사" | "전승이 섞임" | "평가가 갈림";

export type Defender = {
  slug: string;
  name: string;
  english: string;
  hanja: string;
  lane: DefenderLane;
  era: string;
  eraSlug: DefenderEraSlug;
  years: string;
  sortYear: number;
  opponent: string;
  opponentEnglish: string;
  activity: string;
  battleSlug?: string;
  lede: string;
  strategy: string;
  scene: string;
  memorials: string;
  limit?: string;
  badge: DefenderBadge;
  filmSlugs: string[];
  links: LinkItem[];
};

export const defenderEras: { slug: DefenderEraSlug; label: string; english: string; note: string }[] = [
  {
    slug: "goguryeo",
    label: "고구려",
    english: "Goguryeo",
    note: "평양과 요동은 이 남쪽 지도 밖입니다. 강과 성의 싸움만 적습니다.",
  },
  {
    slug: "silla",
    label: "신라",
    english: "Silla",
    note: "경주가 수도입니다. 김유신은 왕실의 장군이고, 장보고는 청해진의 바다를 맡습니다.",
  },
  {
    slug: "goryeo",
    label: "고려",
    english: "Goryeo",
    note: "거란·여진·몽골·왜구를 상대합니다. 수도 개경도 지도 밖입니다.",
  },
  {
    slug: "joseon",
    label: "조선",
    english: "Joseon",
    note: "세종의 육진, 그리고 임진왜란의 육지와 바다입니다.",
  },
  {
    slug: "colonial",
    label: "일제강점기",
    english: "Colonial period",
    note: "1910년에서 1945년 사이의 독립운동입니다. 평가가 갈리는 사람은 행위와 이후 행로를 나눕니다.",
  },
];

export const lanes = {
  general: { label: "명장", english: "Generals", note: "전장에서 군을 지휘하거나, 말과 무기로 나라의 경계를 지킨 사람입니다." },
  activist: {
    label: "독립운동가",
    english: "Independence activists",
    note: "일제강점기에 독립을 위해 싸운 사람입니다. 전투, 의거, 교육, 망명이 한 방법이 아닙니다.",
  },
} as const;

export const checklistSlugs = [
  "roaring-currents",
  "hansan",
  "noryang",
  "ansi-fortress",
  "bongo-dong",
  "harbin",
  "hero",
  "assassination",
] as const;

export const defenders: Defender[] = [
  {
    slug: "eulji-mundeok",
    name: "을지문덕",
    english: "Eulji Mundeok",
    hanja: "乙支文德",
    lane: "general",
    era: "고구려",
    eraSlug: "goguryeo",
    years: "612년 살수",
    sortYear: 612,
    opponent: "수나라",
    opponentEnglish: "Sui China",
    activity: "살수대첩",
    battleSlug: "salsu",
    lede: "612년, 수나라 별동대가 고구려 깊숙이 들어왔다가 살수에서 무너질 때 이름을 남긴 장수입니다.",
    strategy:
      "수나라 대군은 요동의 성에 묶이고, 별동대만 평양 쪽으로 길어집니다. 보급이 늘어난 군대를 빈 땅으로 끌어들인 뒤, 돌아가는 길을 강에서 칩니다. 살수는 청천강으로 보는 견해가 많습니다. 강은 퇴로를 한 줄로 만듭니다.",
    scene:
      "우중문에게 보낸 글이 삼국사기에 전합니다. 하늘의 계산과 땅의 계산으로 이미 이겼으니 만족하고 돌아가라는 취지입니다. 옛 문장을 여기서 그대로 베끼지는 않습니다.",
    memorials:
      "서울의 을지로는 그의 이름입니다. 군의 훈련 이름에도 을지가 남아 있습니다. 지금 쓰는 지폐나 동전의 초상은 아닙니다.",
    limit:
      "물을 가두었다가 한꺼번에 터뜨렸다는 장면은 뒤에 퍼진 전승입니다. 대군이 거의 남지 않고 돌아갔다는 결과와, 그 전술을 한 장면으로 그린 이야기는 구분합니다. 병력 숫자는 외우지 않습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/battles/salsu", label: "살수대첩 · 어떻게 이겼나" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "ansi-commander",
    name: "안시성 성주",
    english: "Ansi commander",
    hanja: "安市城 城主",
    lane: "general",
    era: "고구려",
    eraSlug: "goguryeo",
    years: "645년 안시성",
    sortYear: 645,
    opponent: "당나라",
    opponentEnglish: "Tang China",
    activity: "안시성 농성",
    lede: "645년 당 태종의 고구려 원정에서 안시성을 지키던 성주입니다. 이름 양만춘은 후대의 전승이라 이 페이지의 제목으로 쓰지 않습니다.",
    strategy:
      "당군은 요동의 다른 성을 떨어뜨리고도 안시성에서 시간이 끌립니다. 성벽과 높은 지형이 농성의 조건입니다. 당 태종이 이 원정에서 안시성을 함락하지 못한 채 돌아간 일이 기록의 결과입니다.",
    scene:
      "성주가 당 태종에게 절을 하거나, 황제가 성주에게 비단을 던졌다는 이야기는 후대에 꾸며진 장면이 많습니다. 영화의 개인 무용도 그 갈래입니다. 전승입니다.",
    memorials:
      "안시성 자리는 오늘의 중국 랴오닝 쪽으로 비정하는 설이 유력합니다. 한국 안의 동상이 그 성의 터는 아닙니다. 지금 쓰는 화폐의 초상도 아닙니다. 양만춘이라는 이름 자체가 전승입니다.",
    limit:
      "성주의 개인 이름은 당과 고구려의 당시 기록에서 확인되지 않습니다. 조선 시대 이후의 역사서가 양만춘이라는 이름을 붙입니다. 농성은 역사이고, 이름은 전승입니다.",
    badge: "전승이 섞임",
    filmSlugs: ["ansi-fortress"],
    links: [
      { href: "/films#ansi-fortress", label: "영화 「안시성」 사실과 창작" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "kim-yu-sin",
    name: "김유신",
    english: "Kim Yu-sin",
    hanja: "金庾信",
    lane: "general",
    era: "신라",
    eraSlug: "silla",
    years: "595–673년",
    sortYear: 660,
    opponent: "백제 · 고구려",
    opponentEnglish: "Baekje and Goguryeo",
    activity: "황산벌과 삼국 전쟁의 신라군",
    lede: "신라의 장군입니다. 왕이 아닙니다. 660년 황산벌에서 백제의 계백을 무너뜨린 전쟁의 신라 쪽 이름입니다.",
    strategy:
      "황산벌은 오늘의 충남 논산 일대로 보는 넓은 들입니다. 계백이 좁은 길목을 지키려 했지만, 신라·당의 수가 그 결사대를 넘습니다. 김유신의 힘은 칼 한 자루보다, 누이가 무열왕의 왕비가 된 집안의 정치와 군사가 같이 움직인 데 있습니다.",
    scene:
      "검과 산신, 신통으로 이겼다는 이야기는 삼국유사 쪽 전승입니다. 전쟁 승리의 해와 구분합니다. 영화 「황산벌」의 사투리 대결은 코미디의 창작입니다.",
    memorials:
      "무덤은 경주에 있습니다. 뒤에 왕으로 추존되어 흥무대왕이라 부르지만, 살아서 왕위에 오르지는 않았습니다. 지금 쓰는 지폐·동전의 초상은 아닙니다.",
    limit:
      "660년 백제가 무너지고 668년 고구려가 무너진 공을 김유신 한 사람에게 몰아주지 않습니다. 무열왕 김춘추와 문무왕, 그리고 당나라 군대가 같은 전쟁의 다른 손입니다. 당은 동맹이었다가 곧 신라의 상대가 됩니다.",
    badge: "역사",
    filmSlugs: ["hwangsanbeol"],
    links: [
      { href: "/rulers/munmu", label: "문무왕" },
      { href: "/rulers/uija", label: "의자왕" },
      { href: "/family-tree?dynasty=silla&focus=sl-yusin", label: "가족관계도의 김유신" },
      { href: "/regions/gyeongsang/gyeongju", label: "경주" },
      { href: "/regions/chungcheong", label: "충청 · 황산벌" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "jang-bo-go",
    name: "장보고",
    english: "Jang Bo-go",
    hanja: "張保皐",
    lane: "general",
    era: "신라",
    eraSlug: "silla",
    years: "청해진 828년 · 846년 죽음",
    sortYear: 828,
    opponent: "해적 · 해상 세력",
    opponentEnglish: "Pirates on the sea lanes",
    activity: "청해진과 황해 항로",
    lede: "완도의 청해진을 기지로 황해의 무역로와 해적을 맡은 신라 사람입니다. 왕이 아닙니다.",
    strategy:
      "청해진은 다도해의 섬입니다. 육지의 성보다 배가 나오는 목이 중요합니다. 당의 산둥 쪽에 신라 사람 마을이 있었고, 장보고는 그 바다의 중간을 군선으로 잡습니다. 해적을 치는 일이 곧 무역로를 여는 일이었습니다.",
    scene:
      "청해진 대사라는 직함으로 바다를 맡았다는 기록이 삼국사기에 있습니다. 신통으로 풍랑을 잠재웠다는 식의 이야기는 전승입니다.",
    memorials:
      "완도에 청해진 유적과 기념관이 있습니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "846년 신라 조정의 정치 속에서 염장에게 암살됩니다. 바다를 연 일과, 중앙 정치에서 죽은 일을 하나의 승리로 합치지 않습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/regions/jeolla", label: "전라도 · 완도" },
      { href: "/eras#unified-silla", label: "통일신라" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "seo-hui",
    name: "서희",
    english: "Seo Hui",
    hanja: "徐熙",
    lane: "general",
    era: "고려",
    eraSlug: "goryeo",
    years: "993년 담판",
    sortYear: 993,
    opponent: "거란 (요)",
    opponentEnglish: "Khitan Liao",
    activity: "소손녕과의 담판 · 강동 6주",
    lede: "993년 거란 장수 소손녕과 담판하여, 싸우지 않고 군대를 돌리게 한 고려의 사람입니다. 승리는 칼이 아니라 말이었습니다.",
    strategy:
      "거란은 고려가 고구려의 옛 땅을 차지했다며 군사의 명분을 듭니다. 서희는 고려가 고구려를 이었다고 받아치고, 송과의 관계를 조율하는 조건을 놓습니다. 상대의 명분을 뒤집는 말이 침공의 이유를 약하게 만듭니다. 지형보다 명분이 전장이었습니다.",
    scene:
      "군영에서 소손녕과 마주 앉아 말한 담판이 고려사에 전하는 핵심 장면입니다. 대사 한 줄 한 줄을 회의록처럼 외우지는 않습니다.",
    memorials:
      "담판의 자리는 북쪽에 가깝습니다. 남쪽의 학교와 길에 그의 이름이 남아 있을 뿐, 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "담판 뒤 고려는 강동 6주, 압록강 동쪽의 요새를 차지합니다. 거란과의 관계가 그것으로 끝난 것은 아닙니다. 1010년과 1018년의 침입, 그리고 강감찬의 귀주대첩이 따로 있습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/gang-gam-chan", label: "강감찬 · 귀주" },
      { href: "/defenders/battles/gwiju", label: "귀주대첩" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "gang-gam-chan",
    name: "강감찬",
    english: "Gang Gam-chan",
    hanja: "姜邯贊",
    lane: "general",
    era: "고려",
    eraSlug: "goryeo",
    years: "948–1031년",
    sortYear: 1019,
    opponent: "거란 (요)",
    opponentEnglish: "Khitan Liao",
    activity: "귀주대첩",
    battleSlug: "gwiju",
    lede: "1019년 귀주에서, 개경을 떨어뜨리지 못하고 돌아가던 거란군을 크게 친 고려의 장수입니다.",
    strategy:
      "거란의 세 번째 큰 침입입니다. 들어오는 길을 흥화진 등에서 깎고, 개경은 따로 지키게 한 뒤, 지쳐 북으로 돌아가는 군대를 귀주에서 막습니다. 귀주는 평안북도 구성 일대입니다. 퇴로와 합류가 승리의 구조입니다.",
    scene:
      "서울 낙성대에서 태어날 때 별이 떨어졌다는 이야기는 전승입니다. 귀주의 승리와 출생 설화를 한 문장에 넣지 않습니다.",
    memorials:
      "서울 관악에 낙성대와 동상이 있습니다. 출생 지명의 유래는 전승입니다. 지금 쓰는 지폐·동전의 초상은 아닙니다.",
    limit:
      "병력과 사상자 숫자는 기록에서 크게 잡혀 있어 여기서 외우지 않습니다. 서희의 담판이 이 전투를 대신하지 않고, 이 전투가 담판을 대신하지도 않습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/battles/gwiju", label: "귀주대첩 · 어떻게 이겼나" },
      { href: "/defenders/seo-hui", label: "서희" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "yun-gwan",
    name: "윤관",
    english: "Yun Gwan",
    hanja: "尹瓘",
    lane: "general",
    era: "고려",
    eraSlug: "goryeo",
    years: "동북 9성 1107–1109년",
    sortYear: 1107,
    opponent: "여진",
    opponentEnglish: "Jurchen",
    activity: "별무반과 동북 9성",
    lede: "기마에 강한 여진을 상대하려고 별무반을 만들고, 1107년 동북 9성을 쌓은 고려의 장수입니다. 그 성은 1109년에 돌려줍니다.",
    strategy:
      "여진은 말이 빠릅니다. 윤관은 보병 중심의 별무반을 따로 훈련해, 기병에게 쫓기기만 하는 진을 바꿉니다. 동북쪽의 길목에 성을 여러 개 두어 사람과 군량을 묶습니다. 지형은 함경도 쪽의 산과 강이라 이 지도 밖입니다.",
    scene:
      "성을 쌓은 해와 돌려준 해가 그의 전기에서 같이 기억되는 장면입니다. 승전의 잔치로만 끝나면 반환이 빠집니다.",
    memorials:
      "동북 9성의 자리는 북쪽입니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "9성을 쌓은 일은 군사적 사실이고, 1109년 여진의 요청과 조정 논의 끝에 성을 돌려준 일도 사실입니다. 반환을 배신으로만 쓰거나, 쌓은 일만으로 침략을 정당화하지 않습니다. 두 해를 같이 적습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [{ href: "https://nadoo-timeline.vercel.app", label: "나두연표" }],
  },
  {
    slug: "kim-yun-hu",
    name: "김윤후",
    english: "Kim Yun-hu",
    hanja: "金允侯",
    lane: "general",
    era: "고려",
    eraSlug: "goryeo",
    years: "1232년 처인성",
    sortYear: 1232,
    opponent: "몽골",
    opponentEnglish: "Mongol Empire",
    activity: "처인성에서 살리타가 죽다",
    lede: "승려였던 사람입니다. 1232년 용인의 처인성에서 몽골 장수 살리타가 죽은 전투의 중심에 고려사가 그의 이름을 적습니다.",
    strategy:
      "처인성은 작은 토성입니다. 몽골의 강점은 말과 포위인데, 성 안의 사람이 지휘관을 잃게 하면 포위의 속도가 흔들립니다. 고려사는 김윤후가 화살로 살리타를 맞혔다고 적습니다. 지형은 경기도의 낮은 성이지 큰 산성이 아닙니다.",
    scene:
      "화살 한 발이 적장을 쓰러뜨리는 장면으로 많이 기억됩니다. 그 한 발이 전투 전체의 기록인 것처럼 단순할 수는 있습니다. 살리타가 이 전투에서 죽은 일과, 화살을 쏜 사람을 김윤후로 적은 고려사를 같이 읽습니다.",
    memorials:
      "용인에 처인성 터가 있습니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "몽골과의 전쟁은 1232년 한 성에서 끝나지 않습니다. 뒤에 강화도 정부가 이어지고, 오랜 침입이 남습니다. 적장 한 사람의 죽음과 전쟁의 끝을 구분합니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/regions/gyeonggi", label: "경기도 · 용인" },
      { href: "https://nadoo-world.vercel.app/countries/mn", label: "나두세계 · 몽골" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "choe-yeong",
    name: "최영",
    english: "Choe Yeong",
    hanja: "崔瑩",
    lane: "general",
    era: "고려",
    eraSlug: "goryeo",
    years: "1316–1388년",
    sortYear: 1376,
    opponent: "왜구",
    opponentEnglish: "Japanese pirates",
    activity: "홍산의 왜구 격퇴",
    lede: "고려 말 왜구를 친 장수입니다. 1376년 홍산이 대표 전투로 기억됩니다. 1388년 위화도 회군 뒤에는 처형됩니다.",
    strategy:
      "왜구는 해안을 타고 들어와 약탈하고 빠집니다. 최영은 상륙한 무리를 내륙의 들에서 막아 배로 돌아가기 전에 칩니다. 홍산은 오늘의 충남 일대입니다. 바다의 추격만이 아니라, 육지에서 발길을 끊는 싸움입니다.",
    scene:
      "아버지 최유청이 황금을 돌같이 보라고 일렀다는 집안의 가르침이 그의 전기에 전합니다. 청렴을 설명하는 일화로 많이 인용됩니다. 전투의 전술과 같은 칸에 두지는 않습니다.",
    memorials:
      "홍산과 그의 이름을 딴 사당·동상이 남쪽에 있습니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "1388년 요동 정벌을 주장한 일과, 이성계가 위화도에서 군을 돌려 그를 제거한 일은 고려 말의 정치입니다. 왜구를 친 전공으로 그 죽음을 덮거나, 죽음으로 전공을 지우지 않습니다. 충신과 역적의 낙인을 이 페이지에서 새로 찍지 않습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/rulers/taejo", label: "태조 이성계 · 위화도" },
      { href: "/regions/chungcheong", label: "충청 · 홍산" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "choe-mu-seon",
    name: "최무선",
    english: "Choe Mu-seon",
    hanja: "崔茂宣",
    lane: "general",
    era: "고려",
    eraSlug: "goryeo",
    years: "화통도감 1377년 · 진포 1380년",
    sortYear: 1377,
    opponent: "왜구",
    opponentEnglish: "Japanese pirates",
    activity: "화약과 진포",
    lede: "고려에서 화약을 만들고 화통도감(1377)을 연 사람입니다. 1380년 진포에서 화포로 왜구 배를 불태웁니다.",
    strategy:
      "왜구의 강점은 빠른 배입니다. 최무선은 배와 배가 모여 있는 하구에서 불의 무기가 퍼지게 합니다. 진포는 금강이 바다로 나가는 자리, 오늘의 군산 일대입니다. 개인이 배에 올라 칼싸움을 한 승리가 아니라, 무기와 물길이 같이 작동한 승리입니다.",
    scene:
      "중국에서 화약의 실마리를 얻어 고려의 기술로 만들었다는 과정이 그의 전기의 앞부분입니다. 만드는 방법은 적지 않습니다. 진포에서 왜구 선단이 불에 탄 결과가 기록의 장면입니다.",
    memorials:
      "진포와 화약 무기를 기억한 기념이 군산 쪽에 있습니다. 아들 최해산이 기술을 잇습니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "화약이 왜구를 모두 끝내지 않습니다. 같은 해 이성계의 황산 싸움처럼 육지의 전투가 따로 있습니다. 무기 하나의 발명으로 고려 말의 정치까지 설명하지 않습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/regions/jeolla", label: "전라도 · 진포" },
      { href: "/rulers/taejo", label: "태조 이성계" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "kim-jong-seo",
    name: "김종서",
    english: "Kim Jong-seo",
    hanja: "金宗瑞",
    lane: "general",
    era: "조선",
    eraSlug: "joseon",
    years: "1383–1453년",
    sortYear: 1434,
    opponent: "여진",
    opponentEnglish: "Jurchen",
    activity: "세종의 6진",
    lede: "세종 때 북쪽 6진을 열어 두만강 쪽으로 고을을 둔 사람입니다. 1453년 계유정난에서 죽습니다.",
    strategy:
      "여진의 마을과 조선의 고을이 겹치는 북쪽에서, 군사를 주둔시키는 성과 행정 고을을 같이 둡니다. 6진은 종성·온성·회령·경원·경흥·부령입니다. 땅은 이 지도 밖입니다. 원정 한 번의 섬멸보다, 사람이 사는 고을로 경계를 고정한 정책입니다. 실행의 이름 중 하나가 김종서입니다.",
    scene:
      "1453년 수양대군 쪽 사람이 그의 집에 든 밤이 말년의 장면으로 남습니다. 실록은 승자의 기록이라는 점을 세종 페이지와 같이 기억합니다. 북방의 전공과 그 밤을 한 줄의 도덕으로 잇지 않습니다.",
    memorials:
      "6진의 자리는 함경도입니다. 지금 쓰는 화폐의 초상은 아닙니다. 지폐 만 원권의 인물은 세종입니다.",
    limit:
      "6진은 세종 조정의 정책이지 김종서 개인의 정복이 아닙니다. 1453년의 죽음은 왕위를 둘러싼 계유정난의 결과입니다. 북방을 연 일과 권력 투쟁에서 죽은 일을 나눕니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/rulers/sejong", label: "세종" },
      { href: "/family-tree?dynasty=joseon&focus=js-sejong", label: "가족관계도의 세종" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "gwak-jae-u",
    name: "곽재우",
    english: "Gwak Jae-u",
    hanja: "郭再祐",
    lane: "general",
    era: "조선",
    eraSlug: "joseon",
    years: "1552–1617년",
    sortYear: 1592.3,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "임진왜란 초기의 의병 · 정암진",
    lede: "1592년 전쟁이 나자 의령에서 의병을 일으킨 사람입니다. 붉은 옷 때문에 홍의장군으로 불립니다.",
    strategy:
      "관군이 밀린 뒤, 그 고을을 아는 사람이 낙동강의 나루를 고릅니다. 정암진은 물이 어디서 얕은지 아는 사람이 유리한 자리입니다. 밤과 매복, 적은 수의 의병이 긴 행군을 끊습니다. 나라 전체의 회전이 아니라 길목의 싸움입니다.",
    scene:
      "붉은 옷을 입어 수가 많아 보이게 했다는 이야기가 홍의장군이라는 이름과 같이 전합니다. 옷의 효과는 일화이고, 나루를 이용한 매복이 전술의 뼈대입니다.",
    memorials:
      "의령 충익사가 그를 기념합니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "의병이 관군을 대신해 전쟁을 전부 이긴 것은 아닙니다. 바다의 이순신, 진주성의 김시민, 행주의 권율과 같은 전쟁의 다른 자리입니다. 그는 전쟁 뒤에도 오래 살아 1617년에 죽습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/battles/imjin-seas", label: "같은 전쟁의 바다" },
      { href: "/defenders/yi-sun-sin", label: "이순신" },
      { href: "/regions/gyeongsang", label: "경상도 · 의령" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "yi-sun-sin",
    name: "이순신",
    english: "Yi Sun-sin",
    hanja: "李舜臣",
    lane: "general",
    era: "조선",
    eraSlug: "joseon",
    years: "1545–1598년",
    sortYear: 1592.5,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "한산 · 명량 · 노량",
    battleSlug: "imjin-seas",
    lede: "임진왜란의 수군 통제사입니다. 왕이 아닙니다. 한산의 넓은 바다, 명량의 좁은 물목, 노량의 퇴로가 그의 세 자리입니다.",
    strategy:
      "한산(1592)은 일본 함대를 넓은 바다로 끌어내 학익진으로 둘러싼 싸움입니다. 명량(1597)은 해남과 진도 사이 울돌목의 빠른 조류를 이용한 싸움입니다. 노량(1598)은 일본군이 물러가는 물목을 막은 싸움입니다. 넓은 바다와 좁은 목은 반대 지형이고, 그는 그 반대에 맞춰 진을 바꿉니다.",
    scene:
      "명량 직전 장계에는, 죽기를 각오한 쪽이 살고 살기만 바라는 쪽이 죽는다는 취지가 있습니다. 문장은 베끼지 않습니다. 노량에서 죽음을 알리지 말라는 마지막 말은 후대 전기의 장면이라 전승으로 둡니다.",
    memorials:
      "지금 쓰는 100원 동전의 앞면이 이순신입니다. 지폐의 인물은 아닙니다. 무덤과 현충사는 충남 아산에 있습니다. 태어난 곳은 한양, 바다는 전라와 남해입니다.",
    limit:
      "1597년 파직과 칠천량의 패배가 명량 앞에 있습니다. 노량의 승리는 그의 죽음과 겹칩니다. 열두 척가량은 남은 조선 배의 취지이고, 일본 배의 척수는 영화 자막과 다릅니다.",
    badge: "역사",
    filmSlugs: ["hansan", "roaring-currents", "noryang"],
    links: [
      { href: "/defenders/battles/imjin-seas", label: "세 해전 · 어떻게 이겼나" },
      { href: "/rulers/yi-sun-sin", label: "왕의 목록 · 이순신" },
      { href: "/regions/jeolla", label: "전라도 · 명량" },
      { href: "/regions/gyeongsang", label: "경상도 · 한산" },
      { href: "/regions/gyeonggi/hanyang", label: "한양" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "kim-si-min",
    name: "김시민",
    english: "Kim Si-min",
    hanja: "金時敏",
    lane: "general",
    era: "조선",
    eraSlug: "joseon",
    years: "1554–1592년",
    sortYear: 1592.8,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "1차 진주성",
    lede: "1592년 진주 목사로서 첫 번째 진주성 전투를 지킵니다. 왜군이 물러난 뒤, 그는 전투의 상처로 곧 죽습니다.",
    strategy:
      "진주성은 남강을 끼고 있습니다. 성벽과 강이 접근을 좁히고, 성 안에서는 미리 준비한 방어로 성벽을 오르는 군대를 막습니다. 들판에서 마주 선 회전이 아니라 성의 농성입니다. 김시민은 목사, 곧 그 고을의 책임자였습니다.",
    scene:
      "성벽 위에서 지휘하다 총에 맞은 일이 그의 죽음의 기록입니다. 상처의 세부를 자극적으로 적지 않습니다. 성이 버틴 결과가 장면의 핵심입니다.",
    memorials:
      "진주성에 그를 기리는 동상과 공간이 있습니다. 촉석루는 성 안의 누각이지, 1593년의 비극과 1592년의 승리를 한 장소의 두 해로 나누어 읽습니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "1593년 두 번째 진주성 전투에서는 성이 함락되고 성 안 사람들이 많이 죽습니다. 김시민은 이미 죽은 뒤입니다. 첫 승리와 이듬해의 함락을 하나의 진주대첩으로 합치지 않습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/battles/imjin-seas", label: "같은 전쟁의 바다" },
      { href: "/regions/gyeongsang", label: "경상도 · 진주" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "gwon-yul",
    name: "권율",
    english: "Gwon Yul",
    hanja: "權慄",
    lane: "general",
    era: "조선",
    eraSlug: "joseon",
    years: "1537–1599년",
    sortYear: 1593,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "행주대첩",
    lede: "1593년 고양의 행주산성에서 일본군을 물리친 조선의 장수입니다. 한강을 끼고 높은 곳을 잡은 싸움입니다.",
    strategy:
      "행주산성은 한강 북쪽의 덕양산입니다. 낮은 강변에서 위로 올라와야 하는 군대에게 언덕이 불리합니다. 권율은 그 높은 곳을 지키며 접근을 막습니다. 탄금대처럼 낮은 곳에서 기병을 맞은 패배와 반대로, 지형의 위아래를 먼저 고릅니다.",
    scene:
      "행주치마가 이 전투에서 돌을 나르던 치마에서 나왔다는 말은 널리 퍼진 전승입니다. 옷 이름의 어원으로는 다른 풀이도 있습니다. 전투의 사실과 옷 이름의 전승을 나눕니다.",
    memorials:
      "고양 행주산성과 충장사가 그를 기념합니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "행주는 한양을 되찾는 과정의 한 전투이지 전쟁의 끝은 아닙니다. 전쟁은 1598년 노량까지 이어집니다. 그의 딸과 이순신의 아들이 혼인했다는 사돈 관계가 전합니다. 두 사람의 전공을 그 혼인으로 설명하지는 않습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/yi-sun-sin", label: "이순신" },
      { href: "/defenders/battles/imjin-seas", label: "임진왜란 주요 해전" },
      { href: "/regions/gyeonggi", label: "경기도 · 행주" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "samyeong",
    name: "사명대사",
    english: "Samyeong",
    hanja: "四溟 · 惟政",
    lane: "general",
    era: "조선",
    eraSlug: "joseon",
    years: "1544–1610년",
    sortYear: 1604,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "승병, 그리고 1604년 일본 사행",
    lede: "임진왜란 때 승병을 이끈 승려 유정입니다. 전쟁 뒤 1604년 일본에 사신으로 가 잡혀간 사람을 돌려보내는 교섭을 합니다.",
    strategy:
      "승병은 절의 조직으로 사람을 모아 산길을 지킵니다. 그의 전쟁 참여는 그 갈래입니다. 더 오래 기억되는 방법은 1604년의 외교입니다. 싸움이 끝난 뒤 포로를 돌려받는 일은 배의 진법과 다른 승리입니다. 몇 명이 돌아왔는지는 기록마다 달라 숫자를 못 박지 않습니다.",
    scene:
      "일본에서 신통력으로 상대를 골탕 먹였다는 이야기는 전승입니다. 기적담과, 사신으로 가서 교섭한 기록을 같은 칸에 두지 않습니다.",
    memorials:
      "밀양 표충사가 그를 모신 절입니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "승병 한 사람이 임진왜란을 끝낸 것은 아닙니다. 바다의 이순신, 육지의 권율·김시민과 역할을 나눕니다. 전승의 신통을 빼도, 사행과 포로 교섭은 남습니다.",
    badge: "전승이 섞임",
    filmSlugs: [],
    links: [
      { href: "/defenders/yi-sun-sin", label: "이순신" },
      { href: "/defenders/battles/imjin-seas", label: "임진왜란 주요 해전" },
      { href: "/regions/gyeongsang", label: "경상도 · 밀양" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "an-chang-ho",
    name: "안창호",
    english: "An Chang-ho",
    hanja: "安昌浩",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1878–1938년",
    sortYear: 1907,
    opponent: "일본의 식민 통치",
    opponentEnglish: "Colonial Japan",
    activity: "신민회 · 흥사단 · 교육",
    lede: "도산 안창호는 학교와 단체를 만들어 사람을 기른 독립운동가입니다. 한 전투의 지휘관으로 기억되는 사람이 아닙니다.",
    strategy:
      "1907년 신민회, 1913년 미국에서 흥사단을 엽니다. 무기는 총이 아니라 정직과 단결을 연습하는 모임입니다. 운동이 한 사람의 용기에만 기대지 않게, 다음 사람을 기르는 전략입니다. 지형보다 학교와 단체의 자리가 그의 전장입니다.",
    scene:
      "거짓말을 하지 말자는 취지의 가르침이 흥사단의 말로 널리 전합니다. 강연의 문장을 여기서 길게 베끼지는 않습니다.",
    memorials:
      "서울 신사동의 도산공원과 기념관이 그를 기억합니다. 지금 쓰는 지폐·동전의 초상은 아닙니다.",
    limit:
      "윤봉길 의거 뒤 붙잡혀 옥살이를 했고, 1938년 병으로 숨집니다. 교육 운동이 그를 감옥 밖에 두지는 못했습니다. 무장 투쟁과 우열을 가리는 페이지가 아닙니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/yun-bong-gil", label: "윤봉길" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "an-jung-geun",
    name: "안중근",
    english: "An Jung-geun",
    hanja: "安重根",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1879–1910년",
    sortYear: 1909,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "1909년 하얼빈",
    lede: "1909년 10월 26일 하얼빈역에서 이토 히로부미를 쏜 사람입니다. 일본 법정은 살인으로 판결하고, 1910년 3월 뤼순에서 처형됩니다.",
    strategy:
      "이토가 러시아 재무대신을 만나러 하얼빈에 내린 짧은 시간이 자리입니다. 역의 플랫폼은 경호가 있어도 한 줄로 지나가는 길입니다. 안중근은 그 거리를 노립니다. 한국의 독립과 동양 평화를 위한 행위라고 그는 진술합니다. 일본 법정은 그 진술을 죄의 이유로 받지 않습니다. 두 문장을 사실의 층위로 나란히 두고, 이 페이지는 새 구호를 만들지 않습니다.",
    scene:
      "거사 전 동지들과 손가락을 잘라 뜻을 모은 일이 있습니다. 옥중에서는 나라를 위해 몸을 바치는 일이 군인의 본분이라는 취지의 글씨를 남긴 일이 전합니다. 글씨 문장을 그대로 베끼지는 않습니다.",
    memorials:
      "서울 남산에 안중근의사기념관이 있습니다. 지금 쓰는 지폐·동전의 초상은 아닙니다.",
    limit:
      "하얼빈은 당시 러시아 동청철도의 역입니다. 재판은 일본이 열었습니다. 영화 「하얼빈」과 「영웅」은 이 사건과 재판을 틀로 삼고, 대사와 노래는 극입니다.",
    badge: "역사",
    filmSlugs: ["harbin", "hero"],
    links: [
      { href: "/films#harbin", label: "영화 「하얼빈」" },
      { href: "/films#hero", label: "영화 「영웅」" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "yi-hoe-yeong",
    name: "이회영",
    english: "Yi Hoe-yeong",
    hanja: "李會榮",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1867–1932년",
    sortYear: 1910,
    opponent: "일본의 식민 통치",
    opponentEnglish: "Colonial Japan",
    activity: "여섯 형제의 망명 · 신흥무관학교",
    lede: "서울의 부유한 집안 여섯 형제가 재산을 정리하고 만주로 가, 독립군을 기르는 학교를 세운 사람입니다. 호는 우당입니다.",
    strategy:
      "한 번의 의거보다, 사람이 훈련받을 자리를 국경 밖에 둡니다. 신흥강습소에서 시작한 신흥무관학교가 그 자리입니다. 돈과 형제를 같이 옮긴 것이 전략입니다. 만주의 땅은 일본의 경찰이 바로 닿기 어려운 거리였습니다. 그 거리도 오래 안전하지는 않았습니다.",
    scene:
      "집안의 전답을 팔아 망명 자금을 만든 일이 그의 전기 앞부분입니다. 부자가 빈손이 되어 국경을 넘은 장면으로 기억됩니다.",
    memorials:
      "서울에 우당 이회영을 기리는 기념관이 있습니다. 동생 이시영은 뒤에 대한민국 부통령을 지냅니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "1932년 다롄에서 일본 경찰에 붙잡혀 숨집니다. 사인은 병으로 알려졌으나 독살 의혹이 남아 있습니다. 의혹을 확정된 사실로 쓰지 않습니다. 학교가 곧 광복은 아니었습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/kim-jwa-jin", label: "김좌진" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "yu-gwan-sun",
    name: "유관순",
    english: "Yu Gwan-sun",
    hanja: "柳寬順",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1902–1920년",
    sortYear: 1919.3,
    opponent: "일본의 식민 통치",
    opponentEnglish: "Colonial Japan",
    activity: "1919년 아우내 만세",
    lede: "3·1 운동 때 천안 아우내 장터의 만세 시위를 이끈 학생입니다. 1920년 서대문감옥에서 숨집니다. 스무 살이 되기 전입니다.",
    strategy:
      "군사 승리가 아닙니다. 아우내 장터는 읍의 사람이 모이는 날의 자리라, 학교 안의 시위가 마을로 퍼지는 입구가 됩니다. 유관순은 이화학당 학생으로 고향의 그 자리를 조직합니다. 무기는 만세와 태극기였습니다.",
    scene:
      "장터에서 만세를 부른 3월의 날이 그를 기억하는 장면입니다. 옥중의 고문은 기록된 일이지만, 고통의 세부를 이 페이지에서 늘어놓지는 않습니다.",
    memorials:
      "천안 병천의 아우내와 유관순열사기념관이 그를 기념합니다. 지금 쓰는 지폐·동전의 초상은 아닙니다.",
    limit:
      "3·1 운동은 유관순 한 사람의 시위가 아닙니다. 서울의 탑골 공원과 전국의 만세가 먼저, 또는 같이 있습니다. 그의 죽음이 그해에 독립을 가져오지는 않았습니다. 어린 희생을 구호로만 쓰지 않기 위해 나이와 장소를 정확히 적습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/timeline", label: "연표에서 1919년 보기" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "kim-gu",
    name: "김구",
    english: "Kim Gu",
    hanja: "金九",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1876–1949년",
    sortYear: 1919.4,
    opponent: "일본의 식민 통치",
    opponentEnglish: "Colonial Japan",
    activity: "임시정부 · 한인애국단",
    lede: "대한민국 임시정부에서 독립운동을 조직한 사람입니다. 호는 백범입니다. 1931년 한인애국단을 만들어 이봉창·윤봉길의 의거를 보냅니다.",
    strategy:
      "국내의 시위만으로 정부가 보이지 않을 때, 망명 정부와 해외의 의거로 독립운동의 이름을 알립니다. 한인애국단은 그 조직입니다. 김구 자신이 폭탄을 던진 것이 아니라, 사람을 고르고 보낸 쪽입니다. 임시정부는 상하이 등지를 옮겨 다닙니다.",
    scene:
      "내가 원하는 나라는 힘만 센 나라가 아니라 문화의 힘을 가진 나라라는 취지를 백범일지에 남깁니다. 책의 문장을 여기서 길게 베끼지는 않습니다.",
    memorials:
      "서울 효창공원에 묘가 있고, 백범김구기념관이 있습니다. 경교장은 1949년 그가 숨진 자리입니다. 지금 쓰는 지폐·동전의 초상은 아닙니다.",
    limit:
      "1945년 이후 그는 단독정부에 거리를 두고 남북협상에 참여합니다. 그 정치적 선택은 당시에도 논쟁이었습니다. 1949년 6월 경교장에서 안두희에게 피살됩니다. 암살의 배후를 이 페이지에서 단정하지 않습니다. 영화 「암살」의 작전은 그의 실제 의거가 아닙니다.",
    badge: "역사",
    filmSlugs: ["assassination"],
    links: [
      { href: "/defenders/yi-bong-chang", label: "이봉창" },
      { href: "/defenders/yun-bong-gil", label: "윤봉길" },
      { href: "/films#assassination", label: "영화 「암살」 사실과 창작" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "kim-won-bong",
    name: "김원봉",
    english: "Kim Won-bong",
    hanja: "金元鳳",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1898–1950년대",
    sortYear: 1919.95,
    opponent: "일본의 식민 통치",
    opponentEnglish: "Colonial Japan",
    activity: "의열단 · 조선의용대",
    lede: "1919년 지린에서 의열단을 만든 사람입니다. 식민 기관과 고위 인사를 겨냥한 의열 투쟁을 조직합니다. 1948년 북으로 갑니다.",
    strategy:
      "시위와 학교와 다른 방법입니다. 의열단은 적은 수의 사람이 식민 통치의 상징을 쳐, 통치가 안전하지 않다는 것을 보이게 합니다. 1938년에는 조선의용대를 만들고, 태평양전쟁 말기에는 그 무장의 일부가 임시정부 광복군과 만납니다. 수단의 만드는 법은 적지 않습니다.",
    scene:
      "신채호가 의열단을 위해 쓴 조선혁명선언(1923)이 이 조직의 문장으로 남습니다. 선언의 전문을 여기에 옮기지 않습니다. 영화 「암살」에서 그는 실존 인물로 나오지만, 극의 암살 작전은 창작입니다.",
    memorials:
      "밀양이 태어난 곳입니다. 의열단을 기리는 연구와 기념이 있고, 북에서의 행로 때문에 기념의 평가가 갈립니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "의열단을 만든 일과, 1948년 이후 북한에서 직책을 맡은 일은 둘 다 그의 생애입니다. 어느 한쪽만 지워 영웅이나 반역으로 확정하지 않습니다. 1950년대에 숙청된 것으로 전합니다. 죽은 해는 공개 기록이 뚜렷하지 않아 단정하지 않습니다.",
    badge: "평가가 갈림",
    filmSlugs: ["assassination"],
    links: [
      { href: "/defenders/sin-chae-ho", label: "신채호 · 조선혁명선언" },
      { href: "/films#assassination", label: "영화 「암살」" },
      { href: "/regions/gyeongsang", label: "경상도 · 밀양" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "hong-beom-do",
    name: "홍범도",
    english: "Hong Beom-do",
    hanja: "洪範圖",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1868–1943년",
    sortYear: 1920.6,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "봉오동 전투",
    battleSlug: "cheongsanri",
    lede: "1920년 6월 봉오동에서 독립군 연합 부대를 이긴 대표 지휘관입니다. 말년은 소련 땅에서 보냈고, 유해는 2021년 한국으로 돌아옵니다.",
    strategy:
      "봉오동은 두만강 북쪽, 오늘의 중국 지린 왕칭 쪽 골짜기입니다. 일본군을 좁은 계곡으로 들여보낸 뒤 높은 곳에서 칩니다. 지형을 아는 매복입니다. 홍범도 한 부대만의 싸움이 아니라 여러 독립군의 연합입니다.",
    scene:
      "포수 출신으로 산을 아는 지휘관이라는 점이 봉오동의 장면과 맞습니다. 영화 「봉오동 전투」의 개인 사연은 극이고, 골짜기의 승리는 역사입니다.",
    memorials:
      "1943년 카자흐스탄 크질오르다에서 죽습니다. 유해는 2021년 돌아와 대전현충원에 안장됩니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "1921년 자유시에서 독립군 부대 사이에 충돌이 있은 뒤, 그는 소련에 남습니다. 적군에 몸담은 시기가 있습니다. 봉오동의 승리와 말년의 행로는 따로 읽습니다. 어느 쪽 구호로 다른 쪽을 지우지 않습니다. 청산리(10월)의 중심 지휘관은 김좌진입니다.",
    badge: "평가가 갈림",
    filmSlugs: ["bongo-dong"],
    links: [
      { href: "/defenders/battles/cheongsanri", label: "청산리·봉오동 · 어떻게 이겼나" },
      { href: "/defenders/kim-jwa-jin", label: "김좌진" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "kim-jwa-jin",
    name: "김좌진",
    english: "Kim Jwa-jin",
    hanja: "金佐鎭",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1889–1930년",
    sortYear: 1920.91,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "청산리 전투",
    battleSlug: "cheongsanri",
    lede: "북로군정서를 이끌고 1920년 10월 청산리에서 일본군과 싸운 지휘관입니다. 1930년 북만주에서 피살됩니다.",
    strategy:
      "청산리는 백두산 서쪽 산악의 여러 마을에서 여러 날 이어진 싸움입니다. 백운평, 어랑촌 같은 이름이 따로 있습니다. 산길을 아는 쪽이 추격군을 나누고, 나뉜 부대를 각각 칩니다. 중심 부대는 김좌진의 북로군정서이고, 홍범도의 부대도 함께한 날이 있습니다.",
    scene:
      "집안의 노비를 해방한 일이 전쟁 이전의 그의 전기에 있습니다. 청산리의 지휘와 그 해방을 같은 업적으로 포장하지 않고, 둘 다 사실로 적습니다.",
    memorials:
      "청산리를 기념하는 사업과 묘소 관련 기억이 한국에 있습니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "사상자 수는 한국과 일본의 기록이 달라 못 박지 않습니다. 1930년 북만주에서 피살됩니다. 누가 시켰는지는 기록마다 강조가 다릅니다. 영화 「봉오동 전투」는 그해 6월의 다른 싸움이라 청산리의 영화가 아닙니다.",
    badge: "역사",
    filmSlugs: ["bongo-dong"],
    links: [
      { href: "/defenders/battles/cheongsanri", label: "청산리·봉오동 · 어떻게 이겼나" },
      { href: "/defenders/hong-beom-do", label: "홍범도" },
      { href: "/films#bongo-dong", label: "영화 「봉오동 전투」는 다른 싸움" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "sin-chae-ho",
    name: "신채호",
    english: "Sin Chae-ho",
    hanja: "申采浩",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1880–1936년",
    sortYear: 1923,
    opponent: "일본의 식민 통치",
    opponentEnglish: "Colonial Japan",
    activity: "역사 서술 · 조선혁명선언",
    lede: "역사와 글로 독립운동에 참여한 사람입니다. 1923년 의열단을 위한 조선혁명선언을 씁니다. 1936년 뤼순 감옥에서 숨집니다.",
    strategy:
      "그는 역사를 나(아)와 나가 아닌 것(비아)의 투쟁으로 보자고 했습니다. 잊힌 고대를 다시 쓰는 일이, 식민 통치가 만든 역사와 다른 이야기를 세우는 방법이었습니다. 1923년 선언은 그 생각을 의열단의 행동과 연결합니다. 총의 지휘관은 아닙니다.",
    scene:
      "‘역사를 잊은 민족에게 미래는 없다’는 문장은 그에게 많이 돌립니다. 그의 글에서 그 문장 그대로가 확인되지 않는다는 지적이 있어, 이 사이트는 전승으로 둡니다. 확인되는 취지는 아와 비아의 투쟁입니다.",
    memorials:
      "충남 대덕이 태어난 곳과 연결되어 기념됩니다. 지금 쓰는 화폐의 초상은 아닙니다. 그의 고대 서술은 영향이 크고, 오늘 역사학에서는 민족주의 서술에 가깝다고 토론됩니다.",
    limit:
      "1928년 붙잡혀 뤼순 감옥에 갇혔고 1936년 그 안에서 숨집니다. 조선상고사의 주장을 모두 사실로 승격하지 않습니다. 선언의 전문과 고대사의 문장은 옮기지 않습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/kim-won-bong", label: "김원봉 · 의열단" },
      { href: "/sources", label: "이 사이트의 출처 기준" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "yi-bong-chang",
    name: "이봉창",
    english: "Yi Bong-chang",
    hanja: "李奉昌",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1901–1932년",
    sortYear: 1932.1,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "1932년 도쿄",
    lede: "1932년 1월 8일 도쿄에서 일왕의 행렬에 폭탄을 던진 사람입니다. 일왕은 다치지 않았습니다. 그해 처형됩니다.",
    strategy:
      "김구의 한인애국단이 보낸 의거입니다. 자리는 도쿄의 거리, 왕이 지나는 짧은 시간입니다. 경호가 두꺼운 행렬의 한 점을 노린 일입니다. 결과는 실패입니다. 실패를 승리로 다시 쓰지 않습니다. 다만 임시정부의 이름이 이 사건으로 더 알려졌다는 효과는 결과와 따로 적습니다.",
    scene:
      "거사 전 태극기 앞에서 찍은 사진이 그의 얼굴로 많이 남습니다. 사진 속의 각오와, 당일 일왕이 무사했던 결과를 둘 다 적습니다.",
    memorials:
      "서울 효창공원에 묘가 있습니다. 윤봉길·김구의 묘와 같은 공원입니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "일왕은 다치지 않았습니다. 영화 「암살」은 이 도쿄의 의거가 아닙니다. 폭탄의 만드는 법은 적지 않습니다.",
    badge: "역사",
    filmSlugs: [],
    links: [
      { href: "/defenders/kim-gu", label: "김구 · 한인애국단" },
      { href: "/defenders/yun-bong-gil", label: "윤봉길" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "yun-bong-gil",
    name: "윤봉길",
    english: "Yun Bong-gil",
    hanja: "尹奉吉",
    lane: "activist",
    era: "일제강점기",
    eraSlug: "colonial",
    years: "1908–1932년",
    sortYear: 1932.4,
    opponent: "일본",
    opponentEnglish: "Japan",
    activity: "1932년 상하이 훙커우 공원",
    lede: "1932년 4월 29일 상하이 훙커우 공원의 기념식에 폭탄을 던진 사람입니다. 일본군 수뇌가 죽거나 다칩니다. 그해 처형됩니다.",
    strategy:
      "자리는 일왕의 생일 기념식이 열린 공원, 단상 앞의 가까운 거리입니다. 많은 장성이 한곳에 모인 시간이 목표입니다. 김구의 한인애국단이 조직합니다. 도시락과 물통처럼 보이게 한 물건에 폭탄을 숨겼다는 것이 당시의 방법입니다. 만드는 법은 적지 않습니다.",
    scene:
      "거사 당일 아침의 다짐이 사진과 함께 전합니다. 식장에서 폭탄이 터지고, 시라카와 대장이 상처로 죽은 일이 결과입니다. 영화의 암살 작전과 이 공원의 의거를 같은 사건으로 외우지 않습니다.",
    memorials:
      "서울 양재의 매헌 윤봉길의사기념관, 그리고 효창공원의 묘가 그를 기념합니다. 지금 쓰는 화폐의 초상은 아닙니다.",
    limit:
      "의거는 상하이의 일본군 지휘부를 쳤고, 한국의 독립이 그달 이루어진 것은 아닙니다. 의거 뒤 안창호를 포함한 많은 사람이 붙잡힙니다. 성공한 타격과, 그 뒤의 탄압을 같이 적습니다.",
    badge: "역사",
    filmSlugs: ["assassination"],
    links: [
      { href: "/defenders/kim-gu", label: "김구" },
      { href: "/defenders/yi-bong-chang", label: "이봉창" },
      { href: "/films#assassination", label: "영화 「암살」은 다른 작전" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
];

export function defenderBySlug(slug: string): Defender | undefined {
  return defenders.find((person) => person.slug === slug);
}

export function defendersByLane(lane: DefenderLane): Defender[] {
  return defenders.filter((person) => person.lane === lane).sort((a, b) => a.sortYear - b.sortYear);
}

export function defendersByEra(era: DefenderEraSlug): Defender[] {
  return defenders.filter((person) => person.eraSlug === era).sort((a, b) => a.sortYear - b.sortYear);
}

const filmSlugs = new Set(films.map((film) => film.slug));
const battleSlugs = new Set(battles.map((battle) => battle.slug));
const seen = new Set<string>();

for (const person of defenders) {
  if (seen.has(person.slug)) throw new Error(`중복된 인물 주소: ${person.slug}`);
  seen.add(person.slug);
  for (const slug of person.filmSlugs) {
    if (!filmSlugs.has(slug)) throw new Error(`없는 영화: ${person.slug} → ${slug}`);
  }
  if (person.battleSlug && !battleSlugs.has(person.battleSlug)) {
    throw new Error(`없는 전투: ${person.slug} → ${person.battleSlug}`);
  }
}

for (const slug of checklistSlugs) {
  if (!filmSlugs.has(slug)) throw new Error(`체크리스트에 없는 영화: ${slug}`);
}

if (defenders.filter((person) => person.lane === "general").length !== 16) {
  throw new Error("명장은 16명이어야 합니다");
}
if (defenders.filter((person) => person.lane === "activist").length !== 11) {
  throw new Error("독립운동가는 11명이어야 합니다");
}
