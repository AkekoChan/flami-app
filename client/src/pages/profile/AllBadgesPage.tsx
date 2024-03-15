import { useCallback, useState, useEffect } from "react";
import TopBar from "../../components/topbar/TopBar";
import { APIHandler } from "../../utils/api/api-handler";
import { useAuth } from "../../hooks/useAuth";
import { Badge } from "../../interfaces/badge.interface";
import CityBadgesDisplay from "../../components/profile/CityBadgesDisplay";
import SportBadgesDisplay from "../../components/profile/SportBadgesDisplay";
import { motion } from "framer-motion";

const AllBadgesPage = () => {
  const { token } = useAuth();
  const [badges, setBadges] = useState<Badge[]>();
  const [selectDisplay, setSelectDisplay] = useState<Boolean>(true);

  const SwitchSelectDisplay = () => {
    if (selectDisplay) {
      setSelectDisplay(false);
    } else {
      setSelectDisplay(true);
    }
  };

  const getBadges = useCallback(() => {
    APIHandler<Badge[]>("/my/badges", false, "GET", undefined, token).then(
      (res) => {
        setBadges(res.data);
      }
    );
  }, [token]);

  useEffect(() => {
    getBadges();
  }, [getBadges]);

  return (
    <div className="w-full flex flex-col gap-8">
      <TopBar title="Mes badges" hasReturn={true} prevPage="/profile" />
      <div className="grid grid-cols-2 gap-4">
        {selectDisplay ? (
          <>
            <button className="items-center flex-col py-6 px-4 border-3 rounded-xl cursor-pointer hover:brightness-90 active:translate-y-1 active:shadow-tree-poppy-500-press active:border-tree-poppy-500 text-center border-tree-poppy-500 shadow-tree-poppy-500">
              Villes
            </button>
            <button
              onClick={SwitchSelectDisplay}
              className="items-center flex-col py-6 px-4 border-3 rounded-xl cursor-pointer hover:brightness-90 active:translate-y-1 active:shadow-tree-poppy-500-press active:border-tree-poppy-500 text-center border-alabaster-400 shadow-alabaster-400"
            >
              Sports
            </button>
          </>
        ) : (
          <>
            <button
              onClick={SwitchSelectDisplay}
              className="items-center flex-col py-6 px-4 border-3 rounded-xl cursor-pointer hover:brightness-90 active:translate-y-1 active:shadow-tree-poppy-500-press active:border-tree-poppy-500 text-center border-alabaster-400 shadow-alabaster-400"
            >
              Villes
            </button>
            <button className="items-center flex-col py-6 px-4 border-3 rounded-xl cursor-pointer hover:brightness-90 active:translate-y-1 active:shadow-tree-poppy-500-press active:border-tree-poppy-500 text-center border-tree-poppy-500 shadow-tree-poppy-500">
              Sports
            </button>
          </>
        )}
      </div>
      {selectDisplay ? (
        <motion.div>
          <CityBadgesDisplay badges={badges}></CityBadgesDisplay>
        </motion.div>
      ) : (
        <motion.div animate={{ x: 0 }}>
          <SportBadgesDisplay badges={null}></SportBadgesDisplay>
        </motion.div>
      )}
    </div>
  );
};

export default AllBadgesPage;
