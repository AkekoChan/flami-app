import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { APIHandler } from "../../utils/api/api-handler";
import { Step } from "../../interfaces/step.interface";
import Map from "../../components/map/Map";
import FlameLocation from "../../components/map/FlameLocation";
import FlamiLocation from "../../components/map/FlamiLocation";

const MapPage = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentFlameLocation, setCurrentFlameLocation] = useState<Step>();
  const [nextFlameLocation, setNextFlameLocation] = useState<Step>();
  const polylinePath: [number, number][] = [];

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
    APIHandler<Step>(`/etape/${step}`, true)
      .then((res) => {
        setNextFlameLocation(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCurrentStep = () => {
    APIHandler<Step>(`/etape/actuelle`, true)
      .then((res) => {
        setCurrentFlameLocation(res.data);
        handleNextStep(res.data.etape_numero);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    handleSteps();
    handleCurrentStep();
  }, []);

  steps.forEach((step) => {
    polylinePath.push([
      step.geolocalisation.latitude,
      step.geolocalisation.longitude,
    ]);
  });

  return (
    <div className="map-page flex flex-col gap-8">
      <h1 className="font-roboto text-xl font-bold">Parcours de la flamme</h1>
      <div className="flex flex-col gap-8">
        <Map steps={steps} polylinePath={polylinePath} />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Où est la flamme</h2>
            <FlameLocation
              currentFlameLocation={currentFlameLocation}
              nextFlameLocation={nextFlameLocation}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Où est mon Flami</h2>
            <FlamiLocation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
