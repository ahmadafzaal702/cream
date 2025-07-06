import React from "react";
import { Popup } from "react-map-gl";
import { type VehiclePopupPropsI } from "../../types/vehicle";
import { formatTimestamp } from "../../utils/calculations";

const VehiclePopup = React.memo(
  ({ plate, vehicleData, vehicleStats, onClose }: VehiclePopupPropsI) => {
    return (
      <Popup
        longitude={vehicleData.lng}
        latitude={vehicleData.lat}
        anchor="top"
        onClose={onClose}
        closeOnClick={false}
      >
        <div className="vehicle-popup-information">
          <div>
            <strong>Plate:</strong> {plate}
          </div>
          <div>
            <strong>Status:</strong> {vehicleData.status}
          </div>
          <div>
            <strong>Speed:</strong> {vehicleStats.averageSpeed.toFixed(1)} km/h
          </div>
          <div>
            <strong>Distance:</strong> {vehicleStats.totalDistance.toFixed(2)}{" "}
            km
          </div>
          <div>
            <strong>Last Update:</strong>
            {formatTimestamp(vehicleData.timestamp)}
          </div>
        </div>
      </Popup>
    );
  }
);

export default VehiclePopup;
