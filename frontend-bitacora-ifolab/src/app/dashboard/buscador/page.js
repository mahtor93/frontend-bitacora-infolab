"use client"
import StateCompo from "@/app/components/auth/auth.component.js";
import BuscadorForm from "@/app/components/buscador/buscador.component"
import ListDashboard from "@/app/components/dashboard/list/list.component";
import { useState } from "react";

export default function Buscador(){
    const [resultList, setResultList] = useState([])

    return(
        <StateCompo>
        <div className="mainContent">
            <h2>Buscar Reportes</h2>
            <BuscadorForm onFilterList={setResultList}/>
            <h2>Resultados</h2>
            <ListDashboard reportesList={resultList}/>
        </div>
        </StateCompo>
    )
}