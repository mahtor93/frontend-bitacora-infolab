"use client"
import Image from "next/image";
import styles from "./login.module.css";
import { IoLogInOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
export default function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <div className={styles.loginContent}>
<img src="https://intranet.virginiogomez.cl/intranet/assets/images/logo-ipvg.png" width="220" alt=""></img>
      <h2>Bitácora T.I.</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("user_name", {
            validate: value => value !== "admin" || "Nice try!"
          })}
        />
        {errors.username && errors.username.message}
        <input type="password"
          {...register("password", {
            validate: value => value !== "admin" || "Nice try!"
          })}
        />
        {errors.username && errors.username.message}
          <button type="submit">Acceso <i><IoLogInOutline /></i></button>
      </form>
    </div>
  );
}