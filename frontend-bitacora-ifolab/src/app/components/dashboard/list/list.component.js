import styles from "./list.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcHighPriority } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import moment from "moment-timezone";
import LoadingSign from '@/app/components/loading/loading.component.js'
export default function ListDashboard({ reportesList }) {
    const router = useRouter();
    const [reportes, setReportes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    function onPostClick(uuid) {
        router.push(`/dashboard/reporte/${uuid}`);
    }

    useEffect(() => {
        let timeoutId;
        setLoading(true);

        async function onHandleList() {
            try {
                if (reportesList && reportesList.length > 0) {
                    const reportesProcesados = reportesList.map(reporte => {
                        return {
                            ...reporte,
                            date: moment(reporte.date).tz('America/Santiago').format('DD-MM-YYYY HH:mm')
                        };
                    });
                    setReportes(reportesProcesados);
                    setLoading(false);
                } else {
                    setReportes([]);
                    timeoutId = setTimeout(() => {
                        setLoading(false);
                    }, 7000);
                }
            } catch (error) {
                setError(error)
                setLoading(false);
            }
        }
        onHandleList();
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [reportesList]);

    return (
        <div className={styles.listContent}>
            <ul className={styles.list} >
                {loading ? (
                    <div className={styles.loading}>
                        <LoadingSign />
                    </div>
                ) : (
                    reportes.length > 0 ? (
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
                )
                }
            </ul>
        </div>

    );
}
