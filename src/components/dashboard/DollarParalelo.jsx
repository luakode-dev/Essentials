import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { refreshTrigger } from '../../stores/dollarStore';
import DollarCard from './DollarCard';

export default function DollarParalelo() {
    const trigger = useStore(refreshTrigger);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://ve.dolarapi.com/v1/dolares');
                if (!response.ok) throw new Error('Failed to fetch');
                const result = await response.json();
                const paralelo = result.find(d => d.fuente === 'paralelo') || result.find(d => d.nombre === 'Paralelo');
                setData(paralelo);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [trigger]);

    return (
        <DollarCard
            title="Dólar Paralelo"
            price={data?.promedio}
            updatedAt={data?.fechaActualizacion}
            trend={-0.05}
            theme="red"
            className="row-span-2 h-full" // Tall component
        />
    );
}
