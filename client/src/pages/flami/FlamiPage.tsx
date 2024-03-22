import { useCallback, useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";
import { FlamiData } from "../../interfaces/flami.interface";
import { Button } from "../../components/ui";
import { useNavigate } from "react-router";
import { useTheme } from "../../hooks/useTheme";
import FlamiDisplay from "../../components/flami/FlamiDisplay";
import FlamiStats from "../../components/flami/FlamiStats";
import { GenericResponse } from "../../interfaces/api-response/generic-response";
import toast from "react-hot-toast";

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
      <TopBar title="Mon Flami" hasReturn={false} prevPage="" />
      { flami ? <FlamiDisplay flami={flami} /> : null }
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Mes activités</h2>
          <div className="grid grid-cols-2 grid-rows-2 gap-y-3 gap-x-2">
            <Button
              onClick={() => navigate("/cosmetics")}
              className="bg-alabaster-900 border-midnight-moss-300 border-3 shadow-midnight-300 flex flex-col items-center gap-2 rounded-xl hover:brightness-90 active:shadow-none active:translate-y-1"
            >
              <img
                src="/assets/img/icons/sparkling.svg"
                alt=""
                loading={"lazy"}
              />
              Cosmétiques
            </Button>
            <Button
              onClick={() => navigate("/training")}
              className="bg-alabaster-900 border-mahogany-300 border-3 shadow-mahogany-300 flex flex-col items-center gap-2 rounded-xl hover:brightness-90 active:shadow-none active:translate-y-1"
            >
              <img
                src="/assets/img/icons/dumbbell.svg"
                alt=""
                loading={"lazy"}
              />
              Entrainements
            </Button>
            <Button
              onClick={() => {
                if(!flami?.my_flami) return;
                let level = flami.my_flami.stats.speed < 3 ? 'bronze' : flami.my_flami.stats.speed > 7 ? 'or' : 'argent';
                APIHandler<GenericResponse>(
                  `/misc/g/badge/sport_course_${level}`,
                  false,
                  "GET",
                  undefined,
                  token
                ).then(() => {
                  toast.success(`Tu as récuperé le badge de course en ${level}.`, {
                    style: {
                      background: "#3D3D3D",
                      color: "#FAFAFA",
                      borderRadius: "12px",
                    },
                  });
                });
              }}
              className="bg-alabaster-900 col-span-2 border-tree-poppy-300 shadow-tree-poppy-300 border-3 flex flex-col items-center gap-2 rounded-xl hover:brightness-90 active:shadow-none active:translate-y-1"
            >
              <img
                src="/assets/img/icons/competition.svg"
                alt=""
                loading={"lazy"}
              />
              Compétition
            </Button>
          </div>
        </div>
        <FlamiStats flami={flami} />
      </div>
    </div>
  );
};

export default FlamiPage;
