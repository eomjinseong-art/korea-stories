export type SeoulEra = "early" | "late" | "empire" | "modern";
export type SLink = { href: string; label: string };
export type SText = { ko: string; en: string };
export type SEvent = { era: SeoulEra; year: string; ko: string; en: string };
export type SeoulPin = {
  id: string;
  ko: string;
  en: string;
  lat: number;
  lon: number;
  lx?: number;
  ly?: number;
  anchor?: "start" | "middle" | "end";
  kind: "palace" | "gate" | "place";
  builder: SText;
  photoNote?: string;
  events: SEvent[];
  people: SLink[];
  films: SLink[];
  more: SLink[];
  then: SText;
  now: SText;
  stories: SText[];
};
export type SeoulStep = { pin: string; time: string; ko: string; en: string };
export type SeoulRoute = { id: string; era: SeoulEra; ko: string; en: string; color: string; note?: string; steps: SeoulStep[] };

export const SEOUL_ERAS: { id: SeoulEra; ko: string; en: string; range: string }[] = [
  { id: "early", ko: "조선 전기", en: "Early Joseon", range: "1392–1592" },
  { id: "late", ko: "조선 후기", en: "Late Joseon", range: "1592–1894" },
  { id: "empire", ko: "대한제국·일제강점기", en: "Korean Empire & colonial era", range: "1894–1945" },
  { id: "modern", ko: "현대", en: "Modern Seoul", range: "1945–" },
];

const r = (slug: string, label: string): SLink => ({ href: `/rulers/${slug}`, label: `왕 · ${label}` });
const d = (slug: string, label: string): SLink => ({ href: `/defenders/${slug}`, label: `지킨 사람 · ${label}` });
const ft = (id: string, label: string): SLink => ({ href: `/family-tree?dynasty=joseon&focus=${id}`, label: `가계도 · ${label}` });
const pal = (slug: string, label: string): SLink => ({ href: `/palaces/${slug}`, label: `궁궐 · ${label}` });
const gate = (slug: string, label: string): SLink => ({ href: `/gates#${slug}`, label: `사대문 · ${label}` });
const fm = (slug: string, label: string): SLink => ({ href: `/films#${slug}`, label });
const CHECK: SLink = { href: "/defenders#films", label: "영화 체크리스트" };
const tl = (slug: string, label: string): SLink => ({ href: `https://nadoo-timeline.vercel.app/events/${slug}`, label: `나두연표 · ${label}` });

