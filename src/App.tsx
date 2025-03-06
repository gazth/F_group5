import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState('right');
  const [messages, setMessages] = useState<string[]>([]); // State for chat messages
  const [newMessage, setNewMessage] = useState<string>(''); // State for new message input
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

    const interval = setInterval(updatePosition, 100);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle new message input and send the message
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setNewMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg">
        Use WASD or Arrow keys to move the character.
      </div>

      {/* Pixel Character */}
      <div
        className="absolute w-8 h-8"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.1s ease-out',
          transform: direction === 'left' ? 'scaleX(-1)' : 'none',
        }}
      >
        <img
          src="https://raw.githubusercontent.com/pixijs/pixijs/dev/examples/assets/bunny.png"
          alt="Pixel Character"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Background Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff1a 1px, transparent 1px), linear-gradient(90deg, #ffffff1a 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* Chat box */}
      <div className="absolute bottom-4 left-4 bg-black/50 p-4 rounded-lg w-1/4 max-h-64 overflow-y-auto">
        <div className="text-white mb-2">
          <h3>Chat</h3>
          {/* Display chat messages */}
          <div className="space-y-2">
            {messages.map((message, index) => (
              <div key={index} className="bg-gray-800 p-2 rounded-md text-white">
                {message}
              </div>
            ))}
          </div>
        </div>

        {/* Input field for new message */}
        <input
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="w-full p-2 bg-gray-700 text-white rounded-md"
          placeholder="Type a message"
        />
      </div>
    </div>
  );
}

export default App;
