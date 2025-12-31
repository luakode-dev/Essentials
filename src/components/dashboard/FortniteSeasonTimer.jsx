import { useState, useEffect } from 'react';

export default function FortniteSeasonTimer() {
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const [progress, setProgress] = useState(0);

    // Hardcode season end date: March 4, 2026
    // Using a fallback object ensuring visual stability even if API fails
    const [seasonData, setSeasonData] = useState({
        endTime: '2026-03-04T07:00:00Z'
    });
    const [loading, setLoading] = useState(false); // No loading state needed effectively if we have hardcoded data

    // Still try to fetch news or other info if needed, but primary timer relies on hardcoded date for now
    useEffect(() => {
        // Optional: Keep fetching if we want dynamic updates later or other info
        // But for now, we just want to ensure it works.
        // We can leave the fetch to see if it ever comes back, but we initialize with valid data.

        const fetchFortniteData = async () => {
            // We can just log or check, but we won't block rendering.
            // If we find a better endpoint later, we can update here.
        };

        fetchFortniteData();
    }, []);

    useEffect(() => {
        if (!seasonData || !seasonData.endTime) return;

        const calculateTime = () => {
            const now = new Date();
            const end = new Date(seasonData.endTime);
            // Approximate start date for Pacific Break (Chapter 6 Season 1) ~Nov 29, 2025
            const start = new Date('2025-11-29T00:00:00Z');

            const diff = (end - now) / 1000; // seconds

            if (diff <= 0) {
                setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
                setProgress(100);
                return;
            }

            const d = Math.floor(diff / (3600 * 24));
            const h = Math.floor((diff % (3600 * 24)) / 3600);
            const m = Math.floor((diff % 3600) / 60);
            const s = Math.floor(diff % 60);

            setTimeLeft({ d, h, m, s });

            // Calculate progress
            const totalDuration = (end - start) / 1000;
            const elapsed = (now - start) / 1000;
            let prog = (elapsed / totalDuration) * 100;
            if (prog > 100) prog = 100;
            if (prog < 0) prog = 0;
            setProgress(prog);
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [seasonData]);

    if (loading) {
        return (
            <div className="lg:row-span-2 rounded-3xl bg-[var(--color-surface)] dark:bg-[var(--color-surface)] text-[var(--color-text-main)] shadow-card p-8 flex flex-col justify-between relative overflow-hidden h-full animate-pulse border border-[var(--color-border)]">
                <div className="relative z-10 w-10 h-10 bg-gray-800 rounded-xl mb-8"></div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-32 h-16 bg-gray-800 rounded-2xl"></div>
                    <div className="w-24 h-8 bg-gray-800 rounded-xl"></div>
                </div>
                <div className="relative z-10 w-full h-8 bg-gray-800 rounded-xl mt-8"></div>
            </div>
        );
    }

    if (!seasonData) return null;

    return (
        <div className="rounded-3xl bg-[#1d4ed8] dark:bg-[var(--color-surface)] text-white shadow-card p-8 flex flex-col justify-between relative overflow-hidden group h-full border border-blue-400/30 dark:border-[var(--color-border)] transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#172554] dark:opacity-40 z-0"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl -mr-16 -mt-16 z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl -ml-16 -mb-16 z-0 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-yellow-400 text-[#1e3a8a] rounded-lg shadow-lg shadow-yellow-400/20 animate-pulse">
                        <span className="material-symbols-outlined text-xl">sports_esports</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold font-montserrat tracking-tight text-white dark:text-[var(--color-text-main)] drop-shadow-md">Fortnite</h2>
                        <p className="text-[9px] text-blue-200 dark:text-[var(--color-text-muted)] uppercase font-bold tracking-widest">Battle Pass</p>
                    </div>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-blue-500/30 border border-blue-300/30 dark:border-[var(--color-border)]">
                    <p className="text-[10px] font-bold text-blue-100 dark:text-[var(--color-text-muted)] uppercase tracking-wider">Activo</p>
                </div>
            </div>

            <div className="relative z-10 my-auto flex flex-col items-center">
                <div className="flex items-center justify-between gap-2 px-2 mb-2 w-full">
                    {timeLeft.d > 0 && (
                        <div className="flex flex-col items-center min-w-[50px]">
                            <span className="text-4xl font-extrabold tracking-tighter tabular-nums text-white dark:text-[var(--color-text-main)] drop-shadow-sm">{timeLeft.d}</span>
                            <span className="text-[10px] text-blue-200 dark:text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Días</span>
                        </div>
                    )}
                    <div className="flex flex-col items-center min-w-[50px]">
                        <span className="text-4xl font-extrabold tracking-tighter tabular-nums text-white dark:text-[var(--color-text-main)] drop-shadow-sm">{String(timeLeft.h).padStart(2, '0')}</span>
                        <span className="text-[10px] text-blue-200 dark:text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Horas</span>
                    </div>
                    <div className="flex flex-col items-center min-w-[50px]">
                        <span className="text-4xl font-extrabold tracking-tighter tabular-nums text-white dark:text-[var(--color-text-main)] drop-shadow-sm">{String(timeLeft.m).padStart(2, '0')}</span>
                        <span className="text-[10px] text-blue-200 dark:text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Mins</span>
                    </div>
                    <div className="flex flex-col items-center min-w-[50px]">
                        <span className="text-4xl font-extrabold tracking-tighter tabular-nums text-yellow-400 drop-shadow-sm">{String(timeLeft.s).padStart(2, '0')}</span>
                        <span className="text-[10px] text-blue-200 dark:text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Segs</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-end mb-3">
                    <span className="text-sm font-bold text-blue-200 dark:text-[var(--color-text-muted)] uppercase tracking-wider">Progreso de Temporada</span>
                    <span className="text-sm font-bold text-blue-200 dark:text-[var(--color-text-muted)]">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-blue-900/40 dark:bg-[var(--color-background)] rounded-full overflow-hidden border border-blue-400/30">
                    <div className="h-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.6)] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
}
