"use client"
import React from "react";
import { useForm } from "react-hook-form"
import { useUserRole } from "@/app/components/context/user.context";
import styles from './configuracion.module.css'

import { getToken } from "@/utils/auth";
import { apiPatch, apiPost } from "@/api/user.service";


function LocationCreator() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm();

    const onSubmit = async (data) => {
        const token = getToken();
        try {
            // Suponiendo que tu endpoint para crear location es '/location'
            const response = await apiPost('/location', data, token);
            console.log(response);
            alert("¡Ubicación creada exitosamente!");
            reset();
        } catch (error) {
            alert("Error al crear la ubicación");
        }
    };

    return (
        <div>
            <h3>Crear Ubicación</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.colForm} autoComplete="off">
                <div className={styles.rowForm}>
                    <label htmlFor="name">Nombre de la ubicación</label>
                    <input
                        id="name"
                        type="text"
                        {...register("name", { required: "El nombre es obligatorio" })}
                        style={{ marginLeft: "1rem" }}
                    />
                    {errors.name && (
                        <span style={{ color: "yellow", marginLeft: "1rem" }}>{errors.name.message}</span>
                    )}
                </div>
                <button type="submit" disabled={isSubmitting}>
                    Crear ubicación
                </button>
                {isSubmitSuccessful && (
                    <div style={{ color: "lightgreen", marginTop: "1rem" }}>
                        ¡Ubicación creada exitosamente!
                    </div>
                )}
            </form>
        </div>
    );
}




export default function Configurations() {
    const { userRole } = useUserRole();
    console.log(userRole)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm();

    const onSubmit = (data) => {
        const token = getToken();
        const message = apiPatch('/user', token, data);
        alert(`${message}`);
    };

    // Para comparar las contraseñas nuevas
    const password = watch("password", "");



    return (
        <div className="mainContent" >
            <h2>Configuración</h2>
            {
                userRole === 'Admin' ? <LocationCreator /> : <></>
            }
            <h3>Cambiar contraseña de la cuenta</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.colForm} autoComplete="off">
                <div className={styles.rowForm}>
                    <label htmlFor="oldPassword">Contraseña actual</label>
                    <input
                        id="oldPassword"
                        type="password"
                        {...register("oldPassword", { required: "La contraseña actual es obligatoria" })}
                    />
                    {errors.oldPassword && (
                        <span>{errors.oldPassword.message}</span>
                    )}
                </div>
                <div className={styles.rowForm}>
                    <label htmlFor="password">Nueva contraseña</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "La nueva contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres"
                            }
                        })}
                    />
                    {errors.password && (
                        <span>{errors.password.message}</span>
                    )}
                </div>
                <div className={styles.rowForm}>
                    <label htmlFor="confirmPassword">Repetir nueva contraseña</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Debes repetir la nueva contraseña",
                            validate: value =>
                                value === password || "Las contraseñas no coinciden"
                        })}

                    />
                    {errors.confirmPassword && (
                        <span>{errors.confirmPassword.message}</span>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    Cambiar contraseña
                </button>
                {isSubmitSuccessful && (
                    <div>
                        ¡Contraseña cambiada exitosamente!
                    </div>
                )}
            </form>
            <div>

            </div>
        </div>
    );
}
