import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { refreshTrigger } from '../../stores/dollarStore';

function parseNumber(value) {
    const cleaned = value.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
}

function formatNumber(num) {
    if (num === 0) return '';
    return num.toLocaleString('es-VE', { maximumFractionDigits: 2 });
}

export default function BsToUsdCalculator({ className = "" }) {
    const trigger = useStore(refreshTrigger);
    const [amount, setAmount] = useState('');
    const [rate, setRate] = useState({ bcv: 0, paralelo: 0 });
    const [selectedRate, setSelectedRate] = useState('paralelo');

    useEffect(() => {
        async function fetchRate() {
            try {
                const response = await fetch('https://ve.dolarapi.com/v1/dolares');
                const result = await response.json();

                const bcv = result.find(d => d.fuente === 'oficial') || result.find(d => d.nombre === 'Oficial');
                const paralelo = result.find(d => d.fuente === 'paralelo') || result.find(d => d.nombre === 'Paralelo');

                setRate({
                    bcv: bcv?.promedio || 0,
                    paralelo: paralelo?.promedio || 0
                });
            } catch (err) {
                console.error('Error fetching rate:', err);
            }
        }

        fetchRate();
    }, [trigger]);

    const currentRate = selectedRate === 'bcv' ? rate.bcv : rate.paralelo;
    const result = amount ? (parseNumber(amount) / currentRate).toFixed(2) : '0.00';

    const handleChange = (value) => {
        setAmount(value);
    };

    return (
        <div className={`rounded-3xl bg-[var(--color-surface)] shadow-card p-5 md:p-6 lg:p-7 flex flex-col group transition-all hover:-translate-y-1 hover:shadow-xl duration-300 border border-[var(--color-border)] relative overflow-hidden h-full ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 z-0"></div>

            <div className="relative z-10 flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-2xl text-amber-600 dark:text-amber-400">
                        <span className="material-symbols-outlined text-[32px]">calculate</span>
                    </div>
                    <div>
                        <p className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-wider font-montserrat">Calculadora</p>
                        <h3 className="text-[var(--color-text-main)] font-semibold text-lg">Bs → USD</h3>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col gap-3 flex-1">
                <div className="flex gap-2 mb-1">
                    <button
                        onClick={() => setSelectedRate('bcv')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all border ${
                            selectedRate === 'bcv'
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-600 dark:text-green-400'
                                : 'bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-green-500/50'
                        }`}
                    >
                        Oficial (BCV)
                    </button>
                    <button
                        onClick={() => setSelectedRate('paralelo')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all border ${
                            selectedRate === 'paralelo'
                                ? 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-600 dark:text-red-400'
                                : 'bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-red-500/50'
                        }`}
                    >
                        Paralelo
                    </button>
                </div>

                <p className="text-xs text-[var(--color-text-muted)] mb-2">
                    1 USD = {currentRate.toFixed(2)} Bs
                </p>

                <div>
                    <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5 block">
                        Bolivares (Bs)
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] font-medium text-sm">Bs</span>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => handleChange(e.target.value)}
                            placeholder="0,00"
                            className="w-full pl-10 pr-3 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-main)] text-lg font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[var(--color-text-muted)]/50"
                        />
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-[var(--color-border)]">
                    <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Resultado</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-[var(--color-text-main)] tabular-nums">{result}</span>
                        <span className="text-lg text-[var(--color-text-muted)] font-medium">USD</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
