import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, History, Quote } from 'lucide-react';
import { getAssetUrl } from '../utils/assetUtils';

interface ChronologyRecord {
    dynasty: string;
    era: string; // 年号
    yearNum: number; // 年号第几年
    ganzhi: string;
    gregorianYear: number;
    emperor?: string;
}

interface ClassicQuote {
    content: string;
    source: string;
}

export const ChronologyConverter: React.FC<{ currentYear: number; onYearSelect: (y: number) => void }> = ({ currentYear, onYearSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allData, setAllData] = useState<ChronologyRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [randomQuote, setRandomQuote] = useState<ClassicQuote | null>(null);

    // 加载数据与经典语录
    useEffect(() => {
        // 加载纪年
        fetch(getAssetUrl('/data/chronology.json'))
            .then(res => res.json())
            .then(data => {
                setAllData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("加载纪年数据失败:", err);
                setLoading(false);
            });

        // 加载金句
        fetch(getAssetUrl('/data/classics.json'))
            .then(res => res.json())
            .then((quotes: ClassicQuote[]) => {
                const random = quotes[Math.floor(Math.random() * quotes.length)];
                setRandomQuote(random);
            })
            .catch(err => console.error("加载金句失败:", err));
    }, []);

    // 搜索逻辑
    const results = useMemo(() => {
        if (!searchTerm) {
            // 默认显示与当前年份相关的记录
            const matching = allData.filter(r => Math.abs(r.gregorianYear - currentYear) < 2);
            return matching.slice(0, 6);
        }

        const term = searchTerm.toLowerCase();
        const filtered = allData.filter(r =>
            r.dynasty.toLowerCase().includes(term) ||
            r.era.toLowerCase().includes(term) ||
            r.gregorianYear.toString().includes(term) ||
            (r.emperor && r.emperor.toLowerCase().includes(term))
        );
        return filtered.slice(0, 12); // 增加展示上限
    }, [searchTerm, currentYear, allData]);

    return (
        <div className="glass-panel p-6 border-t-2 border-amber-500/30 overflow-hidden relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3">
                    <History className="text-amber-400" size={24} />
                    <div>
                        <h2 className="text-xl font-bold text-stone-100 italic">纪年换算</h2>
                    </div>
                </div>
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="搜索朝代、年号、皇帝或公元年份..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-4 pl-10 text-sm focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-stone-600"
                    />
                    <Search className="absolute left-3 top-3 text-stone-500" size={16} />
                </div>
            </div>

            {/* 流光装饰线 */}
            <div className="mt-8 mb-4 h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent blur-sm"></div>
            </div>

            {loading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-stone-500">
                    <div className="w-6 h-6 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                    <span className="text-xs">正在载入核心纪年数据库...</span>
                </div>
            ) : (
                <div className="min-h-[140px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {searchTerm ? (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                            >
                                {results.length > 0 ? (
                                    results.map((rec, i) => (
                                        <motion.div
                                            key={`${rec.dynasty}-${rec.era}-${rec.gregorianYear}-${i}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, delay: i * 0.03 }}
                                            onClick={() => onYearSelect(rec.gregorianYear)}
                                            className="group cursor-pointer bg-gradient-to-br from-white/5 to-transparent hover:from-white/10 hover:to-white/5 border border-white/10 rounded-xl p-4 transition-all hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-stone-800 text-amber-500 border border-amber-500/20">
                                                    {rec.dynasty}
                                                </span>
                                                <span className="text-[10px] text-stone-500 font-mono tracking-tighter">
                                                    {rec.gregorianYear > 0 ? `AD ${rec.gregorianYear}` : `BC ${Math.abs(rec.gregorianYear)}`}
                                                </span>
                                            </div>
                                            <div className="text-base font-bold text-stone-200 group-hover:text-amber-400 transition-colors">
                                                {rec.era}{rec.yearNum}年 <span className="text-xs font-normal text-stone-500 ml-1">[{rec.ganzhi}]</span>
                                            </div>
                                            {rec.emperor && (
                                                <div className="mt-3 text-[11px] text-stone-500 flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                                                    {rec.emperor}
                                                </div>
                                            )}
                                            <div className="mt-2 text-[10px] text-stone-600 group-hover:text-amber-600/70 transition-colors font-mono">
                                                距今 {2026 - rec.gregorianYear} 年
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-10 flex flex-col items-center gap-4 text-stone-600">
                                        <Search size={40} className="opacity-20" />
                                        <p className="text-sm">未找到相关纪年记录，尝试搜索“唐”、“康熙”或“1368”</p>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="quote"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                className="flex flex-col items-center justify-center p-8 text-center space-y-4"
                            >
                                <Quote className="text-amber-500/20 rotate-180" size={32} />
                                <div className="space-y-3">
                                    <p className="text-lg md:text-xl font-medium text-stone-300 italic tracking-[0.1em] leading-relaxed">
                                        “{randomQuote?.content}”
                                    </p>
                                    <p className="text-sm text-amber-500/60 font-medium">
                                        —— {randomQuote?.source}
                                    </p>
                                </div>
                                <Quote className="text-amber-500/20" size={32} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};
