"use client"
import { getToken } from "@/utils/auth"
import { apiGet } from "@/api/user.service"
import { useEffect, useState } from "react"
import styles from './listUsers.module.css'
export default function ListUsers() {
    const [userList, setUserList] = useState([]);
    async function getUserList() {
        const token = getToken();
        const list = await apiGet('/user', token)
        const sortedList = [...list.data].sort((a, b) => b.Role.id - a.Role.id);
        setUserList(sortedList);
    }
    useEffect(() => {
        getUserList();
    }, [])
    return (
        <div className={styles.mainTableContent}>
            <h3>Lista de usuarios</h3>
            <div className={styles.tableContent}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Nombre</th>
                            <th>Contacto</th>
                            <th>Rol</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            userList.map(user => (
                                <tr key={user.id}>
                                    <td><button>Desactivar</button></td>
                                    <td>{user.name} {user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.Role.name_rol}</td>
                                    <td> <p style={{ color: user.status ? '#00bb00' : 'red', fontWeight: '600' }}>{user.status ? 'Activo' : 'suspendido'}</p></td>
                                </tr>

                            ))

                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}