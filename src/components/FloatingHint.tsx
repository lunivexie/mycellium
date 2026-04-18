import { useEffect, useState } from 'react';
import { useMyceliumStore } from '../store/useMyceliumStore';
import { MousePointer2 } from 'lucide-react';

const FloatingHint = () => {
  const { hasInteracted } = useMyceliumStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShow(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  if (!show || hasInteracted) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(224, 247, 250, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--cyan-ethereal)',
        padding: '12px 24px',
        borderRadius: '30px',
        color: 'var(--cyan-ethereal)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 100,
        pointerEvents: 'none',
        animation: 'float 2s infinite ease-in-out, fadeIn 1s ease-out',
        boxShadow: '0 0 20px rgba(224, 247, 250, 0.2)',
      }}
    >
      <MousePointer2 size={18} className="animate-pulse" />
      <span style={{ fontSize: '14px', fontWeight: '500', letterSpacing: '0.5px' }}>
        Arrastra desde los círculos para germinar conocimiento
      </span>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
};

export default FloatingHint;
