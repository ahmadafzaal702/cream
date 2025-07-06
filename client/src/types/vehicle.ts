// Vehicle State Interface
export interface VehicleDataI {
  lat: number;
  lng: number;
  angle: number;
  speed: number;
  status: "stopped" | "idle" | "moving";
  timestamp: string;
}

export interface VehicleStatsI {
  averageSpeed: number;
  totalDistance: number;
}

export interface vehicleStatsPayloadI {
  distance: number;
  speed: number;
};

export interface VehicleStateI {
  vehiclePlate: string;
  vehicleData: VehicleDataI | null;
  vehicleStats: VehicleStatsI;
}

// Vehicle socket response Interface
export interface VehicleResponseI {
  plate: string;
  data: VehicleDataI;
}

export interface vehicleLastPositionI { lat: number; lng: number };

export interface mapViewStateI {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface VehiclePopupPropsI {
  plate?: string;
  vehicleData: VehicleDataI;
  vehicleStats: VehicleStatsI;
  onClose: () => void;
}

export interface vehicleMarkerPropsI {
  vehicle: VehicleDataI;
  onClick: () => void;
}
