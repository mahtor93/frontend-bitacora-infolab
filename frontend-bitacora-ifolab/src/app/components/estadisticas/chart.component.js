"use client"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './chart.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CustomDot = (props) => {
    const { cx, cy, payload, index } = props;
    const router = useRouter();
    return (
      <>
        {/* Área de click ampliada, invisible */}
        <circle
          cx={cx}
          cy={cy}
          r={14}
          fill="transparent"
          onClick={() => {
            router.push(`/dashboard/buscador?title=&keyword=&location=${payload.value}&category=&user=`)
          }}
          style={{ cursor: 'pointer' }}
        />
        {/* Círculo visual */}
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#8884d8"
          stroke="#fff"
          strokeWidth={1}
          pointerEvents="none"
        />
      </>
    );
  };
const ClickableTick = (props) => {
    const { x, y, payload } = props;
    const router = useRouter();
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#666"
          fontSize={12}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            router.push(`/dashboard/buscador?title=&keyword=&location=${payload.value}&category=&user=`)
          }}
        >
          {payload.value}
        </text>
      </g>
    );
  };
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
                        <Line type="monotone" dataKey="reportes" stroke="#8884d8" dot={<CustomDot />}/>
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" fontSize={12} tick={<ClickableTick />}/>
                        <YAxis fontSize={12}/>
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}