import Footer from '../components/layout/Footer';
import PageContainer from '../components/layout/PageContainer';
import { Button } from '../components/ui/shadcn/button';

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
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20"
            >
              ✕
            </Button>
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
