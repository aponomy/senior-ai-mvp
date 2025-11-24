import { Send } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from './ui/shadcn/button';
import { Input } from './ui/shadcn/input';

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
    <div className="border-t border-white/5 bg-[rgba(10,11,15,0.8)]">
      <div className="flex gap-2 border border-white/10 p-2">
        <Input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Skriv ditt meddelande..."
          className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-white/20"
          aria-label="Meddelandefält"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          size="icon"
          className={`w-11 h-11 rounded-full ${
            message.trim()
              ? 'bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700'
              : 'bg-white/10 cursor-not-allowed'
          }`}
          aria-label="Skicka meddelande"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
