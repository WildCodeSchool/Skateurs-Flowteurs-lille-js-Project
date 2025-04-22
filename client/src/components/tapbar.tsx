import styles from "./tapbar.module.css"
import { Link } from "react-router"

export const Tapbar = () => {
    return (
        <nav className={styles.tapbar}>
            <Link to="/"><button className={styles.buttonNav}><img src="./public/mapIcon.png" /></button></Link>
            <Link to="/"><button className={styles.buttonNav}><img src="./public/tricksIcon.png" /></button></Link>
            <Link to="/profil"><button className={styles.buttonNav}><img src="./public/profileIcon.png" /></button></Link>
            <Link to="/"><button className={styles.buttonNav}><img src="./public/contactIcon.png" /></button></Link>
        </nav>
    )
}