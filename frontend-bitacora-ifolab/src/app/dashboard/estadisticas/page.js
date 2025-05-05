"use client"
import Chart from "@/app/components/estadisticas/chart.component.js"
import { getToken } from "@/utils/auth.js";
import { apiGet } from "@/api/user.service.js";
import { useEffect, useState } from "react";

export default function Estadisticas(){
    const [userDataChart, setUserDataChart] = useState([]);
    const [postDataChart, setPostDataChart] = useState([]);
    const [commentDataChart, setCommentDataChart] = useState([]);
    async function getDataChart() {
        const token = getToken();
        const statisticUserData = await apiGet('/statistics/user', token);
        const statisticPostData = await apiGet('/statistics/post', token);
        const statisticCommentData = await apiGet('/statistics/comment', token);
        setCommentDataChart(statisticCommentData.data);
        setPostDataChart(statisticPostData.data)
        setUserDataChart(statisticUserData.data);
    }
    useEffect(()=>{
        getDataChart();
    },[])
    return(
        <div className="mainContent">
            <h2>Estadisticas</h2>
            <Chart dataChart={userDataChart} chartTitle={"Estadisticas de Usuario"}/>
            <Chart dataChart={postDataChart} chartTitle={"Reportes por Ubicación"}/>
            <Chart dataChart={commentDataChart} chartTitle={"Reportes por Comentarios"}/>
        </div>
    )
}