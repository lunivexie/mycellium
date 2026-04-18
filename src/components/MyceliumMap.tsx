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

// Alquimia de Conocimiento: El corazón de la interactividad
const SYNERGIES: Record<string, any[]> = {
  'IA & Machine Learning+Python': [
    { label: 'Scikit-learn', type: 'tool', icon: 'Settings', description: 'Algoritmos de ML.' },
    { label: 'TensorFlow', type: 'tool', icon: 'Cpu', description: 'Redes neuronales.' },
    { label: 'PyTorch', type: 'tool', icon: 'Flame', description: 'Investigación de IA.' },
  ],
  'Data Science+Python': [
    { label: 'Pandas', type: 'tool', icon: 'Table', description: 'Limpieza de datos.' },
    { label: 'NumPy', type: 'tool', icon: 'Hash', description: 'Matrices numéricas.' },
  ],
  'JavaScript+React': [
    { label: 'Next.js', type: 'tool', icon: 'Rocket', description: 'Fullstack React.' },
    { label: 'Zustand', type: 'tool', icon: 'Box', description: 'Estado global.' },
    { label: 'Framer Motion', type: 'tool', icon: 'Move', description: 'Animaciones mágicas.' },
  ],
  'Databases+Node.js': [
    { label: 'Prisma', type: 'tool', icon: 'Compass', description: 'ORM Moderno.' },
    { label: 'Express', type: 'tool', icon: 'Activity', description: 'Servidor minimalista.' },
  ],
  'HTML+CSS': [
    { label: 'Flexbox & Grid', type: 'concept', icon: 'Layout', description: 'Control espacial.' },
    { label: 'Diseño Responsivo', type: 'concept', icon: 'Smartphone', description: 'Adaptación de pantalla.' },
  ],
  'CSS+JavaScript': [
    { label: 'Tailwind CSS', type: 'tool', icon: 'Palette', description: 'Estilos por código.' },
    { label: 'Framer Motion', type: 'tool', icon: 'Sparkles', description: 'Interactividad visual.' },
  ],
  'Node.js+React': [
    { label: 'Fullstack App', type: 'mindset', icon: 'Globe', description: 'Aplicación completa.' },
    { label: 'Autenticación', type: 'concept', icon: 'Lock', description: 'Seguridad de usuario.' },
  ],
  'C#+Unity': [
    { label: 'Shaders', type: 'concept', icon: 'Sun', description: 'Visuales de juego.' },
    { label: 'Game Physics', type: 'concept', icon: 'Wind', description: 'Leyes físicas digitales.' },
  ],
  'Next.js+Prisma': [
    { label: 'PostgreSQL', type: 'tool', icon: 'Database', description: 'Base de datos ideal.' },
  ],
  'Variables+Bucles': [
    { label: 'Lógica de Control', type: 'concept', icon: 'Workflow', description: 'Flujo de ejecución.' },
  ],
  'Funciones+Variables': [
    { label: 'Scope (Alcance)', type: 'concept', icon: 'Target', description: 'Donde viven tus datos.' },
  ],
};

const INITIAL_NODES_DATA: Record<string, any[]> = {
  seed: [
    { label: 'Variables', type: 'concept', icon: 'Variable', description: 'El primer paso del micelio.' },
    { label: 'Bucles', type: 'concept', icon: 'Repeat', description: 'Automatización y repetición.' },
    { label: 'Funciones', type: 'concept', icon: 'Cpu', description: 'Bloques de código reutilizables.' },
    { label: 'Terminal', type: 'tool', icon: 'Terminal', description: 'Tu portal de comandos.' },
    { label: 'HTML', type: 'concept', icon: 'FileCode', description: 'El esqueleto de la web.' },
    { label: 'Python', type: 'concept', icon: 'Zap', description: 'La puerta a la IA y la Ciencia de Datos.' },
    { label: 'C#', type: 'concept', icon: 'Hash', description: 'Lenguaje robusto para apps y juegos.' },
  ],
  Python: [
    { label: 'IA & Machine Learning', type: 'concept', icon: 'Brain', description: 'Enseñar a las máquinas a aprender.' },
    { label: 'Data Science', type: 'concept', icon: 'Database', description: 'Extraer valor y predicciones de los datos.' },
    { label: 'FastAPI', type: 'tool', icon: 'Zap', description: 'Backend moderno y rápido con Python.' },
  ],
  JavaScript: [
    { label: 'React', type: 'tool', icon: 'Atom', description: 'Interfaces de usuario basadas en componentes.' },
    { label: 'Node.js', type: 'tool', icon: 'Server', description: 'JavaScript en el servidor.' },
  ],
  'Node.js': [
    { label: 'Databases', type: 'concept', icon: 'HardDrive', description: 'Persistencia de datos.' },
  ],
  HTML: [
    { label: 'CSS', type: 'concept', icon: 'Palette', description: 'Estilo y diseño web.' },
    { label: 'JavaScript', type: 'concept', icon: 'Code2', description: 'Lógica web.' },
  ],
  'C#': [
    { label: 'Unity', type: 'tool', icon: 'Gamepad2', description: 'Desarrollo de videojuegos.' },
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

  const handleSynergy = useCallback((sourceId: string, targetId: string) => {
    const sourceNode = nodes.find(n => n.id === sourceId);
    const targetNode = nodes.find(n => n.id === targetId);
    
    if (!sourceNode || !targetNode) return;

    const labels = [sourceNode.data.label, targetNode.data.label].sort();
    const synergyKey = `${labels[0]}+${labels[1]}`;
    
    const synergyResults = SYNERGIES[synergyKey];
    
    if (synergyResults) {
      synergyResults.forEach((data, index) => {
        const newNodeId = `${data.label}-${Date.now()}-${index}`;
        const position = {
          x: targetNode.position.x + (index - 1) * 250,
          y: targetNode.position.y + 250
        };

        const newNode: Node = {
          id: newNodeId,
          type: 'lunivex',
          position,
          data: { ...data },
        };

        addNode(newNode);
        
        onConnect({
          source: targetId,
          sourceHandle: null,
          target: newNodeId,
          targetHandle: null,
        } as Connection);
      });
    }
  }, [nodes, addNode, onConnect]);

  const onConnectStart = useCallback((_: any, { nodeId }: any) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectInternal = useCallback((params: Connection) => {
    onConnect(params);
    if (params.source && params.target) {
      handleSynergy(params.source, params.target);
    }
  }, [onConnect, handleSynergy]);

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
        onConnect={onConnectInternal}
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
