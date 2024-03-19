import { FlamiData } from "../../interfaces/flami.interface";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui";
import FlamiShow from "./FlamiShow";

const FlamiDisplay = ({ flami }: { flami: FlamiData | undefined }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <FlamiShow flami={flami} />
      <Button
        variant={"secondary"}
        disabled={
          flami?.last_trade_date && new Date(flami.last_trade_date).toDateString() === new Date().toDateString()
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
