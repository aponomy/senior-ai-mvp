import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

export default function OrdersAndFunctions() {
  const navigate = useNavigate();

  return (
    <PageContainer
      label="Beställningar och Funktioner"
      tools={
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
      }
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          height: '100%',
        }}
      >
        <h2 style={{ color: 'white', opacity: 0.6 }}>
          Funktioner kommer snart...
        </h2>
      </div>
    </PageContainer>
  );
}
