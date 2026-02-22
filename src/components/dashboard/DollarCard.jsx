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
    const themeParams = {
        green: {
            bgIcon: "bg-green-50 dark:bg-green-900/20",
            textIcon: "text-green-600 dark:text-green-400",
            bgBlob: "bg-green-500/10",
            icon: "attach_money"
        },
        red: {
            bgIcon: "bg-red-50 dark:bg-red-900/20",
            textIcon: "text-red-600 dark:text-red-400",
            bgBlob: "bg-red-500/10",
            icon: "currency_exchange"
        },
        blue: {
            bgIcon: "bg-blue-50 dark:bg-blue-900/20",
            textIcon: "text-blue-600 dark:text-blue-400",
            bgBlob: "bg-blue-500/10",
            icon: "compare_arrows"
        }
    };

    const t = themeParams[theme] || themeParams.green;

    const formattedTime = updatedAt ? format(new Date(updatedAt), 'h:mm a', { locale: es }) : '--';

    return (
        <div className={`rounded-3xl bg-[var(--color-surface)] shadow-card p-5 md:p-6 lg:p-7 flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-xl duration-300 border border-[var(--color-border)] relative overflow-hidden h-full ${className}`}>
            <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-4">
                    <div className={`p-3 ${t.bgIcon} rounded-2xl ${t.textIcon}`}>
                        <span className="material-symbols-outlined text-[32px]">
                            {t.icon}
                        </span>
                    </div>
                    <p className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-wider font-montserrat">{title}</p>
                </div>
            </div>

            <div className="flex flex-col gap-1 relative z-10 my-auto py-4 md:py-5">
                <div className="flex items-baseline gap-2 flex-wrap">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-main)] tracking-tighter font-montserrat tabular-nums">
                        {price?.toFixed(2) || '...'}
                    </h2>
                    <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 dark:text-gray-500 font-semibold">{currency}</p>
                </div>
            </div>

            <div className="pt-4 md:pt-5 relative z-10">
                <div className="flex justify-between items-center text-xs md:text-sm text-[var(--color-text-muted)]">
                    <span>Actualizado</span>
                    <span className="font-medium text-[var(--color-text-main)]">{formattedTime}</span>
                </div>
            </div>
        </div>
    );
}
