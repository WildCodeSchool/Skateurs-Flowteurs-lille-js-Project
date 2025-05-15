import { useUser } from "../context/UserInfoContext";
import styles from "./ProgressBar.module.css";

export const ProgressBar = () => {
  const { user } = useUser();
  const xpPercent = user?.xp ? (user?.xp / 8165) * 100 : 0;

  return (
    <section className={styles.xpSection}>
      <div className={styles.tricksAndXp}>
        <p>XP : {user?.xp ?? 0}</p>
        <p>
          Tricks : {user?.tricks ? user.tricks.length : 0}
          /30
        </p>
      </div>
      <div className={styles.xpBar}>
        <div
          className={styles.progression}
          style={{ "--xp-width": `${xpPercent}%` } as React.CSSProperties}
        ></div>
      </div>
    </section>
  );
};
