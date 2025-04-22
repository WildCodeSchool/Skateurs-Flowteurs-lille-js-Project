import styles from "./header.module.css"
import { useState } from "react";




export const Header = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible)
    };



    return (
        <>
            <nav className={styles.HeaderNav}>
                <img className={styles.burger} src="./public/BButton.svg" onClick={handleClick}/>
                <img src="./public/logo.png" alt="cow on a skateboard" />
                <h1>InterPark</h1>
            </nav>
            <div className={isVisible? styles.burgerBarOn : styles.burgerBarOff}>
                <img src="./public/cross.svg" onClick={handleClick}/>
                <a>Home</a>
                <a>SkateMap</a>
                <a>TricksDex</a>
                <a>Profil</a>
                <a>Contact</a>
            </div>
        </>
    )
}