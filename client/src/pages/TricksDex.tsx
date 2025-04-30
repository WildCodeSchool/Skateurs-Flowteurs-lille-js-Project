import { TricksContainer } from "../components/TricksContainer";
import { useUser } from "../context/UserInfoContext";
import styles from "./TricksDex.module.css";

export const TricksDex = () => {
  const { user } = useUser();
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
        <section className={styles.xpSection}>
          <div className={styles.tricksAndXp}>
            <p>XP : {user?.xp ?? 0}</p>
            <p>
              Tricks : {user?.validatedTricks ? user.validatedTricks.length : 0}
              /30
            </p>
          </div>
          <div className={styles.xpBar}>
            <div className={styles.progression}></div>
          </div>
        </section>
      </section>
      <TricksContainer />
    </main>
  );
};
