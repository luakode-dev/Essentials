import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { refreshTrigger } from '../../stores/dollarStore';
import { supabase } from '../../lib/supabase';
import DollarCard from './DollarCard';
import DollarHistoryCard from './DollarHistoryCard';

export default function DollarSection() {
    const trigger = useStore(refreshTrigger);
    const [data, setData] = useState({ bcv: null, paralelo: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://ve.dolarapi.com/v1/dolares');
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();

                const bcv = result.find(d => d.fuente === 'oficial') || result.find(d => d.nombre === 'Oficial');
                const paralelo = result.find(d => d.fuente === 'paralelo') || result.find(d => d.nombre === 'Paralelo');

                setData({ bcv, paralelo });
                setError(null);

                // Guardar los datos en Supabase automáticamente de forma silenciosa
                if (bcv?.promedio && paralelo?.promedio) {
                    const today = new Date().toISOString().split('T')[0];
                    const { error: upsertError } = await supabase
                        .from('tasas_cambio')
                        .upsert({
                            date: today,
                            bcv: bcv.promedio,
                            paralelo: paralelo.promedio
                        }, { onConflict: 'date' });

                    if (upsertError) console.error("Error guardando tasa del día en Supabase:", upsertError);
                }
            } catch (err) {
                console.error(err);
                setError('Error al cargar datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [trigger]);

    // Fallback data or loading state could be improved, but using nulls/loading props for now

    return (
        <>
            <DollarCard
                title="Tasa Oficial (BCV)"
                price={data.bcv?.promedio}
                updatedAt={data.bcv?.fechaActualizacion}
                theme="green"
                className="md:col-span-1 lg:col-span-1"
            />

            <DollarCard
                title="Dólar Paralelo"
                price={data.paralelo?.promedio}
                updatedAt={data.paralelo?.fechaActualizacion}
                theme="red"
                className="md:col-span-1 lg:col-span-1"
            />

            <DollarCard
                title="Diferencia (Brecha)"
                price={data.paralelo?.promedio && data.bcv?.promedio ? data.paralelo.promedio - data.bcv.promedio : null}
                updatedAt={data.bcv?.fechaActualizacion}
                theme="blue"
                className="md:col-span-1"
            />

            <DollarCard
                title="Promedio"
                price={data.paralelo?.promedio && data.bcv?.promedio ? (data.paralelo.promedio + data.bcv.promedio) / 2 : null}
                updatedAt={data.bcv?.fechaActualizacion}
                theme="yellow"
                className="md:col-span-1"
            />

            <DollarHistoryCard className="md:col-span-2 lg:col-span-2 md:row-span-2" />
        </>
    );
}
