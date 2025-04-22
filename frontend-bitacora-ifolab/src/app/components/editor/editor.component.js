"use client"
import styles from "./editor.module.css"
import { useForm } from "react-hook-form"
import { apiGet } from "@/api/user.service";
import { apiPost } from "@/api/user.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";

export default function Editor() {
    const [isBadPosting, setIsBadPosting] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({ id: '', name: '' });
    const [locations, setLocations] = useState([]);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const router = useRouter();

    const onHandleSelection = (event) => {
        const selectedId = Number(event.target.value);
        const selected = locations.find(location => location.id === selectedId);
        console.log(selected.id)
        setSelectedLocation({
            id: selectedId,
            name: selected ? selected.name : ''
        });
    }

    const onSubmit = async (values) => {
        try {
            const token = getToken();
            const res = await apiPost('/post', values, token);
            if (!res.data?.token || res.status === 401) {
                setIsBadPosting(true);
                if (res.status === 401) {
                    throw new Error('Operación No Permitida');
                }
            }
            router.push('/dashboard');
        } catch (err) {
            console.log(err);
            //const errorMessage = err.response?.data?.message || err.message || 'Fallo al crear Reporte';
        }
    };

    useEffect(() => {
        async function onHandleLocationList() {
            try {
                const token = getToken();
                const response = await apiGet('/location', token);
                if (!response?.data || response.status !== 200) {
                    throw new Error('Error al cargar Ubicaiones')
                }
                setLocations(response.data);
                console.log(response.data)
            } catch (error) {
                throw error;
            }
        }

        onHandleLocationList();
    }, [])

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputs}>
                    <label htmlFor="title">Título</label>
                    <input id="title" {...register('title', { required: true, maxLength: 64 })} />
                    {errors.name && errors.name.type === "required" && <span>This is required</span>}
                    {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
                </div>
                <div className={styles.inputs}>

                    <label htmlFor="location">Ubicación</label>
                    <select id="location" {...register('location', { required: true, maxLength: 24 })}
                        onChange={onHandleSelection}
                        value={selectedLocation.id}>
                            <option value="">Selecciona...</option>
                        {locations.map((location ) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))
                        }
                    </select>

                </div>
                <textarea id="description" {...register('description', { required: true, maxLength: 500 })} />
                <input className={styles.btnSend} type="submit" />
            </form>

        </div>
    )
}