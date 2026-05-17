import React from 'react';
import { motion } from 'framer-motion';

export type CalendarIconType = 'dragon' | 'emperor' | 'wall' | 'pyramid' | 'cross';

interface CalendarCardProps {
    title: string;
    subtitle?: string;
    mainInfo: string;
    secondaryInfo?: string;
    gradientFrom: string;
    gradientTo: string;
    delay?: number;
    onClick?: () => void;
    iconType: CalendarIconType;
}

const IconMap = {
    dragon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2z" opacity="0.2" />
            <path d="M7 12c0-2.5 2-4.5 5-4.5s5 2 5 4.5-2 4.5-5 4.5-5-2-5-4.5z" />
            <path d="M12 7.5v9M9.5 12h5" />
            <path d="M4 12c0 4.4 3.6 8 8 8s8-3.6 8-8" />
            <path d="M8 8l2 2M16 8l-2 2" />
        </svg>
    ),
    emperor: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="4" rx="1" />
            <path d="M6 10V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
            <path d="M8 14l-1 4h10l-1-4" />
            <circle cx="12" cy="4" r="1" />
        </svg>
    ),
    wall: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20h20" />
            <path d="M4 20V10l2-2h4l2 2v10" />
            <path d="M12 20V12l2-2h4l2 2v10" />
            <path d="M7 14h2M15 16h2" />
        </svg>
    ),
    pyramid: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 20l10-16 10 16H2z" />
            <path d="M6 13.6h12M9 8.8h6" />
            <path d="M12 4v16" />
        </svg>
    ),
    cross: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v18M7 8h10" />
        </svg>
    )
};

export const CalendarCard: React.FC<CalendarCardProps> = ({
    title, subtitle, mainInfo, secondaryInfo, gradientFrom, gradientTo, delay = 0, onClick, iconType
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`glass-panel p-6 flex flex-col justify-between relative overflow-hidden group cursor-pointer`}
        >
            {/* Background Watermark Removed for Performance/Compatibility */}

            <div
                className={`absolute inset-0 bg-gradient-to-br from-[${gradientFrom}] to-[${gradientTo}] opacity-25 group-hover:opacity-40 transition-opacity duration-500`}
                style={{ backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }}
            />

            <div className="relative z-10 flex justify-between items-start mb-4">
                <div>
                    <h2
                        className="text-xl font-bold tracking-wider"
                        style={{ color: gradientFrom }}
                    >
                        {title}
                    </h2>
                    <p className="text-sm text-white/70 mt-1">{subtitle}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner group-hover:border-white/40 transition-colors">
                    <div className="w-8 h-8 transition-colors drop-shadow-lg" style={{ color: gradientFrom }}>
                        {IconMap[iconType]}
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-auto pt-6 overflow-hidden">
                <h3 className="text-lg lg:text-xl xl:text-2xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 whitespace-nowrap overflow-hidden">
                    {mainInfo}
                </h3>
                {secondaryInfo && (
                    <p className="text-xs sm:text-sm text-white/60 mt-2 font-medium tracking-wide leading-relaxed">{secondaryInfo}</p>
                )}
            </div>
        </motion.div>
    );
};
