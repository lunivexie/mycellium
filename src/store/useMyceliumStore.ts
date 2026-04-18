import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  hasInteracted: boolean;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void;
  setSelectedNode: (node: Node | null) => void;
  setHasInteracted: (val: boolean) => void;
  resetProgress: () => void;
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

export const useMyceliumStore = create<MyceliumState>()(
  persist(
    (set, get) => ({
      nodes: initialNodes,
      edges: [],
      selectedNode: null,
      hasInteracted: false,
      onNodesChange: (changes: NodeChange[]) => {
        set({
          nodes: applyNodeChanges(changes, get().nodes),
          hasInteracted: true,
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
          hasInteracted: true,
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
          hasInteracted: true,
        });
      },
      setHasInteracted: (val: boolean) => set({ hasInteracted: val }),
      resetProgress: () => set({ nodes: initialNodes, edges: [], hasInteracted: false, selectedNode: null }),
    }),
    {
      name: 'lunivex-mycelium-storage',
    }
  )
);
