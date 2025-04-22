import styles from "./tapbar.module.css"

export const Tapbar = () => {
    return (
        <nav className={styles.tapbar}>
            <button className={styles.buttonNav}><img src="./public/mapIcon.png" /></button>
            <button className={styles.buttonNav}><img src="./public/tricksIcon.png" /></button>
            <button className={styles.buttonNav}><img src="./public/profileIcon.png" /></button>
            <button className={styles.buttonNav}><img src="./public/contactIcon.png" /></button>
        </nav>
    )
}