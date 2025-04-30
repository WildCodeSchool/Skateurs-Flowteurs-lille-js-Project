import { forwardRef, useImperativeHandle } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import styles from "./MapContainer.module.css";

export interface MapContainerRef {
  panTo: (lat: number, lng: number) => void;
}

const MapContainer = forwardRef<MapContainerRef>((_, ref) => {
  const map = useMap();

  useImperativeHandle(ref, () => ({
    panTo: (lat, lng) => {
      if (map) {
        map.panTo({ lat, lng });
        map.setZoom(14);
      }
    },
  }));

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
});

export default MapContainer;
