import React, { useEffect, useRef } from "react";
import StartGame from "./main";
import { EventBus } from "./EventBus";

export interface IRefRunnerGame {
  game: Phaser.Game | null;
  timer: number | null;
}

const RunnerGame = ({
  setTime,
}: {
  setTime: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current === null) {
      gameRef.current = StartGame("game-container");
    }

    const timerListener = (timer: number) => {
      setTime(timer);
    };

    EventBus.on("timer", timerListener);

    return () => {
      EventBus.removeListener("timer", timerListener);
    };
  });

  return <div id="game-container"></div>;
};

export default RunnerGame;
