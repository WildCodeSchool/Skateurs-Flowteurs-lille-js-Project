import MapContainer from "../components/MapContainer";
import styles from "./Map.module.css";

const MapPage = () => {
  return (
    <main className={styles.map}>
      <h1 className={styles.title}>SkateMap</h1>
      <MapContainer />
    </main>
  );
};

export default MapPage;
