
"use client"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart as ReBarChart, Bar, Tooltip, ResponsiveContainer } from 'recharts';

import styles from './chart.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
export default function BarChart({ dataChart, chartTitle }) {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
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
    name: item?.User?.name || item?.Post?.title || item?.Location?.name || item?.id,
    reportes: item.cant
  }));

  return (
    <>
      <h3 className={styles.achetres}>{chartTitle}</h3>
      <div className={styles.ChartContainer}>
        <ResponsiveContainer width={isDesktop ? '100%' : 1280} height={300}>
          <ReBarChart data={data}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" tick={<ClickableTick />} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="reportes" fill="#8884d8" />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
