import { FlamiData } from "../../interfaces/flami.interface";
import { Cosmetic } from "../../interfaces/cosmetic.interface";

const FlamiShow = ({ flami }: { flami: FlamiData | undefined }) => {
  return (
    <div className="flex justify-around relative">
      <div className="relative">
        <img
          src="/assets/img/icons/flami.svg"
          className="relative z-10 w-full max-h-60"
          alt="Flami"
        />
        {flami?.my_flami.cosmetics.map((cosmetic: Cosmetic) => (
          <img
            key={cosmetic.name}
            className="absolute top-0 z-20"
            src={cosmetic.url}
            alt={cosmetic.name}
          />
        ))}
      </div>
      {flami?.kept_flami ? (
        <div className="relative flex items-center justify-center">
          <span className="text-alabaster-50 bg-alabaster-600 px-4 py-2 rounded-3xl absolute -top-4">
            {flami.kept_flami.name}
          </span>
          <img
            src="/assets/img/icons/flami.svg"
            alt={`${flami.kept_flami.name}`}
          />
          {flami.kept_flami.cosmetics.map((cosmetic: Cosmetic) => (
            <img
              key={cosmetic.name}
              className="absolute top-0 z-20"
              src={cosmetic.url}
              alt={cosmetic.name}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FlamiShow;
