import { useNavigate } from 'react-router-dom';
import DynamicCard from '../components/cards/DynamicCard';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0b0f 0%, #1a1b2f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '24px',
          width: '100%',
          maxWidth: '848px', // 2 * 400px + 24px gap
          aspectRatio: '1',
        }}
      >
        <DynamicCard
          size="xl"
          accent="#4a9eff"
          showBorder={true}
          borderColor="#4a9eff"
          borderOpacity={0.5}
          lightIntensity={0.4}
          showClouds={true}
          rippleEnabled={true}
          category="Tidigare"
          label="Ämnen"
          onClick={() => navigate('/previous-topics')}
        />
        
        <DynamicCard
          size="xl"
          accent="#9d4eff"
          showBorder={true}
          borderColor="#9d4eff"
          borderOpacity={0.5}
          lightIntensity={0.35}
          showClouds={true}
          rippleEnabled={true}
          category="Tidigare"
          label="Konversationer"
          onClick={() => navigate('/previous-conversations')}
        />
        
        <DynamicCard
          size="xl"
          accent="#ff4e9d"
          showBorder={true}
          borderColor="#ff4e9d"
          borderOpacity={0.5}
          lightIntensity={0.3}
          showClouds={true}
          rippleEnabled={true}
          category="Beställningar och"
          label="Funktioner"
          onClick={() => navigate('/functions')}
        />
        
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
          onClick={() => navigate('/new-conversation')}
        />
      </div>
    </div>
  );
}
