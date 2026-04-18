import { create } from 'zustand';
import { 
  addEdge, 
  applyNodeChanges, 
  applyEdgeChanges,
  type Connection, 
  type Edge, 
  type EdgeChange, 
  type Node, 
  type NodeChange, 
  type OnNodesChange, 
  type OnEdgesChange, 
  type OnConnect, 
} from 'reactflow';

interface MyceliumState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void;
  setSelectedNode: (node: Node | null) => void;
}

const initialNodes: Node[] = [
  {
    id: 'seed',
    type: 'lunivex',
    position: { x: 0, y: 0 },
    data: { 
      label: 'Inicio: La Semilla Tech', 
      type: 'mindset', 
      icon: 'Sprout',
      description: 'Tu viaje comienza aquí. El conocimiento es como un micelio: todo está conectado.'
    },
  },
];

export const useMyceliumStore = create<MyceliumState>((set, get) => ({
  nodes: initialNodes,
  edges: [],
  selectedNode: null,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    const newEdge = { 
      ...connection, 
      className: 'gold-glow', 
      animated: true 
    };
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },
  addNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  setSelectedNode: (node: Node | null) => {
    set({
      selectedNode: node,
    });
  },
}));
