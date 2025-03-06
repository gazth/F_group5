// src/App.tsx
import React from "react";
import Player from "./components/Player";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <Player playerId="player1" />
      <Player playerId="player2" />

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
