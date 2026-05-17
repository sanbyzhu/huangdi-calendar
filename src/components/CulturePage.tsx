import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sun, Snowflake, Sprout, Wheat, Leaf, BookOpen, Sparkles, Globe, History, Compass } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUtils';

interface Solarterm {
    name: string;
    pinyin: string;
    season: string;
    solarIndex: number;
    dateRange: string;
    meaning: string;
    agriculture: string;
    customs: string;
    description: string;
    healthGuide?: string;
}

const SEASON_COLORS = {
    '春': 'from-emerald-500/20 to-teal-500/5 border-emerald-500/30 text-emerald-400',
    '夏': 'from-rose-500/20 to-orange-500/5 border-rose-500/30 text-rose-400',
    '秋': 'from-amber-500/20 to-yellow-500/5 border-amber-500/30 text-amber-400',
    '冬': 'from-blue-500/20 to-cyan-500/5 border-blue-500/30 text-blue-400',
};

const CHUAN_SONG = [
    "春雨惊春清谷天，",
    "夏满芒夏暑相连。",
    "秋处露秋寒霜降，",
    "冬雪雪冬小大寒。"
];

// 天历详情弹窗组件
const TianCalendarDetail: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <AnimatePresence>
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pt-24 pb-6 md:pt-28 md:pb-10">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="glass-panel w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl border border-blue-500/30 max-h-[80vh] flex flex-col mt-8"
            >
                <div className="p-5 border-b border-white/10 flex items-center justify-between bg-blue-500/10 shrink-0">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-400 flex items-center gap-2">
                        <Compass className="text-blue-400" size={24} /> 天历介绍
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ChevronRight size={20} className="text-stone-300 rotate-90" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 text-stone-300 leading-loose">
                    <section className="space-y-2">
                        <h3 className="text-lg font-bold text-blue-300 border-l-4 border-blue-500 pl-3">起源与命名</h3>
                        <p>
                            "圣太一天历"，又称"十月太阳历"，是中华文明最古老的历法体系之一，据传源自伏羲时代，以"紫斗"（北极星与北斗七星）为天文坐标。"太一"者，道家所谓宇宙本源之一，也是天地阴阳未判之初的混元状态。
                        </p>
                    </section>
                    <section className="space-y-2">
                        <h3 className="text-lg font-bold text-blue-300 border-l-4 border-blue-500 pl-3">历法结构</h3>
                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none text-sm">
                                <li className="flex items-center gap-2">🌑 <span className="text-white font-medium">一年十个月</span>，不同于现行十二月历</li>
                                <li className="flex items-center gap-2">🌒 奇数月（1-9月）为 <span className="text-white font-medium">阴月，36天</span></li>
                                <li className="flex items-center gap-2">🌕 偶数月（2-10月）为 <span className="text-white font-medium">阳月，37天</span></li>
                                <li className="flex items-center gap-2">📅 全年共 <span className="text-white font-medium">365天</span>，对齐太阳回归年</li>
                                <li className="flex items-center gap-2">🌀 五组阴阳月为一"季"，每季73天</li>
                                <li className="flex items-center gap-2">⚖️ 交替排列，体现一阴一阳之谓道</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-blue-300 border-b border-blue-500/30 pb-2">上古文明历法探源</h3>
                        <div className="space-y-3">
                            <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors group">
                                <div className="text-blue-400 font-bold flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    太易纪元 (起始于 -6116年)
                                </div>
                                <p className="text-sm text-stone-400 mt-1 leading-relaxed">
                                    「太易甲水元初」：伏羲女娲圣降，开启人脉灵魄，创制八极神易。这是华夏文明由蒙昧迈向历法文明的初始原点。
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors group">
                                <div className="text-blue-400 font-bold flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    太初纪元 (起始于 -3115年)
                                </div>
                                <p className="text-sm text-stone-400 mt-1 leading-relaxed">
                                    「黄帝合典」：轩辕黄帝统一万邦，戡平魑怪，建官设制，修订天历，确立了中华道统的法度基础。
                                </p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors group">
                                <div className="text-blue-400 font-bold flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-300"></div>
                                    太始纪元 (起始于 -115年)
                                </div>
                                <p className="text-sm text-stone-400 mt-1 leading-relaxed">
                                    「姬正道承命」：传承道统文化，历法进入太始循环。对应汉代初年，象征着古老历法在历史长河中的持续演进。
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="space-y-4 pt-2">
                        <h3 className="text-xl font-bold text-blue-300 border-b border-blue-500/30 pb-2">历史关键锚点</h3>
                        <ul className="space-y-4 text-sm text-stone-300">
                            <li className="flex gap-4 group">
                                <div className="text-blue-500 font-mono shrink-0 w-24 pt-1 group-hover:text-blue-400 transition-colors">天历 3420年</div>
                                <div className="space-y-1">
                                    <div className="font-bold text-white group-hover:text-blue-200 transition-colors">黄帝纪元 1 年 (前2698年)</div>
                                    <p className="text-stone-500 leading-relaxed text-xs">
                                        黄帝于冬至日筑坛祭天，正式将十月太阳历与六十甲子干支历融合。这一天标志着「太阳历」与「节气历」的完美合一。
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-4 group border-t border-white/5 pt-4">
                                <div className="text-blue-500 font-mono shrink-0 w-24 pt-1 group-hover:text-blue-400 transition-colors">天历 5004年</div>
                                <div className="space-y-1">
                                    <div className="font-bold text-white group-hover:text-blue-200 transition-colors">周文王演易 (前1112年)</div>
                                    <p className="text-stone-500 leading-relaxed text-xs">
                                        姬昌（文王）在灵台祗承上帝，通过德疏妄欲，将天历哲学升华为「六德」治理体系，完善了礼仪教化。
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-4 group border-t border-white/5 pt-4">
                                <div className="text-blue-500 font-mono shrink-0 w-24 pt-1 group-hover:text-blue-400 transition-colors">天历 8131年</div>
                                <div className="space-y-1">
                                    <div className="font-bold text-white group-hover:text-blue-200 transition-colors">文明复兴坐标 (2014年)</div>
                                    <p className="text-stone-500 leading-relaxed text-xs">
                                        进入太始辛数，天历文化通过古老历法文献的重新系统化整理面世。这是连接八千年历史断层的重要里程碑。
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>
            </motion.div>
        </div>
    </AnimatePresence>
);

