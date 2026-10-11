import type { PalaceSlug } from "./palaces";

export type TimelineRow = {
  year: string;
  cells: Partial<Record<PalaceSlug, string>>;
};

/** Building history only. Politics that did not change the buildings stay on each palace page. */
export const palaceTimeline: TimelineRow[] = [
  {
    year: "1394",
    cells: { gyeongbokgung: "한양 천도와 함께 조성 시작" },
  },
  {
    year: "1395",
    cells: { gyeongbokgung: "중심 전각 완공" },
  },
  {
    year: "1398",
    cells: { gyeongbokgung: "담장 완공" },
  },
  {
    year: "1405",
    cells: { changdeokgung: "이궁으로 조성 시작" },
  },
  {
    year: "1412",
    cells: {
      gyeongbokgung: "경회루를 크게 다시 지음",
      changdeokgung: "정문 돈화문",
    },
  },
  {
    year: "1418",
    cells: { changgyeonggung: "태종의 상왕 거처로 수강궁" },
  },
  {
    year: "1483",
    cells: { changgyeonggung: "수강궁 터에 창경궁을 지음. 이듬해 완공으로도 적힘" },
  },
  {
    year: "1554",
    cells: { gyeongbokgung: "불탄 강녕전·사정전 등을 복구" },
  },
  {
    year: "1592",
    cells: {
      gyeongbokgung: "임진왜란으로 소실",
      changdeokgung: "소실",
      changgyeonggung: "소실",
    },
  },
  {
    year: "1593",
    cells: { deoksugung: "월산대군의 집을 정릉동 행궁으로 씀" },
  },
  {
    year: "1610",
    cells: { changdeokgung: "다시 지어 법궁으로 삼음" },
  },
  {
    year: "1611",
    cells: { deoksugung: "정릉동 행궁을 경운궁이라 부름" },
  },
  {
    year: "1616",
    cells: { changgyeonggung: "중건. 명정전도 이 무렵의 건물" },
  },
  {
    year: "1617",
    cells: { gyeonghuigung: "경덕궁으로 조성 시작. 1620년 무렵까지" },
  },
  {
    year: "1623",
    cells: {
      changdeokgung: "인조반정으로 전각 대부분 소실",
      changgyeonggung: "동궁·내전 일부 소실",
      gyeonghuigung: "광해군은 완성 궁을 쓰지 못함. 인조가 뒤에 이어",
    },
  },
  {
    year: "1624",
    cells: { changgyeonggung: "이괄의 난으로 통명전 등 소실. 1633년 중건" },
  },
  {
    year: "1760",
    cells: { gyeonghuigung: "원종 시호와 음이 같아 경희궁으로 개명" },
  },
  {
    year: "1803–1804",
    cells: { changdeokgung: "인정전 화재, 이듬해 재건" },
  },
  {
    year: "1829",
    cells: { gyeonghuigung: "내전 화재. 1831년에 다시 지음" },
  },
  {
    year: "1833–1834",
    cells: {
      changdeokgung: "대조전·희정당 화재 뒤 재건",
      changgyeonggung: "통명전·환경전 등 재건",
    },
  },
  {
    year: "1865–1867",
    cells: {
      gyeongbokgung: "흥선대원군 주도로 중건. 1867년 중심 전각 완공",
      gyeonghuigung: "중건 자재로 쓰려 전각 대부분을 헐음",
    },
  },
  {
    year: "1873",
    cells: { gyeongbokgung: "건청궁" },
  },
  {
    year: "1876",
    cells: { gyeongbokgung: "교태전 등 내전 큰 화재. 1888년 다시 지음" },
  },
  {
    year: "1904",
    cells: { deoksugung: "대화재. 중화전·함녕전·즉조당·석어당 등 소실" },
  },
  {
    year: "1907",
    cells: {
      changdeokgung: "순종이 창덕궁으로 옮김",
      deoksugung: "고종이 머무는 궁이라 하여 덕수궁으로 부름",
    },
  },
  {
    year: "1909–1911",
    cells: { changgyeonggung: "동물원·식물원. 1911년 창경원으로 격하" },
  },
  {
    year: "1910",
    cells: {
      deoksugung: "석조전 완공",
      gyeonghuigung: "터에 학교가 들어섬",
    },
  },
  {
    year: "1915",
    cells: { gyeongbokgung: "조선물산공진회로 전각 다수 철거" },
  },
  {
    year: "1917–1920",
    cells: {
      gyeongbokgung: "일부 건물을 헐어 창덕궁 재건에 씀",
      changdeokgung: "대화재로 대조전 소실. 1920년 대조전·희정당 재건",
    },
  },
  {
    year: "1926–1927",
    cells: { gyeongbokgung: "조선총독부 청사 완공. 이듬해 광화문을 옮김" },
  },
  {
    year: "1951",
    cells: { gyeongbokgung: "한국전쟁으로 광화문 소실" },
  },
  {
    year: "1968",
    cells: { gyeongbokgung: "광화문을 철근 콘크리트로, 제자리에서 비켜 복원" },
  },
  {
    year: "1983",
    cells: { changgyeonggung: "창경궁으로 이름을 되돌리고 복원 시작. 동물원은 과천으로" },
  },
  {
    year: "1988",
    cells: { gyeonghuigung: "흥화문을 궁터로 옮김. 방향과 자리는 창건 때와 다름" },
  },
  {
    year: "1994",
    cells: { gyeonghuigung: "숭정전을 새로 세움. 조선 건물은 동국대학교에 남아 있음" },
  },
  {
    year: "1995–1996",
    cells: { gyeongbokgung: "총독부 청사 철거 시작, 1996년 완료. 강녕전·교태전 등 복원" },
  },
  {
    year: "1997",
    cells: { changdeokgung: "유네스코 세계유산" },
  },
  {
    year: "2010",
    cells: { gyeongbokgung: "광화문을 나무로, 원래 자리에 다시 세움" },
  },
  {
    year: "2019",
    cells: {
      gyeongbokgung: "흥복전 복원",
      deoksugung: "광명문 이전 복원",
    },
  },
  {
    year: "2021",
    cells: { gyeongbokgung: "향원정 보수. 취향교를 북쪽 원래 자리로" },
  },
  {
    year: "2023",
    cells: { deoksugung: "돈덕전 재건 개관" },
  },
];

export const timelineNote = [
  "경복궁·창덕궁·창경궁·덕수궁의 해는 궁능유적본부 궁궐 연표를 따릅니다. 경희궁 줄은 그 표에 거의 없어서, 국가유산 안내와 경희궁 연혁을 따로 맞췄습니다.",
  "덕수궁이라는 이름은 1907년부터입니다. 그 전 칸은 정릉동 행궁과 경운궁의 일입니다. 빈칸은 그 해에 일이 없었다는 뜻이 아닙니다. 이 표에 넣지 않은 해입니다.",
  "사도세자, 을미사변, 을사늑약처럼 건물이 아니라 사람에서 벌어진 일은 각 궁 글에 적습니다.",
];
