import { useEffect, useState } from "react"
import styles from "./categories.module.css"
import { apiGet } from "@/api/user.service";
import { getToken } from "@/utils/auth";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export default function RowCategories({onCategorySelect}) {
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
                throw error.message;
            }
        }
        async function initialReports(){
            const token = getToken();
            try{
                const prevCategory = localStorage.getItem('prevCategorySelected')
                if(prevCategory){
                    const defaultReports = await apiGet('/post', token, { category: prevCategory });
                    onCategorySelect(defaultReports.data)
                    console.log(prevCategory)
                    return
                } 
                const defaultReports = await apiGet('/post', token, { category: 3 });
                onCategorySelect(defaultReports.data)
            }catch(error){
                throw error.message;
            }
        }

        initialReports();
        getCategories();
    },[onCategorySelect])

    const onClickCategory = async (index) => {
        try{
        setSelectedCategory(index);
        localStorage.setItem('prevCategorySelected', selectedCategory);
        const token = getToken();
        if(token){
            const reportes = await apiGet('/post', token,{category: index})
            onCategorySelect(reportes.data);
        }
        } catch(error){
            throw error.message;
        }
    }
    return (
        <>
        <div className={styles.rowCategories}>
            { categories.map((category) =>(
                    <div key={category.id} style={{ backgroundColor: selectedCategory === category.id ? '#ececec' : '#063d7d', color:selectedCategory === category.id ? '#063d7d' : '#fff'  }} className={styles.category} onClick={() => onClickCategory(category.id)}><h3>{category.name}</h3></div>
                ))
            }
        </div>
        </>
    )
}
