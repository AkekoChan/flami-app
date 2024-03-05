import { useEffect, useState } from "react";

import mapService from "../../services/map";
import "../../assets/styles/map.css";

import L, { Icon, divIcon, point } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const [mapInfo, setMapInfo] = useState([]);
  const [flameInfo, setFlameInfo] = useState([]);


  useEffect(() => {
    mapService.getMapInfo().then((result) => setMapInfo(result.data));
  }, []);

  useEffect(() => {
    mapService.getCurrentStep().then((result) => setFlameInfo(result.data));
  }, []);

  console.log(flameInfo);

  const customIcon = new Icon({
    iconUrl: "/src/assets/img/pin.png",
    iconSize: [40, 40],
  });

  const createCustomClusterIcon = (cluster: L.MarkerCluster) => {
    return L.divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  return (
    <div className="map-page flex flex-col gap-6">
      <h1 className="font-roboto text-xl font-bold">Parcours de la flamme</h1>
      <div className="flex flex-col h-full gap-8">
        <div className="h-1/2 rounded-xl">
          <MapContainer center={[46, 2]} zoom={5} scrollWheelZoom={false} attributionControl={false}>
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >
              {mapInfo.map((marker, index) => (
                <Marker
                  position={[marker.location.long, marker.location.lat]}
                  icon={customIcon}
                  key={index}
                >
                  <Popup>
                    <h1>Étape n°{marker.step}</h1>
                    <h2>{marker.date}</h2>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>

        <div className="flex flex-col h-1/2 gap-4"> 
          <h2 className="text-2xl font-bold">Où est la flamme</h2>

          <div className="flex border-3 border-alabaster-400 rounded-xl p-2 justify-between">
              <div className="">
                <p className="text-alabaster-400">Étape actuelle</p>
              </div>
              <div className="">
                <p className="text-alabaster-400">Département<br /> de l'étape</p>
              </div>
              <div className="">
                <p className="text-alabaster-400">Prochaine étape</p>
              </div>
          </div>

          <h2 className="text-2xl font-bold">Où est mon Flami</h2>

          <div className="flex border-3 border-alabaster-400 rounded-xl p-2 justify-between">
              <div className="">
                <p className="text-alabaster-400">Étape actuelle</p>
              </div>
              <div className="">
                <p className="text-alabaster-400">Département<br /> de l'étape</p>
              </div>
              <div className="">
                <p className="text-alabaster-400">Prochaine étape</p>
              </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MapPage;
