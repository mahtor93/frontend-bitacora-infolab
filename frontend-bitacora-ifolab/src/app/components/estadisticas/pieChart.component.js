
"use client"
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import styles from './chart.module.css'
import { useEffect, useState } from 'react';

// Puedes personalizar los colores aquí
const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A28CFF", "#FF6699", "#33CC99", "#FF6666"
];

// Label personalizado para mostrar nombre y valor fuera del círculo con línea
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, reportes
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.5 ;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {`${name}: ${reportes}`}
    </text>
  );
};

// Forma activa personalizada para mantener el segmento circular y resaltado
const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value
  } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function PieChart({ dataChart, chartTitle, radio=0 }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

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

  // Maneja el hover para activar el segmento
  const onPieEnter = (_, index) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(null);

  return (
    <>
      <h3 className={styles.achetres}>{chartTitle}</h3>
      <div className={styles.ChartContainer}>
        <ResponsiveContainer width={isDesktop ? '100%' : 1280} height={300}>
          <RePieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={renderCustomizedLabel}
              outerRadius={80+radio}
              fill="#8884d8"
              dataKey="reportes"
              nameKey="name"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
