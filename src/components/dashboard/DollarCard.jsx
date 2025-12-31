import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function DollarCard({
    title,
    price,
    currency = "VES",
    updatedAt,
    trend = 0,
    theme = "green",
    className = ""
}) {
    const isGreen = theme === "green";
    const colorClass = isGreen ? "green" : "red";

    // Dynamic classes based on theme
    const bgIcon = isGreen ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20";
    const textIcon = isGreen ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
    const bgBadge = isGreen ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30";
    const textBadge = isGreen ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300";
    const borderHover = isGreen ? "hover:border-green-500/20" : "hover:border-red-500/20";
    const bgBlob = isGreen ? "bg-green-500/10" : "bg-red-500/10";

    const formattedTime = updatedAt ? format(new Date(updatedAt), 'h:mm a', { locale: es }) : '--';

    return (
        <div className={`rounded-3xl bg-[var(--color-surface)] shadow-card p-8 flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-xl duration-300 border border-[var(--color-border)] relative overflow-hidden h-full ${className}`}>
            <div className={`absolute top-0 right-0 w-64 h-64 ${bgBlob} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110`}></div>

            <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4">
                    <div className={`p-3 ${bgIcon} rounded-2xl ${textIcon}`}>
                        <span className="material-symbols-outlined text-[32px]">
                            {isGreen ? 'attach_money' : 'currency_exchange'}
                        </span>
                    </div>
                    <p className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-wider font-montserrat">{title}</p>
                </div>
                <span className={`px-3 py-1 rounded-full ${bgBadge} ${textBadge} text-xs font-bold flex items-center gap-1`}>
                    <span className="material-symbols-outlined text-[14px]">
                        {trend >= 0 ? 'trending_up' : 'trending_down'}
                    </span>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            </div>

            <div className="flex flex-col gap-2 relative z-10 my-auto py-6">
                <div className="flex items-baseline gap-2 flex-wrap">
                    <h2 className="text-6xl lg:text-7xl font-bold text-[var(--color-text-main)] tracking-tighter font-montserrat tabular-nums">
                        {price?.toFixed(2) || '...'}
                    </h2>
                    <p className="text-3xl text-gray-400 dark:text-gray-500 font-semibold">{currency}</p>
                </div>
            </div>

            <div className="pt-6 relative z-10">
                <div className="flex justify-between items-center text-sm text-[var(--color-text-muted)]">
                    <span>Actualizado</span>
                    <span className="font-medium text-[var(--color-text-main)]">{formattedTime}</span>
                </div>
            </div>
        </div>
    );
}
