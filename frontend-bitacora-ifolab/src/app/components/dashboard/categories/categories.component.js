import { useEffect, useState } from "react"
import styles from "./categories.module.css"
import { apiGet } from "@/api/user.service";
import { getToken } from "@/utils/auth";

export default function RowCategories() {
    const [selectedCategory, setSelectedCategory] = useState(3);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        async function getCategories(){
            try{
                const token = getToken();
                if(token){
                    const resCategories = await apiGet('/category', token);
                    setCategories(resCategories.data);
                }
            } catch(error){
                throw error;
            }
        }
        getCategories();
    },[])

    function onClickCategory(index) {
        console.log(index)
        setSelectedCategory(index);
    }

    return (
        <>
        <div className={styles.rowCategories}>
            { categories.map((category, index) =>(
                    <div key={category.id} style={{ backgroundColor: selectedCategory === category.id ? '#ececec' : '#063d7d', color:selectedCategory === category.id ? '#063d7d' : '#fff'  }} className={styles.category} onClick={() => onClickCategory(category.id)}><h3>{category.name}</h3></div>
                ))
            }
        </div>
        </>
    )
}
