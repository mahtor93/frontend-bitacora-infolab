"use client"
import styles from "./login.module.css";
import { CiLogin } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { apiPost } from "@/api/user.service.js";
import { setToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [isBadLogin, setIsBadLogin] = useState(true);
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = async (values) => {    
    setError('');
    setIsLoading(true);
    try {
      const res = await apiPost('/login', values);
      if(res.status === 404){
      }
      if(res.data.token){
        setToken(res.data.token);
        setIsBadLogin(false);
        router.push('/dashboard');
      }
    }catch(err) {
      const errorMessage = err.message;
      setError(errorMessage);
    } 
  };

  return (
    <div className={styles.mainContentLogin}>
      <div className={styles.backgroundTop}>
      <h1>Acceso Bitácora</h1>
      <p>Laboratorio de Computación</p>
        <img className={styles.image} src="/ipvgLogoGrande.png" width="300" alt="IPVG_LOGO" />

      </div>
      <div className={styles.loginContent}>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <input type="text"
            {...register("name_user")}
          />
          {errors.username && errors.username.message}
          <input type="password"
            {...register("password")}
          />
          {errors.username && errors.username.message}
          <button type="submit">Acceso <i><CiLogin /></i></button>
          { 
            isBadLogin && <p className={styles.error}>{error}</p>
          }
        </form>
      </div>
    </div>
  );
}