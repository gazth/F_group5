import React, { useState, useEffect, useRef } from "react";
import Player, { NewPlayer } from "./components/Player";
import useRealtimeDatabase from "./hooks/useRealtimeDatabase";
import MapImage from './assets/sprites/R.png';

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [showChatInput, setShowChatInput] = useState(false); // チャット入力フィールドの表示状態
  const chatRef = useRef<HTMLDivElement>(null);

  // 画面サイズを管理
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // プレイヤーの情報
  const currentPlayer = localStorage.getItem("currentPlayerId") || `player2`;
  const otherPlayer = currentPlayer === `player1` ? `player2` : `player1`;

  const { position: myPosition, updatePosition: myUpdatePosition } = useRealtimeDatabase(currentPlayer);
  const { position: otherPosition } = useRealtimeDatabase(otherPlayer);

  const players = [
    {
      id: currentPlayer,
      updatePosition: myUpdatePosition,
      ...myPosition
    },
    {
      id: otherPlayer,
      ...otherPosition
    }
  ];

  // 近接判定
  const distance = Math.sqrt(
    Math.pow(myPosition.x - otherPosition.x, 2) + Math.pow(myPosition.y - otherPosition.y, 2)
  );
  const near = distance <= 100;

  // 近づいたらメッセージを表示
  useEffect(() => {
    if (near) {
      // 近づいたときにメッセージを一度だけ追加
      setMessages(prev => {
        if (!prev.includes("近くにプレイヤーがいます！")) {
          return [...prev, "近くにプレイヤーがいます！"];
        }
        return prev;
      });
      setShowChatInput(true); // チャット入力フィールドを表示
    } else {
      setShowChatInput(false); // プレイヤーが近くない場合は非表示
    }
  }, [near]);

  // プレイヤーの移動処理
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      myUpdatePosition(prev => {
        let newX = prev.x;
        let newY = prev.y;
        const speed = 10; // 移動速度

        switch (e.key) {
          case 'ArrowUp':
            newY -= speed;
            break;
          case 'ArrowDown':
            newY += speed;
            break;
          case 'ArrowLeft':
            newX -= speed;
            break;
          case 'ArrowRight':
            newX += speed;
            break;
          default:
            break;
        }
        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // メッセージ送信
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* 背景画像（ウィンドウサイズにフィット） */}
      <div
        className="absolute top-0 left-0 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${MapImage})`,
          width: `${windowSize.width}px`,
          height: `${windowSize.height}px`,
          backgroundSize: '100% 100%',
        }}
      />

      {/* プレイヤーコンポーネント */}
      {players.map(player => (
        <NewPlayer
          key={player.id}
          updatePosition={player.updatePosition}
          player={player}
          currentPlayerId={currentPlayer}
          players={players}
          style={{
            position: 'absolute',
            left: `${player.x}px`,
            top: `${player.y}px`,
          }}
        />
      ))}

      {/* チャットボックスと入力フィールド */}
      {showChatInput && (
        <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded-lg w-1/4 max-h-64 overflow-y-auto">
          <div className="text-white mb-2">
            <h3>チャット</h3>
            <div ref={chatRef} className="space-y-2 overflow-y-auto max-h-48">
              {messages.map((message, index) => (
                <div key={index} className="bg-gray-800 p-2 rounded-md text-white">
                  {message}
                </div>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
            placeholder="メッセージを入力"
          />
        </div>
      )}
    </div>
  );
};

export default App;
