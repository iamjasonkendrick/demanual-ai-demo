import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

import { ThemeToggle } from '@/components/ui/theme-toggle';

import AuthInfo from '../../components/auth/auth-info';

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
});

function AuthLayout() {
  const location = useLocation();
  const isAuthRootPage = ['/login', '/signup'].some((path) =>
    location.pathname.endsWith(path),
  );

  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <div className='hidden lg:block'>
        <AuthInfo />
      </div>
      <div className='relative flex w-full flex-col bg-white shadow-2xl shadow-black/5 dark:bg-background'>
        <div className='absolute top-8 right-8 left-8 z-10 flex items-center justify-between md:top-12 md:right-12 md:left-12'>
          {!isAuthRootPage ? (
            <button
              type='button'
              onClick={() => window.history.back()}
              className='flex items-center gap-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground'
            >
              <ArrowLeftIcon className='size-4' /> Back
            </button>
          ) : (
            <div />
          )}
          <div className='flex items-center gap-6'>
            <ThemeToggle />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
