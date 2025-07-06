# Vehicle Tracking System - Frontend

A real-time vehicle tracking application built with React, Vite, and Mapbox GL.

## Setup Instructions

Follow these steps to set up and run the frontend application locally.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd client/

2. Install Dependencies
Ensure you are in the client/ directory, then install the necessary packages:

npm install

# Install Mapbox specific packages with these versions
npm install react-map-gl@7.0.17 mapbox-gl@2.15.0 @types/mapbox-gl@2.7.10

3. Configure Environment Variables
Create a .env file in the root of the client/ directory:

# WebSocket Configuration
VITE_SOCKET_SERVER_URL=http://localhost:3000

# Mapbox Configuration
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here

Environment Variables Explanation:
VITE_SOCKET_SERVER_URL: The URL where your NestJS backend WebSocket server is running
VITE_MAPBOX_ACCESS_TOKEN: Your Mapbox access token (get one at mapbox.com)

4. Run the Development Server
Start the frontend development server using Vite:

npm run dev

vite v4.x.x dev server running at:

  > Local:    http://localhost:5173/
  > Network:  use --host to expose

ready in x.xxx ms.

Open your browser and navigate to http://localhost:5173/ to view the application.