import MyceliumMap from './components/MyceliumMap';
import SidePanel from './components/SidePanel';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <MyceliumMap />
      <SidePanel />
      
      {/* Header / Logo */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 5,
        pointerEvents: 'none'
      }}>
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
    </div>
  );
}

export default App;
