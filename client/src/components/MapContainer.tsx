import { APIProvider, Map } from '@vis.gl/react-google-maps';
import styles from './MapContainer.module.css';

const MapContainer = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <APIProvider apiKey={apiKey}>
            <div className={styles.mapcontainer}>
                <Map
                    className={styles.map}
                    defaultCenter={{ lat: 50.62925, lng: 3.057256 }} // Lille
                    defaultZoom={10}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
            </div>
        </APIProvider>
    );
};

export default MapContainer;
