import { useEffect, useState } from 'react';
import { differenceInSeconds, startOfDay, endOfDay, setHours, setMinutes, setSeconds, format } from 'date-fns';

export default function WorkDayTimer() {
    const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            // Target: 5:00 PM (17:00) today
            const endOfWork = setSeconds(setMinutes(setHours(now, 17), 0), 0);
            const startOfWork = setSeconds(setMinutes(setHours(now, 9), 0), 0); // Assuming 9 AM start

            let diff = differenceInSeconds(endOfWork, now);

            if (diff < 0) {
                // After 5 PM, maybe show "Done" or count to next day? 
                // For simple dashboard, let's just stick to 0 or "Complete"
                diff = 0;
            }

            const h = Math.floor(diff / 3600);
            const m = Math.floor((diff % 3600) / 60);
            const s = diff % 60;

            setTimeLeft({ h, m, s });

            // Calculate progress
            const totalWorkSeconds = differenceInSeconds(endOfWork, startOfWork);
            const elapsed = totalWorkSeconds - diff;
            let prog = (elapsed / totalWorkSeconds) * 100;
            if (prog > 100) prog = 100;
            if (prog < 0) prog = 0;

            setProgress(prog);
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="lg:row-span-2 rounded-3xl bg-white dark:bg-[var(--color-surface)] text-[var(--color-text-main)] shadow-card p-8 flex flex-col justify-between relative overflow-hidden group h-full border border-gray-100/50 dark:border-[var(--color-border)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/30 dark:from-[var(--color-surface)] dark:to-[var(--color-background)] z-0"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 dark:from-primary/10 to-transparent z-0"></div>

            <div className="relative z-10 flex justify-between items-start">
                <div className="p-2 bg-primary/10 dark:bg-white/10 rounded-xl backdrop-blur-sm text-primary dark:text-white">
                    <span className="material-symbols-outlined">work_history</span>
                </div>
                <div className="text-right">
                    <p className="text-xs font-medium text-gray-400 dark:text-[var(--color-text-muted)] uppercase tracking-widest">Estado</p>
                    <p className="text-sm font-bold text-primary">En Progreso</p>
                </div>
            </div>

            <div className="relative z-10 my-auto flex flex-col items-center py-8">
                <div className="flex gap-2 items-end mb-2">
                    <span className="text-6xl lg:text-7xl font-bold tracking-tighter tabular-nums text-[var(--color-text-main)]">{String(timeLeft.h).padStart(2, '0')}</span>
                    <span className="text-lg font-medium text-gray-400 dark:text-[var(--color-text-muted)] mb-2">h</span>
                </div>
                <div className="flex gap-4 text-3xl font-medium text-gray-400 dark:text-[var(--color-text-muted)] tabular-nums">
                    <div className="flex items-center gap-1">
                        <span className="text-[var(--color-text-main)]/80">{String(timeLeft.m).padStart(2, '0')}</span><span className="text-sm text-gray-500">m</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-[var(--color-text-main)]/80">{String(timeLeft.s).padStart(2, '0')}</span><span className="text-sm text-gray-500">s</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-end mb-3">
                    <h3 className="text-lg font-bold font-montserrat text-[var(--color-text-main)]">Fin de Jornada</h3>
                    <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
}
