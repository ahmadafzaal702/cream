# Frontend Developer Assessment
# Frontend Setup Steps

## Table of Contents

- [Setup Instructions](#setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Run the Development Server](#4-run-the-development-server)
- [WebSocket Details](#websocket-details)
  - [WebSocket URL](#websocket-url)
  - [Message Topics](#message-topics)
    - [Subscribe to Vehicle](#subscribe-to-vehicle)
    - [Unsubscribe from Vehicle](#unsubscribe-from-vehicle)
    - [Vehicle Data](#vehicle-data)

## Setup Instructions

Follow these steps to set up and run the frontend application locally.

### 1. Clone the Repository
```bash
git clone (https://github.com/ahmadafzaal702/cream)
cd client/
```

### 2. Install Dependencies

Ensure you are in the `client/` directory, then install the necessary packages:

```bash
npm install
```

### 2.1 Install Mapbox specific packages with these versions
npm install react-map-gl@7.0.17 mapbox-gl@2.15.0 @types/mapbox-gl@2.7.10

### 3. Configure Environment Variables

Create a `.env` file in the root of the `client/` directory to specify the WebSocket server URL.

```env
# .env

VITE_SOCKET_SERVER_URL=http://localhost:3000
VITE_MAPBOX_ACCESS_TOKEN: Your Mapbox access token (get one at mapbox.com)

```

- **VITE_SOCKET_SERVER_URL**: The URL where your NestJS backend WebSocket server is running.

### 4. Run the Development Server

Start the frontend development server using Vite:

```bash
npm run dev
```

**Expected Output:**

```arduino
vite v4.x.x dev server running at:

  > Local:    http://localhost:5173/
  > Network:  use --host to expose

ready in x.xxx ms.
```

Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/) to view the application.

01: Real Time Vehicle Map and Position with tracking path.
<img width="960" alt="03" src="https://github.com/user-attachments/assets/4b693b41-6f10-448b-a744-30c246d00767" />

02: Vehicle Popup to show the important information:  Plate number,  Current status, Average speed, Trip mileage
<img width="960" alt="04" src="https://github.com/user-attachments/assets/18355aa4-8e10-4662-acb8-f47295029259" />

03: Missing token or missing vehicle handling
<img width="959" alt="02" src="https://github.com/user-attachments/assets/b569be63-832a-4527-a36a-3946d57cc8dc" />
<img width="957" alt="01" src="https://github.com/user-attachments/assets/f97aa3d5-41a1-4a0d-b5d4-a78271d12fc4" />





## WebSocket Details

### WebSocket URL

- **Backend Server**: `http://localhost:3000`

### Message Topics / Types

Communication between the frontend and backend utilizes specific WebSocket event names. Below are the primary events used in this application:

#### Subscribe to Vehicle

- **Event Name**: `subscribeToVehicle`
- **Purpose**: Allows the client to subscribe to updates for a specific vehicle.
- **Payload**:

  ```json
  {
    "plate": "DXB-CX-36357"
  }
  ```

- **Description**: The frontend emits this event with the vehicle's plate number to start receiving real-time data for that vehicle.

#### Unsubscribe from Vehicle

- **Event Name**: `unsubscribeFromVehicle`
- **Purpose**: Allows the client to unsubscribe from updates for a specific vehicle.
- **Payload**:

  ```json
  {
    "plate": "DXB-CX-36357"
  }
  ```

- **Description**: The frontend emits this event with the vehicle's plate number to stop receiving real-time data for that vehicle.

#### Vehicle Data

- **Event Name**: `vehicleData`
- **Purpose**: Sends real-time data updates about a vehicle to subscribed clients.
- **Payload**:

  ```json
  {
    "plate": "DXB-CX-36357",
    "data": {
      "lat": 25.13932,
      "lng": 55.12843,
      "angle": 0,
      "speed": 0,
      "status": "stopped",
      "timestamp": "2024-11-11T07:45:59Z"
    }
  }
  ```

- **Description**: The backend emits this event every second with the latest data point for the subscribed vehicle.

---

## Additional Information

- **Prerequisites**:

  - [Node.js](https://nodejs.org/) installed on your machine.
  - Access to the NestJS backend WebSocket server.

- **Scripts**:

  - `npm run dev`: Starts the development server.
  - `npm run build`: Builds the application for production.
  - `npm run preview`: Serves the built application.

- **Dependencies**:
  - Vite: Fast frontend build tool.
  - Other dependencies as specified in `package.json`.

For any issues or contributions, please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file or open an issue in the repository.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this `README.md` further to fit the specific details and requirements of your project. If you encounter any issues or have additional questions, please refer to the [Troubleshooting](#troubleshooting) section or reach out for further assistance.
