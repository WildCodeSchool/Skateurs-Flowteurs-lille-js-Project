import { useRef, useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapContainer, { MapContainerRef } from "../components/MapContainer";
import SearchBar from "../components/SearchBar";
import styles from "./Map.module.css";

const MapPage = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef<MapContainerRef>(null);

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showCircle, setShowCircle] = useState(false);

  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    const location = place?.geometry?.location;
    if (location) {
      const lat = location.lat();
      const lng = location.lng();

      if (mapRef.current) {
        mapRef.current.panTo(lat, lng);
      }

      setMarkerPosition({ lat, lng });
      setShowCircle(true);
    }
  };

  return (
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      <h1 className={styles.title}>SkateMap</h1>
      <section className={styles.boxComponents}>
        <SearchBar onPlaceSelect={handlePlaceSelect} />
        <MapContainer
          ref={mapRef}
          markerPosition={markerPosition ?? undefined}
          showCircle={showCircle}
        />
      </section>
    </APIProvider>
  );
};

export default MapPage;
