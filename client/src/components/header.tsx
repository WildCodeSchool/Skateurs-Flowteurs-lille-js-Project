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
                <button className={styles.burger}><img src="./public/BButton.svg" onClick={handleClick}/></button>
                <img src="./public/logo.png" alt="cow on a skateboard" />
                <h1>InterPark</h1>
            </nav>
            <div className={isVisible? styles.burgerBarOn : styles.burgerBarOff}>
                <button><img src="./public/cross.svg" onClick={handleClick}/></button>
                <a>Home</a>
                <a>SkateMap</a>
                <a>TricksDex</a>
                <a>Profil</a>
                <a>Contact</a>
            </div>
        </>
    )
}