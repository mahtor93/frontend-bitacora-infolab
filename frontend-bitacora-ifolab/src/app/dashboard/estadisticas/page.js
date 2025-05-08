"use client"
import Chart from "@/app/components/estadisticas/chart.component.js"
import { getToken } from "@/utils/auth.js";
import { apiGet } from "@/api/user.service.js";
import { useEffect, useState } from "react";

export default function Estadisticas(){
    const [postDataChart, setPostDataChart] = useState([]);
    const [labListChart, setLabListChart] = useState([]);
    const [salaListChart, setSalaListChart] = useState([]);
    const [officeListChart, setOfficeListChart] = useState([]);

    async function getDataChart() {
        const token = getToken();
        const statisticPostData = await apiGet('/statistics/post', token);
        let labsList = []
        let salaList = []
        let ofList = []
        statisticPostData.data.map(data =>{ 
            if(data.Location.name.startsWith("L_")){
                labsList.push(data);
            }else if(data.Location.name.startsWith("S_")){
                salaList.push(data);
            }else{
                ofList.push(data);
            }
        })
        setLabListChart(labsList);
        setSalaListChart(salaList);
        setOfficeListChart(ofList);
        setPostDataChart(statisticPostData.data)
    }
    useEffect(()=>{
        getDataChart();
    },[])
    return(
        <div className="mainContent">
            <h2>Estadisticas</h2>
            <Chart dataChart={postDataChart} chartTitle={"Vista General: Reportes por ubicación"}/>
            <Chart dataChart={labListChart} chartTitle={"Reportes por Laboratorio"}/>
            <Chart dataChart={salaListChart} chartTitle={"Reportes por Sala"}/>
            <Chart dataChart={officeListChart} chartTitle={"Reportes por Oficinas"}/>
            {/* Cualificar los tipos de problemas */}
        </div>
    )
}