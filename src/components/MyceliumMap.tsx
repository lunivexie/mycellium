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
    { label: 'Variables', type: 'concept', icon: 'Variable', description: 'El primer paso del micelio.' },
    { label: 'Terminal', type: 'tool', icon: 'Terminal', description: 'Tu portal de comandos.' },
    { label: 'HTML', type: 'concept', icon: 'FileCode', description: 'El esqueleto de la web.' },
    { label: 'Python', type: 'concept', icon: 'Zap', description: 'La puerta a la IA y la Ciencia de Datos.' },
  ],
  Python: [
    { label: 'IA & Machine Learning', type: 'concept', icon: 'Brain', description: 'Enseñar a las máquinas a aprender.' },
    { label: 'Data Science', type: 'concept', icon: 'Database', description: 'Extraer valor y predicciones de los datos.' },
    { label: 'FastAPI', type: 'tool', icon: 'Zap', description: 'Backend moderno y rápido con Python.' },
  ],
  'IA & Machine Learning': [
    { label: 'Scikit-learn', type: 'tool', icon: 'Settings', description: 'Librería estándar para algoritmos de Machine Learning.' },
    { label: 'TensorFlow', type: 'tool', icon: 'Cpu', description: 'La potencia de Google para Redes Neuronales.' },
    { label: 'PyTorch', type: 'tool', icon: 'Flame', description: 'La herramienta favorita de los investigadores de IA.' },
  ],
  'Data Science': [
    { label: 'Pandas', type: 'tool', icon: 'Table', description: 'Manipulación de tablas de datos masivas.' },
    { label: 'NumPy', type: 'tool', icon: 'Hash', description: 'Cálculo matemático de alto rendimiento.' },
  ],
  JavaScript: [
    { label: 'React', type: 'tool', icon: 'Atom', description: 'Interfaces de usuario modernas y declarativas.' },
    { label: 'TypeScript', type: 'concept', icon: 'ShieldCheck', description: 'Seguridad y orden para tu código JS.' },
    { label: 'Node.js', type: 'tool', icon: 'Server', description: 'JavaScript en el servidor.' },
  ],
  React: [
    { label: 'Next.js', type: 'tool', icon: 'Rocket', description: 'El estándar para apps web de alto rendimiento.' },
    { label: 'Zustand', type: 'tool', icon: 'Box', description: 'Gestión de estado simple y potente (¡como esta app!).' },
    { label: 'Tailwind CSS', type: 'tool', icon: 'Palette', description: 'Estilizado rápido mediante utilidades.' },
  ],
  'Node.js': [
    { label: 'Express', type: 'tool', icon: 'Activity', description: 'Servidores web rápidos y minimalistas.' },
    { label: 'Databases', type: 'concept', icon: 'HardDrive', description: 'Donde vive la memoria de tus aplicaciones.' },
  ],
  Databases: [
    { label: 'PostgreSQL', type: 'tool', icon: 'Database', description: 'La base de datos SQL más avanzada y robusta.' },
    { label: 'MongoDB', type: 'tool', icon: 'Leaf', description: 'Almacenamiento flexible basado en documentos.' },
    { label: 'Prisma', type: 'tool', icon: 'Compass', description: 'La forma más moderna de hablar con tu base de datos.' },
  ],
  'C#': [
    { label: 'Unity', type: 'tool', icon: 'Gamepad2', description: 'Crea mundos y experiencias en 3D y 2D.' },
    { label: '.NET Core', type: 'tool', icon: 'Box', description: 'Backend empresarial escalable.' },
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
