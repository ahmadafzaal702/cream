import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function useVehicleSocket(plateNumber: string) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'vehiclesocket/connect', payload: { plateNumber } });

    return () => {
      dispatch({ type: 'vehiclesocket/disconnect' });
    };
  }, [dispatch, plateNumber]);
}