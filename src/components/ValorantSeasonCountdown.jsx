import { useState, useEffect } from 'react';

export default function ValorantSeasonCountdown() {
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const [progress, setProgress] = useState(0);
    const [currentSeason, setCurrentSeason] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeasonData = async () => {
            try {
                const response = await fetch('https://valorant-api.com/v1/seasons');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();

                const now = new Date();
                const activeAct = data.data.find(season => {
                    const start = new Date(season.startTime);
                    const end = new Date(season.endTime);
                    return now >= start && now <= end && season.type === "EAresSeasonType::Act";
                });

                if (activeAct) {
                    setCurrentSeason(activeAct);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSeasonData();
    }, []);

    useEffect(() => {
        if (!currentSeason) return;

        const calculateTime = () => {
            const now = new Date();
            const start = new Date(currentSeason.startTime);
            const end = new Date(currentSeason.endTime);
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

            const totalDuration = (end - start) / 1000;
            const elapsed = (now - start) / 1000;
            let prog = (elapsed / totalDuration) * 100;
            if (prog > 100) prog = 100;
            if (prog < 0) prog = 0;

            setProgress(prog);
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000); // 1 sec update
        return () => clearInterval(timer);
    }, [currentSeason]);

    if (loading) {
        return (
            <div className="md:col-span-2 rounded-3xl bg-white dark:bg-surface-dark shadow-card p-8 flex flex-col justify-between h-full animate-pulse">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                <div className="flex justify-between gap-4">
                    <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                    <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                    <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                    <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                </div>
                <div className="mt-4 h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
        );
    }

    if (!currentSeason) return null;

    const startDate = new Date(currentSeason.startTime).toLocaleDateString();
    const endDate = new Date(currentSeason.endTime).toLocaleDateString();

    return (
        <div className="md:col-span-2 rounded-3xl bg-[var(--color-surface)] shadow-card p-8 flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-xl duration-300 border border-[var(--color-border)] h-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-xl">
                        <span className="material-symbols-outlined">stadia_controller</span>
                    </div>
                    <h2 className="text-xl font-bold text-[var(--color-text-main)] font-montserrat">Valorant</h2>
                </div>
                <div className="text-xs font-medium text-[var(--color-text-muted)] bg-[var(--color-background)] px-3 py-1 rounded-full border border-[var(--color-border)]">
                    {currentSeason.displayName}
                </div>
            </div>

            <div className="my-auto">
                <div className="flex items-center justify-between px-2 mb-2">
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-4xl lg:text-5xl font-bold text-[var(--color-text-main)] tabular-nums">{timeLeft.d}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Días</span>
                    </div>
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-4xl lg:text-5xl font-bold text-[var(--color-text-main)] tabular-nums">{timeLeft.h}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Horas</span>
                    </div>
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-4xl lg:text-5xl font-bold text-[var(--color-text-main)] tabular-nums">{timeLeft.m}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Mins</span>
                    </div>
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-4xl lg:text-5xl font-bold text-rose-500 tabular-nums">{timeLeft.s}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Segs</span>
                    </div>
                </div>

                <div className="flex justify-between text-xs text-[var(--color-text-muted)] px-1 mt-4">
                    <span>Inicio: {startDate}</span>
                    <span>Fin: {endDate}</span>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex justify-between items-end mb-3">
                    <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Progreso de Temporada</h3>
                    <span className="text-sm font-bold text-[var(--color-text-muted)]">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-[var(--color-background)] rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
}
