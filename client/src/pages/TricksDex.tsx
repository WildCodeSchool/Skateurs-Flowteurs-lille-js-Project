import { ProgressBar } from "../components/ProgressBar";
import { TricksContainer } from "../components/TricksContainer";
import styles from "./TricksDex.module.css";

export const TricksDex = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>TricksDex</h1>
      <section className={styles.topSection}>
        <section className={styles.intro}>
          <p>
            Explore les figures, regarde des tutos vidéo pour les apprendre, et
            ajoute-les à ton palmarès en les réussissant. <br /> Chaque trick
            validé te fait gagner de l’XP et fait progresser ton profil. Plus tu
            rides, plus tu montes en niveau. Prêt à tous les débloquer ?
          </p>
        </section>
        <ProgressBar />
      </section>
      <TricksContainer />
    </main>
  );
};
