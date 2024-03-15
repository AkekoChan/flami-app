// import RunnerGame from "../../components/game/RunnerGame";

import { useTheme } from "../../hooks/useTheme";

const TrainingPage = () => {
  const { setShowNav } = useTheme();
  setShowNav(false);
  return <>{/* <RunnerGame /> */}</>;
};

export default TrainingPage;
