import { Badge } from "../../interfaces/badge.interface";
import { useState } from "react";

const BadgeDisplay = ({ badge }: { badge: Badge }) => {
  const [side, setSide] = useState(false);
  return (
    <div
      className={`w-60 relative cursor-pointer badge-display badge-${
        side ? "reverse" : "front"
      }`}
      onClick={() => setSide(!side)}
    >
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
  );
};

export default BadgeDisplay;
