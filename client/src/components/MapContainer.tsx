import { Map } from "@vis.gl/react-google-maps";
import styles from "./MapContainer.module.css";

const MapContainer = () => {
  return (
    <div className={styles.mapcontainer}>
      <Map
        className={styles.map}
        defaultCenter={{ lat: 50.62925, lng: 3.057256 }}
        defaultZoom={10}
        gestureHandling="greedy"
        disableDefaultUI={true}
      />
    </div>
  );
};

export default MapContainer;
