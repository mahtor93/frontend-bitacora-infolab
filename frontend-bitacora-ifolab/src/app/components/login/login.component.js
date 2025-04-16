"use client"
import Image from "next/image";
import styles from "./login.module.css";
import { IoLogInOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { apiPost } from "@/api/user.service.js";
import { setToken } from "@/utils/auth";

export default function Login() {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (values) => {
    const res = await apiPost('/login', values)
    setToken(res.data.token);
  };

  

  return (
    <div className={styles.loginContent}>
      <img src="https://intranet.virginiogomez.cl/intranet/assets/images/logo-ipvg.png" width="220" alt=""></img>
      <h2>Bitácora T.I.</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <input type="text"
          {...register("name_user")}
        />
        {errors.username && errors.username.message}
        <input type="password"
          {...register("password")}
        />
        {errors.username && errors.username.message}
        <button type="submit">Acceso <i><IoLogInOutline /></i></button>
      </form>
    </div>
  );
}

/*
Credenciales:
mario.torneria
123456789
*/