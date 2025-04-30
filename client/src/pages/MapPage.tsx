import { APIProvider } from "@vis.gl/react-google-maps";
import MapContainer from "../components/MapContainer";
import styles from "./Map.module.css";

const MapPage = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <APIProvider apiKey={apiKey}>
      <div className={styles.map}>
        <h1 className={styles.title}>SkateMap</h1>
        <MapContainer />
      </div>
    </APIProvider>
  );
};

export default MapPage;
