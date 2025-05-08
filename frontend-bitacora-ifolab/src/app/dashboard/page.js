"use client"
import RowCategories from "../components/dashboard/categories/categories.component.js";
import ListDashboard from "../components/dashboard/list/list.component.js";
import { useState } from "react";
import StateCompo from "@/app/components/auth/auth.component.js";
export default function Dashboard() {
  const [reportesList, setReportesList] = useState([])
  return (
    <StateCompo>
      <div className="mainContent">

        <h2>Dashboard</h2>
        <RowCategories onCategorySelect={setReportesList} />
        <ListDashboard reportesList={reportesList} />
      </div>
    </StateCompo>
  );
}