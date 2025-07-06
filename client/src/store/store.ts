import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from './features/vehicleSlice';
import { socketMiddleware } from './services/socketVehicleService';

export const store = configureStore({
  reducer: {
    vehicle: vehicleReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;