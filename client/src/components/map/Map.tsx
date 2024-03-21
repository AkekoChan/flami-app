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
import { Button } from "../ui";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { GenericResponse } from "../../interfaces/api-response/generic-response";

const Map = ({
  currentStep,
  steps,
  polylinePath,
  flamiTrailPath,
  flamiPosition
}: {
  currentStep: Step | undefined;
  steps: Step[];
  polylinePath: [number, number][];
  flamiTrailPath: [number, number][];
  flamiPosition: { latitude: number, longitude: number }
}) => {
  const { token } = useAuth();
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
                {
                  currentStep && currentStep?.etape_numero === marker.etape_numero ? (
                    <Button onClick={() => APIHandler<GenericResponse>(`/sandbox/g/badge/etapes_${marker.ville.toLowerCase()}`, false, "GET", undefined, token).then(res => {
                      toast.success(`${res.data.message}`, {
                        style: {
                          background: "#3D3D3D",
                          color: "#FAFAFA",
                          borderRadius: "12px",
                        },
                      });
                    })}>Récupérer le badge</Button>
                  ) : null
                }
              </Popup>
            </Marker>
          ))}
        <Polyline pathOptions={polylineOptions} positions={polylinePath} />
        {flamiPosition ? <Marker
          zIndexOffset={100}
          position={[
            flamiPosition.latitude,
            flamiPosition.longitude,
          ]}
          icon={new Icon({
            iconUrl: "/assets/img/animations/IdleAnim.gif",
            iconSize: [55, 55],
          })}
        >
          <Popup>
            <span className="text-alabaster-50"><b>Ton Flami</b></span>
          </Popup>
        </Marker> : null}
        {flamiTrailPath ? <Polyline pathOptions={{ color: "red", dashArray: "10,25", weight: 2 }} positions={flamiTrailPath} /> : null}
      </MapContainer>
    </div>
  );
};

export default Map;
