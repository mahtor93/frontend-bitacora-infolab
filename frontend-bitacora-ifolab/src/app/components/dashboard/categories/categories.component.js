import { useEffect, useState } from "react"
import styles from "./categories.module.css"
import { apiGet } from "@/api/user.service";
import { getToken } from "@/utils/auth";

export default function RowCategories({onCategorySelect}) {

    function getInitialCategory() {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem('prevCategorySelected');
            if (stored) return Number(stored);
        }
        return 3;
    }

    const [selectedCategory, setSelectedCategory] = useState(getInitialCategory || 3);
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
        async function initialReports() {
            const token = getToken();
            try {
                const categoryToFetch = getInitialCategory();
                const defaultReports = await apiGet('/post', token, { category: categoryToFetch });
                onCategorySelect(defaultReports.data);
            } catch (error) {
                throw error.message;
            }
        }

        initialReports();
        getCategories();
    },[onCategorySelect])

    const onClickCategory = async (categoryId) => {
        try {
            setSelectedCategory(categoryId);
            if (typeof window !== "undefined") {
                localStorage.setItem('prevCategorySelected', categoryId);
            }
            const token = getToken();
            if (token) {
                const reportes = await apiGet('/post', token, { category: categoryId });
                onCategorySelect(reportes.data);
            }
        } catch (error) {
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
