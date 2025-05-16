"use client";
import { apiGet } from "@/api/user.service";
import { getToken, setToken } from "@/utils/auth";
import { createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const context = createContext();

const StateCompo = ({ children }) => {
  const [user, setUser] = useState("undefined");
  const [eventShow, setEventShow] = useState(null);
  const [events, setEvents] = useState(null);
  const { push } = useRouter();
  const pathname = usePathname(); // Obtener la ruta actual

  const saveUser = (data) => {
    setUser(data);
  };
  
  const getUser = async () => {
    try {
        const token = getToken();
        if(token){
            const data = await apiGet('/login',token);
            saveUser(data);
        }else{
            if (pathname.includes("dashboard")) { // Solo si la ruta contiene "dashboard"
                push("/");
              }
        }

    } catch (error) {
      if (error?.message?.status === 401) {
        if (pathname.includes("dashboard")) { // Solo si la ruta contiene "dashboard"
          push("/");
        }
      }
      setUser(undefined);
    }
  };

  useEffect(() => {
    if (user === "undefined") {
      getUser();
    }
  }, [user]);

  return (
    <context.Provider value={{ user, saveUser, eventShow, setEventShow, events, setEvents }}>
      {user ? children : null} 
    </context.Provider>
  );
};

export default StateCompo;