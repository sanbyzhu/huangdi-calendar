import React from 'react';
import { motion } from 'framer-motion';
import type { CalendarData } from '../utils/calendarCore';

interface TraditionalPanelProps {
    data: CalendarData;
    selectedDate: Date;
}

export const TraditionalPanel: React.FC<TraditionalPanelProps> = ({ data, selectedDate }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 space-y-3 border border-amber-500/20 bg-stone-900/40 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-orange-600 rounded-l"></div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-white/5 pb-3">
                <div className="space-y-1">
                    <div className="text-sm text-stone-300">
                        甲子历 {data.jiazi.cycle}，{data.jiazi.yearZhu} {data.jiazi.monthZhu} <span className="text-amber-500">{data.jiazi.monthGua}</span> {data.jiazi.dayZhu}
                    </div>
                    <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
                        黄历 {data.huangdi.yearChinese}年{data.huangdi.monthStr}{data.huangdi.dayStr} {data.jiazi.jiujiu ? `- ${data.jiazi.jiujiu}` : ''}
                    </div>
                    {data.huangdi.wuhouFull && (
                        <div className="text-sm text-stone-400">
                            黄道节气 ~ {data.huangdi.wuhouFull}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between pt-1 gap-2 text-sm text-stone-400">
                <div className="flex flex-col space-y-1">
                    <div>天历 {data.tian.year}年{data.tian.month}月{data.tian.day}日</div>
                    <div className="font-bold text-stone-300">
                        汉历 {data.lunar.yearGan}{data.lunar.yearZhi}({data.lunar.zodiac})年{data.lunar.monthStr}{data.lunar.dayStr}
                    </div>
                </div>
                <div className="flex gap-4 sm:items-end">
                    <span>西历 {data.gregorian.dateStr}</span>
                    <span className="font-bold text-stone-200">
                        {['周日', '周一', '周二', '周三', '周四', '周五', '周六'][selectedDate.getDay()]}
                    </span>
                    <span className="text-xs text-amber-600/70 font-mono">
                        距今 {2026 - data.gregorian.year} 年
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
