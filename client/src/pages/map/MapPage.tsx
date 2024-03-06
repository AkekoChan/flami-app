import { useEffect, useState } from "react";
import L, { Icon, point } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { APIHandler } from "../../utils/api/api-handler";
import { Step } from "../../interfaces/step.interface";

const MapPage = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [flameInfo, setFlameInfo] = useState([]);

  const handleSteps = () => {
    APIHandler<Step[]>("/etapes", true)
      .then((res) => {
        setSteps(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleSteps();
  }, []);

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
    <div className="map-page flex flex-col gap-8">
      <h1 className="font-roboto text-xl font-bold">Parcours de la flamme</h1>
      <div className="flex flex-col gap-8">
        <div className="h-96 rounded-2xl overflow-hidden">
          <MapContainer
            center={[46, 2]}
            zoom={5}
            scrollWheelZoom={false}
            attributionControl={false}
          >
            <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />

            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >
              {steps.map((marker, index) => (
                <Marker
                  position={[
                    marker.geolocalisation.longitude,
                    marker.geolocalisation.latitude,
                  ]}
                  icon={customIcon}
                  key={index}
                >
                  <Popup>
                    <h1>Étape n°{marker.etape}</h1>
                    <h2>{marker.date}</h2>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Où est la flamme</h2>

            <div className="flex border-3 border-alabaster-400 rounded-xl py-2 px-4 gap-6 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-alabaster-400">Étape actuelle</p>
                <p className="font-bold">Marseille</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-alabaster-400">
                  Département
                  <br /> de l'étape
                </p>
                <p className="font-bold">Bouches-du-Rhônes</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-alabaster-400">Prochaine étape</p>
                <p className="font-bold">Toulon</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Où est mon Flami</h2>
            <div className="flex border-3 border-alabaster-400 rounded-xl py-2 px-4 gap-6 justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-alabaster-400">Position actuelle</p>
                <p className="font-bold">Lyon</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-alabaster-400">Département</p>
                <p className="font-bold">Rhônes-Alpes</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-alabaster-400">Ancienne Position</p>
                <p className="font-bold">Lyon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
