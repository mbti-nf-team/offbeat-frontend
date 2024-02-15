'use client';

import { ReactNode, useState } from 'react';

import { useResizeViewportHeight } from '@nf-team/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  }));

  useResizeViewportHeight();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default Providers;
