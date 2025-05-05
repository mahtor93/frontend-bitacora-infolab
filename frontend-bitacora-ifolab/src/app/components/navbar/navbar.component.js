"use client"
import styles from "./navbar.module.css"
import { IoHome } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";
import { removeToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { HiUserAdd } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { GrConfigure } from "react-icons/gr";
export default function Navbar() {
    const router = useRouter();

    const onclickLogout = (e) => {
        removeToken();
        router.push('/');
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.buttonRack}>
                <div className={styles.logo}>
                    <img src="/ipvgLogoBlanco.png" width={'90px'} />
                </div>
                <div className={styles.button}>
                    <Link href="/dashboard">
                        <IoHome /> <p>Dashboard</p>
                    </Link>
                </div>
                <div className={styles.button}>
                    <Link href="/dashboard/buscador">
                        <FaMagnifyingGlass /> <p>Buscar</p>
                    </Link>
                </div>
                <div className={styles.button}>
                    <Link href="/dashboard/crear">
                        <BsPencilSquare /> <p>Redactar</p>
                    </Link>
                </div>
                <div className={styles.button}>
                    <Link href="/dashboard/administrar-usuarios">
                        <HiUserAdd /> <p>Usuarios</p>
                    </Link>
                </div>
                <div className={styles.button}>
                    <Link href="/dashboard/estadisticas">
                        <TbReportAnalytics /> <p>Estadísticas</p>
                    </Link>
                </div>
                <div className={styles.button}>
                    <Link href="/">
                        <GrConfigure /> <p>Configuración</p>
                    </Link>
                </div>
                <div className={/*styles.logoutButton*/ styles.button}>
                <div onClick={onclickLogout}>
                        <RiLogoutBoxLine /> <p>Cerrar Sesión</p>
                    </div>
                </div>
            </div>
        </div>
    )
}