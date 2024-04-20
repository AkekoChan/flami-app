import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import FlamiDisplay from "../../components/flami/FlamiDisplay";
import TopBar from "../../components/topbar/TopBar";
import { Button } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { FlamiData } from "../../interfaces/flami.interface";
import { APIHandler } from "../../utils/api/api-handler";

const FlamiPage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();
  const [flami, setFlami] = useState<FlamiData>();
  const navigate = useNavigate();

  setShowNav(true);

  const getFlami = useCallback(() => {
    APIHandler<FlamiData>("/my/flami", false, "GET", undefined, token).then(
      (res) => {
        setFlami(res.data);
      }
    );
  }, [token]);

  useEffect(() => {
    getFlami();
  }, [getFlami]);

  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Ton Flami" hasReturn={false} prevPage="" />
      {flami ? <FlamiDisplay flami={flami} /> : null}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Tes activités</h2>
          <div className="grid grid-rows-2 gap-y-3 grid-cols-1">
            <Button
              disabled={
                flami?.last_trade_date &&
                new Date(flami.last_trade_date).toDateString() ===
                  new Date().toDateString()
              }
              id="share-flami"
              className="bg-alabaster-900 col-span-2 border-tree-poppy-300 shadow-tree-poppy-300 border-3 flex flex-col items-center gap-2 rounded-xl hover:brightness-90 active:shadow-none active:translate-y-1 disabled:bg-alabaster-600 disabled:text-alabaster-300 disabled:shadow-none disabled:hover:brightness-100 disabled:active:translate-y-0"
              onClick={() => navigate("/share")}
            >
              <img src="/assets/img/icons/swap.svg" alt="" loading={"lazy"} />
              Partage Flami
            </Button>
            <Button
              onClick={() => navigate("/cosmetics")}
              id="cosmetics-flami"
              className="bg-alabaster-900 border-midnight-moss-300 border-3 shadow-midnight-300 flex flex-col items-center gap-2 rounded-xl hover:brightness-90 active:shadow-none active:translate-y-1"
            >
              <img
                src="/assets/img/icons/sparkling.svg"
                alt=""
                loading={"lazy"}
              />
              Cosmétiques
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlamiPage;
