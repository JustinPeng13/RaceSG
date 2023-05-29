// We need this in a separate component to disable server-side rendering
"use client"

import React from 'react'
// import styles from '../page.module.css'
const DEFAULT_CENTER = [1.3521, 103.8198]

import Map from './Map';

export const MyMap = () => {
    
      return <Map width="800" height="400" center={DEFAULT_CENTER} zoom={11}>
    {({ TileLayer, Marker, Popup }) => (
      <>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={DEFAULT_CENTER}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </>
    )}
  </Map>
}