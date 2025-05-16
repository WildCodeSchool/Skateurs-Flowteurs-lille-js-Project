import { useImperativeHandle, useEffect, useRef, useState } from "react";
import {
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
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
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

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

    markersRef.current.forEach((m) => (m.map = null));

    const service = new google.maps.places.PlacesService(map);
    const request: google.maps.places.PlaceSearchRequest = {
      location: markerPosition,
      radius: 5000,
      keyword: "skatepark",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const filtered = results.filter((place) => {
          const loc = place.geometry?.location;
          if (!loc) return false;
          const dist = google.maps.geometry.spherical.computeDistanceBetween(
            markerPosition,
            loc
          );
          return dist <= 5000;
        });

        const newMarkers = filtered.map((place) => {
          const marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: place.geometry!.location!,
            title: place.name,
            gmpClickable: true,
          });

          marker.addEventListener("gmp-click", () => {
            setSelectedPlace(place);
            map.panTo(place.geometry!.location!);
          });

          return marker;
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

        {selectedPlace?.geometry?.location && (
          <InfoWindow
            position={selectedPlace.geometry.location}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div style={{ maxWidth: "200px" }}>
              <h3 style={{ margin: "0 0 8px 0" }}>{selectedPlace.name}</h3>
              <img
                src={
                  selectedPlace.photos && selectedPlace.photos.length > 0
                    ? selectedPlace.photos[0].getUrl({ maxWidth: 200 })
                    : "/public/default.jpg"
                }
                alt={selectedPlace.name}
                style={{
                  width: "100%",
                  height: "auto",
                  marginBottom: "8px",
                }}
                onError={(e) => {
                  e.currentTarget.src = "/default.jpg";
                }}
              />
              <button
                style={{ padding: "8px 12px", cursor: "pointer" }}
                onClick={() => {
                  const geo = selectedPlace.geometry;
                  const loc = geo?.location;
                  if (!loc) return;

                  const lat = loc.lat();
                  const lng = loc.lng();
                  const url =
                    `https://www.google.com/maps/dir/?api=1` +
                    `&destination=${lat},${lng}` +
                    `&travelmode=walking`;

                  if (/iPhone|Android|iPad/i.test(navigator.userAgent)) {
                    window.location.href = url;
                  } else {
                    window.open(url, "_blank");
                  }
                }}
              >
                Itinéraire 🛹
              </button>
            </div>
          </InfoWindow>
        )}
      </Map>
    </div>
  );
}
