/**
 * 圣太一天历 (Celestial Calendar) 核心算法 - 嵌套纪年增强版
 * 
 * 基于图片逻辑的层级解析：
 * 1. 大轮 (Grand Cycle / Wheel): 3000年一轮 [太易, 太初, 太始, 太素, 太统]
 * 2. 大数 (Great Number): 300年一数 [甲, 乙, 丙, 丁, 戊, 己, 庚, 辛, 壬, 癸]
 * 3. 五行 (Element Cycle): 60年一数 [水, 火, 木, 金, 土]
 * 4. 干行 (Stem-Action): 12年一循环
 * 5. 全/支 (Full House/Branch): 1年一推演 (元)
 */

export interface TianDate {
    year: number;
    month: number;
    day: number;
    monthName: string;
    season: string;
    element: string;
    era: string;        // 对应大轮
    greatNumber: string; // 对应大数 (甲, 乙...)
    elementSeries: string; // 对应五行一数
    solarTerm: string;
    fullEraName: string; // 如 "太初乙数行火中"
}

const ERA_NAMES = ["太易", "太初", "太始", "太素", "太统"];
const GREAT_NUMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const ELEMENTS = ["水", "火", "木", "金", "土"];
const POSITIONS = ["元", "上", "中", "下", "末"]; // 对应图中位置概念

const SEASON_MAP = [
    { name: '春季', element: '水', terms: ['春贞', '天雨'] },
    { name: '夏季', element: '火', terms: ['小火', '大火'] },
    { name: '秋季', element: '木', terms: ['木实', '木落'] },
    { name: '冬季', element: '金', terms: ['金沉', '金粹'] },
    { name: '寒季', element: '土', terms: ['土死', '土活'] }
];

const ANCHOR_JD = 2442432.5;
const ANCHOR_TIAN_YEAR = 8091;
const ANCHOR_TIAN_MONTH = 9;
const ANCHOR_TIAN_DAY = 30;

export function isTianLeapYear(tianYear: number): boolean {
    return tianYear % 4 === 0;
}

export function getTianMonthDays(tianYear: number, month: number): number {
    if (month % 2 !== 0) return 36;
    if (month === 10 && isTianLeapYear(tianYear)) return 38;
    return 37;
}

export function fromGregorian(date: Date): TianDate {
    function getJD(y: number, m: number, d: number) {
        let Y = y, M = m;
        if (M <= 2) { Y -= 1; M += 12; }
        const A = Math.floor(Y / 100);
        const B = 2 - A + Math.floor(A / 4);
        return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + B - 1524.5;
    }

    const currentJD = getJD(date.getFullYear(), date.getMonth() + 1, date.getDate());
    let diffDays = currentJD - ANCHOR_JD;

    let tianYear = ANCHOR_TIAN_YEAR;
    let tianMonth = ANCHOR_TIAN_MONTH;
    let tianDay = ANCHOR_TIAN_DAY;

    if (diffDays >= 0) {
        while (diffDays > 0) {
            const daysInCurrentMonth = getTianMonthDays(tianYear, tianMonth);
            const remainingInMonth = daysInCurrentMonth - tianDay;
            if (diffDays > remainingInMonth) {
                diffDays -= (remainingInMonth + 1);
                tianDay = 1;
                tianMonth++;
                if (tianMonth > 10) { tianMonth = 1; tianYear++; }
            } else {
                tianDay += diffDays;
                diffDays = 0;
            }
        }
    } else {
        diffDays = Math.abs(diffDays);
        while (diffDays > 0) {
            if (diffDays >= tianDay) {
                diffDays -= tianDay;
                tianMonth--;
                if (tianMonth < 1) { tianMonth = 10; tianYear--; }
                tianDay = getTianMonthDays(tianYear, tianMonth);
            } else {
                tianDay -= diffDays;
                diffDays = 0;
            }
        }
    }

    // --- 层级纪年核心逻辑 ---
    // 1. 大轮 (3000年)
    const eraIdx = Math.floor((tianYear - 1) / 3000);
    const era = ERA_NAMES[eraIdx % ERA_NAMES.length];

    // 2. 大数 (300年) 在大轮内的偏移
    const offsetInEra = (tianYear - 1) % 3000;
    const gnIdx = Math.floor(offsetInEra / 300);
    const greatNumber = GREAT_NUMS[gnIdx % GREAT_NUMS.length];

    // 3. 五行一数 (60年) 在大数内的偏移
    const offsetInGreatNum = offsetInEra % 300;
    const elementIdx = Math.floor(offsetInGreatNum / 60);
    const elementSeries = ELEMENTS[elementIdx % ELEMENTS.length];

    // 4. 位置判定 (图中 元, 上, 中, 下, 末 的分布概念)
    // 简单以 60 年内部分段：0-12元, 13-24上, 25-36中, 37-48下, 49-60末
    const posIdx = Math.floor((offsetInGreatNum % 60) / 12);
    const position = POSITIONS[posIdx % POSITIONS.length];

    const seasonIdx = Math.floor((tianMonth - 1) / 2);
    const season = SEASON_MAP[seasonIdx];

    // 拼接全称，如 "太易甲数行火元"
    // 注意：图中 "数" 后面有时跟 "行"，有时跟五行名
    const fullEraName = `${era}${greatNumber}数行${elementSeries}${position}`;

    return {
        year: tianYear,
        month: tianMonth,
        day: tianDay,
        monthName: tianMonth % 2 !== 0 ? "阴月" : "阳月",
        season: season.name,
        element: season.element,
        era: era,
        greatNumber: greatNumber,
        elementSeries: elementSeries,
        solarTerm: tianMonth % 2 !== 0 ? season.terms[0] : season.terms[1],
        fullEraName: fullEraName
    };
}

/**
 * 历法同步对照中枢
 * 以天历年份为基准，对齐五大核心历法坐标
 */
export function syncCalendars(tianYear: number) {
    // 1. 西历 (Gregorian) 对照
    // 设定天历 8091年 主体对应西历 1974年 (因 1975年1月 已是 8091年末)
    const westYear = tianYear - (8091 - 1974);

    // 2. 黄帝纪元 (Yellow Emperor)
    // 设定西历 2024年 为黄帝纪元 4721年 (不同说法略有出入，以此常用版本为准)
    const yeYear = westYear + 2697;

    // 3. 汉历干支 (Lunar Sexagenary)
    const stems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

    // 干支计算公式 (以西历年份计算)
    const stemIdx = (westYear - 4) % 10;
    const branchIdx = (westYear - 4) % 12;
    const cycleName = `${stems[stemIdx < 0 ? stemIdx + 10 : stemIdx]}${branches[branchIdx < 0 ? branchIdx + 12 : branchIdx]}年`;

    return {
        gregorian: westYear,
        yellowEmperor: yeYear,
        sexagenary: cycleName
    };
}
