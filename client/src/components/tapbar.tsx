import styles from "./tapbar.module.css"
import { Link } from "react-router"

export const Tapbar = () => {
    return (
        <nav className={styles.tapbar}>
            <Link to="/" className={styles.buttonNav}><img src="./public/mapIcon.png" /></Link>
            <Link to="/" className={styles.buttonNav}><img src="./public/tricksIcon.png" /></Link>
            <Link to="/profil" className={styles.buttonNav}><img src="./public/profileIcon.png" /></Link>
            <Link to="/" className={styles.buttonNav}><img src="./public/contactIcon.png" /></Link>
        </nav>
    )
}