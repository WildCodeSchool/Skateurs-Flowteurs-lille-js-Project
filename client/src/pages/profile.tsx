import { useState } from "react";
import styles from "./profile.module.css";

export const Profile = () => {
  const [isTutoHidden, setIsTutoHidden] = useState(false);

  const handleClick = () => {
    setIsTutoHidden(!isTutoHidden);
  };

  return (
    <>
      <div className={styles.mainProfilePageContainer}>
        <div className={styles.pageTitle}>
          <h2>Profil</h2>
          <button onClick={handleClick}>i</button>
        </div>
        <p className={isTutoHidden ? styles.tutoVisible : styles.tutoInvisible}>
          Crée ton compte pour profiter pleinement de toutes les fonctionnalités
          de notre site. Rejoins-nous en quelques clics, c'est rapide, simple et
          sécurisé.
        </p>

        <div className={styles.connectionButton}>
          <h3>Se connecter via Google</h3>
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="google logo"
          />
        </div>
      </div>
    </>
  );
};
