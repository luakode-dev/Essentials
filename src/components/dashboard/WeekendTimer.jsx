import { useEffect, useState } from 'react';
import { differenceInSeconds, nextFriday, setHours, setMinutes, startOfWeek, endOfWeek } from 'date-fns';

export default function WeekendTimer() {
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0 });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            // Target: Next Friday 5:00 PM. If today is Friday > 5PM, get next Friday.
            let targetDate = setMinutes(setHours(nextFriday(now), 17), 0);

            // If it's Saturday, or Friday after 5pm, the logic above works (nextFriday gets the NEXT one).
            // But if it's Friday before 5pm, nextFriday gets the NEXT week's friday. We want today.
            // Actually date-fns nextFriday returns the *following* friday.
            // Let's keep it simple: Count down to "This coming Friday 17:00".

            // Better logic: Find the Friday of this week.
            const currentDay = now.getDay();
            let friday = new Date(now);
            friday.setDate(now.getDate() + (5 - currentDay + 7) % 7);
            friday.setHours(17, 0, 0, 0);

            if (now > friday) {
                // It's after Friday 5pm, set to next Friday
                friday.setDate(friday.getDate() + 7);
            }

            const diff = differenceInSeconds(friday, now);

            const d = Math.floor(diff / (3600 * 24));
            const h = Math.floor((diff % (3600 * 24)) / 3600);
            const m = Math.floor((diff % 3600) / 60);

            setTimeLeft({ d, h, m });

            // Progress: Percentage of week passed (Mon-Fri work week)
            // Start of week: Monday 9 AM (for calc purposes)
            // End of week: Friday 5 PM
            // This is dynamic, but let's approximate: 5 days * 24h cycle or work hours?
            // Design shows "Fin de Semana 40%".
            // Let's base it on a 5-day cycle.
            const start = new Date(friday);
            start.setDate(friday.getDate() - 5); // Monday 17:00 previous

            // Simple linear week progress
            const totalSeconds = 5 * 24 * 3600;
            const elapsed = totalSeconds - diff;
            let prog = (elapsed / totalSeconds) * 100;
            if (prog > 100) prog = 100;
            if (prog < 0) prog = 0;

            setProgress(prog);
        };

        calculateTime();
        const timer = setInterval(calculateTime, 60000); // 1 min update is enough
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="md:col-span-2 rounded-3xl bg-white dark:bg-[var(--color-surface)] shadow-card p-8 flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-xl duration-300 border border-gray-100/50 dark:border-[var(--color-border)] h-full">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-xl">
                    <span className="material-symbols-outlined">weekend</span>
                </div>
                <button className="text-gray-300 hover:text-gray-600 dark:hover:text-[var(--color-text-main)] transition cursor-pointer">
                    <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div>
            <div className="my-auto">
                <div className="flex items-center justify-between gap-2 md:gap-4">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl lg:text-5xl font-bold text-[var(--color-text-main)] tabular-nums">{timeLeft.d}</span>
                        <span className="text-xs text-gray-400 dark:text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Días</span>
                    </div>
                    <div className="h-10 w-px bg-gray-100 dark:bg-[var(--color-border)]"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl lg:text-5xl font-bold text-[var(--color-text-main)] tabular-nums">{timeLeft.h}</span>
                        <span className="text-xs text-gray-400 dark:text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Horas</span>
                    </div>
                    <div className="h-10 w-px bg-gray-100 dark:bg-[var(--color-border)]"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl lg:text-5xl font-bold text-[var(--color-text-main)] tabular-nums">{timeLeft.m}</span>
                        <span className="text-xs text-gray-400 dark:text-[var(--color-text-muted)] uppercase font-bold tracking-wider">Mins</span>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <div className="flex justify-between items-end mb-3">
                    <h3 className="text-lg font-bold font-montserrat text-[var(--color-text-main)]">Fin de Semana</h3>
                    <span className="text-sm font-bold text-gray-400 dark:text-[var(--color-text-muted)]">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
}
