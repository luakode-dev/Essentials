import { useState, useEffect } from 'react';

export default function LoLSeasonTimer() {
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
    const [patch, setPatch] = useState('Wait...');

    // Season 2025 Split 3 end / New Season start: Jan 8, 2026
    const seasonEndDate = '2026-01-08T00:00:00Z';

    useEffect(() => {
        const fetchPatch = async () => {
            try {
                const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setPatch(data[0]);
                    }
                }
            } catch (error) {
                console.error('Error fetching LoL patch:', error);
                setPatch('Unknown');
            }
        };

        fetchPatch();
    }, []);

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const end = new Date(seasonEndDate);
            const diff = (end - now) / 1000;

            if (diff <= 0) {
                setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
                return;
            }

            const d = Math.floor(diff / (3600 * 24));
            const h = Math.floor((diff % (3600 * 24)) / 3600);
            const m = Math.floor((diff % 3600) / 60);
            const s = Math.floor(diff % 60);

            setTimeLeft({ d, h, m, s });
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="rounded-3xl bg-[#091428] dark:bg-[var(--color-surface)] text-[#C8AA6E] shadow-card p-8 flex flex-col justify-between relative overflow-hidden group h-full border border-[#C8AA6E]/30 dark:border-[var(--color-border)] transition-all hover:-translate-y-1 hover:shadow-2xl duration-300">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A323C] to-[#091428] opacity-50 dark:opacity-20 z-0"></div>

            <div className="relative z-10 flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#C8AA6E]/20 text-[#C8AA6E] rounded-xl border border-[#C8AA6E]/40">
                        <span className="material-symbols-outlined">swords</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold font-montserrat tracking-tight text-[#F0E6D2] dark:text-[var(--color-text-main)]">LOL</h2>
                        <p className="text-[10px] text-[#C8AA6E] uppercase font-bold tracking-widest">Season 2025</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-medium text-[#A09B8C] uppercase tracking-widest leading-none mb-1">Patch</p>
                    <p className="text-xs font-bold text-[#F0E6D2] dark:text-[var(--color-text-main)]">{patch}</p>
                </div>
            </div>

            <div className="relative z-10 my-auto flex flex-col items-center">
                <div className="flex items-center justify-between gap-2 px-2 mb-2 w-full">
                    {timeLeft.d > 0 && (
                        <div className="flex flex-col items-center min-w-[50px]">
                            <span className="text-4xl font-extrabold tracking-tighter tabular-nums text-[#F0E6D2] dark:text-[var(--color-text-main)]">{timeLeft.d}</span>
                            <span className="text-[10px] text-[#C8AA6E] uppercase font-bold tracking-wider">Días</span>
                        </div>
                    )}
                    <div className="flex flex-col items-center min-w-[50px]">
                        <span className="text-4xl font-extrabold tracking-tighter tabular-nums text-[#F0E6D2] dark:text-[var(--color-text-main)]">{String(timeLeft.h).padStart(2, '0')}</span>
                        <span className="text-[10px] text-[#C8AA6E] uppercase font-bold tracking-wider">Horas</span>
                    </div>
                    <div className="flex flex-col items-center min-w-[50px]">
                        <span className="text-4xl font-extrabold tracking-tighter tabular-nums text-[#F0E6D2] dark:text-[var(--color-text-main)]">{String(timeLeft.m).padStart(2, '0')}</span>
                        <span className="text-[10px] text-[#C8AA6E] uppercase font-bold tracking-wider">Mins</span>
                    </div>
                    <div className="flex flex-col items-center min-w-[50px]">
                        <span className="text-4xl font-extrabold tracking-tighter tabular-nums text-[#0AC8B9]">{String(timeLeft.s).padStart(2, '0')}</span>
                        <span className="text-[10px] text-[#A09B8C] dark:text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Segs</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-end mb-3">
                    <h3 className="text-sm font-bold text-[#A09B8C] dark:text-[var(--color-text-muted)] uppercase tracking-wider">Split 3 End</h3>
                    <span className="text-xs font-bold text-[#0AC8B9]">{new Date(seasonEndDate).toLocaleDateString()}</span>
                </div>
                <div className="h-2 w-full bg-[#0A1428] dark:bg-[var(--color-background)] rounded-full overflow-hidden border border-[#C8AA6E]/20">
                    <div className="h-full bg-gradient-to-r from-[#C8AA6E] to-[#F0E6D2] rounded-full shadow-[0_0_10px_rgba(200,170,110,0.4)]" style={{ width: '100%' }}></div>
                </div>
            </div>
        </div>
    );
}
