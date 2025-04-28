
import { getToken } from "@/utils/auth";
import styles from "./list.module.css";
import { apiGet } from "@/api/user.service";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcHighPriority } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import moment from "moment-timezone"; 

export default function ListDashboard() {
    const router = useRouter();
    const [reportes, setReportes] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    function onPostClick(selectedPost){
        setSelectedPost(selectedPost)
        const selected = reportes.find(reporte => reporte.uuid === selectedPost);
        localStorage.setItem('selectedPost', JSON.stringify(selected));
        //localStorage.setItem('uuidPost', JSON.stringify(selectedPost))
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
            }
        }
        onHandleList();
    }, []);

    return ( 
        <div className={styles.listContent}>
            <ul className={styles.list} >
                {
                    reportes.map((reporte) => (
                        <li key={reporte.id} onClick={e => onPostClick(reporte.uuid)}>
                            <div className={styles.encabezado}>
                            <div className={styles.iconAndTitle}>{reporte.isActive?(<FcHighPriority/>):(<FcOk />)}<h3>{reporte.title}</h3></div>
                                <p>- {`${reporte.User.name} ${reporte.User.lastname}`}</p>
                            </div>
                            <p>{reporte.description.substring(0, 256)}...</p>
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