export const SEOUL_PINS: SeoulPin[] = [
  {
    id: "gyeongbokgung", kind: "palace", ko: "경복궁", en: "Gyeongbokgung", lat: 37.5796, lon: 126.977, lx: -10, ly: 4, anchor: "end",
    builder: { ko: "태조, 1395년. 임진왜란 때 불탄 뒤 고종 때 흥선대원군이 1865–1868년 다시 지음", en: "Taejo, 1395; rebuilt 1865–68 under Gojong" },
    events: [
      { era: "early", year: "1395", ko: "새 도읍 한양의 법궁으로 완공됩니다. 정도전이 전각 이름을 지었습니다.", en: "Main palace of the new capital." },
      { era: "early", year: "1443", ko: "세종이 훈민정음을 만듭니다. 집현전이 이 궁 안에 있었습니다.", en: "Sejong creates Hunminjeongeum." },
      { era: "early", year: "1592", ko: "임진왜란 때 불타 270년 넘게 빈터로 남습니다.", en: "Burned in the Imjin War." },
      { era: "empire", year: "1895년 10월 8일", ko: "을미사변. 일본 공사 미우라 고로가 이끈 무리가 건청궁에서 명성황후를 시해합니다.", en: "The Eulmi incident: Queen Min murdered at Geoncheonggung." },
      { era: "empire", year: "1926", ko: "근정전 앞에 조선총독부 청사가 완공됩니다.", en: "Government-General building completed in front." },
      { era: "modern", year: "1995–1996", ko: "옛 총독부 건물을 헐고, 2010년 광화문을 제자리에 복원합니다.", en: "Colonial building demolished; Gwanghwamun restored 2010." },
    ],
    people: [r("taejo", "태조"), r("sejong", "세종"), ft("js-gojong", "고종"), ft("js-empress", "명성황후"), ft("js-heungseon", "흥선대원군"), pal("gyeongbokgung", "경복궁")],
    films: [fm("the-kings-letters", "나랏말싸미"), fm("forbidden-dream", "천문"), fm("hero", "영웅")],
    more: [tl("founding-joseon", "조선 건국"), tl("hunminjeongeum-created", "훈민정음 창제")],
    then: { ko: "왕이 조회와 정무를 보던 조선의 첫 법궁입니다.", en: "Joseon's first main palace." },
    now: { ko: "복원이 이어지는 궁궐 관람지. 일제강점기에 헐린 전각 상당수가 다시 세워졌습니다.", en: "Ongoing restoration of demolished halls." },
    stories: [{ ko: "1592년 궁에 불을 지른 것이 일본군인지, 피란한 왕에게 분노한 백성인지는 기록에 따라 갈립니다(『선조수정실록』은 백성을 적음).", en: "Who burned it in 1592 is disputed." }],
  },
  {
    id: "changdeokgung", kind: "palace", ko: "창덕궁·후원", en: "Changdeokgung & Huwon", lat: 37.5794, lon: 126.991, lx: 0, ly: -12, anchor: "middle",
    photoNote: "사진은 후원의 부용지와 주합루입니다.",
    builder: { ko: "태종, 1405년. 임진왜란 뒤 광해군 때 1610년 무렵 다시 지음", en: "Taejong, 1405; rebuilt c. 1610" },
    events: [
      { era: "early", year: "1405", ko: "태종이 이궁으로 짓습니다.", en: "Built by Taejong as a secondary palace." },
      { era: "late", year: "1610년 무렵", ko: "다시 지어져 고종 때까지 약 270년 동안 실제 법궁 노릇을 합니다.", en: "Effectively the main palace for ~270 years." },
      { era: "late", year: "1776", ko: "정조가 후원에 주합루와 규장각을 짓습니다.", en: "Jeongjo builds Gyujanggak in the garden." },
      { era: "empire", year: "1926", ko: "마지막 황제 순종이 대조전에서 세상을 떠납니다.", en: "Emperor Sunjong dies here." },
      { era: "modern", year: "1997", ko: "유네스코 세계유산에 올라갑니다. 덕혜옹주는 1989년 낙선재에서 생을 마칩니다.", en: "UNESCO World Heritage; Princess Deokhye dies at Nakseonjae (1989)." },
    ],
    people: [ft("js-taejong", "태종"), r("gwanghae", "광해군"), r("jeongjo", "정조"), ft("js-sunjong", "순종"), pal("changdeokgung", "창덕궁")],
    films: [fm("masquerade", "광해, 왕이 된 남자"), fm("the-last-princess", "덕혜옹주")],
    more: [],
    then: { ko: "산자락을 따라 전각을 앉힌, 왕들이 가장 오래 산 궁입니다.", en: "The palace kings lived in longest." },
    now: { ko: "후원은 예약한 시간에 해설과 함께 들어갑니다.", en: "The Secret Garden is visited by guided tour." },
    stories: [],
  },
  {
    id: "changgyeonggung", kind: "palace", ko: "창경궁", en: "Changgyeonggung", lat: 37.5788, lon: 126.995, lx: 10, ly: 14,
    builder: { ko: "성종, 1483–1484년 세 대비를 모시려고(세종이 태종을 위해 지은 수강궁 자리)", en: "Seongjong, 1483–84, for three queen dowagers" },
    events: [
      { era: "early", year: "1484", ko: "대비들의 궁으로 완공됩니다.", en: "Completed for the dowagers." },
      { era: "late", year: "1762", ko: "영조가 사도세자를 문정전 앞마당 뒤주에 가두고, 세자는 여드레 만에 숨집니다.", en: "Crown Prince Sado dies in the rice chest." },
      { era: "empire", year: "1909–1911", ko: "일제가 동물원·식물원을 들이고 ‘창경원’으로 낮춰 부릅니다.", en: "Turned into a zoo, renamed Changgyeongwon." },
      { era: "modern", year: "1983–1986", ko: "동물원을 과천으로 옮기고 궁으로 복원합니다.", en: "Zoo moved out; palace restored." },
    ],
    people: [r("yeongjo", "영조"), r("sado", "사도세자"), r("jeongjo", "정조"), ft("js-haegyeong", "혜경궁"), pal("changgyeonggung", "창경궁")],
    films: [fm("the-throne", "사도")],
    more: [],
    then: { ko: "창덕궁과 담을 맞댄 ‘동궐’의 한쪽이었습니다.", en: "Half of the 'East Palace' with Changdeokgung." },
    now: { ko: "1909년 지은 대온실이 남아 있고, 명정전은 조선 궁궐 정전 가운데 가장 오래됐습니다.", en: "Myeongjeongjeon: oldest surviving throne hall." },
    stories: [{ ko: "뒤주 사건의 까닭을 두고 정신병설과 당쟁 희생설이 맞섭니다. 『한중록』은 혜경궁의 시각입니다.", en: "Why Sado died is still argued." }],
  },
  {
    id: "deoksugung", kind: "palace", ko: "덕수궁(경운궁)", en: "Deoksugung (Gyeongungung)", lat: 37.5658, lon: 126.9751, lx: 10, ly: 4,
    builder: { ko: "월산대군 집을 1593년 선조가 임시 궁으로. 1611년 경운궁, 1907년 덕수궁", en: "Temporary palace 1593; Gyeongungung 1611; Deoksugung 1907" },
    events: [
      { era: "late", year: "1593", ko: "피란에서 돌아온 선조가 머뭅니다.", en: "Seonjo returns from refuge and stays here." },
      { era: "late", year: "1623", ko: "인조반정 뒤 인조가 즉조당에서 즉위합니다.", en: "Injo enthroned after the coup." },
      { era: "empire", year: "1897년 2월 20일", ko: "고종이 러시아 공사관에서 이곳으로 돌아와 대한제국의 황궁으로 씁니다.", en: "Gojong returns; palace of the Korean Empire." },
      { era: "empire", year: "1919년 1월 21일", ko: "고종이 함녕전에서 승하합니다. 대한문 앞에 슬퍼하는 사람들이 모입니다.", en: "Gojong dies; mourners gather at Daehanmun." },
      { era: "modern", year: "1946–1947", ko: "석조전에서 미소공동위원회가 열립니다.", en: "US–Soviet Joint Commission meets in Seokjojeon." },
    ],
    people: [ft("js-seonjo", "선조"), r("gwanghae", "광해군"), ft("js-injo", "인조"), ft("js-gojong", "고종"), pal("deoksugung", "덕수궁")],
    films: [fm("the-last-princess", "덕혜옹주")],
    more: [],
    then: { ko: "전통 전각과 서양식 석조전이 함께 선 황제의 궁이었습니다.", en: "Hanok halls beside a stone Western palace." },
    now: { ko: "도심 한가운데의 궁궐. 대한문 앞 수문장 교대식이 열립니다.", en: "Guard-changing ceremony at Daehanmun." },
    stories: [{ ko: "고종이 독살됐다는 소문이 3·1운동 직전 크게 퍼졌습니다. 확인된 사실은 아닙니다.", en: "Rumours that Gojong was poisoned — unproven." }],
  },
  {
    id: "gyeonghuigung", kind: "palace", ko: "경희궁", en: "Gyeonghuigung", lat: 37.5714, lon: 126.9684, lx: 0, ly: 18, anchor: "middle",
    photoNote: "일제강점기 유리건판에 찍힌 숭정전입니다(그때 모습).",
    builder: { ko: "광해군, 1617–1620년 경덕궁. 영조가 1760년 경희궁으로 이름을 바꿈", en: "Gwanghaegun, 1617–20; renamed 1760" },
    events: [
      { era: "late", year: "1620", ko: "‘서궐’로 완공되어 여러 왕이 머뭅니다.", en: "Completed as the West Palace." },
      { era: "late", year: "1776", ko: "정조가 숭정문에서 즉위합니다.", en: "Jeongjo enthroned at Sungjeongmun." },
      { era: "empire", year: "1910년대", ko: "일본인 학교(경성중학교)가 들어서며 전각 대부분이 헐리거나 팔려 나갑니다.", en: "Most halls removed for a Japanese school." },
      { era: "modern", year: "1980–2000년대", ko: "발굴 뒤 숭정전 등 일부를 다시 짓습니다.", en: "Partial reconstruction." },
    ],
    people: [r("gwanghae", "광해군"), r("yeongjo", "영조"), r("jeongjo", "정조"), pal("gyeonghuigung", "경희궁")],
    films: [],
    more: [],
    then: { ko: "궁궐 다섯 가운데 하나로, 동궐과 짝을 이루는 서궐이었습니다.", en: "The West Palace." },
    now: { ko: "가장 많이 사라진 궁. 옆에 서울역사박물관이 있습니다.", en: "The most lost palace; Seoul Museum of History next door." },
    stories: [{ ko: "인조의 아버지 정원군 집에 ‘왕기’가 서렸다는 말에 광해군이 그 자리에 궁을 지었다는 이야기.", en: "Built to suppress 'royal energy' — a tale." }],
  },
  {
    id: "jongmyo", kind: "palace", ko: "종묘", en: "Jongmyo Shrine", lat: 37.5744, lon: 126.994, lx: 10, ly: 14,
    builder: { ko: "태조, 1395년. 임진왜란 뒤 1608년 다시 지음", en: "Taejo, 1395; rebuilt 1608" },
    events: [
      { era: "early", year: "1395", ko: "역대 왕과 왕비의 신주를 모시는 사당으로 완공됩니다.", en: "Royal ancestral shrine completed." },
      { era: "late", year: "1608", ko: "불탄 정전을 다시 짓고, 모실 신위가 늘며 여러 번 늘려 짓습니다.", en: "Rebuilt and extended over time." },
      { era: "modern", year: "1995·2001", ko: "종묘가 세계유산, 종묘제례·제례악이 인류무형유산이 됩니다.", en: "UNESCO heritage; rites recognised 2001." },
    ],
    people: [r("taejo", "태조"), { href: "/palaces#jongmyo", label: "궁궐 · 종묘" }],
    films: [],
    more: [tl("founding-joseon", "조선 건국")],
    then: { ko: "‘종묘사직’이 곧 나라를 뜻할 만큼 중요한 제사 공간이었습니다.", en: "'Jongmyo and Sajik' meant the state itself." },
    now: { ko: "해마다 5월 첫 일요일 종묘대제가 열립니다.", en: "Grand rite every May." },
    stories: [],
  },
  {
    id: "sajikdan", kind: "palace", ko: "사직단", en: "Sajikdan Altar", lat: 37.5759, lon: 126.9681, lx: -10, ly: 4, anchor: "end",
    builder: { ko: "태조, 1395년", en: "Taejo, 1395" },
    events: [
      { era: "early", year: "1395", ko: "땅의 신(사)과 곡식의 신(직)에게 제사하는 단을 쌓습니다.", en: "Altars to the gods of earth and grain." },
      { era: "empire", year: "일제강점기", ko: "제사가 끊기고 공원으로 바뀝니다.", en: "Rites stopped; turned into a park." },
    ],
    people: [r("taejo", "태조"), { href: "/palaces#sajik", label: "궁궐 · 사직" }],
    films: [],
    more: [],
    then: { ko: "궁 서쪽의 사직, 동쪽의 종묘가 짝을 이뤘습니다.", en: "Paired with Jongmyo to the east." },
    now: { ko: "제단이 남아 있고, 주변 복원이 진행 중입니다.", en: "Altars survive; restoration ongoing." },
    stories: [],
  },
  {
    id: "sungnyemun", kind: "gate", ko: "숭례문(남대문)", en: "Sungnyemun (Namdaemun)", lat: 37.56, lon: 126.9753, lx: 10, ly: 4,
    builder: { ko: "태조, 1398년 완공. 세종 때 1447년 다시 지음", en: "Completed 1398; rebuilt 1447" },
    events: [
      { era: "early", year: "1398", ko: "도성의 남쪽 정문으로 완공됩니다.", en: "South gate completed." },
      { era: "empire", year: "1907–1908", ko: "전차와 길을 낸다며 양옆 성벽이 헐립니다.", en: "Flanking walls demolished." },
      { era: "modern", year: "2008년 2월 10일", ko: "방화로 문루 2층이 무너지고, 2013년 5월 4일 복구됩니다.", en: "Arson fire; restored 2013." },
    ],
    people: [r("taejo", "태조"), r("sejong", "세종"), gate("sungnyemun", "숭례문")],
    films: [],
    more: [],
    then: { ko: "남쪽에서 도성에 드는 큰 문, 아침저녁으로 여닫았습니다.", en: "Opened and shut with the bell." },
    now: { ko: "빌딩 사이 섬처럼 서 있습니다.", en: "An island amid traffic." },
    stories: [{ ko: "현판을 세로로 단 것이 관악산의 화기를 막으려는 뜻이었다는 이야기.", en: "The vertical name board blocks fire energy — tale." }],
  },
  {
    id: "heunginjimun", kind: "gate", ko: "흥인지문(동대문)", en: "Heunginjimun (Dongdaemun)", lat: 37.5711, lon: 127.0095, lx: -10, ly: -6, anchor: "end",
    builder: { ko: "태조, 1398년. 지금 문루는 고종 때 1869년", en: "1398; present tower 1869" },
    events: [
      { era: "early", year: "1398", ko: "도성의 동쪽 정문으로 완공됩니다.", en: "East gate completed." },
      { era: "late", year: "1869", ko: "고종 때 다시 지어 지금 모습이 됩니다. 사대문 가운데 유일하게 옹성을 둘렀습니다.", en: "Rebuilt; the only gate with a curtain wall." },
    ],
    people: [gate("heunginjimun", "흥인지문")],
    films: [],
    more: [],
    then: { ko: "낮은 땅이라 반달 모양 옹성으로 방어를 보강했습니다.", en: "Low ground, so an outer half-moon wall." },
    now: { ko: "동대문시장과 DDP 사이의 교차로에 있습니다.", en: "Beside the Dongdaemun markets." },
    stories: [{ ko: "동쪽 땅 기운이 약해 이름에 ‘지(之)’를 넣어 네 글자로 했다는 이야기.", en: "The extra character strengthens the east — tale." }],
  },
  {
    id: "donuimun", kind: "gate", ko: "돈의문 터(서대문)", en: "Donuimun site (Seodaemun)", lat: 37.5683, lon: 126.9675, lx: -10, ly: 14, anchor: "end",
    photoNote: "헐리기 전의 돈의문 옛 사진입니다.",
    builder: { ko: "1396년 처음, 1422년 지금 자리에 다시 지음(그래서 ‘새문’)", en: "1396; rebuilt here 1422 ('New Gate')" },
    events: [
      { era: "early", year: "1422", ko: "자리를 옮겨 다시 지으며 ‘새문’이라 불립니다.", en: "Rebuilt; nicknamed Saemun." },
      { era: "empire", year: "1915", ko: "일제가 도로를 넓힌다며 헐어 없앱니다.", en: "Demolished for road widening." },
      { era: "modern", year: "2019", ko: "증강현실(AR)로 모습을 되살리는 디지털 복원이 공개됩니다.", en: "Digital AR restoration." },
    ],
    people: [gate("donuimun", "돈의문")],
    films: [],
    more: [],
    then: { ko: "의주로 가는 서쪽 큰길의 문이었습니다.", en: "Gate of the road to Uiju and China." },
    now: { ko: "사대문 중 유일하게 실물이 없습니다. 근처에 돈의문박물관마을이 있습니다.", en: "The only great gate that no longer stands." },
    stories: [],
  },
  {
    id: "sukjeongmun", kind: "gate", ko: "숙정문(북대문)", en: "Sukjeongmun", lat: 37.596, lon: 126.981, lx: 10, ly: 4,
    builder: { ko: "1396년. 지금 문루는 1976년 복원", en: "1396; tower rebuilt 1976" },
    events: [
      { era: "early", year: "1396", ko: "북쪽 대문으로 세웠지만 평소에는 닫아 두었습니다.", en: "North gate, usually kept shut." },
      { era: "modern", year: "1968·2006", ko: "1·21 사태 뒤 북악산 출입이 막혔다가 2006년부터 다시 열립니다.", en: "Closed after 1968; reopened 2006." },
    ],
    people: [gate("sukjeongmun", "숙정문")],
    films: [],
    more: [],
    then: { ko: "가뭄에 비를 빌 때 열고 남대문을 닫았다고 합니다.", en: "Opened in droughts to pray for rain." },
    now: { ko: "북악산 성곽길 탐방로 위에 있습니다.", en: "On the Bugaksan wall trail." },
    stories: [{ ko: "문을 열어 두면 도성 여자들의 풍기가 문란해진다는 속설로 닫았다는 이야기(『오주연문장전산고』).", en: "Kept shut for a folk superstition." }],
  },
  {
    id: "hyehwamun", kind: "gate", ko: "혜화문(동소문)", en: "Hyehwamun", lat: 37.5866, lon: 127.0028, lx: -10, ly: 4, anchor: "end",
    builder: { ko: "1396년. 1994년 근처에 다시 지음", en: "1396; rebuilt 1994" },
    events: [
      { era: "early", year: "1511", ko: "홍화문에서 혜화문으로 이름이 바뀝니다.", en: "Renamed Hyehwamun." },
      { era: "empire", year: "1928·1938", ko: "문루가 헐리고, 전찻길을 내며 홍예도 없어집니다.", en: "Removed for the tramway." },
      { era: "modern", year: "1994", ko: "원래 자리 가까이 언덕 위에 다시 짓습니다.", en: "Rebuilt nearby." },
    ],
    people: [gate("hyehwamun", "혜화문")],
    films: [],
    more: [],
    then: { ko: "북동쪽으로 나가는 작은 문이었습니다.", en: "Small north-east gate." },
    now: { ko: "길 옆 언덕에 올라앉아 있습니다.", en: "Perched above the road." },
    stories: [],
  },
  {
    id: "gwanghuimun", kind: "gate", ko: "광희문(시구문)", en: "Gwanghuimun", lat: 37.5649, lon: 127.0091, lx: -10, ly: 4, anchor: "end",
    builder: { ko: "1396년. 1975년 홍예 복원, 2014년 개방", en: "1396; restored 1975, opened 2014" },
    events: [
      { era: "early", year: "1396", ko: "남동쪽 작은 문. 도성 안 장례 행렬이 이 문으로 나가 ‘시구문’이라 불렸습니다.", en: "Funeral gate, hence 'Sigumun'." },
      { era: "modern", year: "2014", ko: "문루에 오를 수 있게 개방됩니다.", en: "Opened to visitors." },
    ],
    people: [gate("gwanghuimun", "광희문")],
    films: [],
    more: [],
    then: { ko: "도성 밖 공동묘지로 가는 길목이었습니다.", en: "Road to the cemeteries." },
    now: { ko: "작은 공원 안에 있습니다.", en: "In a small park." },
    stories: [],
  },
  {
    id: "changuimun", kind: "gate", ko: "창의문(자하문)", en: "Changuimun", lat: 37.5925, lon: 126.9665, lx: 10, ly: 4,
    builder: { ko: "1396년. 문루는 영조 때 1741년 다시 지음", en: "1396; tower 1741" },
    events: [
      { era: "late", year: "1623", ko: "인조반정 군사가 이 문을 부수고 도성에 들어와 광해군을 몰아냅니다.", en: "Injo's coup troops break in here." },
      { era: "late", year: "1741", ko: "문루를 다시 지어 사소문 중 유일하게 옛 문루가 남습니다.", en: "The only small gate with its old tower." },
    ],
    people: [r("gwanghae", "광해군"), ft("js-injo", "인조"), gate("changuimun", "창의문")],
    films: [fm("masquerade", "광해, 왕이 된 남자")],
    more: [],
    then: { ko: "인왕산과 북악산 사이 고개의 문이었습니다.", en: "Pass between two mountains." },
    now: { ko: "부암동 쪽 성곽길의 출발점입니다.", en: "Start of the Bugaksan trail." },
    stories: [],
  },
  {
    id: "bosingak", kind: "place", ko: "보신각·운종가", en: "Bosingak & Unjongga", lat: 37.57, lon: 126.9835, lx: -8, ly: 16, anchor: "end",
    builder: { ko: "종루는 태조 때. 운종가 시전 행랑은 태종 때(1410년대). 지금 누각은 1979년", en: "Bell tower from Taejo; market rows 1410s; pavilion 1979" },
    events: [
      { era: "early", year: "1410년대", ko: "종로 큰길 양쪽에 나라가 지은 시전 행랑이 늘어섭니다(구름처럼 사람이 모이는 거리 ‘운종가’).", en: "State market rows line Jongno." },
      { era: "early", year: "조선 내내", ko: "밤 10시쯤 28번(인정) 쳐서 성문을 닫고, 새벽 4시쯤 33번(파루) 쳐서 엽니다.", en: "28 strokes close the gates, 33 open them." },
      { era: "empire", year: "1919년 3월 1일", ko: "탑골공원을 나선 만세 행렬이 종로로 쏟아집니다.", en: "March 1st marchers pour onto Jongno." },
      { era: "modern", year: "1953–", ko: "해마다 섣달그믐 밤 제야의 종을 33번 칩니다.", en: "New Year's Eve bell since 1953." },
    ],
    people: [],
    films: [],
    more: [],
    then: { ko: "도성 시간을 알리고 상업이 모이던 한양의 한가운데였습니다.", en: "The city's clock and marketplace." },
    now: { ko: "옛 종(1468년)은 국립중앙박물관에 있고, 지금 종은 새로 만든 것입니다.", en: "The 1468 bell is in the National Museum." },
    stories: [],
  },
  {
    id: "gwanghwamun", kind: "place", ko: "육조거리·광화문광장", en: "Yukjo-geori / Gwanghwamun Square", lat: 37.5725, lon: 126.9769, lx: 10, ly: 4,
    builder: { ko: "조선 초 의정부와 육조 관청이 늘어선 큰길. 광장은 2009년 8월 1일 개장", en: "Ministries street from 1395; square opened 2009" },
    events: [
      { era: "early", year: "1395 무렵", ko: "광화문 앞 큰길 양쪽에 의정부와 이·호·예·병·형·공조가 들어섭니다.", en: "State Council and Six Ministries line the road." },
      { era: "modern", year: "1968", ko: "이순신 장군 동상이 섭니다.", en: "Admiral Yi statue erected." },
      { era: "modern", year: "2009년 10월 9일", ko: "한글날에 세종대왕 동상이 섭니다. 2022년 광장이 넓게 다시 열립니다.", en: "King Sejong statue; square rebuilt 2022." },
    ],
    people: [r("sejong", "세종"), r("yi-sun-sin", "이순신"), d("yi-sun-sin", "이순신")],
    films: [fm("roaring-currents", "명량"), CHECK],
    more: [tl("hunminjeongeum-promulgated", "훈민정음 반포")],
    then: { ko: "나라의 관청가였습니다.", en: "Joseon's government row." },
    now: { ko: "집회와 축제가 열리는 서울의 대표 광장입니다.", en: "Seoul's main civic square." },
    stories: [],
  },
  {
    id: "hwangudan", kind: "place", ko: "환구단", en: "Hwangudan Altar", lat: 37.5649, lon: 126.9799, lx: 10, ly: 4,
    builder: { ko: "고종, 1897년(옛 남별궁 자리). 황궁우 1899년", en: "Gojong, 1897; Hwanggungu 1899" },
    events: [
      { era: "empire", year: "1897년 10월 12일", ko: "고종이 하늘에 제사하고 황제에 즉위합니다. 이튿날 국호를 대한으로 선포합니다.", en: "Gojong crowned emperor; Korean Empire proclaimed." },
      { era: "empire", year: "1913", ko: "일제가 제단을 헐고 이듬해 조선호텔을 짓습니다.", en: "Altar razed for the Chosen Hotel." },
    ],
    people: [ft("js-gojong", "고종")],
    films: [],
    more: [],
    then: { ko: "황제만이 하늘에 제사할 수 있다는 뜻을 담은 제단이었습니다.", en: "Only an emperor sacrifices to Heaven." },
    now: { ko: "호텔 옆에 팔각 3층 황궁우와 돌북이 남아 있습니다.", en: "Only the octagonal Hwanggungu remains." },
    stories: [],
  },
  {
    id: "seodaemun", kind: "place", ko: "서대문형무소", en: "Seodaemun Prison", lat: 37.5745, lon: 126.9563, lx: 0, ly: 20, anchor: "middle",
    builder: { ko: "일제(통감부), 1908년 10월 21일 경성감옥으로 문 엶", en: "Opened by the Japanese Residency-General, 1908" },
    events: [
      { era: "empire", year: "1908", ko: "경성감옥으로 문을 열고, 1923년 서대문형무소가 됩니다.", en: "Opens; renamed 1912 and 1923." },
      { era: "empire", year: "1911", ko: "김구가 안악 사건으로 갇힙니다.", en: "Kim Gu imprisoned." },
      { era: "empire", year: "1920년 9월 28일", ko: "3·1운동으로 갇힌 유관순이 옥중에서 숨집니다.", en: "Yu Gwan-sun dies in prison." },
      { era: "modern", year: "1987·1998", ko: "구치소가 의왕으로 옮겨 가고, 1998년 역사관으로 문을 엽니다.", en: "Closed 1987; museum 1998." },
    ],
    people: [d("yu-gwan-sun", "유관순"), d("kim-gu", "김구")],
    films: [CHECK],
    more: [],
    then: { ko: "독립운동가와, 해방 뒤에는 민주화 운동가가 갇힌 감옥이었습니다.", en: "Prison for independence and democracy activists." },
    now: { ko: "서대문독립공원 안의 역사관입니다.", en: "History museum in Independence Park." },
    stories: [{ ko: "유관순의 마지막 모습과 고문에 관한 자세한 이야기는 증언마다 다릅니다.", en: "Accounts of Yu's last days vary." }],
  },
  {
    id: "tapgol", kind: "place", ko: "탑골공원(원각사 터)", en: "Tapgol Park", lat: 37.5713, lon: 126.9883, lx: 10, ly: 4,
    builder: { ko: "세조가 1465년 원각사를 세우고 1467년 10층 석탑. 공원은 1897년 무렵", en: "Wongaksa 1465, pagoda 1467; park c. 1897" },
    events: [
      { era: "early", year: "1504", ko: "연산군이 원각사를 없애고 기생을 관리하는 관청으로 씁니다.", en: "Yeonsangun turns the temple into a gisaeng office." },
      { era: "empire", year: "1919년 3월 1일 오후 2시", ko: "학생과 시민이 팔각정에서 독립선언서를 읽고 만세를 부릅니다. 근처 태화관에서는 민족대표들이 선언식을 엽니다.", en: "Declaration read; nearby, national representatives meet at Taehwagwan." },
    ],
    people: [r("yeonsangun", "연산군"), d("yu-gwan-sun", "유관순")],
    films: [fm("king-and-the-clown", "왕의 남자")],
    more: [],
    then: { ko: "서울의 첫 근대 공원으로 꼽힙니다.", en: "Often called Seoul's first modern park." },
    now: { ko: "원각사지 10층 석탑이 유리 보호각 안에 있습니다.", en: "The pagoda stands in a glass shelter." },
    stories: [{ ko: "팔각정에서 선언서를 읽은 사람이 정재용이라는 이야기가 널리 알려졌지만, 기록에 따라 다른 이름도 나옵니다.", en: "Who read the declaration varies by account." }],
  },
  {
    id: "myeongdong", kind: "place", ko: "명동성당", en: "Myeongdong Cathedral", lat: 37.5633, lon: 126.9873, lx: 10, ly: 4,
    builder: { ko: "조선 천주교회(코스트 신부 설계), 1898년 5월 29일 축성", en: "Consecrated 29 May 1898" },
    events: [
      { era: "late", year: "1784", ko: "이 근처 김범우의 집(명례방)에서 천주교 신자 모임이 열립니다.", en: "Early Catholic meetings nearby." },
      { era: "empire", year: "1898", ko: "고딕 양식 벽돌 성당이 완공됩니다.", en: "Gothic brick cathedral completed." },
      { era: "modern", year: "1987년 6월", ko: "6월 민주항쟁 때 시위대의 농성장이 됩니다.", en: "Sit-in site in the June Struggle." },
    ],
    people: [],
    films: [],
    more: [],
    then: { ko: "언덕 위에서 궁궐을 내려다본다고 조정과 갈등이 있었습니다.", en: "Its hilltop height upset the court." },
    now: { ko: "한국 천주교의 중심 성당입니다.", en: "Korea's Catholic cathedral." },
    stories: [],
  },
  {
    id: "russian", kind: "place", ko: "구 러시아 공사관", en: "Former Russian Legation", lat: 37.5682, lon: 126.9711, lx: -8, ly: -6, anchor: "end",
    builder: { ko: "러시아, 1890년(사바틴 설계)", en: "Russia, 1890" },
    events: [
      { era: "empire", year: "1896년 2월 11일–1897년 2월 20일", ko: "아관파천. 을미사변 뒤 신변을 걱정한 고종이 왕세자와 함께 이곳으로 옮겨 1년을 지냅니다.", en: "Gojong takes refuge here for a year." },
      { era: "modern", year: "1950", ko: "한국전쟁 때 건물 대부분이 부서지고 탑만 남습니다.", en: "Destroyed in the Korean War; tower survives." },
    ],
    people: [ft("js-gojong", "고종"), ft("js-sunjong", "순종(왕세자)")],
    films: [],
    more: [],
    then: { ko: "정동 언덕 위 흰 탑의 공사관이었습니다.", en: "Hilltop legation with a white tower." },
    now: { ko: "정동공원에 탑만 서 있습니다.", en: "Only the tower stands." },
    stories: [{ ko: "고종이 궁녀의 가마를 타고 몰래 빠져나왔다는 이야기가 전합니다.", en: "Escaped in a court lady's palanquin — tale." }],
  },
  {
    id: "jungmyeongjeon", kind: "place", ko: "중명전", en: "Jungmyeongjeon", lat: 37.566, lon: 126.9714, lx: -10, ly: 14, anchor: "end",
    builder: { ko: "1899년 황실 도서관으로. 1901년 불탄 뒤 다시 지음", en: "Imperial library, 1899; rebuilt 1901" },
    events: [{ era: "empire", year: "1905년 11월 17일", ko: "이토 히로부미가 군대를 동원한 가운데 을사늑약이 강제됩니다. 고종은 끝내 재가하지 않았습니다.", en: "The 1905 protectorate treaty forced here." }],
    people: [ft("js-gojong", "고종"), d("an-jung-geun", "안중근")],
    films: [fm("harbin", "하얼빈"), CHECK],
    more: [],
    then: { ko: "덕수궁 안에 있던 서양식 2층 건물입니다.", en: "A Western building inside the palace." },
    now: { ko: "2010년 복원해 전시관으로 씁니다.", en: "Restored museum (2010)." },
    stories: [],
  },
  {
    id: "jeongdongchurch", kind: "place", ko: "정동제일교회", en: "Chungdong First Methodist Church", lat: 37.5659, lon: 126.9726, lx: 10, ly: 16,
    builder: { ko: "아펜젤러 선교사의 교회, 1897년 벧엘 예배당 완공", en: "Appenzeller's Bethel Chapel, 1897" },
    events: [
      { era: "empire", year: "1897", ko: "한국에 남은 가장 오래된 개신교 예배당이 완공됩니다.", en: "Oldest surviving Protestant church building." },
      { era: "empire", year: "1919년 3월 1일", ko: "대한문 앞을 지난 만세 행렬 일부가 외국 공관이 모인 정동 거리로 갑니다.", en: "Marchers head into the legation quarter." },
      { era: "empire", year: "1920", ko: "이화학당 학생이던 유관순의 장례가 이 교회에서 치러집니다.", en: "Yu Gwan-sun's funeral is held here." },
    ],
    people: [d("yu-gwan-sun", "유관순")],
    films: [],
    more: [],
    then: { ko: "배재학당·이화학당과 함께 정동의 새 학교·교회 거리였습니다.", en: "Mission schools and churches quarter." },
    now: { ko: "붉은 벽돌 예배당이 정동길에 남아 있습니다.", en: "Red-brick chapel on Jeongdong-gil." },
    stories: [],
  },
  {
    id: "seoulstation", kind: "place", ko: "옛 서울역", en: "Old Seoul Station", lat: 37.5559, lon: 126.9723, lx: -10, ly: 4, anchor: "end",
    builder: { ko: "남대문정거장 1900년, 지금 옛 역사 건물은 1925년", en: "Station 1900; building 1925" },
    events: [
      { era: "empire", year: "1919년 9월 2일", ko: "강우규 의사가 새 총독 사이토 마코토에게 폭탄을 던집니다(남대문역).", en: "Kang Woo-kyu bombs the new Governor-General." },
      { era: "empire", year: "1925", ko: "경성역 건물이 완공됩니다.", en: "Gyeongseong Station building completed." },
      { era: "modern", year: "1947·2011", ko: "서울역으로 이름을 바꾸고, 2011년 문화역서울284로 다시 엽니다.", en: "Renamed 1947; arts venue since 2011." },
    ],
    people: [],
    films: [],
    more: [],
    then: { ko: "경의선·경부선이 모이는 관문 역이었습니다.", en: "Gateway rail station." },
    now: { ko: "복합문화공간 ‘문화역서울284’입니다.", en: "Culture Station Seoul 284." },
    stories: [],
  },
  {
    id: "namsan", kind: "place", ko: "남산(봉수대·조선신궁 터)", en: "Namsan (beacon & shrine site)", lat: 37.5506, lon: 126.9877, lx: 10, ly: 4,
    builder: { ko: "봉수대는 조선 초, 1895년까지 사용. 조선신궁은 일제가 1925년", en: "Beacons until 1895; Japanese shrine 1925" },
    events: [
      { era: "early", year: "조선 초", ko: "전국 다섯 봉수로의 마지막 봉수대가 목멱산(남산)에 섭니다.", en: "Terminus of five beacon lines." },
      { era: "empire", year: "1925", ko: "일제가 조선신궁을 세우고 참배를 강요합니다. 총독부도 1926년까지 남산 기슭에 있었습니다.", en: "Shinto shrine built; forced worship." },
      { era: "modern", year: "1945·1970", ko: "해방 직후 신궁을 없애고, 그 자리에 1970년 안중근의사기념관이 섭니다.", en: "Shrine removed; Ahn Jung-geun memorial (1970)." },
    ],
    people: [d("an-jung-geun", "안중근"), d("kim-gu", "김구(백범광장 동상)")],
    films: [fm("hero", "영웅"), fm("harbin", "하얼빈"), CHECK],
    more: [],
    then: { ko: "도성의 남쪽 울타리이자 봉화가 오르던 산입니다.", en: "Southern guardian mountain." },
    now: { ko: "봉수대는 1993년 복원했고, 꼭대기에 N서울타워가 있습니다.", en: "Restored beacon; N Seoul Tower." },
    stories: [{ ko: "일제가 산마다 쇠말뚝을 박아 기운을 끊었다는 이야기는 널리 퍼졌지만 상당수는 측량 표지 등으로 밝혀졌습니다.", en: "'Iron stakes' tales are mostly unproven." }],
  },
  {
    id: "cheonggyecheon", kind: "place", ko: "청계천·수표교 터", en: "Cheonggyecheon / Supyogyo", lat: 37.5687, lon: 126.9906, lx: 10, ly: 16,
    photoNote: "수표교는 1959년 장충단공원으로 옮겨졌습니다. 사진은 지금 자리의 수표교입니다.",
    builder: { ko: "태종이 1412년 개천을 정비. 수표는 세종 때 1441년, 영조가 1760년 대준천", en: "Dredged 1412; water gauge 1441; great dredging 1760" },
    events: [
      { era: "early", year: "1441", ko: "세종 때 다리 옆에 물높이를 재는 수표를 세웁니다.", en: "Water gauge set up." },
      { era: "late", year: "1760", ko: "영조가 대대적인 준천(바닥 파기) 공사를 벌입니다.", en: "Yeongjo's great dredging." },
      { era: "modern", year: "1958–1978·2005", ko: "복개되고 고가도로가 올라갔다가, 2005년 10월 1일 다시 물길이 열립니다.", en: "Covered over, then restored in 2005." },
    ],
    people: [r("sejong", "세종"), r("yeongjo", "영조")],
    films: [],
    more: [],
    then: { ko: "도성 한가운데를 동서로 흐르며 북촌과 남촌을 갈랐습니다.", en: "Divided north and south of the city." },
    now: { ko: "산책로가 된 복원 하천입니다.", en: "A restored urban stream." },
    stories: [],
  },
  {
    id: "unhyeongung", kind: "place", ko: "운현궁", en: "Unhyeongung", lat: 37.5763, lon: 126.9867, lx: 10, ly: -6,
    builder: { ko: "흥선대원군의 사저", en: "Residence of the Heungseon Daewongun" },
    events: [
      { era: "late", year: "1852–1863", ko: "고종이 태어나 왕위에 오를 때까지 자랍니다.", en: "Gojong born and raised here." },
      { era: "late", year: "1866", ko: "고종과 명성황후의 가례(혼례)가 노락당에서 치러집니다.", en: "Royal wedding of Gojong and Queen Min." },
    ],
    people: [ft("js-heungseon", "흥선대원군"), ft("js-gojong", "고종"), ft("js-empress", "명성황후")],
    films: [],
    more: [],
    then: { ko: "섭정 대원군의 권력이 모이던 집이었습니다.", en: "Power centre of the regent." },
    now: { ko: "노안당·노락당·이로당이 남아 공개됩니다.", en: "Open to visitors." },
    stories: [],
  },
  {
    id: "independence", kind: "place", ko: "독립문", en: "Independence Gate", lat: 37.5722, lon: 126.9594, lx: 10, ly: 4,
    builder: { ko: "독립협회(서재필 등), 1896년 11월 21일 정초, 1897년 완공", en: "Independence Club, 1896–97" },
    events: [
      { era: "empire", year: "1896–1897", ko: "청나라 사신을 맞던 영은문을 헐고 그 자리 근처에 세웁니다. 청에서의 독립을 뜻합니다.", en: "Built where the gate for Chinese envoys stood." },
      { era: "modern", year: "1979", ko: "도로 공사로 약 70m 옮겨 세웁니다.", en: "Moved about 70 m for a road." },
    ],
    people: [ft("js-gojong", "고종")],
    films: [],
    more: [],
    then: { ko: "앞에 영은문 주춧돌 두 개가 지금도 남아 있습니다.", en: "Yeongeunmun pillar bases remain." },
    now: { ko: "서대문독립공원 입구에 있습니다.", en: "At Independence Park." },
    stories: [{ ko: "독립문이 일본으로부터의 독립을 기념한다는 오해가 흔합니다. 실제로는 청에서의 독립입니다.", en: "Not independence from Japan, but from Qing." }],
  },
  {
    id: "gyeonggyojang", kind: "place", ko: "경교장", en: "Gyeonggyojang", lat: 37.5689, lon: 126.966, lx: -10, ly: -6, anchor: "end",
    photoNote: "사진은 복원된 경교장 내부입니다.",
    builder: { ko: "1938년 개인 저택(최창학)으로 지음", en: "Private mansion, 1938" },
    events: [
      { era: "modern", year: "1945–1949", ko: "귀국한 김구가 머물며 임시정부 요인들이 모입니다.", en: "Kim Gu's residence after liberation." },
      { era: "modern", year: "1949년 6월 26일", ko: "김구가 이곳에서 안두희의 총에 맞아 세상을 떠납니다.", en: "Kim Gu assassinated here." },
    ],
    people: [d("kim-gu", "김구")],
    films: [],
    more: [],
    then: { ko: "임시정부의 마지막 청사 노릇을 했습니다.", en: "De facto last seat of the Provisional Government." },
    now: { ko: "병원 안에 있으며 2013년 복원해 공개합니다.", en: "Restored 2013, inside a hospital." },
    stories: [{ ko: "암살 배후가 누구였는지는 지금도 밝혀지지 않았습니다.", en: "Who ordered the killing remains unknown." }],
  },
];

