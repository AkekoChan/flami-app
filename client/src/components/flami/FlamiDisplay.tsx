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
  const [loading, setLoading] = useState(true);
  return (
    <div className="data-[loading=true]:bg-alabaster-800 data-[loading=true]:animate-pulse rounded-lg min-w-1/2 flex grow justify-around relative" data-loading={loading}>
      <div className="relative" id={isSelf ? "your-flami"  : "shared-flami"}>
        <span className="text-alabaster-50 bg-alabaster-600 left-1/2 -translate-x-1/2 w-max px-6 py-2 rounded-3xl absolute top-0 text-center">
          {flami.name}
        </span>
        <img
          loading="lazy"
          src={`/assets/img/animations/${animation}Anim.gif`}
          onLoad={() => setLoading(false)}
          className="relative z-10 w-full max-h-60"
          alt="Flami"
        />
        {flami?.cosmetics.map((cosmetic: Cosmetic) => (
          <img
            loading="lazy"
            key={cosmetic.name}
            className="absolute top-0 z-20"
            src={`/assets/img/cosmetics/anim/${cosmetic.id}/${cosmetic.id}${animation}.gif`}
            alt={cosmetic.name}
          />
        ))}
      </div>
    </div>
  );
};

export default FlamiDisplay;
