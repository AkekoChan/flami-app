import { useEffect, useState } from "react";
import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { Flami } from "../../interfaces/flami.interface";

const FlamiDisplay = ({
  flami,
  isSelf = false,
  _clearAnimation = null,
}: {
  flami: Flami;
  isSelf: boolean;
  _clearAnimation?: null|string;
}) => {
  const [clearAnimation, setClearAnimation] = useState<null|string>(_clearAnimation);

  useEffect(() => {
    setTimeout(() => setClearAnimation(null), 1);
    setClearAnimation("/assets/img/icons/IdleAnim.gif");
  }, [setClearAnimation]);

  return (
    <div
      className="z-20 w-full h-full rounded-lg min-w-1/2 flex grow justify-around relative"
    >
      <div
        className="relative h-full"
        key={flami?._id}
        id={isSelf ? "your-flami" : "shared-flami"}
      >
        {!isSelf ? (
          <span className="text-alabaster-50 left-1/2 -translate-x-1/2 translate-y-3 w-max absolute top-0 text-center">
            {flami.name}
          </span>
        ) : null}
        <img
          loading="lazy"
          src={clearAnimation || `/assets/img/animations/IdleAnim.gif`}
          className="relative z-10 w-full h-full max-h-60"
          alt={flami.name}
        />
        {flami?.cosmetics.map((cosmetic: Cosmetic) => (
          <img
            loading="lazy"
            key={cosmetic.name}
            className={`absolute top-0 h-full w-full ${cosmetic.category === "back" ? "z-0" : (cosmetic.category === "hands" ? "z-30" : (cosmetic.category === "head" ? "z-20" : "z-10"))}`}
            src={clearAnimation || `/assets/img/cosmetics/anim/${cosmetic.id}/${cosmetic.id}Idle.gif`}
            aria-label={cosmetic.name}
            alt=""
          />
        ))}
        {flami.last_trade && !flami.self ? (
          <span className="text-alabaster-50 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-max px-6 py-2">
            {new Date(flami.last_trade).toLocaleDateString()}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default FlamiDisplay;
