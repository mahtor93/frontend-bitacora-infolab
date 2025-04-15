
import styles from "./list.module.css";

const reportes = [
    {
        "id":1,
        "title":"Primer reporte",
        "text":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "id":2,
        "title":"Segundo reporte",
        "text":" Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
        "id":3,
        "title":"Tercer reporte",
        "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "id":4,
        "title":"Cuarto reporte",
        "text":"Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "id":5,
        "title":"Quinto reporte",
        "text":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "id":6,
        "title":"Sexto reporte",
        "text":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "id":7,
        "title":"Séptimo reporte",
        "text":"Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        "id":8,
        "title":"Octavo reporte",
        "text":"Lorem Ipsum Dolor sit Amet"
    },
    {
        "id":9,
        "title":"Noveno reporte",
        "text":"Lorem Ipsum Dolor sit Amet"
    },
    {
        "id":10,
        "title":"Décimo reporte",
        "text":"Lorem Ipsum Dolor sit Amet"
    },
    
]
export default function ListDashboard() {
  return (
   <div className={styles.listContent}>
        <ul className={styles.list} >
            {
                reportes.map((reporte,index)=>(
                    <li style={{backgroundColor:index%2===0?"#1c5199":"none"}}>
                        <h3>{reporte.title}</h3>
                        <p>{reporte.text.substring(0,64)}...</p>
                    </li>
                ))
            }
        </ul>
   </div>
  );
}
