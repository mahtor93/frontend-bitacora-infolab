"use client"
import { useEffect, useState } from "react";
import styles from './page.module.css'

export default function Dashboard() {
    const [reporte, setReporte] = useState(null);
    useEffect(() => {
        function getPost() {
            const storedPost = localStorage.getItem('selectedPost');
            if (storedPost) {
                //const comentariosProcesados = storedPost.
                setReporte(JSON.parse(storedPost))
            }
        }
        getPost();
    }, [])

    if (!reporte) return <p>Cargando post...</p>;
    
    return (
        <div className={styles.main}>
            <div className={styles.reportSection}>
                <div className={styles.header}>
                    <h2>{reporte.title}</h2>
                </div>
                <div className={styles.bodyReport}>
                    <p>Ubicación: {reporte.Location.name}</p>
                    <p>{reporte.description}</p>
                </div>
                <div>
                    <p>{reporte.User.name} {reporte.User.lastname} </p>
                    <p>{reporte.date}</p>
                </div>
            </div>
            <div className={styles.commentSection}>
            {
                    reporte.Comments.map((comment, index) =>(
                        <ul>
                            <li key={index}>
                                <p>{comment.User.name} { comment.User.lastname}</p>
                                <p>
                            {comment.comment}
                                </p>
                            </li>
                        </ul>
                    ))
                }
            </div>
        </div>
    );
}