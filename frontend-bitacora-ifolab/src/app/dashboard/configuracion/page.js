"use client"
import React from "react";
import { useForm } from "react-hook-form"
import styles from './configuracion.module.css'
import { getToken } from "@/utils/auth";
import { apiPatch } from "@/api/user.service";


export default function Configurations() {
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
            <h3>Cambiar contraseña</h3>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.colForm}autoComplete="off">
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
        </div>
    );
}
