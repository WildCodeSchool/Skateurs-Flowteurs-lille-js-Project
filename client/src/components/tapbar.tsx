import styles from "./tapbar.module.css"

export const Tapbar = () => {
    return (
        <div className={styles.tapbar}>
            <img src="./public/mapIcon.png" />
            <img src="./public/tricksIcon.png" />
            <img src="./public/profileIcon.png" />
            <img src="./public/contactIcon.png" />
        </div>
    )
}