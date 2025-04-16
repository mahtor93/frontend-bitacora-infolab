"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ListDashboard from "../components/dashboard/list.component.js";
import Navbar from "../components/navbar/navbar.component.js";
import styles from "./page.module.css";
import CreateReport from "./create/page.js";

export default function Dashboard() {
  return (
   <div>
        <ListDashboard/>
        {/*<CreateReport />*/}
        <Navbar/>
   </div>
  );
}