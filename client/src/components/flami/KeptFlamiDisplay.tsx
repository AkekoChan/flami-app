import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { Flami } from "../../interfaces/flami.interface";

const KeptFlamiDisplay = ({ keptFlami, animation = "Idle" }: { keptFlami: Flami, animation: string }) => {
  return (
    <div className="relative flex items-center justify-center">
      <span className="text-alabaster-50 bg-alabaster-600 px-4 py-2 rounded-3xl absolute top-0 text-center">
        {keptFlami.name}
      </span>
      <img
        loading="lazy" 
        className="relative z-10 w-full max-h-60"
        src={`/assets/img/animations/${animation}Anim.gif`} 
        alt={`${keptFlami.name}`} 
      />
      {keptFlami?.cosmetics.map((cosmetic: Cosmetic) => (
        <img
          loading="lazy"
          key={cosmetic.name}
          className="absolute top-0 z-20"
          src={`/assets/img/cosmetics/anim/${cosmetic.id}/${cosmetic.id}${animation}.gif`}
          alt={cosmetic.name}
        />
      ))}
    </div>
  );
};

export default KeptFlamiDisplay;
