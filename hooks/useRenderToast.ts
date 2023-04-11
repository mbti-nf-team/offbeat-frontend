import { useMemo } from 'react';

import useToastStore from 'stores/toast';
import { shallow } from 'zustand/shallow';

function useRenderToast() {
  const { renderToast } = useToastStore((state) => ({
    renderToast: state.renderToast,
  }), shallow);

  return useMemo(() => renderToast, []);
}

export default useRenderToast;
