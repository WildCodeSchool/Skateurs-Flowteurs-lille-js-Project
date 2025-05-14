import { Link } from "react-router";
import styles from "./tapbar.module.css";

export const Tapbar = () => {
  return (
    <nav className={styles.tapbar}>
      <Link to="/Carte" className={styles.buttonNav}>
        <img src="./public/mapIcon.png" />
      </Link>
      <Link to="/tricksdex" className={styles.buttonNav}>
        <img src="./public/tricksIcon.png" />
      </Link>
      <Link to="/profil" className={styles.buttonNav}>
        <img src="./public/profileIcon.png" />
      </Link>
      <Link to="/contact" className={styles.buttonNav}>
        <img src="./public/contactIcon.png" />
      </Link>
    </nav>
  );
};
