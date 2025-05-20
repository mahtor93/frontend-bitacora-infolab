"use client"

export default function Input({ id, label, type = "text", placeholder ="", ...register }) {
    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register}
            />
        </div>
    );
}