import { useCallback, useEffect, useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";
import { Flami } from "../../interfaces/flami.interface";
import { Button } from "../../components/ui";
import { motion } from "framer-motion";
import { Cosmetic } from "../../interfaces/cosmetic.interface";
import { useNavigate } from "react-router";
import { useTheme } from "../../hooks/useTheme";

const FlamiPage = () => {
  const { token } = useAuth();
  const { setShowNav } = useTheme();
  const [flami, setFlami] = useState<Flami>();
  const navigate = useNavigate();

  setShowNav(true);

  const getFlami = useCallback(() => {
    APIHandler<Flami>("/my/flami", false, "GET", undefined, token).then(
      (res) => {
        setFlami(res.data);
      }
    );
  }, [token]);

  useEffect(() => {
    getFlami();
  }, [getFlami]);

  console.log(flami?.last_share, new Date().toDateString());

  return (
    <div className="flex flex-col gap-8 mb-24">
      <TopBar title="Mon Flami" hasReturn={false} prevPage="" />
      <div className="flex flex-col gap-6">
        <div className="flex justify-around relative">
          <div className="relative">
            <img
              src="/assets/img/icons/flami.svg"
              className="relative z-10 w-full max-h-60"
              alt="Flami"
            />
            {flami?.cosmetics.map((cosmetic: Cosmetic) => (
              <img
                key={cosmetic.name}
                className="top-0 z-20"
                src={cosmetic.url}
                alt={cosmetic.name}
              />
            ))}
          </div>
          {flami?.shared_flami ? (
            <div className="relative flex items-center justify-center">
              <span className="text-alabaster-50 bg-alabaster-600 px-4 py-2 rounded-3xl absolute -top-4">{`Flami de ${flami.shared_flami.owner}`}</span>
              <img
                src="/assets/img/icons/flami.svg"
                alt={`Flami de ${flami.shared_flami.owner}`}
              />
              {flami.shared_flami.cosmetics.map((cosmetic: Cosmetic) => (
                <img
                  key={cosmetic.name}
                  className="top-0 z-20"
                  src={cosmetic.url}
                  alt={cosmetic.name}
                />
              ))}
            </div>
          ) : null}
        </div>
        <Button
          variant={"secondary"}
          disabled={
            flami?.last_share && flami.last_share === new Date().toDateString()
          }
          type="button"
          onClick={() => navigate("/share")}
        >
          Partager
        </Button>
      </div>
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
              onClick={() => navigate("/competition")}
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
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Statistiques de Flami</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="w-1/3">Force</span>
              <div className="w-2/3 bg-alabaster-300 rounded-xl h-4">
                <motion.div
                  initial={{ width: "10%" }}
                  animate={{ width: `${(flami?.stats.strength || 0) * 10}%` }}
                  className="bg-tree-poppy-500 h-4 rounded-xl relative"
                >
                  <div className="h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400 "></div>
                </motion.div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="w-1/3">Vitesse</span>
              <div className="w-2/3 bg-alabaster-300 rounded-xl h-4">
                <motion.div
                  initial={{ width: "10%" }}
                  animate={{ width: `${(flami?.stats.speed || 0) * 10}%` }}
                  className="bg-tree-poppy-500 h-4 rounded-xl relative"
                >
                  <div className="h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400 "></div>
                </motion.div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="w-1/3">Dexterité</span>
              <div className="w-2/3 bg-alabaster-300 rounded-xl h-4">
                <motion.div
                  initial={{ width: "10%" }}
                  animate={{ width: `${(flami?.stats.dexterity || 0) * 10}%` }}
                  className="bg-tree-poppy-500 h-4 rounded-xl relative"
                >
                  <div className="h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400 "></div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlamiPage;
