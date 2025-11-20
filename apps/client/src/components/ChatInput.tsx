import { useRef, useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(10, 11, 15, 0.8)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '8px',
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Skriv ditt meddelande..."
          style={{
            flex: 1,
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: message.trim()
              ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            cursor: message.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
