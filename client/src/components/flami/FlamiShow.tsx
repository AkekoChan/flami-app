import { useEffect, useState } from "react";
import { FlamiData } from "../../interfaces/flami.interface";
import KeptFlamiDisplay from "./KeptFlamiDisplay";
import MyFlamiDisplay from "./myFlamiDisplay";

const FlamiShow = ({ flami }: { flami: FlamiData }) => {
  const [currentAnimation, setCurrentAnimation] = useState("Idle");
  const [currentKeptAnimation, setCurrentKeptAnimation] = useState("Idle");

  useEffect(() => {
    setCurrentAnimation("Jump");
    setCurrentKeptAnimation("Atchoum");
    setTimeout(() => {
      setCurrentAnimation("Idle");
      setCurrentKeptAnimation("Idle");
    }, 3200);
  }, [setCurrentAnimation]);

  return (
    <>
      <MyFlamiDisplay animation={currentAnimation} myFlami={flami?.my_flami} />
      {flami?.kept_flami ? (
        <KeptFlamiDisplay
          animation={currentKeptAnimation}
          keptFlami={flami.kept_flami}
        />
      ) : null}
    </>
  );
};

export default FlamiShow;
