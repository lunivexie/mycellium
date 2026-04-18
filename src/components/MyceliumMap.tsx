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
    { 
      label: 'Variables', 
      type: 'concept', 
      icon: 'Variable', 
      description: 'Cajas donde guardas información. El primer paso del micelio.' 
    },
    { 
      label: 'Terminal', 
      type: 'tool', 
      icon: 'Terminal', 
      description: 'Tu portal de comandos para hablar con el ordenador.' 
    },
  ],
  Variables: [
    { 
      label: 'Tipos de Datos', 
      type: 'concept', 
      icon: 'Type', 
      description: 'Nombres, números, verdades y mentiras (booleans).' 
    },
    { 
      label: 'Frustración', 
      type: 'mindset', 
      icon: 'Wind', 
      description: 'Es normal que no funcione a la primera. Respira.' 
    },
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
