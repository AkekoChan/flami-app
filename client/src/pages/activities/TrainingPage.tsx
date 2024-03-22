import { useState } from "react";
import RunnerGame from "../../components/game/RunnerGame";

import { useTheme } from "../../hooks/useTheme";

const TrainingPage = () => {
  const { setShowNav } = useTheme();
  const [time, setTime] = useState<number>(0);
  console.log(time);
  setShowNav(false);
  return <>{<RunnerGame setTime={setTime} />}</>;
};

export default TrainingPage;
