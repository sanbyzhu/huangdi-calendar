import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sparkles } from 'lucide-react';
import type { TianDate } from '../utils/tianCalendar';

interface TianCelestialCompassProps {
    tianDate: TianDate;
}

// 大数系统常量
const LARGE_NUMBERS = [
    "由", "由", "秭", "穰", "沟", "涧", "正", "载", "极", "恒河沙", "阿僧祇", "那由他", "不可思议", "无量天数"
];

const TIAN_MONTHS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const TIAN_SEASONS = ["春", "夏", "秋", "冬", "寒"];

const BIG_DIPPER = [
    { x: 200, y: 300, name: "天枢" },
    { x: 300, y: 280, name: "天璇" },
    { x: 350, y: 350, name: "天玑" },
    { x: 450, y: 380, name: "天权" },
    { x: 550, y: 500, name: "玉衡" },
    { x: 650, y: 480, name: "开阳" },
    { x: 665, y: 465, name: "辅" },
    { x: 700, y: 550, name: "瑶光" },
    { x: 730, y: 575, name: "弼" },
];

const PLANETS = [
    { name: '水星', color: '#8d8d8d', radius: 55, speed: 2.4, size: 7 },
    { name: '金星', color: '#e3bb76', radius: 85, speed: 1.6, size: 11 },
    { name: '地球', color: '#4fa8ff', radius: 115, speed: 1, size: 13, glow: '#4fa8ff', hasMoon: true },
    { name: '火星', color: '#ff5f5f', radius: 155, speed: 0.8, size: 10 },
    { name: '木星', color: '#d3a567', radius: 210, speed: 0.4, size: 22 },
    { name: '土星', color: '#ead6b8', radius: 270, speed: 0.2, size: 20, ring: true },
];

const COMPASS_SIZE = 500;
const OUTER_ORBIT_SIZE = 520;
const MONTH_RING_SIZE = 600;
const SEASON_RING_SIZE = 700;

