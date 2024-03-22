import { useEffect, useRef } from "react";
import StartGame from "./main";
// import { EventBus } from "./EventBus";

export interface IRefRunnerGame {
  game: Phaser.Game | null;
}

const JavelinThrowGame = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current === null) {
      gameRef.current = StartGame("game-container");
    }
  });

  return <div id="game-container"></div>;
};

export default JavelinThrowGame;
