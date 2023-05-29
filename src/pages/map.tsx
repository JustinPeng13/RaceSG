// We need this in a separate component to disable server-side rendering
"use client";

import React from "react";
import Map from "../components/map";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import Link from "next/link";

const DEFAULT_CENTER = [1.3521, 103.8198]; // Coordinates of SG

const MapPage = () => {
  const db = getDatabase(app);

  const [locations, setLocations] = useState({});
  useEffect(() => {
    get(ref(db, "locations"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLocations(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <Map width="800" height="400" center={DEFAULT_CENTER} zoom={11}>
      {({
        TileLayer,
        Marker,
        Popup,
        Tooltip,
      }: {
        TileLayer: any;
        Marker: any;
        Popup: any;
        Tooltip: any;
      }) => (
        <>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {Object.entries(locations).map(([id, val]) => {
            const loc = val as ILocation;
            return (
              <Marker
                position={[parseFloat(loc.latitude), parseFloat(loc.longitude)]}
              >
                <Tooltip>{loc.name}</Tooltip>
                <Popup>
                  {loc.desc}
                  <Link
                    href={`/locations/${id}`}
                    className="px-2 pt-1 font-semibold"
                  >
                    More...
                  </Link>
                </Popup>
              </Marker>
            );
          })}
        </>
      )}
    </Map>
  );
};
export default MapPage;
