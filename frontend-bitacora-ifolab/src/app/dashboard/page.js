import ListDashboard from "../components/dashboard/list.component.js";
import Navbar from "../components/navbar/navbar.component.js";
import styles from "./page.module.css";


export default function Dashboard() {
  return (
   <div>
        <ListDashboard/>
        <Navbar/>
   </div>
  );
}
