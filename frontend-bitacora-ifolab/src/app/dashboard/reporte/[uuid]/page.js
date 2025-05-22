"use client";
import { useEffect, useRef, useState } from "react";
import { apiGet, apiPost, apiDelete, apiPatch } from "@/api/user.service";
import { getToken } from "@/utils/auth";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form"
import { FcLock } from "react-icons/fc";
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { PiLockKeyOpenFill } from "react-icons/pi";
import { IoTrashBinSharp } from "react-icons/io5";
import { PiLockFill } from "react-icons/pi";
import { BsPencilSquare } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/app/components/context/user.context";
import { Editor, EditorState, convertFromRaw, CompositeDecorator, convertToRaw, } from "draft-js";
import styles from './page.module.css';
import moment from "moment-timezone";
import StateCompo from "@/app/components/auth/auth.component.js";
import LoadingSign from "@/app/components/loading/loading.component";
import CarouselImages from "@/app/components/reporte/images.component";
import TextEditor from "@/app/components/editor/textEditor.component";
import Dropdown from "@/app/components/dropdown/dropdown.component";
import Input from "@/app/components/inputText/input.component";
import "draft-js/dist/Draft.css";
const findUrls = (contentBlock, callback) => {
    const text = contentBlock.getText();
    const urlRegex = /https?:\/\/[^\s]+/g;
    let matchArr, start;
    while ((matchArr = urlRegex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
};

// Componente para renderizar el enlace
const Link = (props) => {
    return (
        <a
            href={props.decoratedText}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00b9ff", textDecoration: "underline" }}
        >
            {props.children}
        </a>
    );
};

// Decorador para detectar y renderizar enlaces
const decorator = new CompositeDecorator([
    {
        strategy: findUrls,
        component: Link,
    },
]);

export default function Dashboard() {
    const [reporte, setReporte] = useState(null);
    const [locations, setLocations] = useState([]);
    const [imagesList, setImagesList] = useState([]);
    const [uuidPost, setUuidPost] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const params = useParams();
    const reportId = params.uuid;
    const commentRef = useRef(null);
    const router = useRouter()
    const [editorState, setEditorState] = useState(
        EditorState.createEmpty(decorator)
    );
    const { handleSubmit, register, setValue, formState: { errors } } = useForm();
    const { userRole } = useUserRole();

    const onLoadPost = async () => {
        try {
            const token = getToken();
            const post = await apiGet(`/post/${reportId}`, token);
            if (!post.data) {
                setMensaje("El post ya no existe");
                setTimeout(() => {
                    setMensaje("");
                    router.back();
                }, 5000);
                return;
            }
            setReporte(post.data);
            setImagesList(post.data.Photos_Posts);
            localStorage.setItem("selectedPost", JSON.stringify(post.data));
        } catch (error) {
            return error;
        }
    }

    const onLoadEditor = async () => {
        try {
            const token = getToken();
            const resLocations = await apiGet(`/location`, token);
            if (resLocations.status !== 200) {
                throw new Error('Error al cargar datos');
            }
            setLocations(resLocations.data);
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        if (reporte && reporte.description) {
            setText(reporte.description);
        }
        // eslint-disable-next-line
    }, [reporte?.description]);

    function setText(text) {
        try {
            const rawContent = JSON.parse(text);
            const contentState = convertFromRaw(rawContent);
            setEditorState(EditorState.createWithContent(contentState, decorator));
        } catch (error) {
            // Si falla el parseo, creamos un content simple
            const contentState = convertFromRaw({
                entityMap: {},
                blocks: [
                    {
                        text: reporte.description,
                        key: "init",
                        type: "unstyled",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {},
                    },
                ],
            });
            setEditorState(EditorState.createWithContent(contentState, decorator));
        }
    }

    // ----------------------- FUNCIONES PARA ADMINISTRAR POST

    const onClickLock = () => {
        setIsActive(!isActive);
    }

    const onClickReturn = () => {
        const previousURL = localStorage.getItem('previousPage')
        localStorage.removeItem('previousPage')
        router.push(previousURL)

    }

    const onClickDelete = () => {
        const aceptado = confirm('¿Está seguro que desea eliminar permanentemente el Reporte?');
        if (!aceptado) {
            return
        }
        try {
            const token = getToken()
            setIsDeleted(true);
            apiDelete('/post', token, reportId);
        } catch (error) {
            return error;
        }
    }

    // ----------------------- FUNCIONES PARA MANEJAR EDICIÓN

    const onClickEdit = () => {
        //alert("Editor en construcción");

        setIsEditing(!isEditing);
        onLoadEditor()
        console.log('Listo para Editar')

    }
    const onSubmitEdit = async (values) => {
        try {
            const token = getToken();
            const formData = new FormData();
            const rawContent = convertToRaw(editorState.getCurrentContent());
            const contentString = JSON.stringify(rawContent);
            formData.append('data', JSON.stringify({
                "title": values.title,
                "location": values.location,
                "description": contentString
            }))
            let res = await apiPatch(`/post/${reportId}`, token, formData);
            if (res.error) {
                throw new Error(res.error.msg);
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error(err);
        }
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
            {mensaje && (
                <div className={styles.mensajeError}>
                    {mensaje}
                </div>
            )}
            {!reporte ? (<LoadingSign />) : (<div className="mainContent">
                <h2 style={{ cursor: 'pointer' }} onClick={onClickReturn}> <MdOutlineKeyboardReturn style={{ fontSize: '32px' }} /> Volver</h2>
                {isDeleted ? (<p></p>) : (
                    <>
                        <div className={styles.reportSection}>

                            <div className={styles.header}>
                                {
                                    isEditing ?
                                        <></>
                                        :
                                        <h3>{reporte.title}</h3>
                                }
                                {userRole === 'Admin' && (
                                    <div style={{ display: 'flex', position: 'relative', flexDirection: 'row', gap: '12px', right: '0', alignItems: 'center' }}>
                                        {isActive ? <BsPencilSquare title="Editar Reporte" onClick={onClickEdit} /> : <></>}
                                        <IoTrashBinSharp className={styles.removePost} onClick={onClickDelete} title="Eliminar Reporte" />
                                    </div>
                                )}
                            </div>

                            <div className={styles.bodyReport}>
                                <CarouselImages imagesArray={imagesList} />
                                {
                                    isEditing ?
                                        <></>
                                        :
                                        <p style={{ margin: '16px 0', fontWeight: '600' }}>Ubicación: {reporte.Location.name}</p>
                                }
                                <div className={styles.bodyReportText}>
                                    {
                                        isEditing ?
                                            <>
                                                <form onSubmit={handleSubmit(onSubmitEdit)}>
                                                    Título: <Input
                                                        id={"title"}
                                                    />
                                                    Ubicación
                                                    <Dropdown
                                                        id={"location"}
                                                        options={locations}
                                                        onChange={val => setValue('location', val)}
                                                        firstOption={"Seleccione una ubicación"}
                                                    />
                                                    <TextEditor
                                                        editorState={editorState}
                                                        setEditorState={setEditorState}
                                                    />
                                                    <button type="submit">Editar</button>
                                                </form>
                                                
                                            </>
                                            :
                                            <Editor
                                                editorState={editorState}
                                                readOnly={true}
                                            />
                                    }

                                </div>
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
                    </>
                )}
                {reporte.isActive && !isDeleted ? (
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
                        <p>{`El Reporte se ha ${isDeleted ? 'eliminado con éxito' : 'cerrado y no admite más comentarios'} `}</p>
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
