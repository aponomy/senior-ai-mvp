interface FunctionsProps {
  onClose?: () => void;
}

export default function Functions({ onClose }: FunctionsProps) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 16px',
        background: 'rgba(10, 11, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      {/* Header with title and close button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <h3
          style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: 600,
            margin: 0,
          }}
        >
          Funktioner
        </h3>
        
        {onClose && (
          <button
            onClick={onClose}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Function buttons in a vertical list */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1,
        }}
      >
        <button
          onClick={() => console.log('Bank clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(74, 158, 255, 0.3)',
            background: 'rgba(74, 158, 255, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(74, 158, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(74, 158, 255, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(74, 158, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(74, 158, 255, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Bank
        </button>

        <button
          onClick={() => console.log('Post och Bud clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(157, 78, 255, 0.3)',
            background: 'rgba(157, 78, 255, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(157, 78, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(157, 78, 255, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(157, 78, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(157, 78, 255, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Post och Bud
        </button>

        <button
          onClick={() => console.log('Sjukvård clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 78, 157, 0.3)',
            background: 'rgba(255, 78, 157, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 78, 157, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(255, 78, 157, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 78, 157, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 78, 157, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Sjukvård
        </button>

        <button
          onClick={() => console.log('Transport clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(78, 255, 200, 0.3)',
            background: 'rgba(78, 255, 200, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(78, 255, 200, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(78, 255, 200, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(78, 255, 200, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(78, 255, 200, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Transport
        </button>

        <button
          onClick={() => console.log('Säkerhet clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 165, 0, 0.3)',
            background: 'rgba(255, 165, 0, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 165, 0, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(255, 165, 0, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 165, 0, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(255, 165, 0, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Säkerhet
        </button>

        <button
          onClick={() => console.log('Meddelanden clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(100, 200, 255, 0.3)',
            background: 'rgba(100, 200, 255, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(100, 200, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(100, 200, 255, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Meddelanden
        </button>

        <button
          onClick={() => console.log('Video clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            background: 'rgba(220, 38, 38, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Video
        </button>

        <button
          onClick={() => console.log('Foto clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            background: 'rgba(236, 72, 153, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(236, 72, 153, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Foto
        </button>

        <button
          onClick={() => console.log('Konst clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            background: 'rgba(168, 85, 247, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Konst
        </button>

        <button
          onClick={() => console.log('Musik clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            background: 'rgba(52, 211, 153, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(52, 211, 153, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(52, 211, 153, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Musik
        </button>

        <button
          onClick={() => console.log('Evenemang clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(251, 146, 60, 0.3)',
            background: 'rgba(251, 146, 60, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(251, 146, 60, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(251, 146, 60, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(251, 146, 60, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(251, 146, 60, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Evenemang
        </button>

        <button
          onClick={() => console.log('Sällskap clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(244, 114, 182, 0.3)',
            background: 'rgba(244, 114, 182, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(244, 114, 182, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(244, 114, 182, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(244, 114, 182, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Sällskap
        </button>

        <button
          onClick={() => console.log('Spel clicked')}
          style={{
            padding: '16px 12px',
            borderRadius: '12px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            background: 'rgba(59, 130, 246, 0.15)',
            color: 'white',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            textAlign: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          Spel
        </button>
      </div>
    </div>
  );
}
