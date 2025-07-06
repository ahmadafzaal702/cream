import React from "react";
import { Marker } from "react-map-gl";
import type { vehicleMarkerPropsI } from "../../types/vehicle";
import navigationIcon from "../../assets/navigation-final.svg";

const VehicleMarker = React.memo(({ vehicle, onClick }: vehicleMarkerPropsI) => {
  const angle = vehicle?.angle ?? 0;
  const status = vehicle?.status ?? "idle";

  return (
    <Marker
      longitude={vehicle.lng}
      latitude={vehicle.lat}
      anchor="center"
      onClick={onClick}
    >
      <button
        aria-label={`Vehicle at ${vehicle.lat}, ${vehicle.lng}`}
        style={{ background: "none", border: "none", padding: 0 }}
      >
        <div style={{ transform: `rotate(${angle}deg)`, transition: "transform 0.5s ease" }}>
          <img
            src={navigationIcon}
            alt="Vehicle location"
            style={{
              width: "36px",
              height: "36px",
              cursor: "pointer",
              filter: status === "stopped" ? "grayscale(80%)" : "none",
            }}
          />
        </div>
      </button>
    </Marker>
  );
});

export default VehicleMarker;