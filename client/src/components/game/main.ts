import Phaser from "phaser";
import { Runner } from "./scenes/Runner";
// import { JavelinThrow } from "./scenes/JavelinThrow";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  parent: "game-container",
  scene: [Runner],
};

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent: parent });
};

export default StartGame;
