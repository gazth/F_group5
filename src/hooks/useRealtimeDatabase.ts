// src/hooks/useRealtimeDatabase.ts
import { useState, useEffect } from "react";
import { ref, set, onValue, off } from "firebase/database";
import { database } from "../firebaseConfig";

type Position = { x: number; y: number };

const useRealtimeDatabase = (playerId: string) => {
  const [position, setPosition] = useState<Position>({ x: 50, y: 50 });

  useEffect(() => {
    if (!playerId) {
      console.error("Error: playerId is undefined");
      return;
    }

    const playerRef = ref(database, `players/${playerId}`);

    // データの読み取り
    const unsubscribe = onValue(
      playerRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPosition({ x: data.x, y: data.y });
          console.log(`Data received for ${playerId}:`, data);
        } else {
          console.warn(
            `No data found for player ${playerId}, initializing default values.`
          );
          set(playerRef, { x: 50, y: 50 }); // 初期値を設定
        }
      },
      (error) => {
        console.error("Firebase read error:", error);
      }
    );

    return () => off(playerRef, "value", unsubscribe);
  }, [playerId]);

  // 位置情報を更新する関数
  const updatePosition = async (newX: number, newY: number) => {
    if (!playerId) {
      console.error("Error: playerId is undefined");
      return;
    }

    const playerRef = ref(database, `players/${playerId}`);

    try {
      await set(playerRef, { x: newX, y: newY });
      console.log(`Updated position for ${playerId}: x=${newX}, y=${newY}`);
    } catch (error) {
      console.error("Firebase write error:", error);
    }
  };

  return { position, updatePosition };
};

export default useRealtimeDatabase;
