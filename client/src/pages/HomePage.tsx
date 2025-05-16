import { Link } from "react-router";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={styles.HomePage}>
      <section className={styles.section}>
        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className={styles.logoAntoineRight}
        />
        <p className={styles.BubbleRight}>
          Salut, c'est Antoine Faucon ! Je suis la pour te guider étape par étape
          à travers INTERPARK.
        </p>
      </section>

      <section className={`${styles.blue} ${styles.section}`}>
        <Link to="/carte" className={styles.skateButtonRight}>
          skateMap
        </Link>
        <p className={styles.BubbleLeft}>
          Besoin d'un spot pour skater ? Check la carte ! Je te montre tous les
          skateparks autour de toi, la météo et même l'itinéraire pour t'y
          rendre. Facile, rapide, efficace.
        </p>

        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className={styles.logoAntoineLeft}
        />
      </section>

      <section className={styles.section}>
        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className={styles.logoAntoineRight}
        />
        <p className={styles.BubbleRight}>
          Envie d'apprendre des tricks ? Cette page est ton carnet
          d'entraînement. Commence facile, monte en level, et valide chaque
          trick pour gagner de l'XP. Let's go progresser !
        </p>

        <Link to="/tricksdex" className={styles.skateButtonLeft}>
          TricksDex
        </Link>
      </section>

      <section className={`${styles.blue} ${styles.section}`}>
        <Link to="/profil" className={styles.skateButtonRight}>
          Profil
        </Link>
        <p className={styles.BubbleLeft}>
          Ici, c'est ton coin perso. Choisis ton avatar, change de skin,
          connecte-toi avec Google et surveille ton niveau. C'est toi le boss de
          ton évolution.
        </p>

        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className={styles.logoAntoineLeft}
        />
      </section>

      <section className={styles.section}>
        <img
          src="./public/image-removebg-preview.png"
          alt="Logo Antoine Faucon"
          className={styles.logoAntoineRight}
        />
        <p className={styles.BubbleRight}>
          Si vous souhaitez nous contacter ou aller voir nos autres projets, je
          vous invite à vous rendre sur notre page contact.
        </p>
        <Link to="/contact" className={styles.skateButtonLeft}>
          Contact
        </Link>
      </section>
    </div>
  );
};
