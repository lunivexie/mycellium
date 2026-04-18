import { useState, useEffect } from 'react';
import { useMyceliumStore } from '../store/useMyceliumStore';
import * as Icons from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

const KNOWLEDGE_BASE: Record<string, { code: string; longDesc: string; tech: string; quiz?: { q: string; a: string[]; correct: number } }> = {
  'Inicio: La Semilla Tech': {
    tech: 'Mindset',
    longDesc: 'El micelio es una metáfora de cómo aprendemos: pequeñas conexiones que forman una red inmensa. Empieza por lo básico y deja que la curiosidad guíe tu crecimiento.',
    code: '// El viaje comienza\nconsole.log("Hello, World!");'
  },
  'Variables': {
    tech: 'Concept',
    longDesc: 'Las variables son contenedores para almacenar datos. Imagínalas como cajas con una etiqueta (nombre) y un contenido (valor).',
    code: 'let user = "Angel";\nconst id = 12345;\nvar oldWay = true;',
    quiz: {
      q: '¿Cuál es la forma moderna y recomendada de declarar una variable que puede cambiar?',
      a: ['var', 'let', 'const', 'set'],
      correct: 1
    }
  },
  'Bucles': {
    tech: 'Concept',
    longDesc: 'Los bucles permiten ejecutar un bloque de código repetidamente mientras se cumpla una condición. Son el motor de la automatización.',
    code: 'for (let i = 0; i < 5; i++) {\n  console.log("Germinando semilla #" + i);\n}',
    quiz: {
      q: '¿Qué palabra clave se usa para recorrer un arreglo en JavaScript?',
      a: ['while', 'if', 'forEach', 'return'],
      correct: 2
    }
  },
  'Funciones': {
    tech: 'Concept',
    longDesc: 'Las funciones son bloques de código reutilizables diseñados para realizar una tarea particular. Ayudan a mantener el micelio organizado.',
    code: 'function germinar(tipo) {\n  return `Planta de ${tipo} creada`;\n}\n\nconst miPlanta = germinar("Cian");',
    quiz: {
      q: '¿Cómo se llama a una función que se define sin nombre y se guarda en una variable?',
      a: ['Función Anónima', 'Función Estática', 'Función Nula', 'Función Global'],
      correct: 0
    }
  },
  'Python': {
    tech: 'Language',
    longDesc: 'Python es un lenguaje interpretado de alto nivel conocido por su legibilidad. Es el estándar de oro para IA, ciencia de datos y automatización.',
    code: 'def greet(name):\n    return f"Hola, {name}!"\n\nprint(greet("Semilla"))',
    quiz: {
      q: '¿Qué indentación usa Python por convención?',
      a: ['2 espacios', '4 espacios', 'Tabuladores', 'No requiere'],
      correct: 1
    }
  },
  'IA & Machine Learning': {
    tech: 'Concept',
    longDesc: 'Disciplina que permite a las computadoras aprender de los datos sin ser programadas explícitamente.',
    code: 'from sklearn.model_selection import train_test_split\n\n# Dividir datos para entrenar\nX_train, X_test, y_train, y_test = train_test_split(X, y)',
    quiz: {
      q: '¿Qué tipo de aprendizaje usa datos etiquetados?',
      a: ['No supervisado', 'Por refuerzo', 'Supervisado', 'Cuántico'],
      correct: 2
    }
  },
  // ... (se pueden expandir más)
};

const SidePanel = () => {
  const { selectedNode } = useMyceliumStore();
  const [quizState, setQuizState] = useState<{ answered: boolean; correct: boolean | null }>({ answered: false, correct: null });

  useEffect(() => {
    setQuizState({ answered: false, correct: null });
  }, [selectedNode]);

  if (!selectedNode) return null;

  const label = selectedNode.data.label;
  const data = selectedNode.data;
  const info = KNOWLEDGE_BASE[label] || { 
    tech: data.type || 'Concept', 
    longDesc: data.description, 
    code: '// Código en proceso de germinación...\nconsole.log("Explorando...");' 
  };

  const handleQuiz = (index: number) => {
    if (info.quiz) {
      setQuizState({ answered: true, correct: index === info.quiz.correct });
    }
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
        <pre style={{ margin: 0, fontSize: '13px', color: 'var(--cyan-ethereal)', fontFamily: '"Fira Code", monospace', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
          {info.code}
        </pre>
      </div>

      {info.quiz && !quizState.answered && (
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: 'var(--angelic-gold)' }}>Desafío de Germinación:</h4>
          <p style={{ fontSize: '13px', marginBottom: '15px' }}>{info.quiz.q}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {info.quiz.a.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuiz(i)}
                style={{
                  padding: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  color: 'white',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'all 0.2s'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {quizState.answered && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          background: quizState.correct ? 'rgba(178, 223, 219, 0.1)' : 'rgba(255, 138, 128, 0.1)',
          borderRadius: '12px',
          border: `1px solid ${quizState.correct ? 'var(--mint-tech)' : '#ff8a80'}`,
          animation: 'fadeIn 0.5s'
        }}>
          {quizState.correct ? (
            <>
              <Icons.CheckCircle size={32} color="var(--mint-tech)" style={{ marginBottom: '10px' }} />
              <div style={{ color: 'var(--mint-tech)', fontWeight: '600' }}>¡Conocimiento Sincronizado!</div>
              <p style={{ fontSize: '12px', marginTop: '5px', color: 'var(--text-secondary)' }}>Has fortalecido este nodo en tu micelio.</p>
            </>
          ) : (
            <>
              <Icons.XCircle size={32} color="#ff8a80" style={{ marginBottom: '10px' }} />
              <div style={{ color: '#ff8a80', fontWeight: '600' }}>Error de Conexión</div>
              <p style={{ fontSize: '12px', marginTop: '5px', color: 'var(--text-secondary)' }}>Vuelve a leer la descripción e inténtalo de nuevo.</p>
              <button 
                onClick={() => setQuizState({ answered: false, correct: null })}
                style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px', marginTop: '10px' }}
              >
                Reintentar
              </button>
            </>
          )}
        </div>
      )}

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
