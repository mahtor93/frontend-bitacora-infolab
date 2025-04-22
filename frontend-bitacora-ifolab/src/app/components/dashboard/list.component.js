
import { getToken } from "@/utils/auth";
import styles from "./list.module.css";
import { apiGet } from "@/api/user.service";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment-timezone";

export default function ListDashboard() {
    const router = useRouter();
    const [reportes, setReportes] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    function onPostClick(selectedPost){
        console.log(`Has clickado el post ${selectedPost}`)
        setSelectedPost(selectedPost)
        const selected = reportes.find(reporte => reporte.uuid === selectedPost);
        console.log(selected);
        localStorage.setItem('selectedPost', JSON.stringify(selected));
        router.push(`/dashboard/reporte/${selected.uuid}`);
    }
    
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
            {/* Detectar Dispositivo Renderizar Lista o Cuadricula */}
            <ul className={styles.list} >
                {
                    reportes.map((reporte) => (
                        <li key={reporte.id} onClick={e => onPostClick(reporte.uuid)}>
                            <div className={styles.encabezado} /*onClick={e => onPostClick(reporte.uuid)}*/>
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
