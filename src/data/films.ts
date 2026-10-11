import type { Film } from "./types";

export const films: Film[] = [
  {
    slug: "the-kings-letters",
    title: "나랏말싸미",
    english: "The King's Letters",
    year: "2019",
    kind: "영화",
    why: "훈민정음이 어떤 문제 — 말은 있는데 적는 글자가 자기 말에 안 맞는다 — 에서 시작됐는지 보고 싶을 때 고릅니다. 영어 제목은 The King's Letters입니다.",
    fiction: "세종 혼자 글을 만들었다는 실록의 큰 줄과, 승려 신미가 창제의 중심에 있었다는 설을 영화가 뒤쪽에 무게를 둡니다. 신미 설은 연구자 일부의 다른 설이지 교과서의 통설이 아닙니다. 궁궐 대화와 갈등은 극본입니다.",
    links: [
      { href: "/rulers/sejong", label: "세종" },
      { href: "/regions/gyeonggi/hanyang", label: "한양" },
      { href: "/palaces/gyeongbokgung", label: "경복궁" },
    ],
  },
  {
    slug: "forbidden-dream",
    title: "천문: 하늘에 묻는다",
    english: "Forbidden Dream",
    year: "2019",
    kind: "영화",
    why: "세종 시대의 과학, 특히 장영실이라는 이름을 처음 들을 때 분위기를 잡아 줍니다. 자격루와 하늘을 재는 기구가 왜 정치였는지를 크게 보여 줍니다.",
    fiction: "장영실이 노비 출신으로 올라가 자격루 등에 관여한 일은 기록에 있습니다. 왕과의 우정, 말년의 행적, 극의 갈등은 창작에 가깝습니다. 파직 이후의 삶은 사료가 짧습니다. 영화의 결말을 전기로 외우지 않는 편이 좋습니다.",
    links: [
      { href: "/rulers/sejong", label: "세종" },
      { href: "/regions/gyeonggi/hanyang", label: "한양" },
      { href: "/palaces/gyeongbokgung", label: "경복궁" },
    ],
  },
  {
    slug: "the-throne",
    title: "사도",
    english: "The Throne",
    year: "2015",
    kind: "영화",
    why: "영조와 사도세자, 그리고 그 아들 정조로 이어지는 궁중의 그늘을 한 편으로 만날 때 가장 많이 찾는 영화입니다.",
    fiction: "1762년 영조가 세자를 뒤주에 가두게 하고, 세자가 그 안에서 죽은 일은 기록된 사건입니다. 왜 그렇게까지 갔는지 — 병인지, 당파인지 — 는 영화가 고른 해석입니다. 부자의 대화는 회의록이 아닙니다.",
    links: [
      { href: "/rulers/yeongjo", label: "영조" },
      { href: "/rulers/sado", label: "사도세자" },
      { href: "/rulers/jeongjo", label: "정조" },
      { href: "/regions/gyeonggi/suwon", label: "수원" },
      { href: "/palaces/changgyeonggung", label: "창경궁" },
    ],
  },
  {
    slug: "masquerade",
    title: "광해, 왕이 된 남자",
    english: "Masquerade",
    year: "2012",
    kind: "영화",
    why: "광해군이라는 이름과, 임진왜란 뒤의 궁궐을 처음 상상할 때 자주 거론됩니다. 왕과 꼭 닮은 사람이 보름을 대신한다는 설정이 극의 뼈대입니다.",
    fiction: "광해군이 1608년부터 1623년까지 왕이었고, 인조반정으로 쫓겨난 일은 역사입니다. 대역이 보름 동안 정치를 바꿨다는 줄거리는 창작입니다. 그런 일이 실록에 있는 것이 아닙니다.",
    links: [
      { href: "/rulers/gwanghae", label: "광해군" },
      { href: "/regions/jeju", label: "제주" },
      { href: "/palaces/changdeokgung", label: "창덕궁" },
    ],
  },
  {
    slug: "roaring-currents",
    title: "명량",
    english: "The Admiral: Roaring Currents",
    year: "2014",
    kind: "영화",
    why: "1597년 명량, 적은 수의 판옥선으로 좁은 물목을 막은 싸움을 크게 보고 싶을 때 고릅니다. 이순신이 파직되었다가 돌아온 직후의 일입니다.",
    fiction: "조선 배가 열두 척가량이라는 큰 줄은 난중일기와 장계의 기록과 맞습니다. 일본 배의 정확한 척수와, 배 위에서 누가 누구와 맞붙었는지는 영화의 스펙터클입니다. 대사는 사료 문장을 그대로 옮긴 것이 아닙니다.",
    links: [
      { href: "/defenders/yi-sun-sin", label: "이순신" },
      { href: "/rulers/yi-sun-sin", label: "왕의 목록 · 이순신" },
      { href: "/defenders/battles/imjin-seas", label: "임진왜란 주요 해전" },
      { href: "/regions/jeolla", label: "전라도" },
      { href: "/regions/gyeongsang", label: "경상도" },
    ],
  },
  {
    slug: "the-fortress",
    title: "남한산성",
    english: "The Fortress",
    year: "2017",
    kind: "영화",
    why: "1636년 병자호란 때 인조가 남한산성에 들어가 항복하기까지의 겨울을, 싸우자는 말과 화친하자는 말이 갈리는 장면으로 보여 줍니다.",
    fiction: "남한산성은 경기도 광주(廣州)에 있습니다. 전라도 광주(光州)가 아닙니다. 최명길과 김상헌이 다른 주장을 한 일은 역사입니다. 대사와 인물의 속마음은 김훈의 소설을 거친 창작입니다. 삼전도의 항복 자체는 1637년의 사실입니다.",
    links: [
      { href: "/regions/gyeonggi", label: "경기도" },
      { href: "/regions/gyeonggi/hanyang", label: "한양" },
    ],
  },
  {
    slug: "hwangsanbeol",
    title: "황산벌",
    english: "Once Upon a Time in a Battlefield",
    year: "2003",
    kind: "영화",
    why: "660년 황산벌, 백제의 계백과 신라의 김유신이 맞선 싸움을 코미디로 만나 본 사람이 많습니다. 진지한 사극이 아니라 말놀이에 가깝습니다.",
    fiction: "황산벌 전투와 계백, 그리고 그해 백제가 멸망한 일은 역사입니다. 장소는 오늘의 충남 논산 일대로 봅니다. 영화의 사투리 대결과 개인 일화는 창작입니다. 오천 명의 결사대는 삼국사기가 전하는 숫자이지, 영화의 장면 하나하나가 그 기록은 아닙니다.",
    links: [
      { href: "/defenders/kim-yu-sin", label: "김유신" },
      { href: "/rulers/uija", label: "의자왕" },
      { href: "/regions/chungcheong", label: "충청도" },
      { href: "/regions/chungcheong/buyeo", label: "부여" },
    ],
  },
  {
    slug: "king-and-the-clown",
    title: "왕의 남자",
    english: "King and the Clown",
    year: "2005",
    kind: "영화",
    why: "연산군 시대의 궁궐을, 광대들이 왕 앞에서 연극을 하는 이야기로 기억할 때 자주 나오는 영화입니다.",
    fiction: "연산군이 1494년부터 1506년까지 왕이었고, 두 차례 큰 사화 끝에 중종반정으로 쫓겨난 일은 역사입니다. 장생과 공길은 실존 광대가 아닙니다. 왕의 취향과 광대들의 사랑은 극입니다.",
    links: [
      { href: "/rulers/yeonsangun", label: "연산군" },
      { href: "/regions/gyeonggi/hanyang", label: "한양" },
      { href: "/palaces/gyeongbokgung", label: "경복궁" },
    ],
  },
  {
    slug: "dae-jang-geum",
    title: "대장금",
    english: "Jewel in the Palace",
    year: "2003",
    kind: "드라마",
    why: "중종 시대 궁중의 의녀를 처음 상상할 때 가장 많이 거론되는 드라마입니다. 이야기의 궁은 임진왜란 이전에 법궁이던 경복궁이고, 창경궁 환경전도 장금의 진료와 이어 읽습니다.",
    fiction:
      "장금이라는 의녀가 중종 때 실록에 나오고, 대비전과 중궁전에서 진료해 상을 받은 일은 기록입니다. 궁중 음식과 경쟁, 사랑의 줄거리는 드라마입니다. 화면의 전각은 세트인 부분이 큽니다. 경복궁을 그 화면 그대로 기억하면 안 됩니다.",
    links: [
      { href: "/palaces/gyeongbokgung", label: "경복궁" },
      { href: "/palaces/changgyeonggung", label: "창경궁 · 환경전" },
      { href: "/family-tree?dynasty=joseon&focus=js-jungjong", label: "가족관계도의 중종" },
    ],
  },
  {
    slug: "the-last-princess",
    title: "덕혜옹주",
    english: "The Last Princess",
    year: "2016",
    kind: "영화",
    why: "대한제국이 끝난 뒤의 황실을, 고종의 딸 덕혜옹주의 일생으로 만날 때 자주 찾는 영화입니다. 덕수궁과 창덕궁 낙선재가 그 삶의 자리입니다.",
    fiction:
      "덕혜옹주는 1912년에 태어난 고종과 귀인 양씨의 딸입니다. 일본으로 갔다가 돌아와 1989년 창덕궁 낙선재에서 죽었습니다. 영화의 구출과 개인의 대사는 극입니다. 죽은 자리와 극의 결말을 같은 문장으로 외우지 않습니다.",
    links: [
      { href: "/palaces/deoksugung", label: "덕수궁" },
      { href: "/palaces/changdeokgung", label: "창덕궁 · 낙선재" },
      { href: "/family-tree?dynasty=joseon&focus=js-gojong", label: "가족관계도의 고종" },
    ],
  },
  {
    slug: "hansan",
    title: "한산: 용의 출현",
    english: "Hansan: Rising Dragon",
    year: "2022",
    kind: "영화",
    why: "1592년 한산도 해전을, 학익진으로 일본 수군을 막은 장면으로 보고 싶을 때 고릅니다. 명량·노량과 한 감독의 연작입니다.",
    fiction:
      "한산도에서 조선 수군이 일본 함대를 크게 꺾고 서해로 가는 바닷길을 지킨 일은 기록된 전투입니다. 학익진이라는 진 이름도 장계에 나옵니다. 첩자와 개인 대결, 배 위의 대화는 극본입니다. 제목의 용은 상징이지 당시의 군함 이름이 아닙니다.",
    links: [
      { href: "/defenders/yi-sun-sin", label: "이순신" },
      { href: "/rulers/yi-sun-sin", label: "왕의 목록 · 이순신" },
      { href: "/defenders/battles/imjin-seas", label: "임진왜란 주요 해전" },
    ],
  },
  {
    slug: "noryang",
    title: "노량: 죽음의 바다",
    english: "Noryang: Deadly Sea",
    year: "2023",
    kind: "영화",
    why: "1598년 노량, 일본군이 물러가는 길목을 막다 이순신이 죽은 마지막 해전을 볼 때 고릅니다.",
    fiction:
      "노량에서 조선과 명나라 수군이 퇴각하는 일본 함대를 치고, 이순신이 그 전투에서 죽은 일은 역사입니다. 죽기 직전 자기 죽음을 알리지 말라는 대사는 후대 전기에 전하는 장면이라 전승으로 둡니다. 폭발을 키운 장면은 영화입니다.",
    links: [
      { href: "/defenders/yi-sun-sin", label: "이순신" },
      { href: "/defenders/battles/imjin-seas", label: "임진왜란 주요 해전" },
      { href: "/regions/gyeongsang", label: "경상도" },
    ],
  },
  {
    slug: "ansi-fortress",
    title: "안시성",
    english: "The Great Battle",
    year: "2018",
    kind: "영화",
    why: "645년 당 태종의 고구려 원정에서 안시성이 버티는 이야기를 크게 보고 싶을 때 고릅니다.",
    fiction:
      "안시성이 당군에 떨어지지 않고, 당 태종이 이 원정에서 성을 함락하지 못한 채 돌아간 일은 기록입니다. 성주의 이름 양만춘은 당시 기록에 보이지 않는 전승입니다. 영화는 그 이름을 사실처럼 쓰고, 성벽 위의 개인 무용을 키웁니다.",
    links: [
      { href: "/defenders/ansi-commander", label: "안시성 성주" },
      { href: "https://nadoo-world.vercel.app/countries/cn", label: "나두세계 · 중국" },
    ],
  },
  {
    slug: "bongo-dong",
    title: "봉오동 전투",
    english: "The Battle: Roar to Victory",
    year: "2019",
    kind: "영화",
    why: "1920년 6월 봉오동에서 독립군이 일본군을 골짜기로 끌어들여 친 승리를 볼 때 고릅니다.",
    fiction:
      "봉오동 승리는 역사입니다. 홍범도가 연합 부대를 이끈 대표 지휘관으로 기억됩니다. 화면 속 개인들의 사연과 전투 동작은 극입니다. 그해 10월 김좌진의 청산리와는 다른 싸움이라, 두 전투를 한 장면으로 합치지 않습니다.",
    links: [
      { href: "/defenders/hong-beom-do", label: "홍범도" },
      { href: "/defenders/kim-jwa-jin", label: "김좌진 · 청산리는 다른 달" },
      { href: "/defenders/battles/cheongsanri", label: "청산리·봉오동" },
    ],
  },
  {
    slug: "harbin",
    title: "하얼빈",
    english: "Harbin",
    year: "2024",
    kind: "영화",
    why: "1909년 하얼빈역에서 안중근이 이토 히로부미를 쏜 사건으로 들어가고 싶을 때 고릅니다.",
    fiction:
      "하얼빈역의 저격과, 그 뒤 일본 법정에서 사형 판결을 받은 일은 역사입니다. 영화를 수사극처럼 이끄는 관계와 대사는 극본입니다. 안중근이 동양 평화를 말했다고 해서, 영화의 모든 대사가 옥중 기록은 아닙니다.",
    links: [
      { href: "/defenders/an-jung-geun", label: "안중근" },
      { href: "https://nadoo-world.vercel.app/countries/jp", label: "나두세계 · 일본" },
    ],
  },
  {
    slug: "hero",
    title: "영웅",
    english: "Hero",
    year: "2022",
    kind: "영화",
    why: "안중근의 하얼빈 의거와 재판을 뮤지컬 영화로 만나 볼 때 고릅니다. 노래가 극의 뼈대입니다.",
    fiction:
      "의거와 재판이라는 틀은 역사입니다. 노래, 감정의 장면, 인물 사이의 각색은 뮤지컬의 창작입니다. 「하얼빈」과 같은 사건을 다루지만 장르는 다릅니다.",
    links: [
      { href: "/defenders/an-jung-geun", label: "안중근" },
      { href: "/films#harbin", label: "영화 「하얼빈」" },
    ],
  },
  {
    slug: "assassination",
    title: "암살",
    english: "Assassination",
    year: "2015",
    kind: "영화",
    why: "1930년대 상하이 임시정부와 의열단이 어떤 분위기였는지 상상할 때 자주 거론됩니다.",
    fiction:
      "김원봉과 임시정부 시대는 역사의 배경입니다. 영화의 암살 표적과 팀, 이중 스파이는 창작입니다. 1932년 윤봉길의 훙커우 공원 의거, 이봉창의 도쿄 의거와는 다른 이야기입니다. 김구가 그 의거들을 조직한 일과 이 극의 작전을 같은 사건으로 외우지 않습니다.",
    links: [
      { href: "/defenders/kim-won-bong", label: "김원봉" },
      { href: "/defenders/kim-gu", label: "김구" },
      { href: "/defenders/yun-bong-gil", label: "윤봉길 · 다른 의거" },
    ],
  },
];

export function filmsBySlugs(slugs: string[]): Film[] {
  const set = new Map(films.map((film) => [film.slug, film]));
  return slugs.flatMap((slug) => {
    const film = set.get(slug);
    return film ? [film] : [];
  });
}
