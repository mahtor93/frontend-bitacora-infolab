"use client"
import RowCategories from "../components/dashboard/categories/categories.component.js";
import ListDashboard from "../components/dashboard/list/list.component.js";
import Navbar from "../components/navbar/navbar.component.js";
import styles from './page.module.css'
import { useState } from "react";
import StateCompo from "@/app/components/auth/auth.component.js";
export default function Dashboard() {
  const [reportesList, setReportesList] = useState([])
  return (
    <StateCompo>
      <div className={styles.mainContent}>

        <h2>Dashboard</h2>
        <RowCategories onCategorySelect={setReportesList} />
        <ListDashboard reportesList={reportesList} />
        <Navbar />
      </div>
    </StateCompo>
  );
}