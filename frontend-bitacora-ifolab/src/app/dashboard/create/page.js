import Editor from "@/app/components/editor/editor.component";
import styles from "./page.module.css"
import { apiPost } from "@/api/user.service";
import Navbar from "@/app/components/navbar/navbar.component";

export default function CreateReport() {
    
  return (
     <div className={styles.mainContent}>
      <Navbar/>
      <h2>Creación de Reportes</h2>
        <Editor/>
     </div>
    );
  }