import styles from "./navbar.module.css"
import { IoHome } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";
export default function Navbar(){
    
    return(
        <div className={styles.navbar}>
            <div className={styles.buttonRack}>
                <div>
                    <RiLogoutBoxLine />
                </div>
                <div>
                    <IoHome />
                </div>
                <div>
                    <BsPencilSquare />
                </div>
            </div>
        </div>
    )
}