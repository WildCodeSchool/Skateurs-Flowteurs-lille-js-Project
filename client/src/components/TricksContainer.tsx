import { useState } from "react";
import { tricksList } from "../data/TricksList";
import styles from "./TricksContainer.module.css";

interface Trick {
  id: number;
  name: string;
  video: string;
  level: string;
  xp: number;
  isValidated: boolean;
}

export const TricksContainer = () => {
  const [filter, setFilter] = useState<"Noob" | "Mid" | "Hard" | "all">("all");
  const [tricks, setTricks] = useState<Trick[]>(tricksList);

  const handleFilter = (newFilter: typeof filter) => setFilter(newFilter);
  const filteredTricksList =
    filter === "all"
      ? tricks
      : tricks.filter((trick) => trick.level === filter);

  const handleValidation = (id: number) => {
    setTricks((initialTricks) =>
      initialTricks.map((trick) =>
        trick.id === id ? { ...trick, isValidated: !trick.isValidated } : trick
      )
    );
  };

  return (
    <section className={styles.container}>
      <nav className={styles.tricksNav}>
        <button
          className={filter === "Noob" ? styles.btnActive : styles.btn}
          type="button"
          onClick={() => {
            handleFilter("Noob");
          }}
        >
          Noob
        </button>
        <button
          className={filter === "Mid" ? styles.btnActive : styles.btn}
          type="button"
          onClick={() => {
            handleFilter("Mid");
          }}
        >
          Mid
        </button>
        <button
          className={filter === "Hard" ? styles.btnActive : styles.btn}
          type="button"
          onClick={() => {
            handleFilter("Hard");
          }}
        >
          Hard
        </button>
      </nav>
      <ul className={styles.ul}>
        {filteredTricksList.map(
          ({ name, id, video, xp, level, isValidated }: Trick) => (
            <li key={id} className={styles.trickCard}>
              <iframe
                width="260"
                height="150"
                src={video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                loading="lazy"
                allowFullScreen
              ></iframe>
              <h2>{name}</h2>
              <p>Niveau : {level}</p>
              <p>Gain d'xp : {xp}</p>
              <button
                type="button"
                onClick={() => {
                  handleValidation(id);
                }}
                className={isValidated ? styles.validated : styles.button}
              >
                {isValidated ? "Trick validé ✅" : "Valider"}
              </button>
            </li>
          )
        )}
      </ul>
    </section>
  );
};
