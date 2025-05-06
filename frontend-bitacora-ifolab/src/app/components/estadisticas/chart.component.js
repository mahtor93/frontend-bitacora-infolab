"use client"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './chart.module.css'
import { useEffect, useState } from 'react';


export default function Chart({ dataChart, chartTitle }) {
    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(()=>{
        const mediaQuery = window.matchMedia('(min-width: 720px)');
        const handleChange = () => setIsDesktop(mediaQuery.matches);

        handleChange();
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [])

    if (!Array.isArray(dataChart) || dataChart.length === 0) {
        return <div>Cargando datos...</div>;
    }

    const data = dataChart.map(item => ({
        name: item?.User?.name ||  item?.Post?.title || item?.Location?.name || item?.id ,
        reportes: item.cant
    }));

    return (
        <>
            <div className={styles.ChartContainer}>
            <h3>{chartTitle}</h3>
            <ResponsiveContainer width={isDesktop ? '100%' : 1280} height={300}>
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="reportes" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" fontSize={12}/>
                        <YAxis fontSize={12}/>
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}