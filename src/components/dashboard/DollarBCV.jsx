import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { refreshTrigger } from '../../stores/dollarStore';
import DollarCard from './DollarCard';

export default function DollarBCV() {
    const trigger = useStore(refreshTrigger);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://ve.dolarapi.com/v1/dolares');
                if (!response.ok) throw new Error('Failed to fetch');
                const result = await response.json();
                const bcv = result.find(d => d.fuente === 'oficial') || result.find(d => d.nombre === 'Oficial');
                setData(bcv);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [trigger]);

    return (
        <DollarCard
            title="Tasa Oficial (BCV)"
            price={data?.promedio}
            updatedAt={data?.fechaActualizacion}
            trend={0.12}
            theme="green"
            className="md:col-span-1" // Ensure default sizing
        />
    );
}
