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
        <Link to="/" className="links" onClick={handleClick}>
          Home
        </Link>
        <Link to="/carte" className="links" onClick={handleClick}>
          SkateMap
        </Link>
        <Link to="/tricksdex" className="links" onClick={handleClick}>
          TricksDex
        </Link>
        <Link to="/profil" className="links" onClick={handleClick}>
          Profil
        </Link>
        <Link to="/contact" className="links" onClick={handleClick}>
          Contact
        </Link>
      </div>
    </>
  );
};
