"use client"
import RowCategories from "../components/dashboard/categories/categories.component.js";
import ListDashboard from "../components/dashboard/list/list.component.js";
import Navbar from "../components/navbar/navbar.component.js";
import styles from './page.module.css'

export default function Dashboard() {
  return (
   <div className={styles.mainContent}>
  
    <h2>Dashboard</h2>
        <RowCategories/>
        <ListDashboard/>
        {/*<CreateReport />*/}
        <Navbar/>
   </div>
  );
}