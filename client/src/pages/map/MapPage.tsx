import { useCallback, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { APIHandler } from "../../utils/api/api-handler";
import { Step } from "../../interfaces/step.interface";
import Map from "../../components/map/Map";
import FlameLocation from "../../components/map/FlameLocation";
import FlamiLocation from "../../components/map/FlamiLocation";
import { useAuth } from "../../hooks/useAuth";
import { FlamiData } from "../../interfaces/flami.interface";
import { useTheme } from "../../hooks/useTheme";

const MapPage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentFlameLocation, setCurrentFlameLocation] = useState<Step>();
  const [nextFlameLocation, setNextFlameLocation] = useState<Step>();
  const [flamiLocation, setFlamiLocation] = useState<any>(null);
  const [flamiTrail, setFlamiTrail] = useState<any>([]);
  const [flamiPosition, setFlamiPosition] = useState<any>(null);
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
    APIHandler<Step>(`/etape/15`, true).then((res) => {
      setCurrentFlameLocation(res.data);
      handleNextStep(res.data.etape_numero + 1);
    });
  };

  const getFlamiLocation = useCallback(() => {
    APIHandler<FlamiData>(
      "/my/flami?trail",
      false,
      "GET",
      undefined,
      token
    ).then(async (res) => {
      if (
        !res.data.my_flami?.location?.latitude ||
        !res.data.my_flami?.location?.longitude
      ) {
        return setFlamiLocation(null);
      } else {
        setFlamiTrail(
          res.data.my_flami?.trail?.map((e) => [e.latitude, e.longitude])
        );
        setFlamiPosition(res.data.my_flami?.location);
        await fetch(
          `https://api-adresse.data.gouv.fr/reverse/?lat=${res.data.my_flami.location.latitude}&lon=${res.data.my_flami.location.longitude}`
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
        />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Où est la flamme?</h2>
            <FlameLocation
              currentFlameLocation={currentFlameLocation}
              nextFlameLocation={nextFlameLocation}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Où est mon Flami?</h2>
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
