// ryuk test 2
import React, { useState, useCallback } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import GeocoderControl from "./geocoder-control.tsx";
import mapboxgl from "mapbox-gl";
import { Input } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import "./AddLocation.css";

const TOKEN =
  "pk.eyJ1Ijoia2hha2hvIiwiYSI6ImNsbTl2NnRpcjBuemkzZG81c3Zkb3JzdzUifQ.CVQYBnN4nFHGddk796facg";

const default_coordinates = {
  latitude: 36.803378238347186,
  longitude: 10.181438776089529,
};

const initialViewState = {
  ...default_coordinates,
  zoom: 10,
};

mapboxgl.accessToken = TOKEN;

function AddLocation({
  onNext,
  onPrevious,
  coordinates,
  setCoordinates,
  setCity,
  setAddress,
  city,
  address,
}) {
  const [marker, setMarker] = useState({
    ...default_coordinates,
  });
  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback(async (event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    const clickedCoordinates = {
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    };

    setCoordinates(clickedCoordinates);
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
  }, []);

  const handleMapClick = async (event) => {
    const clickedCoordinates = {
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    };

    setMarker(clickedCoordinates);
    setCoordinates(clickedCoordinates);
  };

  const handlechange = async (event) => {
    const clickedCoordinates = {
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    };
    setCoordinates(clickedCoordinates);
    setMarker(marker);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "city") {
      setCity(value);
    } else if (name === "address") {
      setAddress(value);
    }
  };

  return (
    <div>
      <div className="input-group">
        <Input
          type="text"
          name="city"
          placeholder="Enter City"
          value={city}
          onChange={handleInputChange}
        />
      </div>

      <div className="input-group">
        <Input
          type="text"
          name="address"
          placeholder="Enter Address"
          value={address}
          onChange={handleInputChange}
        />
      </div>

      <Map
        mapboxAccessToken={TOKEN}
        initialViewState={initialViewState}
        onViewportChange={handlechange}
        style={{ width: 1400, height: 600 }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        onClick={handleMapClick}
      >
        <GeocoderControl
          mapboxAccessToken={TOKEN}
          position="top-left"
          setMarker={setMarker}
          setCoordinates={setCoordinates}
        />
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="center"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        ></Marker>

        <NavigationControl />
      </Map>
      <br></br>
    </div>
  );
}

export default AddLocation;
