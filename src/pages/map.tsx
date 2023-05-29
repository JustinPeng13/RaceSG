// We need this in a separate component to disable server-side rendering
"use client"

import React from 'react'
import Map from '../components/map';

const DEFAULT_CENTER = [1.3521, 103.8198] // Coordinates of SG


const MapPage = () => {
  
  const LOCATION_BIRD_PARK = [1.3187, 103.7064]
    
      return <Map width="800" height="400" center={DEFAULT_CENTER} zoom={11}>
    {({ TileLayer, Marker, Popup }) => (
      <>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={LOCATION_BIRD_PARK}>
          <Popup>
            Jurong Bird Park was formerly an aviary and tourist attraction in Jurong.
          </Popup>
        </Marker>
      </>
    )}
  </Map>
}
export default MapPage