import React, { useState, useEffect } from 'react';
import downImage from './assets/sprites/character.png';
import MapImage from './assets/sprites/R.png';

function App() {
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });  // 背景の位置
  const backgroundSpeed = 10;  // 背景の移動速度

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setBackgroundPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        switch (e.key) {
          case 'ArrowUp':
            if (newY > -280) {
              newY = prev.y - backgroundSpeed;  // 上方向に背景を動かす
            }
            break;
          case 'ArrowDown':
            if (newY < 760) {
              newY = prev.y + backgroundSpeed;  // 下方向に背景を動かす
            }
            break;
          case 'ArrowLeft':
            if (newX > -620) {
              newX = prev.x - backgroundSpeed;  // 左方向に背景を動かす
            }
            break;
          case 'ArrowRight':
            if (newX < 1250) {
              newX = prev.x + backgroundSpeed;  // 右方向に背景を動かす
            }
            break;
          default:
            break;
        }

        // 状態を更新する
        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [backgroundPosition]); // backgroundPositionを監視

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Instructions */}
      <div
        className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg"
        style={{
          zIndex: 6
        }}>
        <h2 className="text-xl font-bold mb-2">Controls</h2>
        <p>Use Arrow keys to move the background</p>
        <p>Background position: X: {backgroundPosition.x}, Y: {backgroundPosition.y}</p>
      </div>

      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${MapImage})`,
          backgroundSize: '150%',  // 背景サイズを自動に設定
          backgroundPosition: `${-backgroundPosition.x}px ${-backgroundPosition.y}px`, // 背景を移動させる
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      ></div>

      {/* Fixed Pixel Character */}
      <div
        className="absolute w-8 h-8"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5
        }}>
        <img
          src={downImage}
          alt="Pixel Character"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default App;

