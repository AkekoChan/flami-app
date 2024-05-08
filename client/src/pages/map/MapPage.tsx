import { useCallback, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { APIHandler } from "../../utils/api/api-handler";
import { Step } from "../../interfaces/step.interface";
import Map from "../../components/map/Map";
import FlameLocation from "../../components/map/FlameLocation";
import FlamiLocation from "../../components/map/FlamiLocation";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Flami } from "../../interfaces/flami.interface";

const MapPage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentFlameLocation, setCurrentFlameLocation] = useState<Step|null>(null);
  const [nextFlameLocation, setNextFlameLocation] = useState<Step|null>(null);
  const [flamiLocation, setFlamiLocation] = useState<any>(null);
  const [flamiTrail, setFlamiTrail] = useState<any>([]);
  const [flamiPosition, setFlamiPosition] = useState<any>(null);
  const [flami, setFlami] = useState<Flami>();
  const polylinePath: [number, number][] = [];

  setShowNav(true);

  const handleSteps = () => {
    APIHandler<Step[]>("/etapes", true)
      .then((res) => {
        setSteps(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNextStep = (step: number) => {
    APIHandler<Step>(`/etape/${step}`, true).then((res) => {
      setNextFlameLocation(res.data);
    });
  };

  const handleCurrentStep = () => {
    APIHandler<Step>(`/etape/actuelle`, true).then((res) => {
      setCurrentFlameLocation(res.data);
      handleNextStep(res.data.etape_numero + 1);
    });
  };

  const getFlamiLocation = useCallback(() => {
    APIHandler<Flami[]>(
      "/my/flami?trail",
      false,
      "GET",
      undefined,
      token
    ).then(async (res) => {
      if(!res.data || !res.data[0]) return;
      let flami = res.data[0];
      if (
        !flami.location?.latitude ||
        !flami.location?.longitude
      ) {
        return setFlamiLocation(null);
      } else {
        setFlami(flami);
        setFlamiTrail(
          flami.trail?.map((e) => [e.latitude, e.longitude])
        );
        setFlamiPosition(flami.location);
        await fetch(
          `https://api-adresse.data.gouv.fr/reverse/?lat=${flami.location.latitude}&lon=${flami.location.longitude}`
        )
          .then((res) =>
            res.json().then((data) => {
              if (data.features?.length > 0) {
                const context =
                  data.features[0]["properties"]["context"].split(", ");
                setFlamiLocation({
                  ville: data.features[0]["properties"]["city"],
                  dept: `${context[1]} (${context[0]})`,
                  region: context[2],
                });
              } else {
                setFlamiLocation(null);
              }
            })
          )
          .catch(() => setFlamiLocation(null));
      }
    });
  }, [token]);

  useEffect(() => {
    handleSteps();
    handleCurrentStep();
    getFlamiLocation();
  }, []);

  if (currentFlameLocation) {
    steps.forEach((step) => {
      if (
        currentFlameLocation &&
        step.etape_numero > currentFlameLocation.etape_numero
      )
        return;
      polylinePath.push([
        step.geolocalisation.latitude,
        step.geolocalisation.longitude,
      ]);
    });
  }
  return (
    <div className="map-page flex flex-col gap-8 mb-24">
      <h1 className="font-roboto text-xl font-bold">Parcours de la flamme</h1>
      <div className="flex flex-col gap-8">
        <Map
          currentStep={currentFlameLocation}
          steps={steps}
          polylinePath={polylinePath}
          flamiTrailPath={flamiTrail}
          flamiPosition={flamiPosition}
          flami={flami}
        />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Où est la flamme ?</h2>
            <FlameLocation
              currentFlameLocation={currentFlameLocation}
              nextFlameLocation={nextFlameLocation}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Où est ton Flami ?</h2>
            {flamiLocation !== null ? (
              <FlamiLocation location={flamiLocation} />
            ) : (
              <p>Aucune position trouvée.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