export const TianCelestialCompass: React.FC<TianCelestialCompassProps> = ({ tianDate }) => {
    const [rotation, setRotation] = useState(0);
    const [isAligning, setIsAligning] = useState(false);

    // 旋转逻辑
    useEffect(() => {
        if (isAligning) return;
        const timer = setInterval(() => {
            setRotation(prev => (prev + 0.1) % 360);
        }, 50);
        return () => clearInterval(timer);
    }, [isAligning]);

    const handleAlign = () => {
        if (isAligning) return;
        setIsAligning(true);
        setTimeout(() => setIsAligning(false), 5000);
    };

    // 月份和季节的展示受 tianDate 驱动 (静态加成)
    const monthIndex = tianDate.month - 1;

    return (
        <div className="relative flex flex-col items-center justify-center select-none uppercase tracking-tighter font-serif">
            {/* 1. 背景层：北斗九星 + 阴阳太极 */}
            <div className="absolute inset-0 pointer-events-none opacity-40 scale-75 md:scale-100 flex items-center justify-center">

                <svg width="1000" height="1000" viewBox="0 0 1000 1000" className="absolute">
                    {/* 发光星线 */}
                    <path
                        d="M200,300 L300,280 L350,350 L450,380 L550,500 L650,480 L700,550"
                        stroke="rgba(100,200,255,0.3)"
                        strokeWidth="1.5"
                        fill="none"
                        className="blur-[2px]"
                    />
                    <path
                        d="M200,300 L300,280 L350,350 L450,380 L550,500 L650,480 L700,550"
                        stroke="white"
                        strokeWidth="0.8"
                        fill="none"
                        strokeDasharray="4 4"
                    />
                    {BIG_DIPPER.map((star, i) => (
                        <g key={i}>
                            <circle cx={star.x} cy={star.y} r="3" fill="white" className="animate-pulse shadow-[0_0_10px_white]" />
                            <text x={star.x + 10} y={star.y + 5} fill="rgba(255,255,255,0.7)" fontSize="14" fontWeight="bold" className="drop-shadow-md">{star.name}</text>
                        </g>
                    ))}
                </svg>
            </div>

            {/* 2. 罗盘主体 */}
            <div className="relative flex items-center justify-center shrink-0 scale-[0.6] md:scale-95" style={{ width: COMPASS_SIZE, height: COMPASS_SIZE }}>

                {/* 轨道 */}
                {PLANETS.map((p, i) => (
                    <div
                        key={`orbit-${i}`}
                        className="absolute border border-white/5 rounded-full pointer-events-none"
                        style={{ width: p.radius * 2, height: p.radius * 2, boxShadow: p.name === '地球' ? 'inset 0 0 10px rgba(79,168,255,0.03)' : 'none' }}
                    />
                ))}

                {/* 连珠光束 */}
                <AnimatePresence>
                    {isAligning && (
                        <motion.div
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0 }}
                            className="absolute z-10 w-[2px] h-[350px] bg-gradient-to-t from-transparent via-amber-400/50 to-transparent"
                            style={{ top: '50%', transform: 'translateY(-50%)', left: '50%', marginLeft: -1 }}
                        >
                            <div className="absolute inset-0 bg-amber-400/20 blur-[10px]" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 行星 */}
                {PLANETS.map((p, i) => (
                    <motion.div
                        key={`planet-${i}`}
                        className="absolute"
                        style={{ width: p.radius * 2, height: p.radius * 2 }}
                        animate={{ rotate: isAligning ? 0 : (rotation * p.speed * 5) % 360 }}
                        transition={{ type: "spring", stiffness: isAligning ? 40 : 100, damping: 20, duration: isAligning ? 2 : 0 }}
                    >
                        <div className="absolute" style={{ top: -p.size / 2, left: '50%', marginLeft: -p.size / 2 }}>
                            <div className="relative">
                                <div
                                    className="rounded-full shadow-inner relative z-10"
                                    style={{
                                        width: p.size,
                                        height: p.size,
                                        backgroundColor: p.color,
                                        boxShadow: isAligning ? `0 0 30px ${p.color}, 0 0 10px white` : `0 0 20px ${p.glow || 'rgba(255,255,255,0.1)'}`,
                                        filter: `drop-shadow(0 0 5px ${p.color}88)`
                                    }}
                                />
                                {p.name === '地球' && <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-[4px] scale-125 -z-0" />}
                                {p.hasMoon && (
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        style={{ width: 34, height: 34 }}
                                        animate={{ rotate: isAligning ? 0 : (rotation * 13.3 * 5) % 360 }}
                                        transition={{ type: "spring", stiffness: isAligning ? 30 : 100, damping: 15, duration: isAligning ? 2.5 : 0 }}
                                    >
                                        <div className="absolute inset-0 border border-white/10 rounded-full" />
                                        <div className="absolute w-1.5 h-1.5 bg-stone-200 rounded-full shadow-[0_0_5px_white]" style={{ top: -0.75, left: '50%', marginLeft: -0.75 }} />
                                    </motion.div>
                                )}
                                {p.ring && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240%] h-[30%] border border-white/30 rounded-full rotate-[25deg] pointer-events-none" />}
                                <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 text-[12px] font-black whitespace-nowrap transition-all duration-700 ${isAligning ? 'text-amber-400 scale-110' : 'text-stone-300'} tracking-normal italic`}>
                                    {p.name}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* 太阳 */}
                <div className="relative z-20">
                    <motion.div
                        animate={{
                            scale: isAligning ? [1, 1.2, 1.1] : [1, 1.05, 1],
                            boxShadow: isAligning
                                ? ["0 0 50px rgba(245,158,11,0.8)", "0 0 80px rgba(245,158,11,1)", "0 0 60px rgba(245,158,11,0.9)"]
                                : ["0 0 20px rgba(245,158,11,0.4)", "0 0 40px rgba(245,158,11,0.6)", "0 0 20px rgba(245,158,11,0.4)"]
                        }}
                        transition={{ duration: isAligning ? 1 : 3, repeat: isAligning ? 0 : Infinity }}
                        className="w-10 h-10 bg-gradient-to-br from-amber-300 to-orange-600 rounded-full flex items-center justify-center cursor-pointer"
                        onClick={handleAlign}
                    >
                        <Sun className={`text-white transition-all duration-700 ${isAligning ? 'fill-amber-200 scale-125' : 'fill-white'}`} size={20} />
                    </motion.div>
                </div>

                {/* 大数环 */}
                <motion.div
                    className="absolute rounded-full border border-blue-500/20"
                    style={{ width: OUTER_ORBIT_SIZE, height: OUTER_ORBIT_SIZE }}
                    animate={{ rotate: rotation * 0.2 }}
                    transition={{ type: "tween", ease: "linear", duration: 0 }}
                >
                    <svg width={OUTER_ORBIT_SIZE} height={OUTER_ORBIT_SIZE} viewBox={`0 0 ${OUTER_ORBIT_SIZE} ${OUTER_ORBIT_SIZE}`}>
                        <defs>
                            <path id="largeNumPath" d={`M ${OUTER_ORBIT_SIZE / 2}, ${OUTER_ORBIT_SIZE / 2} m -${OUTER_ORBIT_SIZE / 2 - 15}, 0 a ${OUTER_ORBIT_SIZE / 2 - 15},${OUTER_ORBIT_SIZE / 2 - 15} 0 1,1 ${OUTER_ORBIT_SIZE - 30},0 a ${OUTER_ORBIT_SIZE / 2 - 15},${OUTER_ORBIT_SIZE / 2 - 15} 0 1,1 -${OUTER_ORBIT_SIZE - 30},0`} />
                        </defs>
                        <text className="text-[11px] fill-blue-400/60 font-bold tracking-[0.6em] drop-shadow-[0_0_5px_rgba(56,189,248,0.3)]">
                            <textPath xlinkHref="#largeNumPath">{LARGE_NUMBERS.join(" ● ")} ● {LARGE_NUMBERS.join(" ● ")}</textPath>
                        </text>
                    </svg>
                </motion.div>

                {/* 月份环 */}
                <div className="absolute pointer-events-none" style={{ width: MONTH_RING_SIZE, height: MONTH_RING_SIZE }}>
                    {TIAN_MONTHS.map((m, i) => (
                        <div key={i} className="absolute h-full left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ transform: `rotate(${i * 36}deg)` }}>
                            <div className="mt-1 flex flex-col items-center gap-1">
                                <div className={`font-black text-xl drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-500 ${monthIndex === i ? 'text-sky-300 scale-125' : 'text-sky-600/40'}`} style={{ transform: `rotate(${-i * 36}deg)` }}>{m}</div>
                                <div className={`w-[1.5px] transition-all duration-500 ${monthIndex === i ? 'h-6 bg-sky-400' : 'h-3 bg-sky-800/20'}`} />
                            </div>
                        </div>
                    ))}
                    <div className="absolute inset-4 border border-sky-500/10 rounded-full" />
                </div>

                {/* 季节环 */}
                <div className="absolute pointer-events-none" style={{ width: SEASON_RING_SIZE, height: SEASON_RING_SIZE }}>
                    {TIAN_SEASONS.map((s, i) => (
                        <div key={i} className="absolute h-full left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ transform: `rotate(${i * 72}deg)` }}>
                            <div className="mt-1 flex flex-col items-center gap-2">
                                <div className={`px-4 py-1.5 rounded-xl text-xs font-black tracking-[0.3em] backdrop-blur-md transition-all duration-500 ${tianDate.season === s ? 'bg-blue-500/20 border-blue-400 text-stone-100 scale-110' : 'bg-transparent border-transparent text-stone-600/40'}`} style={{ transform: `rotate(${-i * 72}deg)` }}>{s}</div>
                                <div className={`w-[2px] transition-all duration-500 ${tianDate.season === s ? 'h-5 bg-blue-500/50' : 'h-2 bg-blue-900/10'}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. 连珠按钮 */}
            <div className="mt-8 scale-75 md:scale-100">
                <button
                    onClick={handleAlign}
                    disabled={isAligning}
                    className={`group relative px-8 py-2.5 rounded-full border transition-all duration-1000 ${isAligning ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.2)]' : 'bg-blue-500/5 border-blue-500/20 hover:border-blue-400 hover:bg-blue-500/10'}`}
                >
                    <div className="flex items-center gap-2 relative z-10">
                        <Sparkles className={`transition-transform duration-1000 ${isAligning ? 'rotate-180 text-amber-400' : 'text-blue-400'}`} size={16} />
                        <span className={`font-black text-sm tracking-[0.2em] transition-colors duration-1000 ${isAligning ? 'text-amber-400' : 'text-sky-300'}`}>
                            {isAligning ? '星 宿 汇 聚' : '七 星 连 珠'}
                        </span>
                    </div>
                </button>
            </div>

            {/* 时间显示集成 */}
            <div className="mt-6 text-center z-10">
                <div className="flex items-center justify-center gap-4 text-sky-400/60 font-black italic">
                    <span className="text-xl">{tianDate.year} 载</span>
                    <span className="text-3xl text-sky-400">{tianDate.monthName}</span>
                    <span className="text-xl">{tianDate.day} 日</span>
                </div>
            </div>
        </div>
    );
};
