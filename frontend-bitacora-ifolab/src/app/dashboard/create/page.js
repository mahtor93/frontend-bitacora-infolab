import Editor from "@/app/components/editor/editor.component";
import styles from "./page.module.css"
import { apiPost } from "@/api/user.service";

export default function CreateReport() {
    
  return (
     <div className={styles.mainContent}>
      <h2>Creación de Reportes</h2>
        <Editor/>
     </div>
    );
  }