import type { LinkItem } from "./types";

export type BattleStep = {
  title: string;
  text: string;
};

export type Battle = {
  slug: string;
  name: string;
  english: string;
  year: string;
  era: string;
  lede: string;
  steps: BattleStep[];
  people: { slug: string; label: string }[];
  filmSlugs: string[];
  links: LinkItem[];
};

export const battles: Battle[] = [
  {
    slug: "salsu",
    name: "살수대첩",
    english: "Battle of Salsu",
    year: "612년",
    era: "고구려",
    lede: "수나라의 별동대가 고구려 안쪽까지 들어왔다가, 돌아가는 길에 살수에서 크게 무너진 싸움입니다. 장수는 을지문덕으로 기억됩니다.",
    steps: [
      {
        title: "성이 시간을 벌다",
        text: "612년 수 양제가 대군을 보내 요동의 고구려 성을 칩니다. 요동성과 같은 성들이 쉽게 열리지 않아, 수나라의 본대는 성에 묶입니다. 요동은 이 사이트의 남쪽 지도 밖입니다.",
      },
      {
        title: "별동대가 깊숙이 들어오다",
        text: "우중문과 우문술이 이끄는 별동대는 평양 방향으로 들어옵니다. 길이 길어질수록 밥과 화살이 따라오기 어렵습니다. 고구려는 빈 들과 성으로 그 속도를 늦춥니다.",
      },
      {
        title: "글로 발길을 돌리다",
        text: "을지문덕이 우중문에게 글을 보냈다고 삼국사기는 적습니다. 이미 이길 만큼 이겼으니 돌아가라는 취지입니다. 문장을 여기서 그대로 베끼지는 않습니다. 글 한 통이 군대를 물리친 것은 아니고, 지친 별동대가 돌아서게 한 계기입니다.",
      },
      {
        title: "살수에서 퇴로를 치다",
        text: "돌아가는 수군을 강에서 칩니다. 살수는 오늘의 청천강으로 보는 견해가 많습니다. 강은 퇴로를 한 줄로 만들고, 건너는 동안 대열이 길어집니다. 고구려군은 그 자리를 노립니다.",
      },
      {
        title: "전승과 숫자를 나누다",
        text: "물을 가두었다가 터뜨렸다는 이야기는 뒤에 크게 퍼진 전승입니다. 전투의 세부를 그 한 장면으로만 외우지 않습니다. 별동대가 거의 남지 않고 돌아갔다는 것이 삼국사기의 큰 결과입니다. 옛 기록의 병력 숫자는 과장되었을 수 있어, 여기서 만 단위를 외우지 않습니다.",
      },
    ],
    people: [{ slug: "eulji-mundeok", label: "을지문덕" }],
    filmSlugs: [],
    links: [
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "gwiju",
    name: "귀주대첩",
    english: "Battle of Gwiju",
    year: "1019년",
    era: "고려",
    lede: "거란(요)의 세 번째 큰 침입에서, 개경을 떨어뜨리지 못하고 돌아가던 군대를 귀주에서 친 싸움입니다. 고려의 장수는 강감찬입니다.",
    steps: [
      {
        title: "세 번째 침입",
        text: "거란은 993년, 1010년, 그리고 1018년에 고려를 크게 칩니다. 1018년의 주장은 소배압입니다. 서희의 993년 담판으로 전쟁이 끝난 것은 아닙니다. 담판과 귀주는 다른 해의 다른 방법입니다.",
      },
      {
        title: "들어오며 힘이 깎이다",
        text: "강감찬은 흥화진 등에서 들어오는 거란군을 깎습니다. 고려군은 개경으로 가는 길 곳곳에서 식량과 속도를 빼앗습니다. 한 성의 결전만으로 설명하면 지도가 짧아집니다.",
      },
      {
        title: "개경은 열리지 않다",
        text: "거란군은 개경 가까이까지 오지만 성을 함락하지 못하고 북으로 돌아섭니다. 개경은 오늘의 개성 쪽이라 이 남쪽 지도 밖입니다. 수도를 지킨 일과, 돌아가는 길을 친 일은 이어진 두 단계입니다.",
      },
      {
        title: "귀주에서 퇴로가 막히다",
        text: "1019년 귀주에서 고려군이 퇴로를 막아 크게 칩니다. 귀주는 평안북도 구성 일대로 봅니다. 강감찬의 본대와 다른 부대가 합류했다는 것이 전투의 뼈대입니다. 지친 군대가 좁은 퇴로에 몰린 자리입니다.",
      },
      {
        title: "그 뒤의 침입",
        text: "이 규모의 거란 침입은 귀주 뒤에 이어지지 않습니다. 승리의 병력 숫자는 기록마다 크고, 오늘의 통계처럼 외우지 않습니다. 낙성대에서 별이 떨어졌다는 강감찬의 출생 이야기는 전투와 다른 전승입니다.",
      },
    ],
    people: [
      { slug: "gang-gam-chan", label: "강감찬" },
      { slug: "seo-hui", label: "서희 · 993년 담판" },
    ],
    filmSlugs: [],
    links: [{ href: "https://nadoo-timeline.vercel.app", label: "나두연표" }],
  },
  {
    slug: "imjin-seas",
    name: "임진왜란 주요 해전",
    english: "Imjin sea battles",
    year: "1592–1598년",
    era: "조선",
    lede: "한산·명량·노량은 같은 전쟁의 다른 바다입니다. 넓은 바다, 좁은 물목, 물러가는 길목을 차례로 읽으면 이순신이 왜 이겼는지가 남습니다.",
    steps: [
      {
        title: "한산, 넓은 바다",
        text: "1592년 일본 수군이 부산 쪽에서 서쪽으로 올라옵니다. 한산도 앞은 오늘의 통영 앞바다로, 경상과 전라가 만나는 남해입니다. 이순신은 좁은 포구에 머물지 않고 넓은 바다로 일본 함대를 끌어낸 뒤 학익진으로 둘러쌉니다. 학익진이라는 이름은 장계에 나옵니다. 이 승리로 서해의 곡식 바닷길이 열리지 않습니다.",
      },
      {
        title: "칠천량 뒤에 배가 없다",
        text: "1597년 이순신은 파직되고, 조선 수군은 칠천량에서 크게 무너집니다. 남은 배가 거의 없습니다. 조정은 그를 다시 삼도수군통제사로 부릅니다. 명량은 승리의 연속이 아니라, 함대가 깨진 직후의 싸움입니다.",
      },
      {
        title: "명량, 좁은 물목",
        text: "명량은 해남과 진도 사이의 울돌목입니다. 물길이 좁고 조류가 빠릅니다. 조선 배가 열두 척가량이라는 취지로 장계를 올린 일이 난중일기에 남아 있습니다. 그 문장은 여기서 베끼지 않습니다. 좁은 목에서는 많은 배가 한꺼번에 힘을 쓰지 못하고, 물때가 바뀌면 앞에 선 배가 밀립니다. 일본 배의 척수는 기록마다 달라 영화 자막의 숫자를 외우지 않습니다.",
      },
      {
        title: "노량, 물러가는 길",
        text: "1598년 도요토미가 죽고 일본군은 바다로 빠집니다. 노량은 남해 쪽의 물목입니다. 조선과 명나라 수군이 그 퇴로를 막습니다. 이순신은 이 전투에서 죽습니다. 승리와 죽음이 같은 날의 일입니다. 죽기 직전 자기 죽음을 알리지 말라는 대사는 후대 전기에 전하는 장면이라 전승으로 둡니다.",
      },
      {
        title: "세 바다를 한 장면으로 합치지 않다",
        text: "한산은 학익진, 명량은 조류, 노량은 퇴로입니다. 배의 종류도 영화의 함선 디자인과 다릅니다. 육지의 권율·김시민·곽재우가 같은 전쟁의 다른 자리입니다.",
      },
    ],
    people: [
      { slug: "yi-sun-sin", label: "이순신" },
      { slug: "gwon-yul", label: "권율 · 행주" },
      { slug: "kim-si-min", label: "김시민 · 진주" },
      { slug: "gwak-jae-u", label: "곽재우" },
    ],
    filmSlugs: ["roaring-currents", "hansan", "noryang"],
    links: [
      { href: "/rulers/yi-sun-sin", label: "왕의 목록 · 이순신" },
      { href: "/regions/jeolla", label: "전라도 · 명량" },
      { href: "/regions/gyeongsang", label: "경상도 · 한산·노량" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
  {
    slug: "cheongsanri",
    name: "청산리·봉오동",
    english: "Cheongsan-ri and Bongo-dong",
    year: "1920년",
    era: "일제강점기",
    lede: "1920년 만주에서 독립군이 일본군을 친 두 싸움입니다. 6월 봉오동은 홍범도 연합 부대, 10월 청산리는 김좌진의 북로군정서가 중심입니다. 한 영화의 한 장면이 아닙니다.",
    steps: [
      {
        title: "봉오동, 골짜기",
        text: "1920년 6월, 두만강 북쪽 지린 왕칭의 봉오동 골짜기에서 독립군이 일본군을 칩니다. 좁은 계곡으로 들여보낸 뒤 높은 쪽에서 공격합니다. 지형을 아는 사람이 길목을 고른 싸움입니다.",
      },
      {
        title: "한 사람의 승리가 아니다",
        text: "홍범도가 대표 지휘관으로 기억됩니다. 최진동 등 여러 독립군 부대가 함께했습니다. 홍범도 혼자 골짜기를 막은 것처럼 쓰면 연합이 사라집니다.",
      },
      {
        title: "가을의 추격",
        text: "일본군은 그해 가을 독립군의 근거지를 치러 간도로 들어옵니다. 출병의 명분이 된 훈춘 사건은 배후 해석이 갈립니다. 이 페이지는 배후를 단정하지 않고, 독립군이 산악으로 이동한 사실만 적습니다.",
      },
      {
        title: "청산리, 여러 날",
        text: "1920년 10월, 백운평·어랑촌 등 청산리 일대의 여러 싸움이 이어집니다. 중심은 김좌진의 북로군정서입니다. 홍범도의 부대도 같은 작전에 참여한 기록이 있습니다. 하나의 계곡, 하루의 전투로만 외우지 않습니다. 사상자 수는 한국과 일본의 기록이 달라 숫자를 못 박지 않습니다.",
      },
      {
        title: "승리가 곧 광복은 아니다",
        text: "독립군은 추격을 피해 더 북쪽으로 이동합니다. 1921년 자유시에서 독립군 부대 사이에 충돌이 있습니다. 봉오동과 청산리는 전술의 승리이고, 나라가 그해에 회복되지는 않았습니다. 홍범도의 이후 소련 행로와 김좌진의 1930년 피살은 전투 페이지의 결말이 아니라 각 인물 페이지에 나눕니다.",
      },
    ],
    people: [
      { slug: "hong-beom-do", label: "홍범도 · 봉오동" },
      { slug: "kim-jwa-jin", label: "김좌진 · 청산리" },
    ],
    filmSlugs: ["bongo-dong"],
    links: [
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
      { href: "https://nadoo-timeline.vercel.app", label: "나두연표" },
    ],
  },
];

export function battleBySlug(slug: string): Battle | undefined {
  return battles.find((battle) => battle.slug === slug);
}
