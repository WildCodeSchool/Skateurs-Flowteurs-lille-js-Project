import styles from "./TricksContainer.module.css";

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
    </section>
  );
};
