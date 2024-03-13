import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Click {
  x: number;
  y: number;
}

const RunnerGame = () => {
  const [clicks, setClicks] = useState<Click[]>([]);
  const [isStarting, setIsStarting] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const maxClicks = 6;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsStarting(true);
    const newClick = { x: e.clientX, y: e.clientY };

    const newClicks = [...clicks, newClick];

    if (newClicks.length > maxClicks) {
      newClicks.splice(0, newClicks.length - maxClicks);
    }

    setClicks(newClicks);

    if (!gameOver) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      setClicks((prevClicks) => prevClicks.slice(1));
    }, 3000);
  };

  useEffect(() => {
    setTimeout(() => {
      setGameOver(true);
    }, 9000);
  }, []);

  return (
    <div
      className="h-[calc(100%-3rem)] relative bg-tree-poppy-300 overflow-hidden"
      onClick={handleClick}
    >
      {isStarting ? (
        <div className="text-white">Start</div>
      ) : (
        <div className="text-white">Pas start</div>
      )}
      {clicks.map((click, index) => (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.2 }}
          key={index}
          className={`w-16 h-16 fixed z-10`}
          style={{
            top: click.y,
            left: click.x,
          }}
          src="/assets/img/game/runner/TapSprite.png"
          alt=""
        />
      ))}
      <div
        className="h-full bg-alabaster-950"
        style={{
          clipPath: "circle(25% at 50% 50%)",
        }}
      >
        <div
          className={`absolute w-full top-[52%] -z-10 ${
            isStarting && !gameOver ? "animate-slide" : ""
          } flex`}
        >
          <img
            className="w-full"
            loading="lazy"
            src="/assets/img/game/runner/PisteDépart.png"
            alt=""
          />
          <img
            className="w-full"
            loading="lazy"
            src="/assets/img/game/runner/PisteNormale.png"
            alt=""
          />

          <img
            className="w-full"
            loading="lazy"
            src="/assets/img/game/runner/PisteNormale.png"
            alt=""
          />
          <img
            className="w-48 h-32 -translate-x-24 -translate-y-4 z-10"
            loading="lazy"
            src="/assets/img/game/runner/ArrivéeIdle.gif"
            alt=""
          />
          <img
            className="w-full -translate-x-48"
            loading="lazy"
            src="/assets/img/game/runner/PisteNormale.png"
            alt=""
          />
        </div>
        {isStarting && !gameOver ? (
          <>
            <img
              className="absolute w-100 top-[57%] right-[15%] translate-x-[20%] -translate-y-[50%] -z-10 scale-50"
              loading="lazy"
              src="/assets/img/game/runner/RunAnim.gif"
              alt=""
            />
          </>
        ) : (
          <>
            <img
              className="absolute w-100 top-[57%] -right-[2.5%] -translate-x-[20%] -translate-y-[50%] -z-10 scale-50"
              loading="lazy"
              src="/assets/img/game/runner/RunPrepAnim.gif"
              alt=""
            />
          </>
        )}
      </div>
      {gameOver && (
        <div className="max-h-min bg-alabaster-950 p-8 text-center fixed z-50 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center text-4xl font-bold text-alabaster-50">
          Bravo tu as été rapide ! Score : {score}
        </div>
      )}
    </div>
  );
};

export default RunnerGame;
