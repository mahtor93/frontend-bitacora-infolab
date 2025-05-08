"use client";
import { useEffect, useRef, useState } from "react";
import { apiGet, apiPost } from "@/api/user.service";
import styles from './page.module.css';
import { getToken } from "@/utils/auth";
import { useParams, usePathname } from "next/navigation";
import { FcLock } from "react-icons/fc";
import moment from "moment-timezone";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { PiLockFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import StateCompo from "@/app/components/auth/auth.component.js";
import LoadingSign from "@/app/components/loading/loading.component";
import CarouselImages from "@/app/components/reporte/images.component";
export default function Dashboard() {
    const [reporte, setReporte] = useState(null);
    const [imagesList, setImagesList] = useState([]);
    const [uuidPost, setUuidPost] = useState('');
    const commentRef = useRef(null);
    const [isActive, setIsActive] = useState(true);
    const pathname = usePathname();
    const params = useParams();
    const reportId = params.uuid;
    const router = useRouter()
    const onLoadPost = async () => {
        const token = getToken();
        const post = await apiGet(`/post/${reportId}`, token);
        setReporte(post.data);
        setImagesList(post.data.Photos_Posts);
        localStorage.setItem("selectedPost", JSON.stringify(post.data));
    }
    const onClickLock = () => {
        setIsActive(!isActive);
    }
    const onClickReturn = () => {
        const previousURL = localStorage.getItem('previousPage')
        localStorage.removeItem('previousPage')
        router.push(previousURL)

    }
    const onSubmitComment = async (e) => {
        e.preventDefault();
        const token = getToken();
        if (!token) return;
        const comentario = commentRef.current.value;
        if (!comentario.trim()) {
            return;
        }
        if (!isActive) {
            const aceptado = confirm('¿Está seguro que desea cerrar el Reporte?');
            if (!aceptado) {
                return
            }
        }
        try {
            await apiPost(`/comment/${reporte.uuid}`, { comment: comentario, isActive: isActive }, token);
            await onLoadPost();
            commentRef.current.value = '';
        } catch (error) {
            throw `Error al enviar el comentario: ${error}`;
        }
    };
    useEffect(() => {
        const getPost = async () => {
            try {
                const storedPost = localStorage.getItem("selectedPost");
                if (reportId) {
                    setUuidPost(reportId);
                    await onLoadPost(uuidPost);
                }
            } catch (error) {
                throw `Error al obtener el reporte: ${error.message}`;
            }
        };
        getPost();
    }, [uuidPost]);

    return (
        <StateCompo>
            {!reporte ? (<LoadingSign />) : (<div className="mainContent">
                <h2 onClick={onClickReturn}> <MdOutlineKeyboardReturn style={{ fontSize: '32px' }} /> Volver</h2>
                <div className={styles.reportSection}>
                    <div className={styles.header}>
                        <h3>{reporte.title}</h3>
                    </div>
                    <div>
                        <CarouselImages imagesArray={imagesList} />
                    </div>
                    <div className={styles.bodyReport}>
                        <p>Ubicación: {reporte.Location.name}</p>
                        <p>{reporte.description}</p>
                    </div>
                    <div className={styles.footerReport}>
                        <p>{reporte.User.name} {reporte.User.lastname}</p>
                        <p>{moment(reporte.date).tz('America/Santiago').format('DD-MM-YYYY HH:mm')}</p>
                    </div>
                </div>
                <div className={styles.commentSection}>
                    <ul>
                        {reporte.Comments.map((comment, index) => (
                            <li className={styles.lineaEncabezado} key={index}>
                                <p>{comment.User.name} {comment.User.lastname}</p>
                                <p>{comment.comment}</p>
                                <p>{moment(comment.date).tz('America/Santiago').format('DD-MM-YYYY HH:mm')}</p>
                            </li>

                        ))}
                    </ul>
                </div>
                {reporte.isActive ? (
                    <form className={styles.commentBox}>
                        <textarea
                            id="comment"
                            ref={commentRef}
                            placeholder="Escribe tu comentario..."
                        />
                        <div className={styles.buttonRack}>
                            <button type="submit" onClick={onSubmitComment}>Comentar</button>
                            <div className={styles.btnCerrarReporte} style={{ backgroundColor: isActive ? 'green' : 'red' }} onClick={onClickLock} title="Cerrar Reporte">
                                {isActive ? (<PiLockKeyOpenFill style={{ fontSize: '20px' }} />) : (<PiLockFill style={{ fontSize: '20px' }} />)}
                            </div>
                        </div>
                    </form>) : (
                    <div className={styles.error}>
                        <p><FcLock style={{ fontSize: '24px', }} /></p>
                        <p> El Reporte se ha cerrado y no admite más comentarios</p>
                        <p><FcLock style={{ fontSize: '24px', }} /></p>
                    </div>
                )
                }
            </div>
            )
            }
        </StateCompo>
    );
}
