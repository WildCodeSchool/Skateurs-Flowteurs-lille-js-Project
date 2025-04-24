import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapContainer = () => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <APIProvider apiKey={apiKey}>
            <div style={{ width: '100%', height: '100vh' }}>
                <Map
                    style={{ width: '100vw', height: '100vh' }}
                    defaultCenter={{ lat: 48.8566, lng: 2.3522 }}
                    defaultZoom={3}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
            </div>
        </APIProvider>
    );
};

export default MapContainer;
