"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { apiGet } from "@/api/user.service";
import { getToken } from "@/utils/auth";

const UserRoleContext = createContext({
    userRole: null,
    setUserRole: () => {},
});

export const UserRoleProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
        async function getUser() {
            try {
                const token = getToken();
                const user = await apiGet('/login', token);
                const role = user?.data?.Role?.name_rol || null;
                setUserRole(role);
            } catch (error) {
                setUserRole(null);
            } 
        }
        getUser();
    }, [])

    return(
        <UserRoleContext.Provider value={{ userRole, setUserRole }}>
            {children}
        </UserRoleContext.Provider>
    )
}

export const useUserRole = () => useContext(UserRoleContext);