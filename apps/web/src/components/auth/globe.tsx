import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Box, Image as ImageIcon, Layers, Sparkles, Zap } from 'lucide-react';

import { cn } from '@/lib/utils';

interface GlobeProps {
  className?: string;
}

// -----------------------------------------------------------------------------
// Types & Data
// -----------------------------------------------------------------------------

type NodeType = 'input' | 'process' | 'output';

interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  icon: React.ElementType;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  color: string;
  content?: string;
  delay: number; // Animation delay
}

interface Connection {
  from: string;
  to: string;
}

const NODES: NodeData[] = [
  {
    id: 'source',
    type: 'input',
    label: 'Input Source',
    icon: Box,
    x: 10,
    y: 50,
    color: 'emerald',
    content: 'User Data',
    delay: 0,
  },
  {
    id: 'process1',
    type: 'process',
    label: 'Enrichment',
    icon: Zap,
    x: 35,
    y: 30,
    color: 'blue',
    delay: 1,
  },
  {
    id: 'process2',
    type: 'process',
    label: 'AI Analysis',
    icon: Sparkles,
    x: 35,
    y: 70,
    color: 'purple',
    delay: 1.5,
  },
  {
    id: 'transform',
    type: 'process',
    label: 'Transform',
    icon: Layers,
    x: 60,
    y: 50,
    color: 'amber',
    delay: 2,
  },
  {
    id: 'output',
    type: 'output',
    label: 'Final Output',
    icon: ImageIcon,
    x: 85,
    y: 50,
    color: 'pink',
    content: 'Result',
    delay: 3,
  },
];

const CONNECTIONS: Connection[] = [
  { from: 'source', to: 'process1' },
  { from: 'source', to: 'process2' },
  { from: 'process1', to: 'transform' },
  { from: 'process2', to: 'transform' },
  { from: 'transform', to: 'output' },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Globe: React.FC<GlobeProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle Resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Helper to get absolute coordinates
  const getPos = (node: NodeData) => ({
    x: (node.x / 100) * dimensions.width,
    y: (node.y / 100) * dimensions.height,
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-200',
        className,
      )}
    >
      {/* Dynamic Grid Background */}
      <div
        className='pointer-events-none absolute inset-0'
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.1,
        }}
      />

      {/* Background Glows */}
      <div
        className='absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]'
        aria-hidden='true'
      />
      <div
        className='absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-blue-500/10 blur-[120px]'
        aria-hidden='true'
      />

      {/* SVG Connections Layer */}
      <svg
        className='pointer-events-none absolute inset-0 h-full w-full'
        aria-hidden='true'
      >
        {dimensions.width > 0 &&
          CONNECTIONS.map((conn, i) => {
            const fromNode = NODES.find((n) => n.id === conn.from);
            const toNode = NODES.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const start = getPos(fromNode);
            const end = getPos(toNode);

            // Simple Bezier Curve
            const controlPoint1 = {
              x: start.x + (end.x - start.x) * 0.5,
              y: start.y,
            };
            const controlPoint2 = {
              x: end.x - (end.x - start.x) * 0.5,
              y: end.y,
            };

            const pathD = `M ${start.x} ${start.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${end.x} ${end.y}`;

            return (
              <g key={`${conn.from}-${conn.to}`}>
                {/* Background Line */}
                <path
                  d={pathD}
                  fill='none'
                  className='stroke-neutral-300 dark:stroke-neutral-800'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                {/* Animated Particle */}
                <circle r='3' className='fill-blue-500 dark:fill-white'>
                  <animateMotion
                    dur={`${2 + i * 0.5}s`}
                    repeatCount='indefinite'
                    path={pathD}
                    keyPoints='0;1'
                    keyTimes='0;1'
                    calcMode='linear'
                  />
                </circle>
              </g>
            );
          })}
      </svg>

      {/* Nodes Layer */}
      {NODES.map((node) => (
        <div
          key={node.id}
          className='absolute flex flex-col items-center gap-2'
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            animation: 'float 6s ease-in-out infinite',
            animationDelay: `${node.delay}s`,
          }}
        >
          {/* Card */}
          <div
            className={cn(
              'relative flex items-center gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md transition-transform hover:scale-105',
              'border-neutral-200 bg-white/80 dark:border-neutral-800 dark:bg-neutral-900/80',
              `shadow-${node.color}-500/20`,
            )}
          >
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg border bg-linear-to-b shadow-inner',
                node.color === 'emerald' &&
                  'border-emerald-500/30 from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400',
                node.color === 'blue' &&
                  'border-blue-500/30 from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400',
                node.color === 'purple' &&
                  'border-purple-500/30 from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400',
                node.color === 'pink' &&
                  'border-pink-500/30 from-pink-500/20 to-pink-500/5 text-pink-600 dark:text-pink-400',
                node.color === 'amber' &&
                  'border-amber-500/30 from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400',
              )}
            >
              <node.icon className='h-5 w-5' />
            </div>

            <div className='flex flex-col'>
              <span className='font-medium text-neutral-500 text-xs uppercase tracking-wider dark:text-neutral-400'>
                {node.type}
              </span>
              <span className='font-semibold text-neutral-900 text-sm dark:text-neutral-100'>
                {node.label}
              </span>
            </div>

            {/* Active Dot */}
            <div
              className={cn(
                'absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-neutral-900',
                node.color === 'emerald' && 'bg-emerald-400',
                node.color === 'blue' && 'bg-blue-400',
                node.color === 'purple' && 'bg-purple-400',
                node.color === 'pink' && 'bg-pink-400',
                node.color === 'amber' && 'bg-amber-400',
              )}
            />

            {/* Glow Effect */}
            <div
              className={cn(
                'absolute inset-0 rounded-xl opacity-20 blur-xl',
                `bg-${node.color}-500`,
              )}
            />
          </div>

          {/* Content (Optional Preview) */}
          {node.content && (
            <div className='mt-2 rounded-md border border-neutral-200 bg-white/50 px-3 py-1.5 font-mono text-[10px] text-neutral-600 dark:border-neutral-800 dark:bg-black/40 dark:text-neutral-400'>
              {node.content}
            </div>
          )}
        </div>
      ))}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0); }
            50% { transform: translate(-50%, -50%) translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};
