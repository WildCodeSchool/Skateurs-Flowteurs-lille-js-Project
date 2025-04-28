import { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Recherche lancée avec :", query);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Rechercher un spot de skate..."
        value={query}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>
        Rechercher
      </button>
    </div>
  );
};

export default SearchBar;
