import { useCallback } from 'react';
import ga4 from 'react-ga4';

import { SendEvent } from '@/lib/types/event';

function useActivityLog() {
  const sendEvent = useCallback(({
    action, name, type, value = {},
  }: SendEvent) => {
    ga4.event(name, {
      action,
      ...(type ? { type } : {}),
      ...value,
    });
  }, []);

  return {
    sendEvent,
  };
}

export default useActivityLog;
