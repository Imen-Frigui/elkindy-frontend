import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup , useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaSearch } from "react-icons/fa";
import { searchLocation as searchLocationService } from "../../../services/event/eventService";
import markerIconPng from "leaflet/dist/images/marker-icon.png" 
import markerIconShadow from "leaflet/dist/images/marker-shadow.png"
const MapComponent = ({ center, zoom, searchResults, setSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

 
  const handleSearch = async () => {
    try {
      const results = await searchLocationService(searchTerm);
      if (results && results.length > 0) {
        setSearchResults(results);
      } else {
        console.log('No results found');
      }
    } catch (error) {
      console.error("Error during location search:", error);
    }
  };

  const MapUpdater = () => {
    const map = useMap();
    if (searchResults.length > 0) {
      map.flyTo([searchResults[0].lat, searchResults[0].lon], zoom);
    }
    return null;
  };

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIconPng,
    iconUrl: markerIconPng,
    shadowUrl: markerIconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });
  return (
    <>
<div className="flex border-2 border-gray-300 rounded overflow-hidden">
        <input
          type="text"
          placeholder="Search for a location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
 <button
    onClick={handleSearch}
    className="flex items-center justify-center px-4 border-l bg-kindyblue text-white"
  >
    <FaSearch />
  </button>    
    </div>
    <MapContainer center={center} zoom={zoom} style={{ height: '500px', width: '100%' }}>
    <MapUpdater />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
{searchResults.map((result, index) => (
  <Marker key={result.place_id || index} position={[result.lat, result.lon]}>
  <Popup>
            {result.display_name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </>
  );
};

export default MapComponent;
