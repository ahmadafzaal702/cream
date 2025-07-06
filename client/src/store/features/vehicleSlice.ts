import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type VehicleStateI , type vehicleStatsPayloadI} from "../../types/vehicle";

const initialState: VehicleStateI = {
  vehiclePlate: "DXB-CX-36357",
  vehicleData: null,
  vehicleStats: {
    averageSpeed: 0,
    totalDistance: 0,
  },
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    updateVehicleData: (
      state,
      action: PayloadAction<VehicleStateI["vehicleData"]>
    ) => {
      state.vehicleData = action.payload;
    },
    updateVehicleStats: (state, action: PayloadAction<vehicleStatsPayloadI>) => {
      const kmhSpeed = action.payload.speed * 3.6;
      state.vehicleStats = {
        averageSpeed:
          state.vehicleStats.averageSpeed > 0
            ? (state.vehicleStats.averageSpeed + kmhSpeed) / 2
            : kmhSpeed,
        totalDistance:
          state.vehicleStats.totalDistance + action.payload.distance,
      };
    },
    resetVehicle: () => initialState,
  },
});

export const { updateVehicleData, updateVehicleStats, resetVehicle } =
  vehicleSlice.actions;
export default vehicleSlice.reducer;
