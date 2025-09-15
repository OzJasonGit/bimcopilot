"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapboxLocation({ lat, lng }) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 15,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    return () => map.remove();
  }, [lat, lng]);


  
  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
    />
  );
}