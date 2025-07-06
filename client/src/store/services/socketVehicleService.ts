import type { Middleware } from "@reduxjs/toolkit";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../../utils/constants";
import { calculateDistance } from "../../utils/calculations";
import {
  updateVehicleData,
  updateVehicleStats,
  resetVehicle,
} from "../features/vehicleSlice";
import {
  type VehicleResponseI,
  type vehicleLastPositionI,
} from "../../types/vehicle";

let socket: Socket | null = null;
let vehicleLastPosition: vehicleLastPositionI | null = null;

export const socketMiddleware: Middleware = (store) => {
  return (next) => (action: any) => {
    // connect socket
    if (action.type === "vehiclesocket/connect" && !socket) {
      const { plateNumber } = action.payload;
      socket = io(SOCKET_URL);

      socket.emit("subscribeToVehicle", { plate: plateNumber });

      socket.on("vehicleData", (res: VehicleResponseI) => {
        if (res?.plate === plateNumber) {
          store.dispatch(updateVehicleData(res.data));

          // Calculate distance and update the stats
          if (vehicleLastPosition) {
            const distance = calculateDistance(
              vehicleLastPosition.lat,
              vehicleLastPosition.lng,
              res.data.lat,
              res.data.lng
            );
            store.dispatch(
              updateVehicleStats({ distance, speed: res.data.speed })
            );
          }

          vehicleLastPosition = { lat: res.data.lat, lng: res.data.lng };
        }
      });
    }

    // disconnect socket
    if (action.type === "vehiclesocket/disconnect" && socket) {
      socket.disconnect();
      socket = null;
      vehicleLastPosition = null;
      store.dispatch(resetVehicle());
    }

    return next(action);
  };
};
