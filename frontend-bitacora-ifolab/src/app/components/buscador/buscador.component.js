"use client"
import * as React from 'react';
import styles from "./buscador.module.css"
import { Controller, useForm } from "react-hook-form"
import { apiGet } from "@/api/user.service";
import { apiPost } from "@/api/user.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";
import { Calendar, DateRange, DateRangePicker  } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function BuscadorForm() {
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
          }
    ]);

    const { handleSubmit, control, register, setValue, formState: { errors } } = useForm();
    const router = useRouter();


    const onSubmit = async (values) => {
        try {
            const token = getToken();
            const res = await apiGet(/* AQUI VA LA API DE CONSULTAS */ '/post', values, token);
            if (res.error) {
                throw new Error(res.error.msg);
            } else {
                console.log(res.data)
            }
        } catch (err) {
            throw err;
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

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputsHeads}>
                    <div className={styles.inputs}>
                        <label htmlFor="title">Buscar Por título</label>
                        <input id="title" {...register('title', { required: false, maxLength: 255 })} />
                        {errors.name && errors.name.type === "required" && <span>This is required</span>}
                        {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
                    </div>
                    <div className={styles.inputs}>
                        <label htmlFor="title">Buscar Por Palabra Clave</label>
                        <input id="title" {...register('title', { required: false, maxLength: 255 })} />
                        {errors.name && errors.name.type === "required" && <span>This is required</span>}
                        {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
                    </div>
                    <div className={styles.inputs}>
                        <label htmlFor="location">Filtrar por ubicación</label>
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
                        <label htmlFor="category">Filtrar por categoría</label>
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
                        <label htmlFor="category">Filtrar por Autor</label>
                        <select
                            id="category"
                            {...register('category', { required: false })}
                            onChange={(e) => setValue('category', e.target.value)}
                        >
                            <option value="">Selecciona ...</option>
                            {users.map(user => (
                                <option key={user.id} value={user.name_user}>
                                    {user.name} {user.lastname}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span>Selecciona una categoría</span>}
                    </div>
                </div>
                
                {
                    <div className={styles.datePicker}>
                    <label htmlFor="date">Filtrar por Fecha</label>
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                        />
                    </div>
                }
            </form>

        </div>
    )
}