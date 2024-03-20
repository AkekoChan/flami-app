import { FlamiData } from "../../interfaces/flami.interface";
import { Cosmetic } from "../../interfaces/cosmetic.interface";
import MyFlamiDisplay from "./MyFlamiDisplay";
import KeptFlamiDisplay from "./KeptFlamiDisplay";

const FlamiShow = ({ flami }: { flami: FlamiData | undefined }) => {
  return (
    <>
      <MyFlamiDisplay myFlami={flami?.my_flami} />
      {flami?.kept_flami ? (
        <KeptFlamiDisplay keptFlami={flami.kept_flami} />
      ) : null}
    </>
  );
};

export default FlamiShow;
