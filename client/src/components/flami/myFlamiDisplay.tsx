import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { Flami } from "../../interfaces/flami.interface";

const MyFlamiDisplay = ({ myFlami }: { myFlami: Flami | undefined }) => {
  return (
    <div className="flex justify-around relative">
      <div className="relative">
        <img
          src="/assets/img/icons/flami.svg"
          className="relative z-10 w-full max-h-60"
          alt="Flami"
        />
        {myFlami?.cosmetics.map((cosmetic: Cosmetic) => (
          <img
            key={cosmetic.name}
            className="absolute top-0 z-20"
            src={cosmetic.url}
            alt={cosmetic.name}
          />
        ))}
      </div>
    </div>
  );
};

export default MyFlamiDisplay;
