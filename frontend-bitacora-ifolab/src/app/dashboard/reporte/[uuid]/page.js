"use client";
import { useEffect, useRef, useState } from "react";
import { apiGet, apiPost } from "@/api/user.service";
import styles from './page.module.css';
import { getToken } from "@/utils/auth";
import Navbar from "@/app/components/navbar/navbar.component";
import { useParams } from "next/navigation";

export default  function Dashboard() {
    const [reporte, setReporte] = useState(null);
    const [uuidPost, setUuidPost] = useState('');
    const commentRef = useRef(null);

    const params = useParams();
    const reportId = params.uuid;


    const onLoadPost = async () =>{
        const token = getToken();
        const cleanUuid = uuidPost.replaceAll('"', '');
        const post = await apiGet(`/post/${cleanUuid}`, token);
        setReporte(post.data);
        //console.log(reporte.Location.name);
        localStorage.setItem("selectedPost", JSON.stringify(post.data));
    }

    const onSubmitComment = async (e) => {
        e.preventDefault();
        const token = getToken();
        if (!token) return;
        const comentario = commentRef.current.value;
        if (!comentario.trim()) {
            console.log("Por favor escribe un comentario.");
            return;
        }
        try {
            await apiPost(`/comment/${reporte.uuid}`, { comment: comentario }, token);
            console.log("Comentario enviado con éxito");
            await onLoadPost();
            commentRef.current.value = '';
        } catch (error) {
            console.error("Error al enviar el comentario:", error);
            console.log("Error al enviar el comentario");
        }
    };

    useEffect(() => {
        console.log(reportId);
        const getPost = async () => {
            try {
                const storedPost = localStorage.getItem("selectedPost");
                //const uuidLs = localStorage.getItem('uuidPost');
                if(reportId){
                    setUuidPost(reportId);
                }
                
                if (storedPost) {
                    setReporte(JSON.parse(storedPost));
                } else {
                    await onLoadPost();
                }
            } catch (error) {
                console.error("Error al obtener el reporte:", error);
            }
        };
        
        getPost();
    }, []);

    if (!reporte) return <p>Cargando Reporte...</p>;

    return (
        <div className={styles.main}>
            <Navbar/>
            <div className={styles.reportSection}>
                <div className={styles.header}>
                    <h2>{reporte.title}</h2>
                </div>
                <div className={styles.bodyReport}>
                    <p>Ubicación: {reporte.Location.name}</p>
                    <p>{reporte.description}</p>
                </div>
                <div className={styles.footerReport}>
                    <p>{reporte.User.name} {reporte.User.lastname}</p>
                    <p>{reporte.date}</p>
                </div>
            </div>

            <div className={styles.commentSection}>
                <ul>
                    {reporte.Comments.map((comment, index) => (
                        <li key={index}>
                            <p>{comment.User.name} {comment.User.lastname} - {comment.date}</p>
                            <p>{comment.comment}</p>
                        </li>
                        
                    ))}
                </ul>
            </div>

            <form className={styles.commentBox}>
                <textarea
                    id="comment"
                    ref={commentRef}
                    placeholder="Escribe tu comentario..."
                />
                <button type="submit" onClick={onSubmitComment}>Comentar</button>
            </form>
        </div>
    );
}
