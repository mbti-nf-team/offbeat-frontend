'use client';

import { ReactNode } from 'react';

import { useResizeViewportHeight } from '@nf-team/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Providers({ children }: { children: ReactNode }) {
  useResizeViewportHeight();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default Providers;
