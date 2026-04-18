import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import * as Icons from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

const LunivexCardNode = ({ data, selected }: NodeProps) => {
  // Use a fallback for the icon if it's not found in the Icons object
  const iconName = data.icon as keyof typeof Icons;
  const IconComponent = (Icons[iconName] as LucideIcon) || Icons.HelpCircle;

  const getTypeStyles = () => {
    switch (data.type) {
      case 'concept':
        return {
          borderColor: 'var(--cyan-ethereal)',
          boxShadow: selected ? '0 0 20px rgba(224, 247, 250, 0.4)' : 'var(--glow-soft)',
          iconColor: 'var(--cyan-ethereal)',
        };
      case 'tool':
        return {
          borderColor: 'var(--mint-tech)',
          boxShadow: selected ? '0 0 20px rgba(178, 223, 219, 0.4)' : 'var(--glow-soft)',
          iconColor: 'var(--mint-tech)',
        };
      case 'mindset':
        return {
          borderColor: 'var(--angelic-gold)',
          boxShadow: selected ? 'var(--glow-gold)' : 'var(--glow-soft)',
          iconColor: 'var(--angelic-gold)',
        };
      default:
        return {
          borderColor: 'var(--text-secondary)',
          boxShadow: 'var(--glow-soft)',
          iconColor: 'var(--text-secondary)',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className="lunivex-card"
      style={{
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        padding: '16px',
        borderRadius: 'var(--border-radius)',
        border: `1px solid ${styles.borderColor}`,
        boxShadow: styles.boxShadow,
        width: '220px',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: styles.borderColor }} />
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', gap: '8px' }}>
        <div style={{ color: styles.iconColor }}>
          {IconComponent ? <IconComponent size={20} /> : <Icons.HelpCircle size={20} />}
        </div>
        <div style={{ fontWeight: '600', fontSize: '14px', letterSpacing: '0.5px' }}>
          {data.label}
        </div>
      </div>
      
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
        {data.description}
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: styles.borderColor }} />
    </div>
  );
};

export default memo(LunivexCardNode);
