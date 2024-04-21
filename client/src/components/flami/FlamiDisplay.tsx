import { FlamiData } from "../../interfaces/flami.interface";
import FlamiShow from "./FlamiShow";

const FlamiDisplay = ({ flami }: { flami: FlamiData }) => {
  return (
    <div className="relative flex flex-col gap-6">
      <div className="w-full flex justify-around">
        <FlamiShow flami={flami} />
      </div>
    </div>
  );
};

export default FlamiDisplay;
