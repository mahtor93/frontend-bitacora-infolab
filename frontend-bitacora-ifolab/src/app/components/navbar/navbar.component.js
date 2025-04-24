"use client"
import styles from "./navbar.module.css"
import { IoHome } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
import Link from "next/link";
import { removeToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const onclickLogout = (e) => {
        removeToken();
        router.push('/');
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.buttonRack}>
                <div className={styles.button}>
                    <Link href="/dashboard">
                        <IoHome /> <p>Dashboard</p>
                    </Link>
                </div>
                <div className={styles.button}>
                    <Link href="/dashboard/create">
                        <BsPencilSquare /> <p>Crear Reporte</p>
                    </Link>
                </div>
                <div className={styles.button} >
                    <div onClick={onclickLogout}>
                        <RiLogoutBoxLine /> <p>Cerrar Sesión</p>
                    </div>
                </div>
            </div>
        </div>
    )
}