import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Layers, Sparkles, Sun, Moon } from 'lucide-react';
import type { TianDate } from '../utils/tianCalendar';

interface TianFlowChartProps {
    tianDate: TianDate;
}

export const TianFlowChart: React.FC<TianFlowChartProps> = ({ tianDate }) => {
    // 提取纪元解析结果
    const sections = [
        { label: '五始大轮', value: tianDate.era, cycle: '3000年/轮', color: 'from-blue-600 to-indigo-700' },
        { label: '大轮之大数', value: tianDate.greatNumber, cycle: '300年/数', color: 'from-indigo-600 to-blue-700' },
        { label: '大数之五行', value: tianDate.elementSeries, cycle: '60年/一数', color: 'from-blue-500 to-cyan-600' },
        { label: '甲子之五行', value: tianDate.element, cycle: '12年/行', color: 'from-cyan-500 to-teal-600' },
        { label: '一时/季', value: tianDate.season, cycle: '每季73天', color: 'from-emerald-500 to-teal-600' },
        { label: '月/日', value: `${tianDate.monthName} ${tianDate.day}日`, cycle: '阴36/阳37', color: 'from-stone-600 to-stone-800' }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto p-4 space-y-8">
            <div className="flex items-center gap-3 border-l-4 border-blue-500 pl-4 mb-8">
                <Layers className="text-blue-400" size={24} />
                <h3 className="text-xl font-black text-white tracking-widest uppercase">
                    圣太一天历纪元推演
                </h3>
                <span className="text-[10px] text-stone-500 font-mono tracking-tighter">CELESTIAL HIERARCHY DEDUCTION</span>
            </div>

            {/* 全景全称显示 */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 bg-blue-500/5 border-blue-500/20 text-center relative overflow-hidden group"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <span className="text-stone-500 text-xs font-mono uppercase tracking-[0.3em]">当前时空表述:</span>
                    <span className="text-2xl md:text-3xl font-black text-blue-100 tracking-[0.2em] drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                        {tianDate.fullEraName}
                    </span>
                    <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold animate-pulse">
                        圣太一命贞
                    </div>
                </div>
            </motion.div>

            {/* 嵌套推演架构组 - 基于图片1还原 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 relative">
                {sections.map((sec, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group h-full"
                    >
                        <div className={`h-full glass-panel p-4 flex flex-col items-center justify-between text-center border-t-4 transition-all duration-500 hover:scale-105 hover:bg-white/5 border-blue-500/30`}>
                            <div className="space-y-1">
                                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-tighter whitespace-nowrap">{sec.label}</span>
                                <div className="text-stone-600 text-[8px] font-mono">{sec.cycle}</div>
                            </div>

                            <div className={`my-4 w-full py-3 rounded-lg bg-gradient-to-br ${sec.color} shadow-lg shadow-blue-900/20 flex flex-col items-center justify-center relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="text-xl font-black text-white tracking-[0.3em] font-serif">{sec.value}</span>
                            </div>

                            <div className="flex items-center gap-1 opacity-20">
                                <ChevronDown size={14} className="text-blue-400" />
                            </div>
                        </div>

                        {/* 连接线 (仅移动端隐藏或在大屏显示 Arrow) */}
                        {i < sections.length - 1 && (
                            <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-blue-500/20">
                                <ArrowRight size={16} />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* 底部补充：昼夜/太阳/阴阳关系组 */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-panel p-5 border-stone-500/20 bg-stone-900/40 relative overflow-hidden group">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center ${tianDate.month % 2 === 0 ? 'bg-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.3)]'}`}>
                            {tianDate.month % 2 === 0 ? <Sun className="text-orange-400" size={24} /> : <Moon className="text-blue-400" size={24} />}
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white tracking-widest">{tianDate.month % 2 === 0 ? '太阳·阳月' : '太阴·阴月'}</h4>
                            <p className="text-[10px] text-stone-500 leading-relaxed">
                                {tianDate.month % 2 === 0 ? '阳月37天，主干行、主升腾。每四年设一闰，闰于阳月末。' : '阴月36天，主合律、主收摄。清虚圆满。'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-5 border-stone-500/20 bg-stone-900/40">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center bg-blue-500/10">
                            <Sparkles className="text-blue-400" size={24} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white tracking-widest">昼、夜/时轮</h4>
                            <p className="text-[10px] text-stone-500 leading-relaxed">
                                天地之数，尽在河洛。阴阳合为一时轮，时时合为一全，推演八千载时空坐标。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
