import { useMemo } from 'react';

import useToastStore from '@/stores/toast';

function useRenderToast() {
  const { renderToast } = useToastStore(['renderToast']);

  return useMemo(() => renderToast, []);
}

export default useRenderToast;
