import { useState } from "react";
import RunnerGame from "../../components/game/RunnerGame";

import { useTheme } from "../../hooks/useTheme";

const TrainingPage = () => {
  const { setShowNav } = useTheme();
  const [time, setTime] = useState<number>(0);
  console.log(time);
  setShowNav(false);
  return <>
    {<h1 className="px-6 text-center text-alabaster-950 text-2xl absolute inset-x-0 top-28 z-500">Tape sur l'écran pour faire courir Flami !</h1>}
    <div className="game-container fixed left-0">
      {<RunnerGame setTime={setTime}/>}
    </div>
  </>;
};

export default TrainingPage;