export const CulturePage: React.FC = () => {
    const [subTab, setSubTab] = useState<'calendar' | 'solarterm'>('calendar');
    const [terms, setTerms] = useState<Solarterm[]>([]);
    const [selectedTerm, setSelectedTerm] = useState<Solarterm | null>(null);
    const [showTianDetail, setShowTianDetail] = useState(false);

    useEffect(() => {
        fetch(getAssetUrl('/data/solarterms.json'))
            .then(res => res.json())
            .then(data => setTerms(data))
            .catch(err => console.error("加载节气数据失败:", err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 space-y-8 pb-12 overflow-x-hidden">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3 pt-6"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-400 text-xs tracking-widest uppercase mb-2">
                    <History size={14} className="text-amber-500" /> Civilization &amp; Time System
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 py-2" style={{ fontFamily: '"SimHei", "STHeiti", sans-serif' }}>
                    历法与节气
                </h1>
                <p className="text-stone-400 text-lg tracking-[0.4em] font-light">探索人类文明中时间体系的智慧</p>
            </motion.div>

            {/* Sub Tabs */}
            <div className="flex justify-center gap-4 relative z-10">
                <button
                    onClick={() => setSubTab('calendar')}
                    className={`group relative px-8 py-3 rounded-full border transition-all duration-500 overflow-hidden ${subTab === 'calendar' ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold' : 'bg-white/5 border-white/10 text-stone-500 hover:bg-white/10'}`}
                >
                    <div className="flex items-center gap-2 relative z-10">
                        <Globe size={18} className={subTab === 'calendar' ? 'text-amber-400 animate-pulse' : ''} />
                        历法科普
                    </div>
                </button>
                <button
                    onClick={() => setSubTab('solarterm')}
                    className={`group relative px-8 py-3 rounded-full border transition-all duration-500 overflow-hidden ${subTab === 'solarterm' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold' : 'bg-white/5 border-white/10 text-stone-500 hover:bg-white/10'}`}
                >
                    <div className="flex items-center gap-2 relative z-10">
                        <Sun size={18} className={subTab === 'solarterm' ? 'text-emerald-400 animate-spin-slow' : ''} />
                        节气生活
                    </div>
                </button>
            </div>

            <AnimatePresence mode="wait">
                {subTab === 'calendar' ? (
                    <motion.div
                        key="calendar"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="space-y-8 max-w-5xl mx-auto"
                    >
                        {/* 1. 天历 */}
                        <section className="glass-panel p-8 space-y-6 border-l-4 border-blue-500 relative overflow-hidden group">
                            <div className="absolute -right-8 -top-8 text-blue-500/5 rotate-12 group-hover:rotate-6 transition-transform duration-700 pointer-events-none">
                                <History size={160} />
                            </div>
                            <div className="flex items-start justify-between relative z-10 mb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                                        <Compass size={20} />
                                        <span className="text-xs font-bold tracking-widest uppercase">Ancient Solar Calendar</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white tracking-widest">圣太一天历 <span className="text-blue-500/60 font-serif font-light text-xl">（十月太阳历）</span></h2>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                <div className="space-y-4">
                                    <p className="text-stone-300 leading-loose text-justify text-sm md:text-base">
                                        中华文明最古老的科学历法，被誉为「历法之母」。据古老文明经文记载，其原始纪元可追溯至公元前 6116 年。它通过精准的 10 个阴阳月律，完美解决了太阳回归年与地球生态律动的对应关系，是后世河图、洛书及周易哲学的逻辑支撑点。
                                    </p>
                                    <button
                                        onClick={() => setShowTianDetail(true)}
                                        className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 bg-blue-500/5 hover:bg-blue-500/20 border border-blue-500/20 px-4 py-2 rounded-full transition-all shrink-0 active:scale-95"
                                    >
                                        详细介绍 <ChevronRight size={16} />
                                    </button>
                                </div>
                                <div className="space-y-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-blue-300 text-sm font-bold flex items-center gap-2"><Sparkles size={14} /> 核心逻辑摘要</h4>
                                    <p className="text-stone-400 text-xs leading-6">圣太一天历不以月相定长短，而以地球公转角度（五个 73 天的周期）平分全年。奇月 36 天，偶月 37 天，阴阳交错，自洽圆满。它记录了从太易纪元开始的 8000 年华夏道统守望。</p>
                                </div>
                            </div>
                        </section>

                        {/* 2. 黄帝历 */}
                        <section className="glass-panel p-8 space-y-6 border-l-4 border-amber-500 relative overflow-hidden group">
                            <div className="absolute -right-8 -top-8 text-amber-500/5 -rotate-12 group-hover:-rotate-6 transition-transform duration-700 pointer-events-none">
                                <Sun size={160} />
                            </div>
                            <div className="space-y-1 relative z-10">
                                <div className="flex items-center gap-2 text-amber-400 mb-1">
                                    <History size={18} />
                                    <span className="text-xs font-bold tracking-widest uppercase">The Sovereign Calendar</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-widest">黄帝历 <span className="text-amber-500/60 font-serif font-light text-xl">（干支历/农历基石）</span></h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                <p className="text-stone-300 leading-loose text-justify text-sm md:text-base">
                                    轩辕黄帝确立的华夏正统。它首次引入了「六十甲子」干支纪法与「十九年七闰」的精密调整算法。它是中国农业文明的基础，通过二十四节气将天文坐标转化为生活准则，使得「顺天应时」成为了华夏民族的核心生命哲学。
                                </p>
                                <div className="space-y-4 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                                    <h4 className="text-amber-300 text-sm font-bold flex items-center gap-2"><Sparkles size={14} /> 核心逻辑摘要</h4>
                                    <p className="text-stone-400 text-xs leading-6">结合了太阳回归年与月亮朔望月的「阴阳合历」模型。以冬至为定岁之始，通过置闰确保历法与物候保持同步，是世界天文学史上维持时间最长、算法最稳健的体系之一。</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. 汉历 */}
                        <section className="glass-panel p-8 space-y-6 border-l-4 border-rose-500 relative overflow-hidden group">
                            <div className="absolute -right-8 -top-8 text-rose-500/5 rotate-45 group-hover:rotate-30 transition-transform duration-700 pointer-events-none">
                                <BookOpen size={160} />
                            </div>
                            <div className="space-y-1 relative z-10">
                                <div className="flex items-center gap-2 text-rose-400 mb-1">
                                    <History size={18} />
                                    <span className="text-xs font-bold tracking-widest uppercase">Han Imperial Calendar</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-widest">汉历（农历） <span className="text-rose-500/60 font-serif font-light text-xl">（首次全国颁布历）</span></h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                <p className="text-stone-300 leading-loose text-justify text-sm md:text-base">
                                    汉历，集中代表是太初历，公元前104年由司马迁、落下闳等人编订。它确定了以正月为岁首的传统，并将 24 节气定入历法。太初历不仅是天文计算的成果，更是政治大一统的象征，它建立的「夏正」传统一直延续至今，塑造了当代的春节文化。
                                </p>
                                <div className="space-y-4 p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10">
                                    <h4 className="text-rose-300 text-sm font-bold flex items-center gap-2"><Sparkles size={14} /> 核心逻辑摘要</h4>
                                    <p className="text-stone-400 text-xs leading-6">采用「八十一分律历」法，精确度较前代大幅提升。首次将行星运动规律进行数学化建模，实现了天文推算与星象观察的高度统一，标志着中国古代历法进入了高度成熟的阶段。</p>
                                </div>
                            </div>
                        </section>

                        {/* 4. 公历 */}
                        <section className="glass-panel p-8 space-y-6 border-l-4 border-stone-400 relative overflow-hidden group">
                            <div className="flex items-start justify-between relative z-10">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-stone-400 mb-1">
                                        <Globe size={20} />
                                        <span className="text-xs font-bold tracking-widest uppercase">Global Standard Calendar</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white tracking-widest">西历（格里高利历）<span className="text-stone-500 font-serif font-light text-xl">（现代公历）</span></h2>
                                </div>
                            </div>
                            <p className="text-stone-300 leading-loose text-justify text-sm relative z-10">
                                起源于罗马时代的儒略历，后于1582年由教皇格里高利十三世修正。它专注于回归年的精密对齐，通过科学的四年一闰、百年不闰、四百年再闰规则，目前每 3300 年仅产生 1 天误差。它是现代科学研究、国际协作与行政管理的统一基准。
                            </p>
                        </section>

                        {/* 5. 玛雅历 */}
                        <section className="glass-panel p-8 space-y-6 border-l-4 border-indigo-500 relative overflow-hidden group">
                            <div className="space-y-1 relative z-10">
                                <div className="flex items-center gap-2 text-indigo-400 mb-1">
                                    <Sparkles size={18} />
                                    <span className="text-xs font-bold tracking-widest uppercase">Sacred Cosmic Geometry</span>
                                </div>
                                <h2 className="text-3xl font-bold text-white tracking-widest">玛雅历 <span className="text-indigo-500/60 font-serif font-light text-xl">（13月28天生活历）</span></h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                <p className="text-stone-300 leading-loose text-justify text-sm md:text-base">
                                    作为中美洲文明的最高智慧，玛雅历并非单一算法，而是金科玉律的多维嵌套。其中的 13 月 28 天和平月历，反映了自然界的周期同步（如生物周期、潮汐）；260 天的卓尔金历则是一张记录银河能量共时的时空导航图。
                                </p>
                                <div className="space-y-4 p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                                    <h4 className="text-indigo-300 text-sm font-bold flex items-center gap-2"><Sparkles size={14} /> 核心逻辑摘要</h4>
                                    <p className="text-stone-400 text-xs leading-6">它不追求线性的时间流逝，而强调能量的回归与螺旋上升。通过 Kin（印记）和波符将人与自然、行星乃至宇宙门户重新链接。它是当代寻找心灵归宿、实现和谐共时的重要古老工具。</p>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                ) : (
                    <motion.div
                        key="solarterm"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="space-y-8 pb-32"
                    >
                        {/* 节气生活头部 */}
                        <div className="glass-panel p-0 bg-stone-900/40 border border-white/10 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-emerald-500/5 opacity-50"></div>
                            <div className="grid md:grid-cols-2 gap-0 items-stretch min-h-[300px]">
                                <div className="p-8 md:p-12 space-y-6 relative flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2">
                                        <Sun size={14} className="animate-pulse" /> Soul of Civilization
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-black text-emerald-300 tracking-widest" style={{ textShadow: '0 0 20px rgba(52,211,153,0.3)' }}>二十四节气</h2>
                                    <p className="text-stone-300 leading-loose text-justify text-sm md:text-base">
                                        二十四节气是古人根据太阳位置变化总结出的时令和天象规律。它不仅指导着数千年的农业生产，更深深融入了华夏民族的起居饮食、民俗禁忌与医学养生之中。它是时间轴上的 24 个生命节点，也是天人合一的最佳实践。
                                    </p>
                                </div>
                                <div className="bg-emerald-500/5 border-l border-white/10 flex items-center justify-center p-8 relative overflow-hidden">
                                    <div className="relative z-10 glass-panel p-6 md:p-8 border border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_50px_rgba(16,185,129,0.1)] rounded-2xl transform hover:scale-[1.02] transition-transform duration-500">
                                        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-emerald-500/40 opacity-50 rounded-tl-xl"></div>
                                        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-emerald-500/40 opacity-50 rounded-br-xl"></div>
                                        <h3 className="text-emerald-400 text-center font-bold mb-4 md:mb-6 tracking-[0.5em] text-sm uppercase opacity-80">二十四节气歌</h3>
                                        <div className="grid grid-cols-1 gap-2 md:gap-3">
                                            {CHUAN_SONG.map((line, i) => (
                                                <div key={i} className="text-emerald-100 font-serif text-lg md:text-2xl text-center tracking-[0.2em] md:tracking-[0.3em] font-medium transition-all duration-300 whitespace-nowrap">
                                                    {line}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                                        <span className="text-[20rem] font-black text-emerald-500">时</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 紧凑型节气网格 */}
                        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
                            {terms.map((term) => {
                                const colorClass = SEASON_COLORS[term.season as keyof typeof SEASON_COLORS] || 'border-stone-500/30 text-stone-400';
                                const isSelected = selectedTerm?.name === term.name;
                                return (
                                    <motion.button
                                        key={term.name}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setSelectedTerm(term);
                                            // 使用 setTimeout 确保 React 状态更新后 DOM 渲染完成再滚动
                                            setTimeout(() => {
                                                const detailEl = document.getElementById('term-detail-section');
                                                if (detailEl) {
                                                    const y = detailEl.getBoundingClientRect().top + window.scrollY - 100;
                                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                                }
                                            }, 200);
                                        }}
                                        className={`glass-panel cursor-pointer p-3 md:p-4 flex flex-col items-center justify-center gap-1.5 md:gap-2 bg-gradient-to-br border transition-colors duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.3)] group ${isSelected ? 'ring-2 ring-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-white/5' : ''} ${colorClass}`}
                                    >
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                        <span className="text-[9px] md:text-[10px] opacity-60 font-mono tracking-wider pointer-events-none">{term.dateRange.replace(/日.*$/, '日+')}</span>
                                        <span className="text-lg md:text-xl font-black font-serif tracking-widest group-hover:scale-110 transition-transform pointer-events-none">{term.name}</span>
                                        <div className="w-6 h-0.5 bg-current opacity-20 group-hover:opacity-60 transition-all group-hover:w-10 pointer-events-none"></div>
                                        <span className="text-[8px] md:text-[9px] uppercase font-bold tracking-[0.1em] opacity-40 pointer-events-none">{term.pinyin}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* 内联详情展示区 */}
                        <AnimatePresence mode="wait">
                            {selectedTerm && (
                                <motion.div
                                    id="term-detail-section"
                                    key={selectedTerm.name}
                                    initial={{ opacity: 0, height: 0, y: -20 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -20, transition: { duration: 0.2 } }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="pt-4 overflow-hidden"
                                >
                                    <div className="glass-panel w-full relative z-10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col rounded-3xl">
                                        <div className={`p-6 md:p-8 relative overflow-hidden bg-gradient-to-r ${SEASON_COLORS[selectedTerm.season as keyof typeof SEASON_COLORS]} shrink-0`}>
                                            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10 select-none pointer-events-none">
                                                <span className="text-[8rem] md:text-[12rem] font-black font-serif text-white leading-none">{selectedTerm.name[0]}</span>
                                            </div>
                                            <div className="flex justify-between items-start text-white relative z-10 w-full pr-12">
                                                <div className="space-y-3">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] md:text-xs font-black tracking-[0.2em] uppercase shadow-sm">
                                                        {selectedTerm.season}季时令 · 太阳经标 {selectedTerm.solarIndex}°
                                                    </div>
                                                    <div>
                                                        <h3 className="text-4xl md:text-6xl font-black font-serif tracking-[0.2em]">{selectedTerm.name}</h3>
                                                        <p className="text-sm md:text-lg opacity-80 mt-1 md:mt-2 tracking-[0.4em] font-light uppercase">{selectedTerm.pinyin}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedTerm(null)}
                                                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all text-white/70 hover:text-white"
                                            >
                                                <ChevronRight size={24} className="-rotate-90" />
                                            </button>
                                        </div>

                                        <div className="p-6 md:p-10 space-y-10 bg-[#0a0a0a]/90 relative">
                                            <section className="space-y-4 relative z-10 max-w-4xl mx-auto">
                                                <div className="flex items-center gap-3 text-emerald-400 font-black tracking-widest text-sm uppercase">
                                                    <div className="w-8 h-px bg-emerald-500/50"></div>
                                                    <div className="flex items-center gap-1.5"><Leaf size={16} /> 节气含义 </div>
                                                    <div className="flex-1 h-px bg-emerald-500/20"></div>
                                                </div>
                                                <p className="text-stone-300 leading-[2.2] text-lg md:text-2xl font-serif text-justify md:indent-10 italic opacity-90">{selectedTerm.meaning}</p>
                                                {selectedTerm.description && (
                                                    <p className="text-stone-400 text-sm md:text-base leading-relaxed text-justify md:indent-8">{selectedTerm.description}</p>
                                                )}
                                            </section>

                                            <div className="grid md:grid-cols-2 gap-6 md:gap-8 relative z-10 max-w-4xl mx-auto">
                                                <section className="space-y-4 p-5 md:p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                                                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"><Wheat size={100} /></div>
                                                    <div className="flex items-center gap-2 text-amber-400 font-bold mb-2 relative z-10">
                                                        <div className="p-2 rounded-xl bg-amber-500/10"><Wheat size={18} /></div>
                                                        <h4 className="text-base md:text-lg tracking-wider">物候农事</h4>
                                                    </div>
                                                    <p className="text-stone-400 text-sm md:text-[15px] leading-relaxed text-justify md:indent-8 relative z-10">{selectedTerm.agriculture}</p>
                                                </section>
                                                <section className="space-y-4 p-5 md:p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                                                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity"><Sprout size={100} /></div>
                                                    <div className="flex items-center gap-2 text-rose-400 font-bold mb-2 relative z-10">
                                                        <div className="p-2 rounded-xl bg-rose-500/10"><Sprout size={18} /></div>
                                                        <h4 className="text-base md:text-lg tracking-wider">生活习俗</h4>
                                                    </div>
                                                    <p className="text-stone-400 text-sm md:text-[15px] leading-relaxed text-justify md:indent-8 relative z-10">{selectedTerm.customs}</p>
                                                </section>
                                            </div>

                                            {selectedTerm.healthGuide && (
                                                <section className="relative group z-10 max-w-4xl mx-auto">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-60 transition-opacity"></div>
                                                    <div className="relative p-6 md:p-8 rounded-[2rem] bg-stone-900/60 border border-white/10 space-y-4 md:space-y-6 overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 md:p-3 rounded-2xl bg-blue-500/20 text-blue-400 shrink-0"><Snowflake size={20} className="md:w-6 md:h-6 animate-spin-slow" /></div>
                                                            <div>
                                                                <h4 className="text-xl md:text-2xl font-bold text-white tracking-widest">黄帝内经 · 养生建议</h4>
                                                                <p className="text-[10px] md:text-xs text-blue-400/60 font-mono tracking-widest mt-1 uppercase">Traditional Health Guide</p>
                                                            </div>
                                                        </div>
                                                        <p className="text-stone-300 md:text-stone-200 text-base md:text-lg leading-relaxed italic font-serif opacity-90 text-justify">{selectedTerm.healthGuide}</p>
                                                    </div>
                                                </section>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 天历详情弹窗 */}
            {showTianDetail && <TianCalendarDetail onClose={() => setShowTianDetail(false)} />}
        </div>
    );
};
