import Image from "next/image";
import styles from "./page.module.css";
import Login from "./components/login/login.component";
import { useForm, submitHandler } from "react-hook-form";

export default function Home() {
  return (
   <div className={styles.mainContent}>
    <Login/>
   </div>
  );
}
