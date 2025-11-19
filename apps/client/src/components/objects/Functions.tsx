import DynamicCard from '../cards/DynamicCard';

interface FunctionsProps {
  onClose?: () => void;
}

export default function Functions({ onClose }: FunctionsProps) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        background: 'rgba(10, 11, 15, 0.95)',
        backdropFilter: 'blur(20px)',
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
            zIndex: 10,
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '24px',
          width: '100%',
          maxWidth: '800px',
          height: '80%',
          maxHeight: '800px',
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
          category=""
          label="Bank"
          onClick={() => console.log('Bank clicked')}
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
          category=""
          label="Post"
          onClick={() => console.log('Post clicked')}
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
          category=""
          label="Sjukvård"
          onClick={() => console.log('Sjukvård clicked')}
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
          category=""
          label="Transport"
          onClick={() => console.log('Transport clicked')}
        />
      </div>
    </div>
  );
}
