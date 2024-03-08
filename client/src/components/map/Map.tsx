import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { Icon } from "leaflet";
import { Step } from "../../interfaces/step.interface";

const Map = ({
  steps,
  polylinePath,
}: {
  steps: Step[];
  polylinePath: [number, number][];
}) => {
  const polylineOptions = { color: "orange", dashArray: "10,25", weight: 3 };

  const customIcon = new Icon({
    iconUrl: "/src/assets/img/pin.svg",
    iconSize: [40, 40],
  });

  return (
    <div className="h-96 rounded-2xl overflow-hidden">
      <MapContainer
        center={[46, 2]}
        zoom={5}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />

        {steps &&
          steps.map((marker, index) => (
            <Marker
              position={[
                marker.geolocalisation.latitude,
                marker.geolocalisation.longitude,
              ]}
              icon={customIcon}
              key={index}
            >
              <Popup>
                <p>Étape n°{marker.etape}</p>
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
