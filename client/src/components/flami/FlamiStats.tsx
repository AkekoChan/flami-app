import { motion } from "framer-motion";
import { FlamiData } from "../../interfaces/flami.interface";

const FlamiStats = ({ flami }: { flami: FlamiData | undefined }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Statistiques de Flami</h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="w-1/3">Force</span>
          <div className="w-2/3 bg-alabaster-300 rounded-xl h-4">
            <motion.div
              initial={{ width: "10%" }}
              animate={{ width: `${(flami?.my_flami.stats.strength || 0) * 10}%` }}
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
              animate={{ width: `${(flami?.my_flami.stats.speed || 0) * 10}%` }}
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
              animate={{ width: `${(flami?.my_flami.stats.dexterity || 0) * 10}%` }}
              className="bg-tree-poppy-500 h-4 rounded-xl relative"
            >
              <div className="h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400 "></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlamiStats;
