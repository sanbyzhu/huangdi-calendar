import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { fromGregorian } from '../utils/tianCalendar';
import type { TianDate } from '../utils/tianCalendar';
import { Star, History, Sparkles } from 'lucide-react';

interface TianEvent {
    year: number;
    era: string;
    event: string;
    description: string;
}

export const TianCompass: React.FC = () => {
    const [tianDate, setTianDate] = useState<TianDate>(fromGregorian(new Date()));
    const [events, setEvents] = useState<TianEvent[]>([]);
    const [activeEvent, setActiveEvent] = useState<TianEvent | null>(null);
    const [dragYear, setDragYear] = useState(tianDate.year);

    // 使用旋转角度作为核心状态
    const rotation = useMotionValue(0);
    // 旋转 10 度映射为 100 年的变化（即 1:10）
    const yearOffset = useTransform(rotation, (value) => Math.round(value * 10));

    useEffect(() => {
        fetch('/data/tian_events.json')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error("加载历史事件失败:", err));

        const timer = setInterval(() => {
            setTianDate(fromGregorian(new Date()));
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // 监控旋转状态并探测事件
    useEffect(() => {
        const unsubscribe = yearOffset.onChange((offset) => {
            const simulatedYear = tianDate.year + offset;
            setDragYear(simulatedYear);

            const found = events.find(e => Math.abs(e.year - simulatedYear) <= 5);
            if (found && (!activeEvent || activeEvent.year !== found.year)) {
                setActiveEvent(found);
            }
        });
        return () => unsubscribe();
    }, [yearOffset, events, tianDate.year, activeEvent]);

    // 手势处理：通过水平位移控制旋转
    const handlePan = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        rotation.set(rotation.get() + info.delta.x * 0.5); // 减缓速度增加控制感
    };

    // 虽然 monthAngle 在这个动态版本中不直接用于外层旋转，但我们用它来处理静态刻度的高亮逻辑
    const monthAngle = (tianDate.month - 1) * 36;

    const seasons = [
        { name: '春季', element: '水', color: 'bg-blue-500', icon: '💧' },
        { name: '夏季', element: '火', color: 'bg-red-500', icon: '🔥' },
        { name: '秋季', element: '木', color: 'bg-emerald-500', icon: '🌲' },
        { name: '冬季', element: '金', color: 'bg-amber-500', icon: '⚔️' },
        { name: '寒季', element: '土', color: 'bg-stone-500', icon: '⛰️' },
    ];

    return (
        <div className="flex flex-col items-center justify-center p-4 space-y-12 select-none overflow-hidden">
            {/* 顶部标题与年份 */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-blue-400 font-mono text-xs tracking-[0.4em] uppercase">
                    <History size={14} className="animate-pulse" />
                    {activeEvent ? activeEvent.era : tianDate.era} · 纪元
                </div>
                <div className="relative inline-block">
                    <h2 className="text-6xl md:text-8xl font-black font-serif text-white tracking-[0.2em] relative z-10 transition-all">
                        {dragYear} <span className="text-xl md:text-2xl font-light text-blue-500/80">年</span>
                    </h2>
                    <div className="absolute inset-x-0 bottom-2 h-4 bg-blue-500/20 blur-xl"></div>
                </div>
                <div className="flex items-center justify-center gap-4 text-stone-400 font-medium tracking-widest text-sm">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">{tianDate.month}月 {tianDate.monthName}</span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">{tianDate.solarTerm}</span>
                </div>
            </motion.div>

            {/* 罗盘主体 */}
            <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 border-[2px] border-white/5 rounded-full shadow-[inset_0_0_100px_rgba(59,130,246,0.05)]"></div>

                {/* 旋转监听层 */}
                <motion.div
                    onPan={handlePan}
                    style={{ rotate: rotation }}
                    className="relative w-full h-full flex items-center justify-center cursor-move"
                >
                    {/* 月份刻度 */}
                    <div className="absolute inset-0 rounded-full border border-blue-500/10">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col items-center" style={{ transform: `rotate(${i * 36 - monthAngle}deg)` }}>
                                <div className={`text-[10px] font-black mt-4 ${tianDate.month === i + 1 ? 'text-blue-400 scale-125' : 'text-stone-700'}`}>
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 五季环 */}
                    <div className="absolute inset-24 md:inset-32">
                        {seasons.map((s, i) => (
                            <div key={i} className="absolute h-full flex flex-col items-center top-0 left-1/2 -translate-x-1/2" style={{ transform: `rotate(${i * 72}deg)` }}>
                                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${s.color} border border-white/20 flex flex-col items-center justify-center shadow-2xl`}>
                                    <span className="text-xl">{s.icon}</span>
                                    <span className="text-[9px] font-black text-white">{s.element}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 装饰星图 */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <Star className="absolute top-1/4 left-1/4 animate-pulse" size={4} />
                        <Star className="absolute bottom-1/4 right-1/3 animate-pulse delay-500" size={6} />
                    </div>
                </motion.div>

                {/* 固定中心指针 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-20 h-20 rounded-full bg-blue-500/5 backdrop-blur-xl border border-blue-500/20 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_white]"></div>
                        <div className="absolute inset-0 border border-white/20 rounded-full animate-ping-slow"></div>
                    </div>
                    {/* 指向线上方 */}
                    <div className="absolute top-0 w-px h-1/2 bg-gradient-to-b from-transparent via-white/40 to-white/10"></div>
                </div>

                {/* 历史事件详情弹窗 */}
                <AnimatePresence>
                    {activeEvent && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="absolute -bottom-10 md:-bottom-20 left-1/2 -translate-x-1/2 w-72 md:w-96 glass-panel p-6 border-blue-500/40 bg-blue-500/10 shadow-2xl z-30"
                        >
                            <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-500 text-white text-[10px] font-black rounded-lg flex items-center gap-1">
                                <Sparkles size={10} /> 探测到时空共鸣点
                            </div>
                            <div className="space-y-4">
                                <div className="border-b border-blue-500/20 pb-3">
                                    <h3 className="font-bold text-blue-200 text-xl tracking-wider">{activeEvent.event}</h3>
                                    <p className="text-[10px] font-mono text-blue-400 mt-1">{activeEvent.era} · Yr {activeEvent.year}</p>
                                </div>
                                <p className="text-xs text-stone-300 leading-loose text-justify italic">
                                    {activeEvent.description}
                                </p>
                                <button onClick={() => setActiveEvent(null)} className="w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 text-[10px] text-blue-300 font-bold rounded-xl border border-blue-500/20 transition-all uppercase tracking-widest">
                                    继续时空领航
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 操作提示 */}
            <div className="flex flex-col items-center gap-2">
                <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-stone-500 text-[10px] tracking-widest uppercase">
                    滑动罗盘 · 穿越八千年华夏史
                </div>
                <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-blue-500/30 animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>)}
                </div>
            </div>
        </div>
    );
};
