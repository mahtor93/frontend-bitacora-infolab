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
  const [isBadLogin, setIsBadLogin] = useState(false);
  const { handleSubmit, register, formState: { errors }, setError: setFormError } = useForm();

  const onSubmit = async (values) => {    
    setError('');
    setIsLoading(true);
    try {
      const res = await apiPost('/login', values);
      if (!res.data?.token || res.status === 401) {
        setIsBadLogin(true);
        if(res.status===401){
          throw new Error('Credenciales inválidas');
        }

      }
      setToken(res.data.token);
      router.push('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.backgroundTop}>
        <img className={styles.image} src="https://intranet.virginiogomez.cl/intranet/assets/images/logo-ipvg.png" width="300" alt="IPVG_LOGO" />
        <p>Acceso Lab. Computación</p>
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
          { isBadLogin && <p className={styles.error}>{error}</p>

          }
        </form>
      </div>
    </div>
  );
}

/*
Credenciales:
mario.torneria
123456789
*/