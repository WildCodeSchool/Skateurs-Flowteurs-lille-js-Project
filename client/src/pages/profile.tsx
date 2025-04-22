import styles from "./profile.module.css"
import { useState } from "react"
import { Header } from "../components/header"
import { Tapbar } from "../components/tapbar"

export const Profile = () => {

    const [tutoHidden, setTutoHidden] = useState(false);

    const handleClick = () =>{
        setTutoHidden(!tutoHidden)

    }

    return (
        <>
            <Header />
            <Tapbar />
            <div className={styles.mainProfilePageContainer}>
                <div className={styles.pageTitle}>
                    <h2>Profil</h2>
                    <button onClick={handleClick}>i</button>
                </div>
                <p className={tutoHidden? styles.tutoVisible : styles.tutoInvisible}>Crée ton compte pour profiter pleinement de toutes les fonctionnalités de notre site. Rejoins-nous en quelques clics, c'est rapide, simple et sécurisé.
                                </p>

                <div className={styles.connectionButton}>
                    <h3>Se connecter via Google</h3>
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="google logo" />
                </div>
            </div>
        </>
    )
}