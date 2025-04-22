import styles from "./TricksContainer.module.css";
import { tricksList } from "./TricksList";

export const TricksContainer = () => {
  return (
    <section className={styles.container}>
      <nav className={styles.tricksNav}>
        <button className={styles.btn} type="button">
          Noob
        </button>
        <button className={styles.btn} type="button">
          Mid
        </button>
        <button className={styles.btn} type="button">
          Hard
        </button>
      </nav>
      <ul className={styles.ul}>
        {tricksList.map((trick) => (
          <li key={trick.id} className={styles.trickCard}>
            <iframe
              width="260"
              height="150"
              src={trick.video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              allowFullScreen
            ></iframe>
            <h2>{trick.name}</h2>
            <p>Niveau : {trick.level}</p>
            <p>Gain d'xp : {trick.xp}</p>
            <button type="button">Valider</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
