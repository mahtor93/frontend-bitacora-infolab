import styles from "./loading.module.css"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingSign(){
    return(
        <>
            <div className={styles.loadercontainer}>
                <AiOutlineLoading3Quarters className={styles.spinner}/>
                <h3>Cargando ...</h3>
            </div>
        </>
    )
}