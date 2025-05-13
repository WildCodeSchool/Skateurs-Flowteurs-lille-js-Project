import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import styles from "./MapContainer.module.css";

export interface MapContainerRef {
  panTo: (lat: number, lng: number) => void;
}

interface MapContainerProps {
  markerPosition?: { lat: number; lng: number };
  showCircle?: boolean;
}

const MapContainer = forwardRef<MapContainerRef, MapContainerProps>(
  ({ markerPosition, showCircle }, ref) => {
    const map = useMap();
    const circleRef = useRef<google.maps.Circle | null>(null);

    useImperativeHandle(ref, () => ({
      panTo: (lat, lng) => {
        if (map) {
          map.panTo({ lat, lng });
          map.setZoom(12);
        }
      },
    }));

    useEffect(() => {
      if (!map || !markerPosition) return;

      if (showCircle) {
        if (!circleRef.current) {
          circleRef.current = new google.maps.Circle({
            map,
            center: markerPosition,
            radius: 5000,
            fillColor: "#FF0000",
            fillOpacity: 0.2,
            strokeColor: "#FF0000",
            strokeOpacity: 0.7,
            strokeWeight: 2,
          });
        } else {
          circleRef.current.setCenter(markerPosition);
          circleRef.current.setRadius(1000);
        }
      } else {
        if (circleRef.current) {
          circleRef.current.setMap(null);
          circleRef.current = null;
        }
      }
      return () => {
        if (circleRef.current) {
          circleRef.current.setMap(null);
        }
      };
    }, [map, markerPosition, showCircle]);

    return (
      <div className={styles.mapcontainer}>
        <Map
          mapId={import.meta.env.VITE_REACT_APP_MAP_ID}
          className={styles.map}
          defaultCenter={{ lat: 50.62925, lng: 3.057256 }}
          defaultZoom={8}
          gestureHandling="greedy"
          disableDefaultUI={true}
        >
          {markerPosition && <AdvancedMarker position={markerPosition} />}
        </Map>
      </div>
    );
  }
);

export default MapContainer;
