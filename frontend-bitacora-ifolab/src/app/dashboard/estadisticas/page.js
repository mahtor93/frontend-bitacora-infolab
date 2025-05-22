
"use client"
import Chart from "@/app/components/estadisticas/chart.component.js"
import BarChart from "@/app/components/estadisticas/barChart.component";
import PieChart from "@/app/components/estadisticas/pieChart.component";
import { getToken } from "@/utils/auth.js";
import { apiGet } from "@/api/user.service.js";
import { useEffect, useState } from "react";
import styles  from './page.module.css'

export default function Estadisticas() {
    const [postDataChart, setPostDataChart] = useState([]);
    const [labListChart, setLabListChart] = useState([]);
    const [salaListChart, setSalaListChart] = useState([]);
    const [officeListChart, setOfficeListChart] = useState([]);
    const [chartType, setChartType] = useState("line"); // "line", "bar", "pie"

    async function getDataChart() {
        const token = getToken();
        const statisticPostData = await apiGet('/statistics/post', token);
        let labsList = []
        let salaList = []
        let ofList = []
        statisticPostData.data.map(data => {
            if (data.Location.name.startsWith("L_")) {
                labsList.push(data);
            } else if (data.Location.name.startsWith("S_")) {
                salaList.push(data);
            } else {
                ofList.push(data);
            }
        })
        setLabListChart(labsList);
        setSalaListChart(salaList);
        setOfficeListChart(ofList);
        setPostDataChart(statisticPostData.data)
    }

    useEffect(() => {
        getDataChart();
    }, [])

    // Helper to render the selected chart type
    const renderChart = (Component, data, title, radio) => {
        return <Component dataChart={data} chartTitle={title}  radio={radio}/>;
    };

    return (
        <div className="mainContent">
            <h2>Estadisticas</h2>
            <div className={styles.radioButtonRack}>
                <label>
                    <input
                        type="radio"
                        name="chartType"
                        value="line"
                        checked={chartType === "line"}
                        onChange={() => setChartType("line")}
                    />
                    Gráfico de Líneas
                </label>
                {" "}
                <label>
                    <input
                        type="radio"
                        name="chartType"
                        value="bar"
                        checked={chartType === "bar"}
                        onChange={() => setChartType("bar")}
                    />
                    Gráfico de Barras
                </label>
                {" "}
                <label>
                    <input
                        type="radio"
                        name="chartType"
                        value="pie"
                        checked={chartType === "pie"}
                        onChange={() => setChartType("pie")}
                    />
                    Gráfico Circular
                </label>
            </div>

            {/* Vista General */}

            {chartType === "line" && renderChart(Chart, postDataChart, "Vista General: Reportes por ubicación")}
            {chartType === "bar" && renderChart(BarChart, postDataChart, "Vista General: Reportes por ubicación")}
            {chartType === "pie" && renderChart(PieChart, postDataChart, "Vista General: Reportes por ubicación", 20)}

            {/* Laboratorios */}
            {chartType === "line" && renderChart(Chart, labListChart, "Reportes por Laboratorio")}
            {chartType === "bar" && renderChart(BarChart, labListChart, "Reportes por Laboratorio")}
            {chartType === "pie" && renderChart(PieChart, labListChart, "Reportes por Laboratorio")}

            {/* Salas */}
            {chartType === "line" && renderChart(Chart, salaListChart, "Reportes por Sala")}
            {chartType === "bar" && renderChart(BarChart, salaListChart, "Reportes por Sala")}
            {chartType === "pie" && renderChart(PieChart, salaListChart, "Reportes por Sala")}

            {/* Oficinas */}
            {chartType === "line" && renderChart(Chart, officeListChart, "Reportes por Oficinas")}
            {chartType === "bar" && renderChart(BarChart, officeListChart, "Reportes por Oficinas")}
            {chartType === "pie" && renderChart(PieChart, officeListChart, "Reportes por Oficinas")}
        </div>
    )
}
