"use client"
import styles from "./editor.module.css"
import { useForm } from "react-hook-form"

export default function Editor() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = values => console.log(values);

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
                    <select id="location" {...register('location', { required: false, maxLength: 24 })} />
                </div>
                <textarea id="description" {...register('description', { required: true, maxLength: 500 })} />
                <input className={styles.btnSend} type="submit" />
            </form>

        </div>
    )
}