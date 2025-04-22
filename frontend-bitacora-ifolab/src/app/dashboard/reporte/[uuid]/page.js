"use client"
import { useEffect, useState } from "react";
import { apiGet,apiPost } from "@/api/user.service";
import styles from './page.module.css'

export default function Dashboard({props}) {
    console.log(props)
    const [reporte, setReporte] = useState(null);
    
    const onSubmitComment = (e) => {
        e.preventDefault();
        console.log(e)
    }
    
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
                <div className={styles.footerReport}>
                    <p>{reporte.User.name} {reporte.User.lastname} </p>
                    <p>{reporte.date}</p>
                </div>
            </div>
            <div className={styles.commentSection}>
                <ul>{
                    reporte.Comments.map((comment, index) => (
                        <li key={index}>
                            <p>{comment.User.name} {comment.User.lastname}</p>
                            <p>{comment.comment}</p>
                        </li>
                    ))
                }   </ul>
            </div>
            <form className={styles.commentBox}>
                <textarea id="comment"/>
                <button type="submit" onClick={e=>onSubmitComment(e)}>Comentar</button>
            </form>
        </div>
    );
}