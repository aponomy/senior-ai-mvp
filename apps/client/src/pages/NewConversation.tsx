import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DynamicCard from '../components/cards/DynamicCard';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function NewConversation() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // TODO: Integrate with AI API
    // Simulate AI response for now
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Detta är en placeholder-respons. AI-integration kommer snart.',
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleRecordToggle = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks: Blob[] = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          
          // TODO: Send audioBlob to speech-to-text API
          // For now, just show a placeholder message
          setInput('(Röstinspelning mottagen - transkription kommer snart)');
          
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);

        // Store mediaRecorder on window for access in stop function
        (window as any).currentMediaRecorder = mediaRecorder;
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Kunde inte komma åt mikrofonen. Kontrollera behörigheter.');
      }
    } else {
      // Stop recording
      const mediaRecorder = (window as any).currentMediaRecorder;
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      setIsRecording(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0b0f 0%, #1a1b2f 100%)',
        display: 'flex',
        padding: '40px',
        gap: '40px',
      }}
    >
      {/* Left side - Large Button */}
      <div
        style={{
          flex: '0 0 440px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DynamicCard
          size="xl"
          accent="#4effc8"
          showBorder={true}
          borderColor="#4effc8"
          borderOpacity={0.5}
          lightIntensity={0.25}
          showClouds={true}
          rippleEnabled={true}
          category="Starta ny"
          label="Konversation"
          onClick={() => navigate('/')}
        />
      </div>

      {/* Right side - Chat Window */}
      <div
        className="chat-container glass"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '32px',
          overflow: 'hidden',
          maxHeight: 'calc(100vh - 80px)',
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: '24px 32px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <h2
            style={{
              margin: 0,
              color: 'white',
              fontSize: '24px',
              fontWeight: 600,
            }}
          >
            Ny Konversation
          </h2>
          
          {/* Close Button */}
          <button
            onClick={() => navigate('/')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Messages Area */}
        <div
          className="messages-area"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: '16px',
              }}
            >
              Börja en konversation genom att skriva ett meddelande...
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role}`}
              style={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '70%',
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor:
                  message.role === 'user'
                    ? 'rgba(78, 255, 200, 0.2)'
                    : 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${
                  message.role === 'user'
                    ? 'rgba(78, 255, 200, 0.3)'
                    : 'rgba(255, 255, 255, 0.1)'
                }`,
                color: 'white',
                wordWrap: 'break-word',
              }}
            >
              {message.content}
            </div>
          ))}
          
          {isLoading && (
            <div
              style={{
                alignSelf: 'flex-start',
                maxWidth: '70%',
                padding: '16px 20px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              Tänker...
            </div>
          )}
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '24px 32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Skriv ditt meddelande..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(78, 255, 200, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#4effc8',
                color: '#0a0b0f',
                fontSize: '16px',
                fontWeight: 600,
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                transition: 'all 0.2s',
                width: '110px',
              }}
              onMouseEnter={(e) => {
                if (!isLoading && input.trim()) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(78, 255, 200, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Skicka
            </button>
            
            {/* Record Button */}
            <button
              type="button"
              onClick={handleRecordToggle}
              disabled={isLoading}
              style={{
                padding: '16px 24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: isRecording ? '#ff1744' : '#ff4e9d',
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                width: '110px',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 78, 157, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isRecording ? 'Stoppa' : 'Prata'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
