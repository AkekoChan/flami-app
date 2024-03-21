import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { Flami } from "../../interfaces/flami.interface";

const MyFlamiDisplay = ({ myFlami }: { myFlami: Flami }) => {
  return (
    <div className="flex justify-around relative">
      <div className="relative">
        <img
          src="/assets/img/animations/IdleAnim.gif"
          className="relative z-10 w-full max-h-60"
          alt="Flami"
        />
        {myFlami?.cosmetics.map((cosmetic: Cosmetic) => (
          <img
            key={cosmetic.name}
            className="absolute top-0 z-20"
            src={`/assets/img/cosmetics/anim/${cosmetic.id}/${cosmetic.id}Idle.gif`}
            alt={cosmetic.name}
          />
        ))}
      </div>
    </div>
  );
};

export default MyFlamiDisplay;
