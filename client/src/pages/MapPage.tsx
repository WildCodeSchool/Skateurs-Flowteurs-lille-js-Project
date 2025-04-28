import MapContainer from "../components/MapContainer";
import SearchBar from "../components/SearchBar";
import styles from "./Map.module.css";

const MapPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>SkateMap</h1>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <div className={styles.mapContainer}>
        <MapContainer />
      </div>
    </div>
  );
};

export default MapPage;
