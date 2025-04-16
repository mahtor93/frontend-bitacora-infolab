
import { getToken } from "@/utils/auth";
import styles from "./list.module.css";
import { apiGet } from "@/api/user.service";
import { useState, useEffect } from "react";
import moment from "moment-timezone";
//import moment from "moment/moment";

export default function ListDashboard() {
    const [reportes, setReportes] = useState([]);
    useEffect(() => {
        async function onHandleList() {
            const token = getToken();
            const response = await apiGet('/post', token);
            
            if (typeof response.data !== 'undefined') {
                const reportesProcesados = response.data.map(reporte => {
                    return {
                        ...reporte,
                        date: moment(reporte.date).tz('America/Santiago').format('DD-MM-YYYY HH:mm')
                    };
                });
                setReportes(reportesProcesados);
                console.log(reportesProcesados);
            }
        }
        onHandleList();
    }, []);



    return (
        <div className={styles.listContent}>
            <ul className={styles.list} >
                {
                    reportes.map((reporte) => (
                        <li key={reporte.id}>
                            <div className={styles.encabezado}>
                                <h3>{reporte.title}</h3>
                                <p>- {`${reporte.User.name} ${reporte.User.lastname}`}</p>
                            </div>
                            <p>{reporte.description.substring(0, 64)}...</p>
                            <div className={styles.date}>
                                <p>{reporte.date}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
