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
        <div className="flex flex-wrap border-3 border-alabaster-400 rounded-xl py-2 px-4 gap-x-6 gap-y-2 text-base">
          <div className="flex flex-col gap-1">
            <p className="text-alabaster-400 text-balance">Étape actuelle</p>
            <p className="font-bold text-balance">{currentFlameLocation.ville}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-alabaster-400 text-balance">
              Département
            </p>
            <p className="font-bold text-balance">{`${currentFlameLocation?.territoire} (${currentFlameLocation?.departement})`}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-alabaster-400 text-balance">Prochaine étape</p>
            <p className="font-bold text-balance">{nextFlameLocation?.ville}</p>
          </div>
        </div>
      ) : (
        <p>Le parcours n'a pas encore débuté !</p>
      )}
    </>
  );
};

export default FlameLocation;
