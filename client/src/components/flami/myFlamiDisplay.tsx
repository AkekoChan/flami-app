import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { Flami } from "../../interfaces/flami.interface";

const MyFlamiDisplay = ({ myFlami, animation = "Idle" }: { myFlami: Flami, animation: string }) => {
  return (
    <div className="flex justify-around relative">
      <div className="relative">
        <img
          loading="lazy"
          src={`/assets/img/animations/${animation}Anim.gif`}
          className="relative z-10 w-full max-h-60"
          alt="Flami"
        />
        {myFlami?.cosmetics.map((cosmetic: Cosmetic) => (
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

export default MyFlamiDisplay;
