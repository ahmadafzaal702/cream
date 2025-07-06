import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Map, { NavigationControl } from "react-map-gl";
import { MAPBOX_TOKEN } from "../../utils/constants";
import "mapbox-gl/dist/mapbox-gl.css";

import { type RootState } from "../../store/store";
import useVehicleSocket from "../../hooks/useVehicleSocket";
import VehicleMarker from "./VehicleMarker";
import VehiclePopup from "./VehiclePopup";
import VehiclePath from "./VehiclePath";
import "./map.scss";

import { type mapViewStateI } from "../../types/vehicle";

const VehicleMap = () => {
  // --- Global States: retrieve vehicle information and call vehicle socket ---
  const { vehiclePlate, vehicleData: vehicle, vehicleStats } = useSelector((state: RootState) => ({
      vehiclePlate: state.vehicle.vehiclePlate,
      vehicleData: state.vehicle.vehicleData,
      vehicleStats: state.vehicle.vehicleStats,
    })
  );
  useVehicleSocket(vehiclePlate);

  // --- Local States ---
  const [mapViewState, setMapViewState] = useState<mapViewStateI>({
    longitude: 55.34423,
    latitude: 25.20337,
    zoom: 14,
  });
  const [showMapPopup, setShowMapPopup] = useState(false);
  const [mapPath, setMapPath] = useState<[number, number][]>([]);

  // --- Side Effects ---
  useEffect(() => {
    if (vehicle) {
      setMapViewState((prev) => ({
        ...prev,
        longitude: vehicle.lng,
        latitude: vehicle.lat,
      }));
      setMapPath((prev) => {
        if (
          prev.length === 0 ||
          prev[prev.length - 1][0] !== vehicle.lng ||
          prev[prev.length - 1][1] !== vehicle.lat
        ) {
          return [...prev, [vehicle.lng, vehicle.lat]];
        }
        return prev;
      });
    }
  }, [vehicle?.lng, vehicle?.lat]);

  // --- Return in case of missing token or missing vehicle ---
  if (!MAPBOX_TOKEN) {
    return <div className="error-message">Missing Mapbox access token.</div>;
  }

  if (!vehicle || !vehicleStats) {
    return <div className="info-message">Waiting for vehicle data...</div>;
  }

  // --- Render Vehicle Map ---
  return (
    <section>
      <Map
        {...mapViewState}
        onMove={(evt) => setMapViewState(evt.viewState)}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        minZoom={5}
        maxZoom={20}
        interactive={true}
      >
        {/* Navigation controls */}
        <NavigationControl
          position="bottom-right"
          showCompass={true}
          showZoom={true}
        />

        {/* Vehicle tracking path */}
        {mapPath.length > 1 && <VehiclePath path={mapPath} />}

        {/* Vehicle marker & popup */}
        <VehicleMarker vehicle={vehicle} onClick={() => setShowMapPopup(true)} />

        {showMapPopup && (
          <VehiclePopup
            plate={vehiclePlate}
            vehicleData={vehicle}
            vehicleStats={vehicleStats}
            onClose={() => setShowMapPopup(false)}
          />
        )}
      </Map>
    </section>
  );
};

export default VehicleMap;
