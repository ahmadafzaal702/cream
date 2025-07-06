import { format } from "date-fns";

// calculate distance between two points
export function calculateDistance(startLat: number, startLong: number, endLat: number, endLong: number) {
  const EARTH_RADIUS = 6371; // Earth radius in km
  const latDifference = (endLat - startLat) * Math.PI / 180;
  const longDifference = (endLong - startLong) * Math.PI / 180;
  const haversineIntermediary = 
    Math.sin(latDifference/2) * Math.sin(latDifference/2) +
    Math.cos(startLat * Math.PI / 180) * Math.cos(endLat * Math.PI / 180) * 
    Math.sin(longDifference/2) * Math.sin(longDifference/2);
  return EARTH_RADIUS * 2 * Math.atan2(Math.sqrt(haversineIntermediary ), Math.sqrt(1-haversineIntermediary ));
}

// format time
export const formatTimestamp = (timestamp: string | number | Date) => {
  try {
    return format(new Date(timestamp), "HH:mm:ss");
  } catch {
    return "N/A";
  }
};