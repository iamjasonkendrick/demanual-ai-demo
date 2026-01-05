import { useEffect, useState } from 'react';

import { Zap } from 'lucide-react';

import { Globe } from './globe';

export default function AuthInfo() {
  const [activeKeyword, setActiveKeyword] = useState(0);
  const keywords = ['OPERATIONS', 'SALES', 'MARKETING', 'CAMPAIGNS', 'SUPPORT'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveKeyword((prev) => (prev + 1) % keywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='group border/50 relative flex h-[30%] w-full flex-col justify-between overflow-hidden border-r md:h-full dark:bg-zinc-900/20'>
      <div className='absolute inset-0 z-0'>
        <Globe />
      </div>
      <div className='pointer-events-none relative z-10 flex h-full flex-col p-8 lg:p-14'>
        <div className='pointer-events-auto flex items-start justify-between'>
          <div className='flex items-center gap-4'>
            <a
              href='/'
              className='flex items-center gap-2 font-semibold text-xl'
            >
              Demanual AI
            </a>
          </div>

          <div className='border/5 hidden items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm backdrop-blur-md xl:flex'>
            <Zap className='h-3 w-3 fill-primary text-primary dark:fill-chart-2 dark:text-chart-2' />
            <span className='font-medium font-mono text-[10px] text-foreground'>
              SYSTEM ONLINE
            </span>
          </div>
        </div>

        <div className='pointer-events-auto mt-auto pt-10'>
          <div className='mb-8 grid grid-cols-3 gap-8 border-border border-t pt-8 backdrop-blur-[2px]'>
            <div>
              <div className='flex items-baseline gap-1'>
                <span className='font-bold font-display text-3xl text-foreground'>
                  500
                </span>
                <span className='font-bold text-lg text-primary dark:text-chart-2'>
                  +
                </span>
              </div>
              <p className='mt-1 font-mono text-muted-foreground text-xs uppercase'>
                Processes Automated
              </p>
            </div>
            <div>
              <div className='flex items-baseline gap-1'>
                <span className='font-bold font-display text-3xl text-foreground'>
                  50
                </span>
                <span className='font-bold text-lg text-primary dark:text-chart-2'>
                  +
                </span>
              </div>
              <p className='mt-1 font-mono text-muted-foreground text-xs uppercase'>
                Projects Completed
              </p>
            </div>
            <div>
              <div className='flex items-baseline gap-1'>
                <span className='font-bold font-display text-3xl text-foreground'>
                  100
                </span>
                <span className='font-bold text-lg text-primary dark:text-chart-2'>
                  %
                </span>
              </div>
              <p className='mt-1 font-mono text-muted-foreground text-xs uppercase'>
                On-time Delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='pointer-events-auto absolute bottom-0 left-0 z-20 flex h-12 w-full items-center overflow-hidden whitespace-nowrap border-border/40 border-t bg-white/80 backdrop-blur-sm dark:bg-zinc-900/50'>
        <div className='flex animate-marquee items-center gap-8 px-4'>
          {[...Array(6)].map((_, i) => (
            <div className='flex items-center justify-center gap-8' key={i}>
              <span className='font-bold font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]'>
                Intelligent Automation
              </span>
              <span className='text-primary'>•</span>
              <span className='font-bold font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]'>
                AI Solutions
              </span>
              <span className='text-primary'>•</span>
              <span className='font-bold font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]'>
                Workflow Optimization
              </span>
              <span className='text-primary'>•</span>
              <span className='font-bold font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]'>
                Scaling
              </span>
              <span className='text-primary'>•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
