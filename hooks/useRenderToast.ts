import { useMemo } from 'react';

import { shallow } from 'zustand/shallow';

import useToastStore from 'stores/toast';

function useRenderToast() {
  const { renderToast } = useToastStore((state) => ({
    renderToast: state.renderToast,
  }), shallow);

  return useMemo(() => renderToast, []);
}

export default useRenderToast;
