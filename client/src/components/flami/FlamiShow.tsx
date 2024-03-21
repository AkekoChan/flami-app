import { FlamiData } from "../../interfaces/flami.interface";
import KeptFlamiDisplay from "./KeptFlamiDisplay";
import MyFlamiDisplay from "./MyFlamiDisplay";

const FlamiShow = ({ flami }: { flami: FlamiData }) => {
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
