import { Step } from "../../interfaces/step.interface";

const FlameLocation = ({
  currentFlameLocation,
  nextFlameLocation,
}: {
  currentFlameLocation: Step | null;
  nextFlameLocation: Step | null;
}) => {
  return (
    <>
      {currentFlameLocation ? (
        <div className="grid grid-cols-3 border-3 border-alabaster-400 rounded-xl py-2 px-4 gap-4">
          <div className="flex flex-col gap-1 text-center">
            <p className="text-alabaster-400">Étape actuelle</p>
            <p className="font-bold">{currentFlameLocation.ville}</p>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="text-alabaster-400">
              Département
            </p>
            <p className="font-bold">{`${currentFlameLocation?.territoire} (${currentFlameLocation?.departement})`}</p>
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="text-alabaster-400">Prochaine étape</p>
            <p className="font-bold">{nextFlameLocation?.ville}</p>
          </div>
        </div>
      ) : (
        <p>Le parcours n'a pas encore débuté !</p>
      )}
    </>
  );
};

export default FlameLocation;
