import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { Flami } from "../../interfaces/flami.interface";

const KeptFlamiDisplay = ({ keptFlami }: { keptFlami: Flami }) => {
  return (
    <div className="relative flex items-center justify-center">
      <span className="text-alabaster-50 bg-alabaster-600 px-4 py-2 rounded-3xl absolute top-0 text-center">
        {keptFlami.name}
      </span>
      <img src="/assets/img/icons/flami.svg" alt={`${keptFlami.name}`} />
      {keptFlami?.cosmetics.map((cosmetic: Cosmetic) => (
        <img
          key={cosmetic.name}
          className="absolute top-0 z-20"
          src={cosmetic.url}
          alt={cosmetic.name}
        />
      ))}
    </div>
  );
};

export default KeptFlamiDisplay;
