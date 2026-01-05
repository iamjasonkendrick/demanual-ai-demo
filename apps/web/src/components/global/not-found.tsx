import { Link } from '@tanstack/react-router';
import {
  ChevronRightIcon,
  CloudIcon,
  FolderIcon,
  HeartIcon,
  HomeIcon,
  InfoIcon,
  SparklesIcon,
  ZapIcon,
} from 'lucide-react';

const navigationLinks = [
  {
    to: '/',
    icon: HomeIcon,
    title: 'Home Page',
    description: "There's no place like home...",
  },
  {
    to: '/dashboard',
    icon: FolderIcon,
    title: 'Dashboard',
    description: 'Where the magic happens',
  },
  {
    to: '/login',
    icon: InfoIcon,
    title: 'Sign In',
    description: 'Get back on track',
  },
] as const;

export default function NotFound() {
  return (
    <div className='relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-muted/30 to-background px-4 py-20 font-outfit'>
      {/* Decorative circular arcs */}
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
        <div className='absolute size-[600px] rounded-full border border-muted-foreground/10' />
        <div className='absolute size-[800px] rounded-full border border-muted-foreground/5' />
        <div className='absolute size-[1000px] rounded-full border border-muted-foreground/5' />
      </div>

      {/* Floating decorations */}
      <CloudIcon className='absolute top-[20%] left-[15%] size-8 text-violet-300 opacity-70' />
      <HeartIcon className='absolute top-[25%] right-[15%] size-6 rotate-12 fill-violet-400 text-violet-400' />
      <SparklesIcon className='absolute top-[45%] left-[20%] size-4 text-muted-foreground/40' />
      <SparklesIcon className='absolute top-[50%] right-[22%] size-3 text-muted-foreground/30' />
      <ZapIcon className='absolute top-[35%] right-[25%] size-4 fill-violet-400 text-violet-400' />
      <ZapIcon className='absolute bottom-[40%] left-[25%] size-3 fill-violet-300 text-violet-300' />

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center text-center'>
        <p className='text-muted-foreground text-sm'>Page not found</p>

        <h1 className='relative mt-2 font-bold font-display text-4xl tracking-tighter md:text-5xl lg:text-6xl'>
          <CloudIcon className='absolute -top-2 -left-10 size-8 text-violet-300 opacity-80 md:-left-12' />
          Ooops! You seem lost
          <HeartIcon className='absolute -top-1 -right-8 size-6 rotate-12 fill-violet-400 text-violet-400 md:-right-10' />
        </h1>

        <p className='mt-4 max-w-md text-muted-foreground text-sm leading-relaxed md:text-base'>
          Looks like you've drifted off course. No worries, we've got a way
          back. Head home, check out your dashboard, or sign in again.
        </p>

        {/* UFO Illustration */}
        <div className='relative my-8 flex items-center justify-center md:my-12'>
          <div className='absolute size-48 rounded-full bg-gradient-to-b from-violet-400/20 via-blue-400/10 to-transparent blur-2xl md:size-64' />
          <div className='relative'>
            {/* UFO body */}
            <div className='relative flex size-32 items-center justify-center md:size-40'>
              <div className='absolute inset-x-0 bottom-4 h-8 rounded-full bg-gradient-to-t from-violet-500/30 to-transparent blur-xl' />
              <div className='relative z-10 text-7xl md:text-9xl'>🛸</div>
              <ZapIcon className='absolute -top-2 right-0 size-5 fill-yellow-400 text-yellow-400' />
            </div>
          </div>
          {/* Stars around UFO */}
          <SparklesIcon className='absolute top-0 left-8 size-3 text-muted-foreground/50' />
          <SparklesIcon className='absolute right-6 bottom-4 size-2 text-muted-foreground/40' />
          <SparklesIcon className='absolute bottom-8 left-4 size-2 text-muted-foreground/30' />
        </div>

        {/* Navigation Cards */}
        <div className='flex w-full max-w-md flex-col gap-3'>
          {navigationLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className='group flex items-center gap-4 rounded-2xl border border-white/20 bg-white/60 p-4 shadow-black/5 shadow-lg backdrop-blur-xl transition-all hover:bg-white/80 hover:shadow-xl dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15'
            >
              <div className='flex size-10 items-center justify-center rounded-full bg-background/80 shadow-sm'>
                <link.icon className='size-5 text-foreground' />
              </div>
              <div className='flex-1 text-left'>
                <p className='font-medium text-foreground text-sm'>
                  {link.title}
                </p>
                <p className='text-muted-foreground text-xs'>
                  {link.description}
                </p>
              </div>
              <ChevronRightIcon className='size-5 text-muted-foreground transition-transform group-hover:translate-x-1' />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
