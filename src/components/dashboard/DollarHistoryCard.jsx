import { useMemo } from 'react';

const mockData = [
    { day: 'Lun', bcv: 58.2, paralelo: 62.5 },
    { day: 'Mar', bcv: 58.4, paralelo: 63.2 },
    { day: 'Mié', bcv: 58.5, paralelo: 64.1 },
    { day: 'Jue', bcv: 58.7, paralelo: 65.0 },
    { day: 'Vie', bcv: 58.9, paralelo: 63.5 },
];

export default function DollarHistoryCard({ className = "" }) {
    const maxVal = Math.max(...mockData.flatMap(d => [d.bcv, d.paralelo]));
    const minVal = 55; // baseline

    const getHeight = (val) => {
        const h = ((val - minVal) / (maxVal - minVal)) * 100;
        return `${Math.max(10, h)}%`;
    }

    return (
        <div className={`rounded-3xl bg-[var(--color-surface)] shadow-card p-6 md:p-8 flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-xl duration-300 border border-[var(--color-border)] relative overflow-hidden h-full min-h-[300px] ${className}`}>
            <div className={`absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110`}></div>

            <div className="flex items-start justify-between relative z-10 mb-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-purple-600 dark:text-purple-400">
                        <span className="material-symbols-outlined text-[32px]">
                            monitoring
                        </span>
                    </div>
                    <div>
                        <p className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-wider font-montserrat">Histórico semanal</p>
                        <h3 className="text-[var(--color-text-main)] font-semibold text-lg">BCV vs Paralelo</h3>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-end justify-between relative z-10 gap-2 mt-4 px-2 min-h-[140px]">
                {mockData.map((d) => (
                    <div key={d.day} className="flex flex-col items-center gap-3 h-full flex-1">
                        <div className="relative flex-1 w-full flex items-end justify-center gap-1.5 group/bars h-full">

                            {/* BCV Bar */}
                            <div className="w-full max-w-[14px] bg-green-100 dark:bg-green-900/30 rounded-t-md relative group-hover/bars:bg-green-200 dark:group-hover/bars:bg-green-800/40 transition-colors h-full">
                                <div
                                    className="absolute bottom-0 w-full bg-green-500 rounded-t-md transition-all duration-700 ease-out"
                                    style={{ height: getHeight(d.bcv) }}
                                ></div>
                            </div>

                            {/* Paralelo Bar */}
                            <div className="w-full max-w-[14px] bg-red-100 dark:bg-red-900/30 rounded-t-md relative group-hover/bars:bg-red-200 dark:group-hover/bars:bg-red-800/40 transition-colors h-full">
                                <div
                                    className="absolute bottom-0 w-full bg-red-500 rounded-t-md transition-all duration-700 ease-out delay-75"
                                    style={{ height: getHeight(d.paralelo) }}
                                ></div>
                            </div>
                        </div>
                        <span className="text-xs font-medium text-[var(--color-text-muted)]">{d.day}</span>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 relative z-10">
                <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-green-500"></div>
                    <span className="text-xs font-medium text-[var(--color-text-muted)]">BCV</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500"></div>
                    <span className="text-xs font-medium text-[var(--color-text-muted)]">Paralelo</span>
                </div>
            </div>
        </div>
    );
}
