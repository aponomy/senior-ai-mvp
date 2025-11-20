import Footer from '../components/Footer';

interface SettingsProps {
  onClose?: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  return (
    <>
      <div
        data-name="settings"
        style={{
          width: '100%',
          height: 'calc(100vh - 80px)', // Full height minus footer
          background: 'rgba(10, 11, 15, 0.95)',
          backdropFilter: 'blur(20px)',
          overflow: 'auto',
          padding: '40px',
          paddingBottom: '100px', // Extra padding at bottom
          position: 'relative',
        }}
      >
      {/* Close button top right */}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '16px',
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

      {/* Header */}
      <h2
        style={{
          color: 'white',
          fontSize: '32px',
          fontWeight: 600,
          margin: '0 0 40px 0',
        }}
      >
        Inställningar
      </h2>

      {/* Settings content */}
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '16px',
            textAlign: 'center',
          }}
        >
          Inställningar kommer snart...
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
