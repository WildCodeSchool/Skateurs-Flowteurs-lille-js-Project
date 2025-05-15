import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useTricks } from "../context/TricksContext";
import { useUser } from "../context/UserInfoContext";
import { TrickCard } from "./TrickCard";
import { TrickModel } from "../model/TrickModel";
import styles from "./TricksContainer.module.css";

export const TricksContainer = () => {
  const [filter, setFilter] = useState<"Noob" | "Mid" | "Hard" | "all">("all");
  const { tricks, setTricks } = useTricks();
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false);
  const { user, setUser } = useUser();
  const handleFilter = (newFilter: typeof filter) => setFilter(newFilter);
  const filteredTricksList =
    filter === "all"
      ? tricks
      : tricks.filter((trick) => trick.level === filter);

  useEffect(() => {
    if (!user) return;

    const updatedTricks = tricks.map((trick) => {
      const userTrick = user.tricks.find(userTrick => userTrick.id === trick.id)
      return {
        ...trick,
        isValidated: userTrick ? userTrick.isValidated : false
      }
    });

    setTricks(updatedTricks);
  }, [user]);

  const handleValidation = (id: number) => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    const updatedTricks = [...tricks]
    tricks.map(trick => {
      if (trick.id === id) {
        trick.isValidated = !trick.isValidated
        if (trick.isValidated) {
          setUser({
            ...user,
            tricks: updatedTricks.filter(trick => trick.isValidated),
            xp: user.xp + trick.xp
          });
        } else {
          setUser({
            ...user,
            tricks: updatedTricks.filter(trick => trick.isValidated),
            xp: user.xp - trick.xp
          });
        }

      }
    })
    setTricks(updatedTricks)

    // const updatedTricks = tricks.map((trick) => {
    //   if (trick.id === id) {
    //     const isAlreadyValidated = trick.isValidated;

    //     const updatedUser = {
    //       ...user,
    //       xp: isAlreadyValidated
    //         ? (user.xp || 0) - trick.xp
    //         : (user.xp || 0) + trick.xp,
    //       validatedTricks: isAlreadyValidated
    //         ? user.validatedTricks.filter((trick) => trick !== id)
    //         : [...user.validatedTricks, id],
    //     };
    //     setUser(updatedUser);

    //     return { ...trick, isValidated: !trick.isValidated };
    //   }
    //   return trick;
    // });

    // setTricks(updatedTricks);
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
          {filteredTricksList.map((trick) => (
            <TrickCard
              key={trick.id}
              trick={trick}
              onValidate={handleValidation}
              setShowLoginAlert={setShowLoginAlert}
            />
          ))}
        </ul>
      </section>
    </>
  );
};
