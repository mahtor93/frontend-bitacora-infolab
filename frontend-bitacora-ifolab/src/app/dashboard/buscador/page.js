import Navbar from "@/app/components/navbar/navbar.component"
import styles from "./page.module.css"
import { getToken } from "@/utils/auth"
import StateCompo from "@/app/components/auth/auth.component.js";
import BuscadorForm from "@/app/components/buscador/buscador.component"

export default function Buscador(){
    const token = getToken();

    return(
        <StateCompo>
        <div className={styles.mainContent}>
            <Navbar/>
            <h2>Buscar Reportes</h2>
            <BuscadorForm/>
            <h2>Resultados</h2>
        </div>
        </StateCompo>
    )
}