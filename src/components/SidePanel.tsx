import { useMyceliumStore } from '../store/useMyceliumStore';
import * as Icons from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

const KNOWLEDGE_BASE: Record<string, { code: string; longDesc: string; tech: string }> = {
  'Inicio: La Semilla Tech': {
    tech: 'Mindset',
    longDesc: 'El micelio es una metáfora de cómo aprendemos: pequeñas conexiones que forman una red inmensa. Empieza por lo básico y deja que la curiosidad guíe tu crecimiento.',
    code: '// El viaje comienza\nconsole.log("Hello, World!");'
  },
  'Python': {
    tech: 'Language',
    longDesc: 'Python es un lenguaje interpretado de alto nivel conocido por su legibilidad. Es el estándar de oro para IA, ciencia de datos y automatización.',
    code: 'def greet(name):\n    return f"Hola, {name}!"\n\nprint(greet("Semilla"))'
  },
  'IA & Machine Learning': {
    tech: 'Concept',
    longDesc: 'Disciplina que permite a las computadoras aprender de los datos sin ser programadas explícitamente. Se divide en aprendizaje supervisado, no supervisado y por refuerzo.',
    code: 'from sklearn.model_selection import train_test_split\n\n# Dividir datos para entrenar\nX_train, X_test, y_train, y_test = train_test_split(X, y)'
  },
  'TensorFlow': {
    tech: 'Library',
    longDesc: 'Plataforma de código abierto de Google para el aprendizaje automático de extremo a extremo, especialmente potente para Deep Learning.',
    code: 'import tensorflow as tf\n\nmodel = tf.keras.Sequential([\n  tf.keras.layers.Dense(128, activation="relu"),\n  tf.keras.layers.Dense(10)\n])'
  },
  'PyTorch': {
    tech: 'Library',
    longDesc: 'Framework de aprendizaje automático desarrollado por Meta que destaca por su flexibilidad y facilidad para el prototipado de modelos complejos.',
    code: 'import torch\nimport torch.nn as nn\n\nclass Net(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.fc = nn.Linear(10, 2)'
  },
  'FastAPI': {
    tech: 'Framework',
    longDesc: 'Framework moderno y rápido para construir APIs con Python basado en tipos estándar de Python 3.7+.',
    code: 'from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\ndef read_root():\n    return {"Hello": "Mycelium"}'
  },
  'JavaScript': {
    tech: 'Language',
    longDesc: 'El lenguaje de programación de la web. Permite crear interfaces interactivas y dinámicas en el navegador y el servidor.',
    code: 'const double = (n) => n * 2;\nconst numbers = [1, 2, 3];\nconsole.log(numbers.map(double));'
  },
  'React': {
    tech: 'Library',
    longDesc: 'Librería de Facebook para construir interfaces de usuario basadas en componentes declarativos y reutilizables.',
    code: 'function Welcome() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}'
  },
  'Next.js': {
    tech: 'Framework',
    longDesc: 'El framework de React para la web. Ofrece renderizado en el servidor (SSR) y generación de sitios estáticos (SSG) de forma nativa.',
    code: 'export default async function Page() {\n  const data = await fetch("https://api...");\n  return <h1>{data.title}</h1>;\n}'
  },
  'PostgreSQL': {
    tech: 'Database',
    longDesc: 'Sistema de gestión de bases de datos relacionales de código abierto avanzado, conocido por su fiabilidad y cumplimiento de estándares.',
    code: 'SELECT users.name, orders.total \nFROM users \nJOIN orders ON users.id = orders.user_id \nWHERE total > 100;'
  },
  'Prisma': {
    tech: 'ORM',
    longDesc: 'ORM de nueva generación para Node.js y TypeScript que hace que trabajar con bases de datos sea fácil y seguro.',
    code: 'const user = await prisma.user.create({\n  data: {\n    email: "angel@lunivex.com",\n    name: "Lunivex Seed",\n  },\n})'
  },
  'Zustand': {
    tech: 'State Management',
    longDesc: 'Una solución de gestión de estado pequeña, rápida y escalable. Muy popular por su simplicidad comparada con Redux.',
    code: 'const useStore = create((set) => ({\n  seeds: 0,\n  addSeed: () => set((state) => ({ seeds: state.seeds + 1 })),\n}))'
  }
};

const SidePanel = () => {
  const { selectedNode } = useMyceliumStore();

  if (!selectedNode) return null;

  const label = selectedNode.data.label;
  const data = selectedNode.data;
  const info = KNOWLEDGE_BASE[label] || { 
    tech: data.type || 'Concept', 
    longDesc: data.description, 
    code: '// Código en proceso de germinación...\nconsole.log("Explorando...");' 
  };

  const IconComponent = (Icons[data.icon as keyof typeof Icons] as LucideIcon) || Icons.HelpCircle;

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '380px',
        maxHeight: 'calc(100vh - 40px)',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(224, 247, 250, 0.2)',
        borderRadius: 'var(--border-radius)',
        padding: '28px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
        zIndex: 100,
        color: 'var(--text-primary)',
        animation: 'slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div style={{ 
          padding: '10px', 
          borderRadius: '12px', 
          background: 'rgba(224, 247, 250, 0.05)',
          border: '1px solid rgba(224, 247, 250, 0.1)'
        }}>
          <IconComponent size={24} color="var(--cyan-ethereal)" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', letterSpacing: '0.5px' }}>{label}</h2>
          <span style={{ fontSize: '10px', color: 'var(--mint-tech)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            {info.tech}
          </span>
        </div>
      </div>

      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '28px' }}>
        {info.longDesc}
      </p>

      <div style={{ position: 'relative', background: '#050505', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
        <div style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '10px', color: 'rgba(255,255,255,0.2)' }}>
          READONLY
        </div>
        <pre style={{ margin: 0, fontSize: '13px', color: 'var(--cyan-ethereal)', fontFamily: '"Fira Code", monospace', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
          {info.code}
        </pre>
      </div>

      <button
        style={{
          width: '100%',
          padding: '14px',
          background: 'transparent',
          border: '1px solid var(--angelic-gold)',
          borderRadius: '10px',
          color: 'var(--angelic-gold)',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '14px',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 249, 196, 0.05)';
          e.currentTarget.style.boxShadow = 'var(--glow-gold)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <Icons.Trophy size={18} />
        Sincronizar Conocimiento
      </button>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        pre::-webkit-scrollbar {
          height: 4px;
        }
        pre::-webkit-scrollbar-thumb {
          background: rgba(224, 247, 250, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default SidePanel;
