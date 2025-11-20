import Footer from '../components/Footer';
import PageContainer from '../components/PageContainer';

interface SettingsProps {
  onClose?: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  return (
    <>
      <PageContainer
        label="Inställningar"
        tools={
          onClose && (
            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              ✕
            </button>
          )
        }
      >
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
      </PageContainer>
      <Footer />
    </>
  );
}
