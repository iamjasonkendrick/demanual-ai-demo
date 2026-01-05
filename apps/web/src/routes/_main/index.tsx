import { useCallback } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import {
  addEdge,
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  CustomNode,
  type CustomNodeData,
} from '@/components/workflow/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 150 },
    data: {
      label: 'Start',
      content: 'Trigger the workflow',
      color: '#22c55e',
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 400, y: 100 },
    data: {
      label: 'Process',
      content: 'Transform the data',
      color: '#3b82f6',
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 400, y: 280 },
    data: {
      label: 'Filter',
      content: 'Apply conditions',
      color: '#f59e0b',
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 700, y: 190 },
    data: {
      label: 'Output',
      content: 'Send the result',
      color: '#8b5cf6',
    },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#404040', strokeWidth: 2 },
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
    style: { stroke: '#404040', strokeWidth: 2 },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    animated: true,
    style: { stroke: '#404040', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    style: { stroke: '#404040', strokeWidth: 2 },
  },
];

export const Route = createFileRoute('/_main/')({
  component: WorkflowPage,
});

function WorkflowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: '#404040', strokeWidth: 2 },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  const addNode = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const colors = [
      '#22c55e',
      '#3b82f6',
      '#f59e0b',
      '#8b5cf6',
      '#ef4444',
      '#06b6d4',
    ];
    const newNode: Node<CustomNodeData> = {
      id,
      type: 'custom',
      position: { x: Math.random() * 400 + 150, y: Math.random() * 300 + 50 },
      data: {
        label: 'New Node',
        content: 'Configure this node...',
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div className='relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-white'>
      {/* Top Bar */}
      <div className='pointer-events-none absolute top-0 right-0 left-0 z-10 flex items-center justify-between px-4 py-3'>
        <div className='pointer-events-auto'>
          <h1 className='font-semibold text-lg text-white'>Workflow Editor</h1>
        </div>
        <div className='pointer-events-auto flex items-center gap-3'>
          <ThemeToggle />
        </div>
      </div>

      {/* Add Node Button */}
      <div className='pointer-events-auto absolute top-1/2 right-4 z-10 -translate-y-1/2'>
        <Button
          onClick={addNode}
          size='icon'
          className='h-10 w-10 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]'
        >
          <Plus className='h-5 w-5' />
        </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        style={{ background: '#0a0a0a' }}
      >
        <Background
          color='#222'
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
        />
        <Controls className='border! overflow-hidden rounded-lg! border-[#2a2a2a]! bg-[#1a1a1a]! [&>button]:border-[#2a2a2a]! [&>button]:border-b! [&>button]:bg-[#1a1a1a]! [&>button]:fill-[#888]! hover:[&>button]:bg-[#2a2a2a]! hover:[&>button]:fill-white!' />
      </ReactFlow>
    </div>
  );
}
