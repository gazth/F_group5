import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState('right');
  const speed = 10;
  const pressedKeys = useRef(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      pressedKeys.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      pressedKeys.current.delete(e.key.toLowerCase());
    };

    const updatePosition = () => {
      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (pressedKeys.current.has('w') || pressedKeys.current.has('arrowup')) {
          newY = Math.max(0, prev.y - speed);
        }
        if (pressedKeys.current.has('s') || pressedKeys.current.has('arrowdown')) {
          newY = Math.min(window.innerHeight - 32, prev.y + speed);
        }
        if (pressedKeys.current.has('a') || pressedKeys.current.has('arrowleft')) {
          setDirection('left');
          newX = Math.max(0, prev.x - speed);
        }
        if (pressedKeys.current.has('d') || pressedKeys.current.has('arrowright')) {
          setDirection('right');
          newX = Math.min(window.innerWidth - 32, prev.x + speed);
        }

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(updatePosition, 100); // 定期的にキー状態をチェック

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg">
      </div>

      {/* Pixel Character */}
      <div 
        className="absolute w-8 h-8"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.1s ease-out',
          transform: direction === 'left' ? 'scaleX(-1)' : 'none'
        }}
      >
        <img 
          src="https://raw.githubusercontent.com/pixijs/pixijs/dev/examples/assets/bunny.png" 
          alt="Pixel Character"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>
    </div>
  );
}

export default App;