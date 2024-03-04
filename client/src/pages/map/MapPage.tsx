import { useEffect, useState } from 'react'

import mapService from '../../services/map';
import '../../assets/styles/map.css';

import { Icon, divIcon, point } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";


const MapPage = () => {
  const [mapInfo, setMapInfo] = useState([]);

  useEffect(() => {
    mapService.getMapInfo().then(result => (setMapInfo(result.data)))
  }, []);

  console.log(mapInfo);

  const customIcon = new Icon({
    iconUrl: '/src/assets/img/pin.png',
    iconSize: [40,40]
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33,33, true)
    })
  }

  return ( 
    <section className='flex flex-col'>
      <div className='gap-5'>
        <h1>Parcours de la flamme</h1>
      </div>
      <div className='h-50 rounded-xl'>

      <MapContainer center={[46, 2]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />

        <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}  
          >

        {mapInfo.map(marker => (
          <Marker position={[marker.location.long, marker.location.lat]} icon={customIcon}>
            <Popup>
              <h1>Étape n°{marker.step}</h1>
              <h2>{marker.date}</h2>
            </Popup>
          </Marker>
        ))}

      </MarkerClusterGroup>

      </MapContainer>
    </div>

    </>
  )



};

export default MapPage;