export const SEOUL_ROUTES: SeoulRoute[] = [
  {
    id: "king", era: "early", ko: "조선 왕의 하루", en: "A day in the life of a Joseon king", color: "#a34732",
    note: "실록과 의궤에 나오는 일과를 궁과 도성 곳곳에 펼친 산책길입니다. 하루에 이 모든 곳을 다닌 것은 아닙니다. A day's duties spread across the city.",
    steps: [
      { pin: "gyeongbokgung", time: "새벽", ko: "일어나 웃어른께 문안하고, 편전(사정전)에서 신하들과 상참·경연을 합니다.", en: "Dawn greetings, then morning council and royal lecture." },
      { pin: "gwanghwamun", time: "오전", ko: "광화문 밖 육조거리의 관청이 왕명을 받아 일을 나눕니다.", en: "The ministries carry out orders." },
      { pin: "sajikdan", time: "때가 되면", ko: "사직단에서 땅과 곡식의 신께 풍년을 빕니다.", en: "Rites for earth and grain." },
      { pin: "jongmyo", time: "제삿날", ko: "종묘에서 조상께 제사를 올립니다.", en: "Ancestral rites at Jongmyo." },
      { pin: "changdeokgung", time: "오후", ko: "후원에서 책을 읽거나 활을 쏩니다. 정조는 규장각 학자들과 공부했습니다.", en: "Study and archery in the rear garden." },
      { pin: "bosingak", time: "밤 10시쯤", ko: "인정 종이 28번 울리면 도성 문이 닫힙니다.", en: "The curfew bell closes the gates." },
    ],
  },
  {
    id: "march1", era: "empire", ko: "3·1운동의 날", en: "March 1, 1919", color: "#1f3b57",
    steps: [
      { pin: "tapgol", time: "오후 2시", ko: "학생과 시민이 독립선언서를 읽습니다. 근처 태화관에서는 민족대표들이 선언식을 엽니다.", en: "The Declaration is read." },
      { pin: "bosingak", time: "오후", ko: "만세 행렬이 종로로 나섭니다.", en: "Marchers fill Jongno." },
      { pin: "deoksugung", time: "오후", ko: "고종의 빈소가 있는 대한문 앞에서 만세를 부릅니다.", en: "Cheers at Daehanmun, by Gojong's bier." },
      { pin: "jeongdongchurch", time: "오후", ko: "일부는 외국 공관이 모인 정동 거리로 향합니다.", en: "Into the legation quarter." },
      { pin: "namsan", time: "저녁 무렵", ko: "남산 기슭 총독부 쪽으로 가던 행렬은 경찰과 군대에 막힙니다.", en: "Blocked on the way to the Government-General." },
      { pin: "seodaemun", time: "그 뒤", ko: "체포된 사람들이 서대문감옥에 갇힙니다. 유관순도 이듬해 이곳에서 숨집니다.", en: "Arrested protesters jailed at Seodaemun." },
    ],
  },
  {
    id: "jeongdong", era: "empire", ko: "대한제국 정동길", en: "Korean Empire: Jeongdong walk", color: "#6d4c8a",
    steps: [
      { pin: "russian", time: "1896년 2월", ko: "아관파천. 고종이 러시아 공사관으로 옮깁니다.", en: "Gojong flees to the Russian legation." },
      { pin: "independence", time: "1896년 11월", ko: "독립협회가 독립문을 짓기 시작합니다.", en: "Independence Gate begun." },
      { pin: "deoksugung", time: "1897년 2월", ko: "고종이 경운궁으로 돌아옵니다.", en: "Gojong returns to Gyeongungung." },
      { pin: "jeongdongchurch", time: "1897년", ko: "정동에 벽돌 예배당이 섭니다. 학교와 공사관이 모인 거리입니다.", en: "Churches, schools and legations." },
      { pin: "hwangudan", time: "1897년 10월 12일", ko: "환구단에서 황제에 즉위하고 대한제국을 선포합니다.", en: "Proclamation of the Korean Empire." },
      { pin: "jungmyeongjeon", time: "1905년 11월 17일", ko: "중명전에서 을사늑약이 강제됩니다.", en: "The protectorate treaty forced." },
    ],
  },
];

export const SEOUL_STORY_NOTE = "‘전해지는 이야기’는 널리 알려졌지만 확인되지 않았거나 기록마다 다른 내용입니다.";

export function seoulLinksFor(kind: "rulers" | "defenders" | "palaces", slug: string): SLink[] {
  const href = `/${kind}/${slug}`;
  const hit = SEOUL_PINS.filter((p) => p.people.some((l) => l.href === href));
  if (!hit.length) return [];
  return [{ href: `/seoul#${hit[0].id}`, label: `서울 시내 탐험에서 보기 (${hit.map((p) => p.ko.replace(/\(.*\)/, "")).slice(0, 3).join("·")})` }];
}
