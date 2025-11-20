interface WelcomeProps {
  onStart?: () => void;
}

export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div
      data-name="welcome"
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        background: 'rgba(10, 11, 15, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #4effc8 0%, #4a9eff 50%, #9d4eff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '24px',
          }}
        >
          Välkommen
        </h1>
        
        <p
          style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '48px',
            lineHeight: 1.6,
          }}
        >
          Din personliga AI-assistent är här för att hjälpa dig med allt från hälsofrågor till att planera resor.
        </p>

        {onStart && (
          <button
            onClick={onStart}
            style={{
              padding: '16px 48px',
              fontSize: '18px',
              fontWeight: 600,
              color: 'white',
              background: 'linear-gradient(135deg, #4effc8 0%, #4a9eff 100%)',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 8px 24px rgba(78, 255, 200, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(78, 255, 200, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(78, 255, 200, 0.3)';
            }}
          >
            Kom igång
          </button>
        )}
      </div>
    </div>
  );
}
