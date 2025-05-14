import { useImperativeHandle, useEffect, useRef } from "react";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import styles from "./MapContainer.module.css";

export interface MapContainerRef {
  panTo: (lat: number, lng: number) => void;
}

interface MapContainerProps {
  markerPosition?: { lat: number; lng: number };
  showCircle?: boolean;
  ref?: React.Ref<MapContainerRef>;
}

export default function MapContainer({
  markerPosition,
  showCircle,
  ref,
}: MapContainerProps) {
  const map = useMap();
  const circleRef = useRef<google.maps.Circle | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  useImperativeHandle(
    ref,
    () => ({
      panTo: (lat, lng) => {
        if (map) {
          map.panTo({ lat, lng });
          map.setZoom(11);
        }
      },
    }),
    [map]
  );

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
        circleRef.current.setRadius(5000);
      }
    } else if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }

    markersRef.current.forEach((marker) => {
      marker.map = null;
    });

    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: markerPosition,
      radius: 5000,
      keyword: "skatepark",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const filteredResults = results.filter((place) => {
          const placeLocation = place.geometry?.location;
          if (!placeLocation) return false;

          const distance =
            google.maps.geometry.spherical.computeDistanceBetween(
              markerPosition,
              placeLocation
            );

          return distance <= 5000;
        });

        const newMarkers = filteredResults.map((place) => {
          return new google.maps.marker.AdvancedMarkerElement({
            map,
            position: place.geometry?.location!,
            title: place.name,
          });
        });

        markersRef.current = newMarkers;
      }
    });
  }, [map, markerPosition, showCircle]);

  return (
    <div className={styles.mapcontainer}>
      <Map
        mapId={import.meta.env.VITE_REACT_APP_MAP_ID}
        className={styles.map}
        defaultCenter={{ lat: 50.62925, lng: 3.057256 }}
        defaultZoom={10}
        gestureHandling="greedy"
        disableDefaultUI={true}
      >
        {markerPosition && <AdvancedMarker position={markerPosition} />}
      </Map>
    </div>
  );
}
