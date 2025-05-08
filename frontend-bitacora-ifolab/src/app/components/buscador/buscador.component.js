"use client"
import { useEffect, useState } from "react";
import styles from "./buscador.module.css"
import {  useForm } from "react-hook-form"
import { apiGet } from "@/api/user.service";
import { useRouter, useSearchParams } from "next/navigation";
import { getToken } from "@/utils/auth";
import {  DateRange  } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function BuscadorForm({onFilterList}) {
    const searchParams = useSearchParams();
    const locationParam = searchParams.get('location') || null;
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [date, setDate] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ]);

    const { handleSubmit, control, register, setValue, reset,formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (query) => {
        try {
            const { startDate, endDate } = date[0];
            if (startDate && endDate && startDate.toDateString() !== endDate.toDateString()) {
                query.date_from = Math.floor(startDate.getTime() / 1000);
                query.date_to = Math.floor(endDate.getTime() / 1000);
                delete query.date;
            } else if (startDate) {
                query.date = Math.floor(startDate.getTime() / 1000);
                delete query.date_from;
                delete query.date_to;
            }

            const token = getToken();
            const res = await apiGet('/post', token, query);
            if (res.error) {
                throw new Error(res.error.msg);
            } else {
                onFilterList(res.data)
            }
            reset();
            setDate([
                {
                    startDate: null,
                    endDate: null,
                    key: 'selection'
            }
        ])
        } catch (err) {
            throw err.message;
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const token = getToken();
                const resLocations = await apiGet('/location', token);
                const resCategories = await apiGet('/category', token);
                const resUsers = await apiGet('/user', token);

                if (resLocations.status !== 200 || resCategories.status !== 200) {
                    throw new Error('Error al cargar datos');
                }
                setLocations(resLocations.data);
                setCategories(resCategories.data);
                setUsers(resUsers.data);
            } catch (error) {
                throw error;
            }
        }
        fetchData();
    }, []);

    useEffect(() =>{
        async function getGraphQuery(locationParam){
            // Opcional: setear el valor en el formulario
            setValue('location', locationParam);

            // Ejecutar la búsqueda automáticamente
            onSubmit({ location: locationParam });

            // Limpiar el parámetro del query string después de la búsqueda
            // (esto reemplaza la URL actual sin el parámetro location)
            const params = new URLSearchParams(searchParams.toString());
            params.delete('location');
            router.replace(`?${params.toString()}`, { scroll: false });
        }
        if (locationParam) {
            getGraphQuery(locationParam);
        }
    }, [locationParam])

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.firstPartForm}>
                <div className={styles.inputsHeads}>
                    <div className={styles.inputs}>
                        <label htmlFor="title">Título</label>
                        <input id="title" {...register('title', { required: false, maxLength: 255 })} />
                        {errors.title && errors.title.type === "required" && <span>This is required</span>}
                        {errors.title && errors.title.type === "maxLength" && <span>Max length exceeded</span>}
                    </div>
                    <div className={styles.inputs}>
                        <label htmlFor="keyword">Palabra Clave</label>
                        <input id="keyword" {...register('keyword', { required: false, maxLength: 255 })} />
                        {errors.keyword && errors.keyword.type === "required" && <span>This is required</span>}
                        {errors.keyword && errors.keyword.type === "maxLength" && <span>Max length exceeded</span>}
                    </div>
                    <div className={styles.inputs}>
                        <label htmlFor="location">Ubicación</label>
                        <select
                            id="location"
                            {...register('location', { required: false })}
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
                            {...register('category', { required: false })}
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
                        <label htmlFor="author">Autor</label>
                        <select
                            id="user"
                            {...register('user', { required: false })}
                            onChange={(e) => setValue('user', e.target.value)}
                        >
                            <option value="">Selecciona ...</option>
                            {users.map(user => (
                                <option key={user.id} value={user.name_user}>
                                    {user.name} {user.lastname}
                                </option>
                            ))}
                        </select>
                        {errors.author && <span>Selecciona un autor</span>}
                    </div>
                </div>
                
                <div className={styles.datePicker}>
                    <label htmlFor="date">Fecha</label>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                    />
                </div>
                </div>
                <div className={styles.buttonRack}>
                    <button className={styles.btnSend} type="submit">
                        Buscar
                    </button>
                </div>

            </form>

        </div>
    )
}