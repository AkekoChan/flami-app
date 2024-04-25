import { useState } from "react";
import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { Flami } from "../../interfaces/flami.interface";

const FlamiDisplay = ({
  flami,
  animation = "Idle",
  isSelf = false,
}: {
  flami: Flami;
  animation: string;
  isSelf: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div
      className="z-20 w-full h-full data-[loading=true]:bg-alabaster-800 data-[loading=true]:animate-pulse rounded-lg min-w-1/2 flex grow justify-around relative"
      data-loading={loading}
    >
      <div className="relative h-full" key={flami?._id} id={isSelf ? "your-flami" : "shared-flami"}>
        {!isSelf ? (
          <span className="text-alabaster-50 bg-alabaster-600 left-1/2 -translate-x-1/2 w-max px-6 py-2 rounded-3xl absolute top-0 text-center">
            {flami.name}
          </span>
        ) : null}
        <img
          loading="lazy"
          src={`/assets/img/animations/${animation}Anim.gif`}
          onLoad={() => setLoading(false)}
          onLoadStart={() => setLoading(true)}
          className="relative z-10 w-full h-full max-h-60"
          alt="Flami"
        />
        {flami?.cosmetics.map((cosmetic: Cosmetic) => (
          <img
            loading="lazy"
            key={cosmetic.name}
            className={`absolute top-0 h-full ${cosmetic.category === "back" ? "z-0" : (cosmetic.category === "head" ? "z-20" : "z-10")}`}
            src={`/assets/img/cosmetics/anim/${cosmetic.id}/${cosmetic.id}${animation}.gif`}
            alt={cosmetic.name}
          />
        ))}
      </div>
    </div>
  );
};

export default FlamiDisplay;
