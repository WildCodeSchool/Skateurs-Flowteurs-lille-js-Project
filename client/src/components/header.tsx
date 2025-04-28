import { useState } from "react";
import { Link } from "react-router";
import styles from "./header.module.css";

export const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <nav className={styles.HeaderNav}>
        <button className={styles.burger}>
          <img src="./public/BButton.svg" onClick={handleClick} />
        </button>
        <img src="./public/logo.png" alt="cow on a skateboard" />
        <h1>InterPark</h1>
      </nav>
      <div className={isVisible ? styles.burgerBarOn : styles.burgerBarOff}>
        <button className={styles.cross}>
          <img src="./public/cross.svg" onClick={handleClick} />
        </button>
        <Link to="/" className="links">
          Home
        </Link>
        <Link to="/carte" className="links">
          SkateMap
        </Link>
        <Link to="/tricksdex" className="links">
          TricksDex
        </Link>
        <Link to="/profil" className="links">
          Profil
        </Link>
        <Link to="/Contact" className="links">
          Contact
        </Link>
      </div>
    </>
  );
};
