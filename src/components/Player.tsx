import React, { useEffect, useRef, useState } from "react";
import useRealtimeDatabase from "../hooks/useRealtimeDatabase";

interface PlayerProps {
  playerId: string;
}

const Player: React.FC<PlayerProps> = ({ playerId }) => {
  const { position, updatePosition } = useRealtimeDatabase(playerId);
  const [direction, setDirection] = useState("right");
  const speed = 10;
  const pressedKeys = useRef(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeys.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.current.delete(e.key.toLowerCase());
    };

    const movePlayer = () => {
      let newX = position.x;
      let newY = position.y;

      if (pressedKeys.current.has("w") || pressedKeys.current.has("arrowup")) {
        newY = Math.max(0, position.y - speed);
      }
      if (
        pressedKeys.current.has("s") ||
        pressedKeys.current.has("arrowdown")
      ) {
        newY = Math.min(window.innerHeight - 32, position.y + speed);
      }
      if (
        pressedKeys.current.has("a") ||
        pressedKeys.current.has("arrowleft")
      ) {
        setDirection("left");
        newX = Math.max(0, position.x - speed);
      }
      if (
        pressedKeys.current.has("d") ||
        pressedKeys.current.has("arrowright")
      ) {
        setDirection("right");
        newX = Math.min(window.innerWidth - 32, position.x + speed);
      }

      if (newX !== position.x || newY !== position.y) {
        updatePosition(newX, newY);
      }
    };

    const interval = setInterval(movePlayer, 100);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [position, updatePosition]);

  return (
    <div
      className="absolute w-8 h-8"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: "all 0.1s ease-out",
        transform: direction === "left" ? "scaleX(-1)" : "none",
      }}
    >
      <img
        src="https://raw.githubusercontent.com/pixijs/pixijs/dev/examples/assets/bunny.png"
        alt="Pixel Character"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

interface Player {
  id: string;
  x: number;
  y: number;
}

interface NewPlayerProps {
  currentPlayerId: string;
  updatePosition: (x: number, y: number) => Promise<void>;
  player: Player;
  players: Player[];
}

export const NewPlayer: React.FC<NewPlayerProps> = ({
  player,
  currentPlayerId,
  updatePosition,
  players,
}) => {
  const position = {
    x: player.x,
    y: player.y,
  };

  const otherPlayer = players.find(
    (playerEl) => playerEl.id !== player.id
  ) as Player;

  const distance =
    Math.sqrt(
      (player.x - otherPlayer.x) * (player.x - otherPlayer.x) +
        (player.y - otherPlayer.y) * (player.y - otherPlayer.y)
    ) || 0;

  const near = distance <= 100;

  const [direction, setDirection] = useState("right");
  const speed = 10;
  const pressedKeys = useRef(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeys.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.current.delete(e.key.toLowerCase());
    };

    const movePlayer = () => {
      let newX = position.x;
      let newY = position.y;

      if (pressedKeys.current.has("w") || pressedKeys.current.has("arrowup")) {
        newY = Math.max(0, position.y - speed);
      }
      if (
        pressedKeys.current.has("s") ||
        pressedKeys.current.has("arrowdown")
      ) {
        newY = Math.min(window.innerHeight - 32, position.y + speed);
      }
      if (
        pressedKeys.current.has("a") ||
        pressedKeys.current.has("arrowleft")
      ) {
        setDirection("left");
        newX = Math.max(0, position.x - speed);
      }
      if (
        pressedKeys.current.has("d") ||
        pressedKeys.current.has("arrowright")
      ) {
        setDirection("right");
        newX = Math.min(window.innerWidth - 32, position.x + speed);
      }

      if (newX !== position.x || newY !== position.y) {
        if (currentPlayerId === player.id) {
          updatePosition(newX, newY);
        }
      }
    };

    const interval = setInterval(movePlayer, 100);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [position, updatePosition]);

  return (
    <div
      className="absolute w-8 h-8"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: "all 0.1s ease-out",
        transform: direction === "left" ? "scaleX(-1)" : "none",
        backgroundColor: near ? `red` : "blue",
        padding: 8,
      }}
    >
      <img
        src="https://raw.githubusercontent.com/pixijs/pixijs/dev/examples/assets/bunny.png"
        alt="Pixel Character"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Player;
