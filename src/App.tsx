import MyceliumMap from './components/MyceliumMap';
import SidePanel from './components/SidePanel';
import FloatingHint from './components/FloatingHint';
import { useMyceliumStore } from './store/useMyceliumStore';
import { RefreshCw } from 'lucide-react';

function App() {
  const { resetProgress } = useMyceliumStore();

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <MyceliumMap />
      <SidePanel />
      <FloatingHint />
      
      {/* Header / Logo */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ pointerEvents: 'none' }}>
          <h1 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '300',
            letterSpacing: '4px',
            color: 'var(--cyan-ethereal)',
            textShadow: '0 0 10px rgba(224, 247, 250, 0.5)'
          }}>
            THE LUNIVEX MYCELIUM
          </h1>
          <div style={{
            fontSize: '10px',
            color: 'var(--text-secondary)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginTop: '4px'
          }}>
            Botanical Techno-Angel Environment
          </div>
        </div>
        
        <button
          onClick={() => {
            if (window.confirm('¿Estás seguro de que quieres resetear tu micelio? Perderás todo tu progreso local.')) {
              resetProgress();
            }
          }}
          style={{
            width: 'fit-content',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '6px 12px',
            color: 'var(--text-secondary)',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--cyan-ethereal)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
        >
          <RefreshCw size={12} />
          Resetear Micelio
        </button>
      </div>
    </div>
  );
}

export default App;
