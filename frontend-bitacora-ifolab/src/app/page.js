
import styles from "./page.module.css";
import Login from "./components/login/login.component";

export default function Home() {
  return (
      <div className={styles.mainContent}>
        <Login/>
      </div>

  );
}
