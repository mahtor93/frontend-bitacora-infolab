"use client"
import styles from "./editor.module.css"
import { useForm } from "react-hook-form"
import { apiGet } from "@/api/user.service";
import { apiPost } from "@/api/user.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";
import { PiLockFill } from "react-icons/pi";
import { PiLockKeyOpenFill } from "react-icons/pi";
export default function Editor() {
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const { handleSubmit, register, setValue, formState: { errors } } = useForm();
    const router = useRouter();
    const [isActive, setIsActive] = useState(true);

    const onSubmit = async (values) => {
        try {
            const token = getToken();
            const formData = new FormData();
    
            // Campos de texto
            formData.append("title", values.title);
            formData.append("location", values.location);
            formData.append("category", values.category);
            formData.append("description", values.description);
            formData.append("isActive", isActive);
    
            // Archivo (image)
            if (values.image && values.image[0]) {
                formData.append("image", values.image[0]);
            }
    
            const res = await apiPost('/post', formData, token, true); // true para indicar multipart/form-data
            if (res.error) {
                throw new Error(res.error.msg);
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error(err);
        }
    };
    const onClickLock = () => {
        setIsActive(!isActive);
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const token = getToken();
                const resLocations = await apiGet('/location', token);
                const resCategories = await apiGet('/category', token);
                if (resLocations.status !== 200 || resCategories.status !== 200) {
                    throw new Error('Error al cargar datos');
                }
                setLocations(resLocations.data);
                setCategories(resCategories.data);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputsHeads}>
                    <div className={styles.inputs}>
                        <label htmlFor="title">Título</label>
                        <input placeholder="Escriba un título" id="title" {...register('title', { required: true, maxLength: 255 })} />
                        {errors.name && errors.name.type === "required" && <span>This is required</span>}
                        {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
                    </div>
                    <div className={styles.inputs}>
                        <label htmlFor="location">Ubicación</label>
                        <select
                            id="location"
                            {...register('location', { required: true })}
                            onChange={(e) => setValue('location', e.target.value)}
                        >
                            <option value="">Selecciona ...</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                        {errors.location && <span>Selecciona una ubicación</span>}
                    </div>
                    <div className={styles.inputs}>
                        <label htmlFor="category">Categoría</label>
                        <select
                            id="category"
                            {...register('category', { required: true })}
                            onChange={(e) => setValue('category', e.target.value)}
                        >
                            <option value="">Selecciona ...</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span>Selecciona una categoría</span>}
                    </div>
                    <div className={styles.inputs}>
                        <label htmlFor="image">Imagen</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/png, image/jpg, image/jpeg"
                            {...register('image', { required: false })}
                        />
                    </div>
                </div>
                <div className={styles.bodyPost}>
                    <textarea id="description" placeholder="Escriba su reporte aquí" {...register('description', { required: true, maxLength: 1500 })} />
                    <div className={styles.buttonRack}>
                        <input className={styles.btnSend} type="submit" />
                        <div className={styles.btnCerrarReporte} style={{ backgroundColor: isActive ? 'green' : 'red' }} onClick={onClickLock} title="Cerrar Reporte">
                            {isActive ? (<PiLockKeyOpenFill style={{ fontSize: '20px' }} />) : (<PiLockFill style={{ fontSize: '20px' }} />)}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}