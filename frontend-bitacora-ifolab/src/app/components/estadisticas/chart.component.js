"use client"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './chart.module.css'

export default function Chart({ dataChart, chartTitle }) {
    if (!Array.isArray(dataChart) || dataChart.length === 0) {
        return <div>Cargando datos...</div>;
    }

    const data = dataChart.map(item => ({
        name: item?.User?.name ||  item?.Post?.title || item?.Location?.name || item?.id ,
        reportes: item.cant
    }));

    return (
        <><h3>{chartTitle}</h3>
            <div className={styles.ChartContainer}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="reportes" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}