import { useEffect, useState } from "react"
import styles from "./categories.module.css"
import { apiGet } from "@/api/user.service";
import { getToken } from "@/utils/auth";

export default function RowCategories({onCategorySelect}) {
    const [selectedCategory, setSelectedCategory] = useState(3);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        async function getCategories(){
            try{
                const token = getToken();
                if(token){
                    const resCategories = await apiGet('/category',{}, token);
                    setCategories(resCategories.data);
                }
            } catch(error){
                throw error;
            }
        }
        getCategories();
    },[])

    const onClickCategory = async (index) => {
        try{
        setSelectedCategory(index);
        const token = getToken();
        if(token){
            console.log(`preguntando por /post? ${index}`)
            const reportes = await apiGet('/post',{category: index}, token)
            onCategorySelect(reportes.data);
        }
        } catch(error){
            console.log(`ERROR >>> ${error.message}`)
            throw error.message;
        }
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
