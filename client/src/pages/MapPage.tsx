import { useRef } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapContainer, { MapContainerRef } from "../components/MapContainer";
import SearchBar from "../components/SearchBar";
import styles from "./Map.module.css";

const MapPage = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef<MapContainerRef>(null);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    const location = place?.geometry?.location;
    if (location && mapRef.current) {
      mapRef.current.panTo(location.lat(), location.lng());
    }
  };

  return (
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      <div className={styles.header}>
        <h1 className={styles.title}>SkateMap</h1>
        <SearchBar onPlaceSelect={handlePlaceSelect} />
      </div>

      <div className={styles.map}>
        <MapContainer ref={mapRef} />
      </div>
    </APIProvider>
  );
};

export default MapPage;
