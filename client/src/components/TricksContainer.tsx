import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useUser } from "../context/UserInfoContext";
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
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);

  const { user, setUser } = useUser();

  const handleFilter = (newFilter: typeof filter) => setFilter(newFilter);
  const filteredTricksList =
    filter === "all"
      ? tricks
      : tricks.filter((trick) => trick.level === filter);

  useEffect(() => {
    if (!user) return;

    const updatedTricks = tricksList.map((trick) => ({
      ...trick,
      isValidated: user.validatedTricks.includes(trick.id),
    }));

    setTricks(updatedTricks);
  }, [user]);

  const handleValidation = (id: number) => {
    const trickToValidate = tricks.find((trick) => trick.id === id);
    if (!trickToValidate || !user.isConnected) {
      setShowLoginAlert(true);
      return;
    } else {
      const isAlreadyValidated = trickToValidate.isValidated;

      setTricks((initialTricks) =>
        initialTricks.map((trick) =>
          trick.id === id
            ? { ...trick, isValidated: !trick.isValidated }
            : trick
        )
      );

      if (isAlreadyValidated) {
        setUser({
          ...user,
          xp: (user.xp || 0) - trickToValidate.xp,
          validatedTricks: user.validatedTricks.filter(
            (trickId) => trickId !== id
          ),
        });
      } else {
        setUser({
          ...user,
          xp: (user.xp || 0) + trickToValidate.xp,
          validatedTricks: [...user.validatedTricks, id],
        });
      }
    }
  };

  return (
    <>
      {showLoginAlert && (
        <div className={styles.userWithoutAccount}>
          <h3>🧠 Hey, t’as une mémoire courte ? Nous aussi.</h3>
          <p>
            Crée un compte (ou connecte-toi si t’en as déjà un) pour qu’on
            puisse garder une trace de ta progression et te débloquer toutes les
            fonctionnalités stylées du site.
          </p>
          <p>
            Sinon… bah on oublie tout. À chaque fois. Comme un poisson rouge.
          </p>
          <Link to="/profil">Me connecter / Créer mon compte</Link>
        </div>
      )}
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
                  frameBorder={0}
                  title="YouTube video player"
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
    </>
  );
};
