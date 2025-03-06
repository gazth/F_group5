// src/App.tsx
import React from "react";
import Player, { NewPlayer } from "./components/Player";
import useRealtimeDatabase from "./hooks/useRealtimeDatabase";


const App: React.FC = () => {
  // const currentPlayer = `player12`
  const currentPlayer = localStorage.getItem("currentPlayerId") || `player2`;
  const otherPlayer = currentPlayer ===  `player1` ? `player2` : `player1`;
  const { position: myPosition, updatePosition: myUpdatePosition } = useRealtimeDatabase(currentPlayer);
  const { position: otherPosition, updatePosition: otherUpdatePosition } = useRealtimeDatabase(otherPlayer);
  const players = [
    {
      id: currentPlayer,
      updatePosition: myUpdatePosition,
      ...myPosition
    },
    {
      id: otherPlayer,
      updatePosition: otherUpdatePosition,
      ...otherPosition
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {players.map(player => {
        return <NewPlayer updatePosition={player.updatePosition} player={player} currentPlayerId={currentPlayer} players={players} />
      })}
      {/* <Player playerId="player1" />
      <Player playerId="player2" /> */}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  );
};

export default App;
