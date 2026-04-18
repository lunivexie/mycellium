import { useMyceliumStore } from '../store/useMyceliumStore';
import * as Icons from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

const SidePanel = () => {
  const { selectedNode } = useMyceliumStore();

  if (!selectedNode) return null;

  const data = selectedNode.data;
  const IconComponent = (Icons[data.icon as keyof typeof Icons] as LucideIcon) || Icons.HelpCircle;

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '320px',
        background: 'rgba(10, 10, 10, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 'var(--border-radius)',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        zIndex: 5,
        color: 'var(--text-primary)',
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <IconComponent size={24} color="var(--cyan-ethereal)" />
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{data.label}</h2>
      </div>

      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
        {data.description}
      </p>

      <div style={{ background: '#1a1a1a', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', color: 'var(--mint-tech)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Código de ejemplo
        </div>
        <pre style={{ margin: 0, fontSize: '13px', color: 'var(--cyan-ethereal)', fontFamily: 'monospace' }}>
          {`let seed = "knowledge";\nconsole.log(seed);`}
        </pre>
      </div>

      <button
        style={{
          width: '100%',
          padding: '12px',
          background: 'linear-gradient(45deg, var(--bg-card), #1a1a1a)',
          border: '1px solid var(--angelic-gold)',
          borderRadius: '8px',
          color: 'var(--angelic-gold)',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Completar Quiz Rápido
      </button>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SidePanel;
