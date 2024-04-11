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
import { useEffect, useState } from "react";
import { Button } from "../ui";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { GenericResponse } from "../../interfaces/api-response/generic-response";
import { SearchIcon } from "react-line-awesome";

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

  const [geolocalisation, setGeolocation] = useState(new LatLng(43.282, 5.405));

  useEffect(() => {
    if(currentStep) setGeolocation(new LatLng(currentStep.geolocalisation.latitude, currentStep.geolocalisation.longitude))
  }, [currentStep, setGeolocation])

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
    <div className="h-96 rounded-2xl overflow-hidden relative">

      { currentStep ? (<Button className="absolute bottom-0 left-0 z-500 w-fit text-alabaster-900 pl-5" onClick={() => { 
        setGeolocation(new LatLng(currentStep.geolocalisation.latitude, currentStep.geolocalisation.longitude)) 
      }}>
        <SearchIcon className="mr-1" role="decoration"/> Etape actuelle
      </Button>) : null }
      
      { flamiPosition ? (<Button className="absolute bottom-0 right-0 z-500 w-fit text-alabaster-900 pr-5" onClick={() => { 
        setGeolocation(new LatLng(flamiPosition.latitude, flamiPosition.longitude)) 
      }}>
        <SearchIcon className="mr-1" role="decoration"/> Ton Flami
      </Button>) : null }

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
                <b className="text-alabaster-50 text-base">Étape n°{marker.etape}</b>
                <p className="text-sm">{marker.date}</p>
                <p className="text-sm">{marker.ville}</p>
                {
                  currentStep && currentStep?.etape_numero === marker.etape_numero ? (
                    <Button className="pb-1 text-alabaster-50" onClick={() => APIHandler<GenericResponse>(`/misc/g/badge/etape_${marker.etape_numero}`, false, "GET", undefined, token).then(res => {
                      toast.success(`${res.data.message}`, {
                        style: {
                          background: "#3D3D3D",
                          color: "#FAFAFA",
                          borderRadius: "12px",
                        },
                      });
                    })}>
                      Récupère le badge
                    </Button>
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
