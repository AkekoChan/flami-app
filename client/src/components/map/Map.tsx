import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { Icon, LatLng } from "leaflet";
import { Step } from "../../interfaces/step.interface";
import { useEffect } from "react";

const Map = ({
  currentStep,
  steps,
  polylinePath,
}: {
  currentStep: Step | undefined;
  steps: Step[];
  polylinePath: [number, number][];
}) => {
  const polylineOptions = { color: "orange", dashArray: "10,25", weight: 3 };

  const customIcon = new Icon({
    iconUrl: "/assets/img/map/pin.svg",
    iconSize: [40, 40],
  });

  const customIconGhost = new Icon({
    iconUrl: "/assets/img/map/pin-ghost.svg",
    iconSize: [40, 40],
  });

  const geolocalisation = currentStep
    ? new LatLng(
        currentStep.geolocalisation.latitude,
        currentStep.geolocalisation.longitude
      )
    : new LatLng(43.282, 5.405);

  const MapRecenter = ({
    lat,
    lng,
    zoomLevel,
  }: {
    lat: number;
    lng: number;
    zoomLevel: number;
  }) => {
    const map = useMap();

    useEffect(() => {
      map.flyTo([lat, lng], zoomLevel);
    }, [lat, lng]);
    return null;
  };

  return (
    <div className="h-96 rounded-2xl overflow-hidden">
      <MapContainer
        center={geolocalisation}
        zoom={12}
        maxZoom={12}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <MapRecenter
          lat={geolocalisation.lat}
          lng={geolocalisation.lng}
          zoomLevel={12}
        />
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />

        {steps &&
          steps.map((marker, index) => (
            <Marker
              position={[
                marker.geolocalisation.latitude,
                marker.geolocalisation.longitude,
              ]}
              icon={
                !currentStep
                  ? customIconGhost
                  : currentStep.etape_numero < marker.etape_numero
                  ? customIconGhost
                  : customIcon
              }
              key={index}
            >
              <Popup>
                <b className="text-alabaster-50">Étape n°{marker.etape}</b>
                <p>{marker.date}</p>
                <p>{marker.ville}</p>
              </Popup>
            </Marker>
          ))}
        <Polyline pathOptions={polylineOptions} positions={polylinePath} />
      </MapContainer>
    </div>
  );
};

export default Map;
