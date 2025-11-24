import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import './fixLeafletIcons';

const LocationPicker = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [initialPosition, setInitialPosition] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ondo State bounding box
  const southBound = 5.0200;
  const northBound = 7.9000;
  const westBound = 4.9600;
  const eastBound = 6.2000;

  // Fetch initial location from backend
  const fetchLocation = async (url = `${import.meta.env.VITE_BASE_URL}terminal/locations/`) => {
    try {
      const response = await fetch(url, {
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      // console.log('res-location', data);

      // Handle array or object response
      let lat, lng;
      if (Array.isArray(data) && data.length > 0) {
        lat = parseFloat(data[0].latitude);
        lng = parseFloat(data[0].longitude);
      } else if (data.latitude !== undefined && data.longitude !== undefined) {
        lat = parseFloat(data.latitude);
        lng = parseFloat(data.longitude);
      }

      if (!isNaN(lat) && !isNaN(lng)) {
        setInitialPosition([lat, lng]);
        setMarkerPosition([lat, lng]); // optional: show marker initially
      } else {
        // Fallback to center of Ondo State if backend invalid
        setInitialPosition([(northBound + southBound)/2, (eastBound + westBound)/2]);
      }
    } catch (err) {
      console.error("Error loading location", err);
      // Fallback to center of Ondo State
      setInitialPosition([(northBound + southBound)/2, (eastBound + westBound)/2]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        // Optional: restrict click inside bounding box
        const clampedLat = Math.min(Math.max(lat, southBound), northBound);
        const clampedLng = Math.min(Math.max(lng, westBound), eastBound);

        setMarkerPosition([clampedLat, clampedLng]);
        onLocationSelect({ latitude: clampedLat, longitude: clampedLng });
      },
    });

    return markerPosition ? <Marker position={markerPosition} /> : null;
  };

  if (loading) return <div>Loading map...</div>;
  if (!initialPosition) return <div>Could not load initial location</div>;

  return (
    <MapContainer
      center={initialPosition}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
      maxBounds={[
        [southBound, westBound], // southwest
        [northBound, eastBound], // northeast
      ]}
      maxBoundsViscosity={1.0} // fully lock map inside bounds
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker />
    </MapContainer>
  );
};

export default LocationPicker;
