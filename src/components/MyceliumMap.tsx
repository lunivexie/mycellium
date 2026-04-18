import { useCallback, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  ReactFlowProvider, 
  useReactFlow,
  type Connection,
  type Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useMyceliumStore } from '../store/useMyceliumStore';
import LunivexCardNode from './LunivexCardNode';

const nodeTypes = {
  lunivex: LunivexCardNode,
};

const INITIAL_NODES_DATA: Record<string, any[]> = {
  seed: [
    { label: 'Variables', type: 'concept', icon: 'Variable', description: 'Cajas donde guardas información. El primer paso del micelio.' },
    { label: 'Terminal', type: 'tool', icon: 'Terminal', description: 'Tu portal de comandos para hablar con el ordenador.' },
    { label: 'HTML', type: 'concept', icon: 'FileCode', description: 'El esqueleto de la web. Etiquetas y estructura.' },
    { label: 'Python', type: 'concept', icon: 'Zap', description: 'Lenguaje versátil y legible. La puerta a la IA.' },
  ],
  Variables: [
    { label: 'Tipos de Datos', type: 'concept', icon: 'Type', description: 'Nombres, números, verdades y mentiras (booleans).' },
    { label: 'Frustración', type: 'mindset', icon: 'Wind', description: 'Es normal que no funcione a la primera. Respira.' },
    { label: 'JavaScript', type: 'concept', icon: 'Code2', description: 'El lenguaje que da vida a la web interactiva.' },
  ],
  Terminal: [
    { label: 'Git', type: 'tool', icon: 'GitBranch', description: 'Control de versiones. Tu máquina del tiempo de código.' },
    { label: 'Node.js', type: 'tool', icon: 'Server', description: 'JavaScript en el servidor. Potencia pura.' },
  ],
  HTML: [
    { label: 'CSS', type: 'concept', icon: 'Palette', description: 'Estilo y diseño. Colores, fuentes y layouts.' },
    { label: 'Next.js', type: 'tool', icon: 'Layers', description: 'El framework de React para aplicaciones web potentes.' },
  ],
  CSS: [
    { label: 'Flexbox & Grid', type: 'concept', icon: 'Layout', description: 'Sistemas para organizar elementos en el espacio.' },
    { label: 'Diseño UI', type: 'mindset', icon: 'Figma', description: 'Pensar en el usuario antes de tirar la primera línea.' },
  ],
  JavaScript: [
    { label: 'TypeScript', type: 'concept', icon: 'ShieldCheck', description: 'JavaScript con superpoderes de tipado. Menos errores.' },
    { label: 'React', type: 'tool', icon: 'Atom', description: 'Librería para interfaces de usuario basadas en componentes.' },
    { label: 'Node.js', type: 'tool', icon: 'Server', description: 'Escalabilidad y velocidad en el backend.' },
  ],
  Python: [
    { label: 'IA & Machine Learning', type: 'concept', icon: 'Brain', description: 'Enseñar a las máquinas a aprender de los datos.' },
    { label: 'FastAPI', type: 'tool', icon: 'FastForward', description: 'Creación de APIs rápidas y modernas con Python.' },
  ],
  'IA & Machine Learning': [
    { label: 'Neural Networks', type: 'concept', icon: 'Network', description: 'Modelos inspirados en el cerebro humano.' },
    { label: 'Ética en IA', type: 'mindset', icon: 'Scale', description: 'El poder conlleva responsabilidad. Sesgos y límites.' },
  ],
  TypeScript: [
    { label: 'Interfaces', type: 'concept', icon: 'Database', description: 'Contratos que definen la forma de tus datos.' },
    { label: 'Next.js', type: 'tool', icon: 'Rocket', description: 'Fullstack con la seguridad de TypeScript.' },
  ],
  'Node.js': [
    { label: 'Express', type: 'tool', icon: 'Activity', description: 'El estándar para crear servidores web minimalistas.' },
    { label: 'C#', type: 'concept', icon: 'Hash', description: 'Lenguaje robusto de Microsoft para todo tipo de apps.' },
  ],
  'C#': [
    { label: '.NET', type: 'tool', icon: 'Box', description: 'Plataforma para construir apps de escritorio, web y móvil.' },
    { label: 'Unity', type: 'tool', icon: 'Gamepad2', description: 'Motor de videojuegos líder en la industria.' },
    { label: 'F#', type: 'concept', icon: 'Binary', description: 'Programación funcional elegante en el ecosistema .NET.' },
  ],
  'F#': [
    { label: 'Inmutabilidad', type: 'concept', icon: 'Lock', description: 'Datos que no cambian. Código predecible y seguro.' },
  ],
};

const MyceliumMap = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const connectingNodeId = useRef<string | null>(null);
  const { project } = useReactFlow();
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    addNode,
    setSelectedNode 
  } = useMyceliumStore();

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event: any) => {
      const targetIsPane = (event.target as Element).classList.contains('react-flow__pane');

      if (targetIsPane && connectingNodeId.current) {
        const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : (event as MouseEvent);
        const position = project({ x: clientX, y: clientY });
        
        const sourceNode = nodes.find(n => n.id === connectingNodeId.current);
        const sourceLabel = sourceNode?.data.label;
        
        const possibleNewNodes = INITIAL_NODES_DATA[sourceLabel] || INITIAL_NODES_DATA['seed'];
        const data = possibleNewNodes[Math.floor(Math.random() * possibleNewNodes.length)];
        
        const newNodeId = `${data.label}-${Date.now()}`;
        const newNode: Node = {
          id: newNodeId,
          type: 'lunivex',
          position,
          data: { ...data },
        };

        addNode(newNode);
        
        onConnect({
          source: connectingNodeId.current,
          sourceHandle: null,
          target: newNodeId,
          targetHandle: null,
        } as Connection);
      }
      
      connectingNodeId.current = null;
    },
    [project, addNode, onConnect, nodes]
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onPaneClick = () => {
    setSelectedNode(null);
  };

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#111" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <MyceliumMap />
  </ReactFlowProvider>
);
