import { Badge } from "../../interfaces/badge.interface";
import { useState } from "react";
import BadgeDisplay from "./BadgeDisplay";
import { CloseIcon } from "react-line-awesome";
import { motion } from "framer-motion";

const SportBadgesDisplay = ({ badges }: { badges: Badge[] | undefined }) => {
  const [infoBadge, setInfoBadge] = useState<Badge | null>();

  const selectBadge = (badge: Badge | null) => {
    infoBadge ? setInfoBadge(null) : setInfoBadge(badge);
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    shown: { opacity: 0.5, scale: 1, filter: "grayscale(75%)" },
    owned: { opacity: 1, scale: 1 },
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
        </section>
      ) : (
        <section className="w-full flex flex-col gap-4">
          <div className="w-full grid grid-cols-3">
            {badges &&
              badges.map((badge: Badge, index) =>
                badge.owned ? (
                  // <img
                  //   onClick={() => selectBadge(badge)}
                  //   className="w-full cursor-pointer"
                  //   src={badge.url}
                  //   alt={`Badge de ${badge.name}`}
                  //   key={index}
                  // />
                  <motion.img
                    variants={badgeVariants}
                    initial="hidden"
                    animate="owned"
                    onClick={() => selectBadge(badge)}
                    className="block w-full cursor-pointer"
                    src={badge.url}
                    alt={`Badge de ${badge.name}`}
                    key={index}
                  />
                ) : (
                  // <img
                  //   className="w-full grayscale opacity-50 cursor-not-allowed"
                  //   src={badge.url}
                  //   alt={`Badge de ${badge.name}`}
                  //   key={index}
                  // />
                  <motion.img
                    variants={badgeVariants}
                    initial="hidden"
                    animate="shown"
                    className="block w-full grayscale opacity-50 cursor-not-allowed"
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
