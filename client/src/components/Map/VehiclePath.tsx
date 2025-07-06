import { Source, Layer } from "react-map-gl";
import React, { useMemo } from "react";

const VehiclePath = React.memo(({ path }: { path: [number, number][] }) => {
  const geojsonData = useMemo(() => ({
    type: "Feature" as const,
    properties: {},
    geometry: {
      type: "LineString" as const,
      coordinates: path,
    },
  }), [path]);

  return (
    <Source id="vehicle-path" type="geojson" data={geojsonData}>
      <Layer
        id="vehicle-path-layer"
        type="line"
        paint={{
          "line-color": "#0074D9", 
          "line-width": 5,
        }}
      />
    </Source>
  );
});

export default VehiclePath