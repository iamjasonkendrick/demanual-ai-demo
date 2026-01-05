import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import '../index.css';

export const Route = createRootRouteWithContext()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: 'demanual-ai',
      },
      {
        name: 'description',
        content: 'demanual-ai',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  }),
});

function RootComponent() {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        disableTransitionOnChange
        storageKey='demanual-ai-ui-theme'
      >
        <div className='grid h-svh grid-rows-[auto_1fr] font-outfit'>
          <Outlet />
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position='bottom-left' />
    </>
  );
}
