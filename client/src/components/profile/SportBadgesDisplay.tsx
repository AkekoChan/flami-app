import { Badge } from "../../interfaces/badge.interface";
import { useState } from "react";
import BadgeDisplay from "./BadgeDisplay";
import { CloseIcon } from "react-line-awesome";

const SportBadgesDisplay = ({ badges }: { badges: Badge[] }) => {
  const [infoBadge, setInfoBadge] = useState<Badge | null>();

  const selectBadge = (badge: Badge | null) => {
    infoBadge ? setInfoBadge(null) : setInfoBadge(badge);
  };

  return (
    <>
      {infoBadge ? (
        <section className="w-full min-h-dvh flex gap-4 flex-col items-center bg-alabaster-950">
          <CloseIcon
            onClick={() => selectBadge(null)}
            className="text-3xl text-alabaster-50 cursor-pointer px-2 py-1 hover:bg-alabaster-300/20 rounded-xl ease-out duration-100 place-self-end"
          />
          <BadgeDisplay badge={infoBadge}></BadgeDisplay>
          <p className="text-2xl font-bold text-center">{infoBadge.name}</p>
          <p className="text-sm text-center">{infoBadge.description}</p>
        </section>
      ) : (
        <section className="w-full flex flex-col gap-4">
          <div className="w-full grid grid-cols-3">
            {badges &&
              badges.map((badge: Badge, index) =>
                badge.owned ? (
                  <img
                    onClick={() => selectBadge(badge)}
                    className="w-full cursor-pointer"
                    src={badge.url}
                    alt={`Badge de ${badge.name}`}
                    key={index}
                  />
                ) : (
                  <img
                    className="w-full grayscale opacity-50 cursor-not-allowed"
                    src={badge.url}
                    alt={`Badge de ${badge.name}`}
                    key={index}
                  />
                )
              )}
          </div>
        </section>
      )}
    </>
  );
};

export default SportBadgesDisplay;
