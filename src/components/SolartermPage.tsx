import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Snowflake, Sprout, Wheat, Leaf, BookOpen } from 'lucide-react';

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

const SEASON_ICONS = {
    '春': <Sprout size={18} />,
    '夏': <Sun size={18} />,
    '秋': <Wheat size={18} />,
    '冬': <Snowflake size={18} />,
};

const CHUAN_SONG = [
    "春雨惊春清谷天，",
    "夏满芒夏暑相连。",
    "秋处露秋寒霜降，",
    "冬雪雪冬小大寒。"
];

export const SolartermPage: React.FC = () => {
    const [terms, setTerms] = useState<Solarterm[]>([]);
    const [selected, setSelected] = useState<Solarterm | null>(null);

    useEffect(() => {
        fetch('/data/solarterms.json')
            .then(res => res.json())
            .then(data => setTerms(data))
            .catch(err => console.error("加载节气数据失败:", err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 space-y-8 pb-12">
            {/* Header & 节气歌 */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6 pt-2">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-400 tracking-widest" style={{ fontFamily: '"SimHei", "Heiti SC", "STHeiti", "Microsoft YaHei", sans-serif' }}>
                        节气与生活指南
                    </h1>
                    <p className="text-stone-400 text-sm tracking-widest mt-2 uppercase">24 Solar Terms &amp; Life Guide</p>
                </div>

                <div className="glass-panel inline-block p-6 border border-amber-500/20 bg-stone-900/40 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-rose-500 to-blue-500 opacity-50"></div>
                    <h3 className="text-amber-500 text-sm font-bold mb-4 tracking-widest">《 二 十 四 节 气 歌 》</h3>
                    <div className="space-y-2 text-stone-200 text-lg sm:text-xl font-serif tracking-[0.3em]">
                        {CHUAN_SONG.map((line, i) => (
                            <p key={i} className="text-shadow-sm">{line}</p>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* 节气轮盘/网格 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {terms.map((term, i) => {
                    const colors = SEASON_COLORS[term.season as keyof typeof SEASON_COLORS];
                    const isSelected = selected?.name === term.name;
                    return (
                        <motion.button
                            key={term.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.02 }}
                            onClick={() => setSelected(isSelected ? null : term)}
                            className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all overflow-hidden ${isSelected
                                ? 'bg-white/10 ring-2 ring-white/20 border-white/30 scale-105 shadow-lg'
                                : 'bg-gradient-to-b hover:bg-white/5 ' + colors
                                }`}
                        >
                            <div className="text-lg font-bold text-stone-100 tracking-wider font-serif mb-1">{term.name}</div>
                            <div className={`text-[10px] font-mono opacity-80 ${colors.split(' ').pop()}`}>
                                {term.dateRange.split('-')[0]}
                            </div>
                        </motion.button>
                    )
                })}
            </div>

            {/* 选中节气详情 */}
            <AnimatePresence mode="wait">
                {selected ? (
                    <motion.div
                        key={selected.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`glass-panel p-6 md:p-8 border-l-4 relative overflow-hidden`}
                        style={{
                            borderLeftColor:
                                selected.season === '春' ? '#10b981' :
                                    selected.season === '夏' ? '#f43f5e' :
                                        selected.season === '秋' ? '#f59e0b' : '#3b82f6'
                        }}
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <span className="text-9xl font-serif">{selected.name[0]}</span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 relative z-10">
                            <div className="md:col-span-1 space-y-4">
                                <div>
                                    <div className="flex items-center gap-3 text-sm font-bold mb-1" style={{
                                        color:
                                            selected.season === '春' ? '#34d399' :
                                                selected.season === '夏' ? '#fb7185' :
                                                    selected.season === '秋' ? '#fbbf24' : '#60a5fa'
                                    }}>
                                        {SEASON_ICONS[selected.season as keyof typeof SEASON_ICONS]}
                                        <span>{selected.season}季第三节气 (黄经 {selected.solarIndex}°)</span>
                                    </div>
                                    <h2 className="text-5xl font-bold text-stone-100 font-serif tracking-widest mb-2">{selected.name}</h2>
                                    <div className="text-stone-400 font-mono text-sm tracking-widest uppercase">{selected.pinyin}</div>
                                </div>
                                <div className="text-stone-300 text-sm leading-relaxed border-l-2 border-white/10 pl-4 py-1 italic">
                                    "{selected.description}"
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-stone-400">
                                        常年交节：{selected.dateRange}
                                    </span>
                                </div>
                            </div>

                            <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="glass-panel p-5 border border-amber-500/20 bg-amber-500/5 h-full">
                                        <h4 className="text-amber-400 font-bold mb-3 flex items-center gap-2 text-sm">
                                            <Wheat size={16} /> 农业指导 (农事)
                                        </h4>
                                        <p className="text-stone-300 text-sm leading-relaxed text-justify">
                                            {selected.agriculture}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="glass-panel p-5 border border-emerald-500/20 bg-emerald-500/5">
                                        <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 text-sm">
                                            <Leaf size={16} /> 物候与涵义
                                        </h4>
                                        <p className="text-stone-300 text-sm leading-relaxed mb-3">
                                            {selected.meaning}
                                        </p>
                                    </div>
                                    <div className="glass-panel p-5 border border-purple-500/20 bg-purple-500/5">
                                        <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2 text-sm">
                                            <BookOpen size={16} /> 传统民俗
                                        </h4>
                                        <p className="text-stone-300 text-sm leading-relaxed">
                                            {selected.customs}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* NEW: Huangdi Neijing Health Guide Segment */}
                            {selected.healthGuide && (
                                <div className="md:col-span-3 mt-2">
                                    <div className="glass-panel p-6 border border-rose-500/30 bg-rose-500/5 shadow-[inset_0_0_20px_rgba(244,63,94,0.05)] rounded-2xl relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-400 to-amber-500"></div>
                                        <h4 className="text-rose-400 font-bold mb-3 flex items-center gap-2 text-base tracking-wider">
                                            <span className="bg-rose-500/20 p-1.5 rounded-lg"><Leaf size={18} className="text-rose-400" /></span>
                                            黄帝内经 · 健康起居指引
                                        </h4>
                                        <p className="text-stone-300 text-[15px] leading-8 text-justify font-serif">
                                            {selected.healthGuide}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-12 text-center text-stone-500 border border-white/5 rounded-xl border-dashed"
                    >
                        <Sprout className="mx-auto mb-3 opacity-20" size={32} />
                        <p className="text-sm">点击上方的节气卡片，查看对应的物候、农事与生活起居指南</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
