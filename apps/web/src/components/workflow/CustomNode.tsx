import { Handle, type Node, type NodeProps, Position } from '@xyflow/react';

import { cn } from '@/lib/utils';

export interface CustomNodeData extends Record<string, unknown> {
  label: string;
  content?: string;
  color?: string;
}

export type CustomNodeType = Node<CustomNodeData>;

export function CustomNode({ data, selected }: NodeProps<CustomNodeType>) {
  const { label, content, color = '#3b82f6' } = data;

  return (
    <div
      className={cn(
        'group relative min-w-[180px] rounded-xl border bg-[#1a1a1a] shadow-lg transition-all',
        selected
          ? 'border-blue-500/50 ring-2 ring-blue-500/20'
          : 'border-[#2a2a2a] hover:border-[#3a3a3a]',
      )}
    >
      {/* Input Handle - Left */}
      <Handle
        type='target'
        position={Position.Left}
        className='h-3! w-3! rounded-full! border-2! border-[#1a1a1a]! bg-[#6b7280]!'
        style={{ left: -6 }}
      />

      {/* Main Content */}
      <div className='p-3'>
        {/* Header */}
        <div className='mb-2 flex items-center gap-2'>
          <div
            className='h-2.5 w-2.5 rounded-full'
            style={{ backgroundColor: color }}
          />
          <span className='font-medium text-[#e5e5e5] text-sm'>{label}</span>
        </div>

        {/* Body */}
        {content && (
          <div className='rounded-lg border border-[#2a2a2a] bg-[#111111] p-2.5 text-[#a3a3a3] text-xs'>
            <p>{content}</p>
          </div>
        )}
      </div>

      {/* Output Handle - Right */}
      <Handle
        type='source'
        position={Position.Right}
        className='h-3! w-3! rounded-full! border-2! border-[#1a1a1a]! bg-[#6b7280]!'
        style={{ right: -6 }}
      />
    </div>
  );
}
