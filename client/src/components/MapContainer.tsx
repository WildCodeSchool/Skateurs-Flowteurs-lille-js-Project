import { APIProvider, Map } from '@vis.gl/react-google-maps';

const MapContainer = () => {
    const defaultCenter = { lat: 48.8566, lng: 2.3522 }; // Paris
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    return (
        <APIProvider apiKey={apiKey}>
            <div style={{ width: '100%', height: '100vh' }}>
                <Map
                    center={defaultCenter}
                    zoom={13}
                    mapId="DEMO_MAP_ID"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </APIProvider>
    );
};

export default MapContainer;
