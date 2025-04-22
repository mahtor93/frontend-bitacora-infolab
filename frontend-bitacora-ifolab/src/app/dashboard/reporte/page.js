"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();
    useEffect(()=>{
        router.push('/dashboard');
    },[])

  return (
   <div style={{ display:'flex',width:'100%', height:'100%',alignContent:'center',justifyContent:'center',color:'#fff' }}>
    Retornando ...
   </div>
  );
}