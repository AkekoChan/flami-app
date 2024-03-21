import { FlamiData } from "../../interfaces/flami.interface";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui";
import FlamiShow from "./FlamiShow";

const FlamiDisplay = ({ flami }: { flami: FlamiData }) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col gap-6">
      <div className="w-full flex justify-around">
        <FlamiShow flami={flami} />
      </div>
      <Button
        variant={"secondary"}
        disabled={
          flami?.last_trade_date &&
          new Date(flami.last_trade_date).toDateString() ===
            new Date().toDateString()
        }
        type="button"
        onClick={() => navigate("/share")}
      >
        Partager
      </Button>
    </div>
  );
};

export default FlamiDisplay;
