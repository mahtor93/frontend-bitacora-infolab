"use client"
import styles from "./createUser.module.css";
import { useForm } from "react-hook-form";
import { apiPost } from "@/api/user.service.js";
import { useState } from "react";

export default function CreateUser() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [isBadLogin, setIsBadLogin] = useState(true);
    const onSubmit = async (values) => {
        setError('');
        setIsLoading(true);
        try {
            console.log('Creando usuario', values)
            setIsBadLogin(false);
        } catch (err) {
            const errorMessage = err.message;
            setError(errorMessage);
        }
    };

    return (
        <>
        <h3 className={styles.ha3}>Creación de usuarios</h3>
            <div className={styles.main}>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.mainCreateForm}>
                        <div className={styles.col}>
                            <div className={styles.row}>
                                <label>Nombre</label>
                                <input type="text"
                                    {...register("name")}
                                />
                            </div>
                            <div className={styles.row}>
                                <label>Apellido</label>
                                <input type="text"
                                    {...register("lastname")}
                                />
                            </div>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.row}>
                                <label>Correo</label>
                                <input type="text"
                                    {...register("name")}
                                />
                            </div>
                            <div className={styles.row}>
                                <label>Username</label>
                                <input type="text"
                                    {...register("lastname")}
                                />
                            </div>
                        </div>


                        <div className={styles.col}>
                            <div className={styles.row}>
                                <label>Contraseña</label>
                                <input type="text"
                                    {...register("name")}
                                />
                            </div>

                            <div className={styles.row}>

                            </div>

                        </div>


                    </div>
                    <div className={styles.buttonRack}>

                    <button type="submit">Crear Usuario</button>
                    </div>
                    {
                        isBadLogin && <p>{error}</p>
                    }
                </form>
            </div>
        </>
    )
}