import React, { useState, useEffect } from 'react';

function App() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState('right');
  const speed = 10;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch(e.key.toLowerCase()) {
        case 'w':
          setPosition(prev => ({ ...prev, y: Math.max(0, prev.y - speed) }));
          break;
        case 's':
          setPosition(prev => ({ ...prev, y: Math.min(window.innerHeight - 32, prev.y + speed) }));
          break;
        case 'a':
          setDirection('left');
          setPosition(prev => ({ ...prev, x: Math.max(0, prev.x - speed) }));
          break;
        case 'd':
          setDirection('right');
          setPosition(prev => ({ ...prev, x: Math.min(window.innerWidth - 32, prev.x + speed) }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Controls</h2>
        <p>Use W, A, S, D keys to move</p>
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