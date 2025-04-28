import Navbar from "@/app/components/navbar/navbar.component"
import styles from "./page.module.css"
import { getToken } from "@/utils/auth"
import { apiGet } from "@/api/user.service"
import BuscadorForm from "@/app/components/buscador/buscador.component"

export default function Buscador(){
    const token = getToken();

    return(
        <div className={styles.mainContent}>
            <Navbar/>
            <h2>Buscar Reportes</h2>
            <BuscadorForm/>
            <h2>Resultados</h2>
        </div>
    )
}