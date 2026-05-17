import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, addMonths, subMonths } from 'date-fns';
import { getCalendarData } from '../utils/calendarCore';
import { TraditionalPanel } from './TraditionalPanel';

interface FullCalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentDate: Date;
    onSelectDate: (date: Date) => void;
    activeCalendarType: 'gregorian' | 'lunar' | 'huangdi' | 'tian' | 'mayan';
    calendarTitle: string;
}

type YearCalType = '西历' | '黄历' | '天历';

export const FullCalendarModal: React.FC<FullCalendarModalProps> = ({
    isOpen, onClose, currentDate, onSelectDate, activeCalendarType, calendarTitle
}) => {
    const [viewDate, setViewDate] = React.useState(currentDate);
    const [yearCalType, setYearCalType] = React.useState<YearCalType>('西历');

    // Update viewDate when currentDate changes from outside
    React.useEffect(() => {
        if (isOpen) {
            setViewDate(currentDate);
        }
    }, [currentDate, isOpen]);

    const handlePrevMonth = () => setViewDate(subMonths(viewDate, 1));
    const handleNextMonth = () => setViewDate(addMonths(viewDate, 1));

    // Jump by N Gregorian years (all calendar systems share 1:1 year mapping in this MVP)
    const jumpYear = (delta: number) => {
        const nd = new Date(viewDate);
        nd.setFullYear(nd.getFullYear() + delta);
        setViewDate(nd);
    };

    // Display year number based on selected calendar type
    const getDisplayYear = (): number => {
        const gy = viewDate.getFullYear();
        if (yearCalType === '黄历') return gy + 2697;    // 黄帝纪元 = 公历 + 2697
        if (yearCalType === '天历') return gy + 6117;    // 天历 ≈ 公历 + 6117 (近似)
        return gy;                                        // 西历
    };

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(viewDate),
        end: endOfMonth(viewDate)
    });

    const renderDayContent = (day: Date) => {
        const data = getCalendarData(day);
        const jieqi = data.lunar.jieqi;
        const solarFests = data.gregorian.festivals;
        const lunarFests = data.gregorian.lunarFestivals;


        const tags = (
            <>
                {jieqi && <span className="text-[9px] text-emerald-400/90 font-bold leading-none mt-0.5">{jieqi}</span>}
                {solarFests.slice(0, 1).map((f, i) => (
                    <span key={`sf-${i}`} className="text-[9px] text-rose-400/90 font-bold leading-none mt-0.5">{f}</span>
                ))}
                {lunarFests.slice(0, 1).map((f, i) => (
                    <span key={`lf-${i}`} className="text-[9px] text-amber-400/90 font-bold leading-none mt-0.5">{f}</span>
                ))}
            </>
        );

        switch (activeCalendarType) {
            case 'lunar':
                return <><span className="text-xs text-stone-400 mt-1">{data.lunar.dayStr}</span>{tags}</>;
            case 'huangdi':
                return <><span className="text-xs text-amber-500/70 mt-1">{data.huangdi.dayStr.substring(0, 2)}</span>{tags}</>;
            case 'tian':
                return <><span className="text-xs text-blue-400/70 mt-1">{data.tian.month}月{data.tian.day}日</span>{tags}</>;
            case 'mayan':
                return <><span className="text-[10px] text-pink-400/80 mt-1 truncate w-full text-center">{data.mayan.tzolkin}</span>{tags}</>;
            default: // gregorian
                return (
                    <>
                        <span className="text-[10px] text-stone-500 mt-1">{data.lunar.dayStr === '初一' ? data.lunar.monthStr : data.lunar.dayStr}</span>
                        {tags}
                    </>
                );
        }
    };


    const calTypeOptions: YearCalType[] = ['天历', '黄历', '西历'];
    const calTypeColors: Record<YearCalType, string> = {
        '天历': '#3b82f6',
        '黄历': '#f59e0b',
        '西历': '#8b5cf6',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-32 pb-4 md:pt-[10rem] md:pb-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="glass-panel w-full max-w-4xl relative z-10 overflow-hidden shadow-2xl border border-white/20 max-h-[85vh] flex flex-col mt-12"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 shrink-0">
                            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-orange-400">
                                {calendarTitle}视图
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/30 rounded-full transition-all group active:scale-90 flex items-center justify-center z-10 shadow-lg"
                                title="关闭"
                            >
                                <X size={20} className="text-amber-100 group-hover:text-amber-200 transition-colors" />
                            </button>
                        </div>

                        <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">

                            {/* 选历法 + 年份快速跳转 */}
                            <div className="glass-panel p-3 rounded-xl space-y-3 border border-white/10 bg-white/3">
                                {/* 选历法 */}
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-stone-400 shrink-0 w-12">选历法:</span>
                                    <div className="flex gap-3">
                                        {calTypeOptions.map(ct => (
                                            <button
                                                key={ct}
                                                onClick={() => setYearCalType(ct)}
                                                className="flex items-center gap-1.5 text-sm transition-all"
                                            >
                                                <span
                                                    className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center`}
                                                    style={{
                                                        borderColor: yearCalType === ct ? calTypeColors[ct] : 'rgba(255,255,255,0.2)',
                                                        backgroundColor: yearCalType === ct ? calTypeColors[ct] : 'transparent',
                                                        boxShadow: yearCalType === ct ? `0 0 8px ${calTypeColors[ct]}88` : 'none',
                                                    }}
                                                />
                                                <span className={yearCalType === ct ? 'text-white font-medium' : 'text-stone-400'}>
                                                    {ct}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 年份快速输入 */}
                                <div className="flex items-center justify-center gap-1 md:gap-2 w-full">
                                    <div className="flex items-center gap-1 md:gap-2">
                                        {[-10, -1].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => jumpYear(d)}
                                                className="text-xs bg-white/10 hover:bg-white/20 text-stone-300 px-2 md:px-3 py-1.5 rounded-lg border border-white/10 transition-colors font-mono"
                                            >
                                                {d}
                                            </button>
                                        ))}
                                        {/* 可输入年份 */}
                                        <input
                                            type="number"
                                            value={getDisplayYear()}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value, 10);
                                                if (isNaN(val)) return;

                                                // Convert entered calendar year back to Gregorian year for viewDate
                                                let targetGregorian = val;
                                                if (yearCalType === '黄历') targetGregorian = val - 2697;
                                                if (yearCalType === '天历') targetGregorian = val - 6117;

                                                // Limit range slightly for safety and JS Date bounds
                                                if (targetGregorian < -5000) targetGregorian = -5000;
                                                if (targetGregorian > 9999) targetGregorian = 9999;

                                                const nd = new Date(viewDate);
                                                nd.setFullYear(targetGregorian);
                                                setViewDate(nd);
                                            }}
                                            className="text-sm font-bold px-1 md:px-2 py-1.5 rounded-lg border w-16 md:min-w-[80px] text-center focus:outline-none focus:ring-2 appearance-none"
                                            style={{
                                                borderColor: `${calTypeColors[yearCalType]}60`,
                                                color: calTypeColors[yearCalType],
                                                backgroundColor: `${calTypeColors[yearCalType]}15`,
                                                outlineColor: calTypeColors[yearCalType]
                                            }}
                                        />
                                        {[1, 10].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => jumpYear(d)}
                                                className="text-xs bg-white/10 hover:bg-white/20 text-stone-300 px-2 md:px-3 py-1.5 rounded-lg border border-white/10 transition-colors font-mono"
                                            >
                                                +{d}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Month Navigator */}
                            <div className="flex items-center justify-between">
                                <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="text-lg font-bold tracking-wider">
                                    {format(viewDate, 'yyyy年 MM月')}
                                </div>
                                <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                                    <div key={day} className="text-center text-xs font-medium text-stone-500 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: startOfMonth(viewDate).getDay() }).map((_, i) => (
                                    <div key={`empty-${i}`} className="h-14" />
                                ))}

                                {daysInMonth.map(day => {
                                    const isSelected = isSameDay(day, currentDate);
                                    const isToday = isSameDay(day, new Date());

                                    return (
                                        <button
                                            key={day.toISOString()}
                                            onClick={() => {
                                                onSelectDate(day);
                                            }}
                                            className={`
                                                h-14 flex flex-col items-center justify-center rounded-xl transition-all relative
                                                ${isSelected ? 'bg-amber-500 text-stone-900 font-bold shadow-lg shadow-amber-500/30' : 'hover:bg-white/10 text-stone-200'}
                                                ${isToday && !isSelected ? 'border border-amber-500/50 text-amber-500' : ''}
                                            `}
                                        >
                                            <>
                                                <span className="text-sm">{format(day, 'd')}</span>
                                                {renderDayContent(day)}
                                            </>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-2 border-t border-white/10 pt-4">
                                <TraditionalPanel data={getCalendarData(currentDate)} selectedDate={currentDate} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
