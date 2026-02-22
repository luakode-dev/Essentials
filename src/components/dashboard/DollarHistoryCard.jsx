import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '../../lib/supabase';

export default function DollarHistoryCard({ className = "" }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHistory() {
            setLoading(true);
            try {
                const { data: tasas, error } = await supabase
                    .from('tasas_cambio')
                    .select('date, bcv, paralelo')
                    .order('date', { ascending: false })
                    .limit(5);

                if (error) throw error;

                if (tasas) {
                    // Ordenamos de antiguo a reciente, y formateamos el nombre del día
                    const formatted = tasas.reverse().map(t => ({
                        day: format(parseISO(t.date), 'EEEE', { locale: es }).replace(/^\w/, (c) => c.toUpperCase()),
                        bcv: Number(t.bcv),
                        paralelo: Number(t.paralelo)
                    }));
                    setData(formatted);
                }
            } catch (err) {
                console.error("Error al cargar historial desde Supabase:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchHistory();
    }, []);

    return (
        <div className={`rounded-3xl bg-[var(--color-surface)] shadow-card p-5 md:p-6 lg:p-7 flex flex-col group transition-all hover:-translate-y-1 hover:shadow-xl duration-300 border border-[var(--color-border)] relative overflow-hidden h-full min-h-[250px] ${className}`}>
            <div className={`absolute top-0 right-0 w-48 h-48 md:w-56 md:h-56 bg-purple-500/10 rounded-bl-full -mr-12 -mt-12 md:-mr-16 md:-mt-16 transition-transform group-hover:scale-110 pointer-events-none`}></div>

            <div className="flex items-start justify-between relative z-10 mb-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-purple-600 dark:text-purple-400">
                        <span className="material-symbols-outlined text-[32px]">
                            table_chart
                        </span>
                    </div>
                    <div>
                        <p className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-wider font-montserrat">Histórico semanal</p>
                        <h3 className="text-[var(--color-text-main)] font-semibold text-lg">Evolución de Tasas</h3>
                    </div>
                </div>
            </div>

            <div className="relative z-10 mt-2 overflow-x-auto flex-1 flex flex-col">
                <table className="w-full text-left border-collapse min-w-[300px]">
                    <thead>
                        <tr className="border-b border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-muted)]">
                            <th className="py-3 px-2 font-montserrat font-medium">Día</th>
                            <th className="py-3 px-2 font-montserrat font-medium text-right">Oficial (BCV)</th>
                            <th className="py-3 px-2 font-montserrat font-medium text-right">Paralelo</th>
                            <th className="py-3 px-2 font-montserrat font-medium text-right hidden sm:table-cell">Brecha</th>
                        </tr>
                    </thead>
                    <tbody className="text-[var(--color-text-main)] tabular-nums text-sm md:text-base">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-[var(--color-text-muted)] animate-pulse">
                                    Cargando historial...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-8 text-center text-[var(--color-text-muted)]">
                                    No hay datos históricos disponibles aún.
                                </td>
                            </tr>
                        ) : data.map((d, i) => {
                            const diff = d.paralelo - d.bcv;
                            const diffPercent = (diff / d.bcv) * 100;
                            return (
                                <tr key={d.day} className={`border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-border)]/20 transition-colors ${i % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-[var(--color-border)]/5'}`}>
                                    <td className="py-3.5 px-2 font-medium text-[var(--color-text-muted)]">{d.day}</td>
                                    <td className="py-3.5 px-2 text-right">
                                        <span className="font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">
                                            {d.bcv.toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-2 text-right">
                                        <span className="font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">
                                            {d.paralelo.toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-2 text-right hidden sm:table-cell">
                                        <div className="flex flex-col items-end">
                                            <span className="font-medium text-[var(--color-text-main)]">+{diff.toFixed(2)}</span>
                                            <span className="text-xs text-[var(--color-text-muted)]">{diffPercent.toFixed(1)}%</span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
