import { getToken } from "@/utils/auth";
import styles from "./list.module.css";
import { apiGet } from "@/api/user.service";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcHighPriority } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import moment from "moment-timezone";

export default function ListDashboard({ reportesList }) {
    const router = useRouter();
    const [reportes, setReportes] = useState([]);
    const [error, setError] = useState('');

    function onPostClick(uuid) {
        router.push(`/dashboard/reporte/${uuid}`);
    }

    useEffect(() => {
        async function onHandleList() {
            try{
                if(reportesList && reportesList.length > 0){
                const reportesProcesados = reportesList.map(reporte => {
                    return {
                        ...reporte,
                        date: moment(reporte.date).tz('America/Santiago').format('DD-MM-YYYY HH:mm')
                    };
                });
                setReportes(reportesProcesados);
             } else {
                    setReportes([]); 
                }
            }catch(error){
                setError(error)
            }
        }
        onHandleList();
    }, [reportesList]);

    return (
        <div className={styles.listContent}>
            <ul className={styles.list} >
                {reportes.length > 0 ? (
                    reportes.map((reporte) => (
                        <li key={reporte.id} onClick={e => onPostClick(reporte.uuid)}>
                            <div className={styles.encabezado}>
                                <div className={styles.iconAndTitle}>{reporte.isActive ? (<FcHighPriority />) : (<FcOk />)}<h3>{reporte.title}</h3></div>
                                <p>- {`${reporte.User.name} ${reporte.User.lastname}`}</p>
                            </div>
                            <p>{reporte.description.substring(0, 256)}...</p>
                            <div className={styles.date}>
                                <p>{reporte.date}</p>
                            </div>
                        </li>
                    ))) : (
                    <div className={styles.error}>
                        <p>No se encontraron reportes {error}</p>
                    </div>

                )
                }
            </ul>
        </div>

    );
}
