import { useUser } from "../context/UserInfoContext";
import { TrickModel } from "../model/TrickModel";
import styles from "./TrickCard.module.css";

interface TrickCardProps {
  trick: TrickModel;
  onValidate: (id: number) => void;
  setShowLoginAlert: (value: boolean) => void;
}

export const TrickCard = ({
  trick,
  onValidate,
  setShowLoginAlert,
}: TrickCardProps) => {
  const { user } = useUser();
  return (
    <li key={trick.id} className={styles.trickCard}>
      <iframe
        width="260"
        height="150"
        src={trick.video}
        frameBorder={0}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        allowFullScreen
      ></iframe>
      <h2>{trick.name}</h2>
      <p>Niveau : {trick.level}</p>
      <p>Gain d'xp : {trick.xp}</p>
      <button
        type="button"
        onClick={() => {
          if (!user.isConnected) {
            setShowLoginAlert(true);
          } else {
            onValidate(trick.id);
          }
        }}
        className={trick.isValidated ? styles.validated : styles.button}
      >
        {trick.isValidated ? "Trick validé ✅" : "Valider"}
      </button>
    </li>
  );
};
