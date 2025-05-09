"use client"
import React from "react";
import { useForm } from "react-hook-form"

export default function Configurations() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm();

    const onSubmit = (data) => {
        // Aquí iría la lógica para enviar la nueva contraseña al backend
        // Por ejemplo: apiChangePassword(data)
        alert("Contraseña cambiada exitosamente");
    };

    // Para comparar las contraseñas nuevas
    const newPassword = watch("newPassword", "");

    return (
        <div className="mainContent" >
            <h2>Configuración</h2>
            <h3>Cambiar contraseña</h3>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div>
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
                <div >
                    <label htmlFor="newPassword">Nueva contraseña</label>
                    <input
                        id="newPassword"
                        type="password"
                        {...register("newPassword", {
                            required: "La nueva contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener al menos 8 caracteres"
                            }
                        })}
                    />
                    {errors.newPassword && (
                        <span>{errors.newPassword.message}</span>
                    )}
                </div>
                <div >
                    <label htmlFor="confirmPassword">Repetir nueva contraseña</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword", {
                            required: "Debes repetir la nueva contraseña",
                            validate: value =>
                                value === newPassword || "Las contraseñas no coinciden"
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
