// src/App.tsx
import React, { useState, useEffect, useRef } from "react";
import Player from "./components/Player";

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]); // チャットメッセージの状態
  const [newMessage, setNewMessage] = useState<string>(''); // 新しいメッセージの入力
  const chatRef = useRef<HTMLDivElement>(null); // チャットのスクロール用の参照

  // 新しいメッセージ入力の変更を処理
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // メッセージ送信処理
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, newMessage]); // メッセージを追加
      setNewMessage(''); // メッセージ入力フィールドをクリア
      // メッセージ送信後にスクロールを最下部に
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* 指示メッセージ */}
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg">
        WASDキーまたは矢印キーでキャラクターを動かしてください。
      </div>

      {/* プレイヤーコンポーネント */}
      <Player playerId="player1" />
      <Player playerId="player2" />

      {/* 背景のグリッド */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* チャットボックス */}
      <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded-lg w-1/4 max-h-64 overflow-y-auto">
        <div className="text-white mb-2">
          <h3>チャット</h3>
          {/* チャットメッセージの表示 */}
          <div ref={chatRef} className="space-y-2 overflow-y-auto max-h-48">
            {messages.map((message, index) => (
              <div key={index} className="bg-gray-800 p-2 rounded-md text-white">
                {message}
              </div>
            ))}
          </div>
        </div>

        {/* 新しいメッセージ入力フィールド */}
        <input
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Enterキーで送信
          className="w-full p-2 bg-gray-700 text-white rounded-md"
          placeholder="メッセージを入力"
        />
      </div>
    </div>
  );
};

export default App;
