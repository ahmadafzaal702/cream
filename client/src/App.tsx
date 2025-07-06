import "./App.scss";
import VehicleMap from "./components/Map/VehicleMap";

// --- Render App ---
function App() {
  return (
    <>
      <main id="main">
        <div className="vehicle-map-container">
          <VehicleMap />
        </div>
      </main>
    </>
  );
}

export default App;
