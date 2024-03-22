import { Badge } from "../../interfaces/badge.interface";
import { useState } from "react";
import ding from "../../../public/assets/sound/ding.wav";

const BadgeDisplay = ({ badge }: { badge: Badge }) => {
  const [side, setSide] = useState(false);
  const medalDing = new Audio(ding);

  return (
    <div className={"w-full relative badge-display flex flex-col items-center"}>
      <div className={`w-60 cursor-pointer badge-cover badge-${
        side ? "reverse" : "front"
      }`} onClick={() => {
        setSide(!side);
        medalDing.play();
      }}>
        <img
          className="w-full relative side-cover"
          src={badge.url_cover}
          alt={`Badge de ${badge.region}`}
        />
        <img
          className="w-full absolute top-0"
          src={badge.url}
          alt={`Badge de ${badge.name}`}
        />
      </div>
      <p className="text-3xl mt-4 mb-4 font-bold text-center">{side ? badge.region : badge.name}</p>
      <p className="text-base w-90 text-center">{side ? badge.description_region : badge.description}</p>
    </div>
  );
};

export default BadgeDisplay;
