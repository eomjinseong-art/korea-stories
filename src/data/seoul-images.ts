// Wikimedia Commons 사진(퍼블릭 도메인·CC·공공누리 제1유형). 카드마다 작가와 라이선스를 표시합니다.
export type SeoulImage = { src: string; w: number; h: number; author: string; license: string; licenseUrl: string; source: string };
export const SEOUL_IMAGES: Record<string, SeoulImage> = {
 "gyeongbokgung": {
  "src": "/seoul/gyeongbokgung.jpg",
  "w": 800,
  "h": 450,
  "author": "Basile Morin",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "source": "https://commons.wikimedia.org/wiki/File:Front_view_of_the_Imperial_Throne_Hall_Geunjeongjeon_at_Gyeongbokgung_Palace_with_blue_sky_in_Seoul.jpg"
 },
 "changdeokgung": {
  "src": "/seoul/changdeokgung.jpg",
  "w": 800,
  "h": 334,
  "author": "Sadopaul",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "source": "https://commons.wikimedia.org/wiki/File:Changdeokgung_Buyongji_in_2026.jpg"
 },
 "changgyeonggung": {
  "src": "/seoul/changgyeonggung.jpg",
  "w": 800,
  "h": 535,
  "author": "Noh Mun Duek",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "source": "https://commons.wikimedia.org/wiki/File:Myeongjeongjeon(%EB%AA%85%EC%A0%95%EC%A0%84).jpg"
 },
 "deoksugung": {
  "src": "/seoul/deoksugung.jpg",
  "w": 800,
  "h": 449,
  "author": "이창로",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "source": "https://commons.wikimedia.org/wiki/File:Junghwajeon_-_Deoksugung_Palace.jpg"
 },
 "gyeonghuigung": {
  "src": "/seoul/gyeonghuigung.jpg",
  "w": 800,
  "h": 590,
  "author": "조선총독부(일제강점기 유리건판)",
  "license": "Public domain",
  "licenseUrl": "",
  "source": "https://commons.wikimedia.org/wiki/File:B004810_%EA%B2%BD%ED%9D%AC%EA%B6%81%EC%88%AD%EC%A0%95%EC%A0%84%EC%A0%95%EB%A9%B4.jpg"
 },
 "jongmyo": {
  "src": "/seoul/jongmyo.jpg",
  "w": 800,
  "h": 426,
  "author": "Cultural Heritage Administration",
  "license": "KOGL Type 1",
  "licenseUrl": "http://www.kogl.or.kr/info/licenseType1.do",
  "source": "https://commons.wikimedia.org/wiki/File:Jeongjeon,_Jongmyo_(Summer,_2013).jpg"
 },
 "sajikdan": {
  "src": "/seoul/sajikdan.jpg",
  "w": 800,
  "h": 533,
  "author": "Eggmoon",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Sajikdan_Shrine_in_Seoul,_Korea_02.jpg"
 },
 "sungnyemun": {
  "src": "/seoul/sungnyemun.jpg",
  "w": 800,
  "h": 562,
  "author": "DoulosCore",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Sungnyemun_Gate,_front,_2013.jpg"
 },
 "heunginjimun": {
  "src": "/seoul/heunginjimun.jpg",
  "w": 800,
  "h": 600,
  "author": "Katsutoshi Seki",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Heunginjimun_(Dongdaemun).jpg"
 },
 "donuimun": {
  "src": "/seoul/donuimun.jpg",
  "w": 800,
  "h": 533,
  "author": "오가와 가즈마사(小川一眞), 1915년 철거 전",
  "license": "Public domain",
  "licenseUrl": "",
  "source": "https://commons.wikimedia.org/wiki/File:%EB%8F%88%EC%9D%98%EB%AC%B8_(1880s).jpg"
 },
 "sukjeongmun": {
  "src": "/seoul/sukjeongmun.jpg",
  "w": 800,
  "h": 530,
  "author": "Mark Froelich",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Sukjeongmun_Gate,_Seoul,_Korea.jpg"
 },
 "hyehwamun": {
  "src": "/seoul/hyehwamun.jpg",
  "w": 800,
  "h": 530,
  "author": "Mark Froelich",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Hyehwamun,_Rear,_Seoul,_Korea.jpg"
 },
 "gwanghuimun": {
  "src": "/seoul/gwanghuimun.jpg",
  "w": 800,
  "h": 530,
  "author": "Mark Froelich",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Gwanghuimun_Gate,_Seoul,_Korea.jpg"
 },
 "changuimun": {
  "src": "/seoul/changuimun.jpg",
  "w": 800,
  "h": 533,
  "author": "Shiwon Cho",
  "license": "CC BY-SA 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
  "source": "https://commons.wikimedia.org/wiki/File:Korea-Seoul-Changuimun-01.jpg"
 },
 "bosingak": {
  "src": "/seoul/bosingak.jpg",
  "w": 800,
  "h": 533,
  "author": "Richard Mortel",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "source": "https://commons.wikimedia.org/wiki/File:Bosingak_Bell_Pavilion,_Seoul_(3)_(27257575928).jpg"
 },
 "gwanghwamun": {
  "src": "/seoul/gwanghwamun.jpg",
  "w": 800,
  "h": 600,
  "author": "螺钉",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Gwanghwamun_Square.jpg"
 },
 "hwangudan": {
  "src": "/seoul/hwangudan.jpg",
  "w": 800,
  "h": 450,
  "author": "올리브 가지",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
  "source": "https://commons.wikimedia.org/wiki/File:Hwangudan_1.jpg"
 },
 "seodaemun": {
  "src": "/seoul/seodaemun.jpg",
  "w": 800,
  "h": 600,
  "author": "Dudva",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "source": "https://commons.wikimedia.org/wiki/File:Seodaemun_Prison,_April_2023.jpg"
 },
 "tapgol": {
  "src": "/seoul/tapgol.jpg",
  "w": 800,
  "h": 598,
  "author": "Integral",
  "license": "CC BY-SA 2.0 kr",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0/kr/deed.en",
  "source": "https://commons.wikimedia.org/wiki/File:Tapgol_park_main.jpg"
 },
 "myeongdong": {
  "src": "/seoul/myeongdong.jpg",
  "w": 800,
  "h": 603,
  "author": "Sean Young (@assanges)",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "source": "https://commons.wikimedia.org/wiki/File:Myeongdong_Cathedral_20240217.jpg"
 },
 "russian": {
  "src": "/seoul/russian.jpg",
  "w": 800,
  "h": 600,
  "author": "Lawinc82",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Former_Russia_legation_of_Korea_01.JPG"
 },
 "jungmyeongjeon": {
  "src": "/seoul/jungmyeongjeon.jpg",
  "w": 800,
  "h": 600,
  "author": "Lawinc82",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Jungmyeongjeon_03.jpg"
 },
 "jeongdongchurch": {
  "src": "/seoul/jeongdongchurch.jpg",
  "w": 800,
  "h": 600,
  "author": "Ryuch",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
  "source": "https://commons.wikimedia.org/wiki/File:Jeongdong_First_Church.JPG"
 },
 "seoulstation": {
  "src": "/seoul/seoulstation.jpg",
  "w": 800,
  "h": 480,
  "author": "HaulS",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "source": "https://commons.wikimedia.org/wiki/File:Culture_Station_Seoul_284_(_2014_08_05_).jpg"
 },
 "namsan": {
  "src": "/seoul/namsan.jpg",
  "w": 800,
  "h": 533,
  "author": "Andrew Currie",
  "license": "CC BY 2.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
  "source": "https://commons.wikimedia.org/wiki/File:Seoul-Namsan-Bongsudae-01.jpg"
 },
 "cheonggyecheon": {
  "src": "/seoul/cheonggyecheon.jpg",
  "w": 800,
  "h": 533,
  "author": "Daderot",
  "license": "Public domain",
  "licenseUrl": "",
  "source": "https://commons.wikimedia.org/wiki/File:Supyogyo,_Jangchungdan_Park_-_Seoul,_Korea.jpg"
 },
 "unhyeongung": {
  "src": "/seoul/unhyeongung.jpg",
  "w": 800,
  "h": 600,
  "author": "Daderot.",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
  "source": "https://commons.wikimedia.org/wiki/File:Iro-dang,_Unhyeongung_-_Seoul,_Korea.JPG"
 },
 "independence": {
  "src": "/seoul/independence.jpg",
  "w": 800,
  "h": 450,
  "author": "MonasteryInwang",
  "license": "CC0",
  "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
  "source": "https://commons.wikimedia.org/wiki/File:Independence_Gate_in_early_night.jpg"
 },
 "gyeonggyojang": {
  "src": "/seoul/gyeonggyojang.jpg",
  "w": 800,
  "h": 600,
  "author": "Toobigtokale",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
  "source": "https://commons.wikimedia.org/wiki/File:Gyeonggyojang_03.jpg"
 }
};
